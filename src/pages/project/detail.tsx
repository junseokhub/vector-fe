import { useRouter } from "next/router";
import ProjectDetailContents from "@/components/project/ProjectDetailContents";
import Layout from "@/components/layout/Layout.tsx";

export default function ProjectDetailPage() {
  const { query } = useRouter();
  const projectKey = typeof query.key === "string" ? query.key : "";

  if (!projectKey) {
    return (
      <Layout>
        <p className="text-center py-20 text-slate-500">프로젝트 키가 없습니다.</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <ProjectDetailContents projectKey={projectKey} />
    </Layout>
  );
}