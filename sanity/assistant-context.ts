import "server-only";

import { getPortfolioContent } from "@/sanity/portfolio";
import type { PortfolioContent } from "@/sanity/types";

/**
 * Factual context for the Groq assistant, generated from published content.
 *
 * Derived from `getPortfolioContent()` rather than a second query so the
 * assistant and the page can never disagree: they share one cache entry and one
 * `portfolio` tag, and a publish refreshes both at the same moment.
 *
 * Behavioural instructions stay in the route handler. Only facts come from here.
 */
export function buildAssistantContext(content: PortfolioContent): string {
  const { site, hero, about, skills, experience, projects, contact } = content;

  const lines: string[] = [];

  lines.push("--- IDENTITY ---");
  lines.push(`Name: ${site.fullName} (goes by ${site.shortName})`);
  lines.push(`Role: ${site.role}`);
  lines.push(`Location: ${site.location} (${site.timezone})`);
  lines.push(`Summary: ${hero.intro}`);
  if (hero.stats.length > 0) {
    lines.push(
      `Highlights: ${hero.stats
        .map((stat) => `${stat.value} ${stat.label}`)
        .join(" · ")}`,
    );
  }
  lines.push(`Current focus: ${hero.focusTitle}. ${hero.focusDescription}`);

  lines.push("");
  lines.push("--- AVAILABILITY ---");
  lines.push(hero.availabilityBadge);
  if (hero.secondaryBadges.length > 0) {
    lines.push(hero.secondaryBadges.join(" · "));
  }
  for (const item of contact.meta) lines.push(item.label);

  lines.push("");
  lines.push("--- TECH STACK ---");
  if (skills.coreStack.length > 0) {
    lines.push(
      `Core: ${skills.coreStack
        .map((skill) => (skill.note ? `${skill.name} (${skill.note})` : skill.name))
        .join(", ")}`,
    );
  }
  for (const group of skills.groups) {
    if (group.items.length > 0) {
      lines.push(`${group.title}: ${group.items.join(", ")}`);
    }
  }

  lines.push("");
  lines.push("--- EXPERIENCE ---");
  for (const entry of experience.entries) {
    lines.push(
      `${entry.company} — ${entry.role} (${entry.dateLabel}, ${entry.location})`,
    );
    for (const point of entry.points) lines.push(`  - ${point}`);
  }

  lines.push("");
  lines.push("--- EDUCATION ---");
  for (const item of about.education) {
    lines.push(`${item.degree}, ${item.institution} (${item.meta})`);
  }

  if (about.contributions.length > 0) {
    lines.push("");
    lines.push("--- CONTRIBUTIONS ---");
    for (const item of about.contributions) {
      lines.push(`${item.title}: ${item.description} (${item.url})`);
    }
  }

  lines.push("");
  lines.push("--- PROJECTS ---");
  for (const project of projects.projects) {
    const meta = [
      project.stack.join(", "),
      project.status,
      project.links.live ? `live: ${project.links.live}` : null,
    ].filter(Boolean);
    lines.push(`${project.title} — ${project.description}`);
    if (meta.length > 0) lines.push(`  ${meta.join(" | ")}`);
  }

  lines.push("");
  lines.push("--- CONTACT ---");
  lines.push(`Email: ${contact.email}`);
  for (const channel of [...contact.directChannels, ...contact.profiles]) {
    lines.push(`${channel.label}: ${channel.value} (${channel.href})`);
  }

  return lines.join("\n");
}

export async function getAssistantContext(): Promise<{
  context: string;
  fallbackAnswer: string;
}> {
  const content = await getPortfolioContent();
  return {
    context: buildAssistantContext(content),
    fallbackAnswer: content.assistant.fallbackAnswer,
  };
}
