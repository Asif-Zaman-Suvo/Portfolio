import { ChatBot } from "@/components/ChatBot";
import { Navbar } from "@/components/Navbar";
import { PortfolioShell } from "@/components/portfolio/PortfolioShell";
import { AboutSection } from "@/components/sections/AboutSection";
import { AiAssistantSection } from "@/components/sections/AiAssistantSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { getPortfolioContent } from "@/sanity/portfolio";

/**
 * Server Component: one CMS read for the whole page.
 *
 * The result is statically cached and refreshed by the Sanity publish webhook,
 * so visitors never wait on the CMS and an outage cannot break the page. Only
 * the interactive pieces below are client components.
 */
export default async function Home() {
  const content = await getPortfolioContent();

  return (
    <PortfolioShell>
      <Navbar
        initials={content.site.initials}
        shortName={content.site.shortName}
        items={content.site.nav}
        cta={content.site.navCta}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-3 pb-12 pt-[calc(var(--nav-offset)+0.75rem)] sm:px-6 sm:pb-16 sm:pt-[calc(var(--nav-offset)+1rem)] lg:px-8">
        <HeroSection
          content={content.hero}
          fullName={content.site.fullName}
          initials={content.site.initials}
          resume={content.site.resume}
        />
        <AiAssistantSection content={content.aiAssistant} />
        <AboutSection content={content.about} />
        <SkillsSection content={content.skills} />
        <ExperienceTimeline content={content.experience} />
        <ProjectsSection content={content.projects} />
        <ContactSection content={content.contact} />
      </div>

      <ChatBot settings={content.assistant} />
    </PortfolioShell>
  );
}
