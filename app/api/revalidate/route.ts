import { parseBody } from "next-sanity/webhook";
import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

import { PORTFOLIO_TAG } from "@/sanity/env";

/**
 * Sanity publish webhook.
 *
 * Sanity signs each delivery with `sanity-webhook-signature`; `parseBody`
 * verifies that HMAC and additionally waits out Content Lake eventual
 * consistency, so the regenerated page reads the newly published revision
 * rather than the pre-publish one still on the API CDN.
 *
 * This is the only way content reaches production between deploys. Everything
 * else is served from the static cache.
 */
export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET?.trim();

  if (!secret) {
    console.error("[revalidate] SANITY_REVALIDATE_SECRET is not set");
    return NextResponse.json(
      { error: "Revalidation is not configured." },
      { status: 500 },
    );
  }

  let isValidSignature: boolean | null = null;
  let body: { _type?: string; _id?: string } | null = null;

  try {
    ({ isValidSignature, body } = await parseBody<{
      _type?: string;
      _id?: string;
    }>(request, secret, true));
  } catch (error) {
    console.error("[revalidate] failed to parse webhook body:", error);
    return NextResponse.json({ error: "Malformed payload." }, { status: 400 });
  }

  if (!isValidSignature) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 401 });
  }

  if (!body?._type) {
    return NextResponse.json(
      { error: "Payload is missing _type." },
      { status: 400 },
    );
  }

  // One tag for the whole page: any published change invalidates the single
  // cached payload. `expire: 0` drops the stale window so the next request
  // regenerates immediately.
  revalidateTag(PORTFOLIO_TAG, { expire: 0 });

  return NextResponse.json({
    revalidated: true,
    tag: PORTFOLIO_TAG,
    documentType: body._type,
    documentId: body._id ?? null,
    at: new Date().toISOString(),
  });
}
