import { Metadata } from "next";
import BlogContent from '@/components/Blog/BlogContent'


export const metadata: Metadata = {
  title: "Artículos",
  description: "Infociencia Artículos"
};

const BlogPage = async () => {

  return (
    <>
      <BlogContent />
    </>
  );
};

export default BlogPage;
