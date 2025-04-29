import fs, { promises } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';

export type Frontmatter = {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  author: string;
  readTime: string;
};

const postsDirectory = path.join(process.cwd(), 'posts');

function getAllFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else if (file.endsWith('.mdx')) {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

export function getAllPosts() {
  const filePaths = getAllFiles(postsDirectory);

  return filePaths
    .map((filePath) => {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);

      const relativePath = path.relative(postsDirectory, filePath);
      const pathParts = relativePath.split(path.sep);
      const category = pathParts.length > 1 ? pathParts[0] : 'uncategorized';
      const slug =
        pathParts.slice(0, -1).join('/') +
        '/' +
        path.basename(filePath, '.mdx');

      return {
        slug,
        title: data.title,
        excerpt: data.excerpt,
        date: data.date,
        category,
        image: data.image,
        author: data.author,
        readTime: data.readTime,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export const getPost = async (slug: string[]) => {
  const source = await promises.readFile(
    path.join(
      process.cwd(),
      `${slug.length > 1 ? `posts/${slug[0]}` : 'posts'}`,
      `${slug.length > 1 ? slug[1] : slug[0]}.mdx`,
    ),
    'utf-8',
  );

  const { content, frontmatter } = await compileMDX<Frontmatter>({
    source,
    options: { parseFrontmatter: true },
  });

  return { content, frontmatter };
};
