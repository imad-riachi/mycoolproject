const BlogLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className='l mx-auto flex min-h-[calc(100dvh-68px)] w-full'>
      {children}
    </section>
  );
};

export default BlogLayout;
