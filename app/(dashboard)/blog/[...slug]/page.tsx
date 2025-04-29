import Link from 'next/link';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { getPost } from '@/lib/posts';

type BlogPostProps = {
  params: Promise<{
    slug: string[];
  }>;
};

const BlogPost: React.FC<BlogPostProps> = async ({ params }) => {
  const { slug } = await params;
  const { content, frontmatter } = await getPost(slug);

  return (
    <div className='container mx-auto max-w-3xl px-4 py-12'>
      <Link
        href='/blog'
        className='text-primary mb-6 inline-flex items-center text-sm font-medium hover:underline'
      >
        <ArrowLeft className='mr-2 h-4 w-4' /> Back to all posts
      </Link>
      <div className='mb-6'>
        <span className='text-xs font-bold tracking-wider text-gray-500'>
          {frontmatter.category}
        </span>
      </div>
      <h1 className='mb-4 text-4xl font-bold tracking-tight md:text-5xl'>
        {frontmatter.title}
      </h1>
      <div className='mb-8 flex items-center gap-4 text-gray-500'>
        <div className='flex items-center'>
          <User className='mr-2 h-4 w-4' />
          <span className='text-sm font-medium uppercase'>
            {frontmatter.author}
          </span>
        </div>
        <div className='flex items-center'>
          <Calendar className='mr-2 h-4 w-4' />
          <span>{frontmatter.date}</span>
        </div>
        <div>{frontmatter.readTime}</div>
      </div>
      {frontmatter.image && (
        <div className='mb-10 overflow-hidden rounded-lg'>
          <img
            src={frontmatter.image || '/placeholder.svg'}
            alt={frontmatter.title}
            width={1200}
            height={600}
            className='h-auto w-full'
          />
        </div>
      )}
      <article className='prose lg:prose-xl prose-foreground dark:prose-invert max-w-none'>
        {content}
      </article>
    </div>
  );
};

export default BlogPost;
