// @ts-ignore
import xml from "xml";
import axios from "axios";
import { writeFile, copyFile, unlinkSync, existsSync } from "fs";
import { promisify } from "util";
import { ProgressBar } from '@open-tech-world/cli-progress-bar';

interface IPost {
  link: string;
  modified: string;
}


const writeFileAsync = promisify(writeFile);



async function fetchPosts(filters: { page: number, per_page: number, order: string }, posts: Array<IPost> = [], pBar: any) {
  const url = 'https://blog.eterex.com/api/wp/v2/posts';
  let totalPostCount = 0;
  try {
    const res = await axios.get(url, {
      params: filters
    });
    totalPostCount = res.headers['x-wp-total'];
    const percentage = Math.ceil(Number(((filters.page * filters.per_page) * 100) / totalPostCount));
    pBar.run({ value: percentage, total: 100 })
    posts.push(...res.data.map((item: IPost) => ({ link: item.link, modified: item.modified+"+03:30" })));
    if (totalPostCount >= filters.page * filters.per_page) {
      await fetchPosts({ ...filters, page: filters.page + 1, }, posts, pBar);
    }
  } catch (e) {
    console.log(e)
  }
  return posts;
}

export async function main() {

  const pBar = new ProgressBar({ prefix: 'Blog Sitemap Generating...' });

  const filters = {
    page: 1,
    order: "desc",
    per_page: 20,
  }

  // @ts-ignore

  const posts: Array<IPost> = [];

  const data = (await fetchPosts(filters, posts, pBar))

  const sitemapItems = data.map((item: IPost) => {
    return [
      {
        loc: item.link,
      },
      {
        lastmod: item.modified,
      },
      {
        priority: 0.8,
      },
      {
        changefreq: "monthly",
      },
    ];
  })

  const sitemapObject = {
    urlset: [
      {
        _attr: {
          xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9",
          'xmlns:xhtml': "http://www.w3.org/1999/xhtml",
          'xmlns:image': "http://www.google.com/schemas/sitemap-image/1.1",
          'xmlns:video': "http://www.google.com/schemas/sitemap-video/1.1",
        },
      },
      ...sitemapItems.map(item => ({ url: item }))
    ],
  };

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>${xml(sitemapObject)}`;

  if (await existsSync('./sitemaps/blog-sitemap.xml')) {
    await unlinkSync('./sitemaps/blog-sitemap.xml');
  }
  await writeFileAsync("./sitemaps/blog-sitemap.xml", sitemap, "utf8");
  copyFile('./sitemaps/blog-sitemap.xml', '../../static/blog-sitemap.xml', (error) => {
    if (error) {
      throw error;
    }
  })
  pBar.run({ value: 100, total: 100, prefix: 'Blog Sitemap Created Successfully : build/blog-sitemap.xml' });

}


