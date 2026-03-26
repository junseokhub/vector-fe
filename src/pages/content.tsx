import { useRouter } from "next/router";
import ContentDetail from "@/components/content/ContentDetail";
import Layout from "@/components/layout/Layout";

export default function ContentPage() {
  const { query } = useRouter();
  const contentKey = typeof query.key === "string" ? query.key : "";

  if (!contentKey) {
    return (
      <Layout>
        <p className="text-center py-20 text-slate-500">key 값이 필요합니다.</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <ContentDetail contentKey={contentKey} />
    </Layout>
  );
}