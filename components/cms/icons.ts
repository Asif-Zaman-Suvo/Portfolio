import {
  BrainCircuit,
  CheckCircle2,
  Clock,
  Code2,
  Database,
  FlaskConical,
  GitFork,
  Layers3,
  LayoutGrid,
  Link2,
  Mail,
  MapPin,
  MessageCircle,
  PenLine,
  Phone,
  Shapes,
  TrendingUp,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { ICON_KEYS, type IconKey } from "@/sanity/icon-keys";

/**
 * Icons live in code; the CMS only stores a key. The `Record<IconKey, ...>`
 * annotation makes an unmapped key a compile error, so the Studio's options and
 * the rendered icons cannot drift apart.
 */
export const ICONS: Record<IconKey, LucideIcon> = {
  brainCircuit: BrainCircuit,
  checkCircle: CheckCircle2,
  clock: Clock,
  code: Code2,
  database: Database,
  flask: FlaskConical,
  gitFork: GitFork,
  layers: Layers3,
  layoutGrid: LayoutGrid,
  link: Link2,
  mail: Mail,
  mapPin: MapPin,
  messageCircle: MessageCircle,
  penLine: PenLine,
  phone: Phone,
  shapes: Shapes,
  trendingUp: TrendingUp,
  wrench: Wrench,
  zap: Zap,
};

export { ICON_KEYS };
export type { IconKey };

/** Falls back to a neutral icon so an unknown CMS key never breaks a render. */
export function resolveIcon(key: string | null | undefined): LucideIcon {
  if (key && key in ICONS) return ICONS[key as IconKey];
  return Shapes;
}
