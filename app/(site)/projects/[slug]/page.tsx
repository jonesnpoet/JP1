import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { projectBySlugQuery, projectSlugsQuery } from "@/sanity/lib/queries";
import CaseStudyView from "@/components/case-study/CaseStudyView";

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(projectSlugsQuery);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await client.fetch(projectBySlugQuery, { slug });
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
  const project = await client.fetch(projectBySlugQuery, { slug });
  if (!project) notFound();

  return (
    <main className="min-h-screen bg-[#f9f4e3] pt-20">
      <CaseStudyView project={project} />
    </main>
  );
}
