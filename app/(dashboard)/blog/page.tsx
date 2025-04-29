import Link from 'next/link';
import Image from 'next/image';

import { getAllPosts } from '@/lib/posts';
import { ArrowLeft, Calendar, User } from 'lucide-react';

const Blog = () => {
  const allPosts = getAllPosts();

  return (
    <div className='max-w-7x container mx-auto px-4 py-12'>
      <div className='mx-auto max-w-2xl text-center'>
        <h1 className='mb-6 text-4xl font-bold tracking-tight sm:text-5xl'>
          Welcome to Our Blog
        </h1>
        <p className='text-muted-foreground mb-8 text-xl'>
          Discover the latest insights, tutorials, and news from our team of
          experts.
        </p>
      </div>

      {/* Recent Posts Section */}
      <div className='mx-auto max-w-[980px] grid-cols-1 gap-8 lg:grid-cols-12'>
        {/* Main Content */}
        <div className='lg:col-span-12'>
          <h2 className='mb-8 text-3xl font-bold'>Latest Articles</h2>
          <div className='grid gap-12'>
            {allPosts.map((post, index) => (
              <div
                key={index}
                className='grid grid-cols-1 gap-6 md:grid-cols-12'
              >
                {post.image && (
                  <div className='md:col-span-4'>
                    <Link
                      href={`/blog/${post.slug}`}
                      className='relative block aspect-[4/3] overflow-hidden'
                    >
                      <img
                        src={post.image || '/placeholder.svg'}
                        alt={post.title}
                        className='object-cover transition-transform duration-300 hover:scale-105'
                      />
                    </Link>
                  </div>
                )}
                <div
                  className={post?.image ? 'md:col-span-8' : 'md:col-span-12'}
                >
                  <div className='mb-2'>
                    <span className='text-xs font-bold tracking-wider text-gray-500'>
                      {post.category}
                    </span>
                  </div>
                  <Link href={`/blog/${post.slug}`} className='group block'>
                    <h3 className='group-hover:text-primary mb-2 text-2xl leading-tight font-bold'>
                      {post.title}
                    </h3>
                  </Link>
                  <p className='mb-2 text-gray-600'>{post.excerpt}</p>
                  <p className='text-sm font-medium text-gray-500 uppercase'>
                    {post?.author}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
