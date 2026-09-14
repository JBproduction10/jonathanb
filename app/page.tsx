import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import About from "@/components/about";
import Skills from "@/components/skills";
import Projects from "@/components/projects";
import WorkEducation from "@/components/work-education";
import Strengths from "@/components/strengths";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import Reveal from "@/components/reveal";
import {
  getSite,
  getSkillGroups,
  getProjects,
  getStrengths,
  getTimeline,
} from "@/lib/data";

export default async function Home() {
  const [site, skillGroups, projects, strengths, timeline] = await Promise.all([
    getSite(),
    getSkillGroups(),
    getProjects(),
    getStrengths(),
    getTimeline(),
  ]);

  return (
    <>
      <Navbar site={site} />
      <main>
        <Hero site={site} />
        <Reveal>
          <About site={site} />
        </Reveal>
        <Reveal>
          <Skills groups={skillGroups} />
        </Reveal>
        <Reveal>
          <Projects projects={projects} />
        </Reveal>
        <Reveal>
          <WorkEducation entries={timeline} site={site} />
        </Reveal>
        <Reveal>
          <Strengths strengths={strengths} />
        </Reveal>
        <Reveal>
          <Contact site={site} />
        </Reveal>
      </main>
      <Footer site={site} />
    </>
  );
}
