import { client } from "@/sanity/lib/client";
import { projectsForGridQuery } from "@/sanity/lib/queries";
import { COMING_SOON_PROJECTS } from "@/components/project-grid/projects";
import ProjectGrid from "@/components/project-grid/ProjectGrid";

export default async function Home() {
  const projects = await client.fetch(projectsForGridQuery);

  return (
    <main className="flex min-h-screen flex-col items-center bg-[#f9f4e3] px-6 pt-32 pb-24 text-[#1c1a17]">
      <ProjectGrid projects={projects} comingSoon={COMING_SOON_PROJECTS} />
    </main>
  );
}
