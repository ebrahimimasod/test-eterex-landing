// @ts-ignore
import xml from "xml";
import { writeFile, copyFile, unlinkSync, existsSync } from "fs";
import { promisify } from "util";
import { ProgressBar } from "@open-tech-world/cli-progress-bar";
import { getDate } from "../tools/index.js";

const writeFileAsync = promisify(writeFile);

export async function main() {

  const pBar = new ProgressBar({ prefix: 'Main Sitemap Generating...' });
  pBar.run({ value: 0, total: 100 });

  const sitemapItems = [
    [
      {
        loc: "https://eterex.com/market-sitemap.xml",
      },
      {
        lastmod: getDate(),
      },
    ],
    [
      {
        loc: "https://eterex.com/blog-sitemap.xml",
      },
      {
        lastmod: getDate(),
      },
    ],
  ];

  const sitemapObject = {
    sitemapindex: [
      {
        _attr: {
          xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9"
        },
      },
      ...sitemapItems.map(item => ({ sitemap: item }))
    ],
  };

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>${xml(sitemapObject)}`;
  if (await existsSync('./sitemaps/sitemap.xml')) {
    await unlinkSync('./sitemaps/sitemap.xml');
  }

  await writeFileAsync("./sitemaps/sitemap.xml", sitemap, "utf8");

  copyFile('./sitemaps/sitemap.xml', '../../static/sitemap.xml', (error) => {
    if (error) {
      throw error;
    }
  })
  pBar.run({ value: 100, total: 100, prefix: 'Main Sitemap Created Successfully : build/sitemap.xml' });
}

