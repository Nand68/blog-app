import BlogCard from "./Blogs";
import { blogData } from "../dummy-data/Blog"; 

const BlogList = () => {
  return (
    <div className="bg-gray-900 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          Latest Blog Posts
        </h1>
        {/* Grid Layout - Responsive: 1 column on mobile, 2 on tablet, 3 on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogData.map((blog) => (
            <BlogCard key={blog.id} blogData={blog} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogList;
