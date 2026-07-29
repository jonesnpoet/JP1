import { notFound } from "next/navigation";
import { PROJECTS } from "@/components/project-grid/projects";
import CaseStudyView from "@/components/case-study/CaseStudyView";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — Jones + Poet`,
    description: project.description,
  };
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
      <CaseStudyView project={project} />
    </main>
  );
}
