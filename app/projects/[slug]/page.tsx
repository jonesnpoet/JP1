import { notFound } from "next/navigation";
import { PROJECTS } from "@/components/project-grid/projects";
import CaseStudyView from "@/components/case-study/CaseStudyView";
import ComingSoonCaseStudy from "@/components/case-study/ComingSoonCaseStudy";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <main className="min-h-screen bg-white pt-20">
      {project.comingSoon ? (
        <ComingSoonCaseStudy project={project} />
      ) : (
        <CaseStudyView project={project} />
      )}
    </main>
  );
}
