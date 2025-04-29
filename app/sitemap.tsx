import { promises as fs } from 'fs';
import path from 'path';

async function getBlogSlugs(dir: string) {
  const entries = await fs.readdir(dir, {
    recursive: true,
    withFileTypes: true,
  });
  return entries
    .filter((entry) => entry.isFile() && entry.name === 'page.mdx')
    .map((entry) => {
      const relativePath = path.relative(
        dir,
        path.join(entry.parentPath, entry.name),
      );
      return path.dirname(relativePath);
    })
    .map((slug) => slug.replace(/\\/g, '/'));
}

export default async function sitemap() {
  const blogPostsDirectory = path.join(
    process.cwd(),
    'app',
    '(dashboard)',
    'blog',
  );
  const slugs = await getBlogSlugs(blogPostsDirectory);

  const blogPosts = slugs.map((slug) => ({
    url: `${process.env.BASE_URL}/blog/${slug}`,
    lastModified: new Date().toISOString(),
  }));

  const routes = ['', '/prices'].map((route) => ({
    url: `${process.env.BASE_URL}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...blogPosts];
}
