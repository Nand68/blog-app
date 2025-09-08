import { useParams } from "react-router-dom";
import { blogData } from "../dummy-data/Blog";
const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const blog = blogData.find((b) => b.id.toString() === id);

  if (!blog) return <div>Blog not found</div>;
  return (
    <div>
      <h1>{blog.title}</h1>
      <p>{blog.description}</p>
    </div>
  );
};

export default BlogDetail;
