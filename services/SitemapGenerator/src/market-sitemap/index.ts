import xml from "xml";
import { writeFile, copyFile, unlinkSync, existsSync } from "fs";
import { promisify } from "util";
import { ProgressBar } from "@open-tech-world/cli-progress-bar";
import { getDate } from "../tools/index.js";


const writeFileAsync = promisify(writeFile);




export async function main() {
  const pBar = new ProgressBar({ prefix: 'Market Sitemap Generating...' });
  const assets: Array<string> = [
    'btc',
    'xmr',
    'bnb',
    'xlm',
    'xlm',
    'shib',
    'fil',
    'hbar',
    'dcr',
    'dai',
    'icp',
    'flow',
    'nexo',
    'bsv',
    'busd',
    'link',
    'eth',
    'doge',
    'zec',
    'sushi',
    'amp',
    'xem',
    'xrp',
  ];

  pBar.run({ value: 0, total: 100 });


  const sitemapItems = assets.map((item) => {
    return [
      {
        loc: `https://eterex.com/coin/${item}`,
      },
      {
        lastmod: getDate(),
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
  if (await existsSync('./sitemaps/market-sitemap.xml')) {
    await unlinkSync('./sitemaps/market-sitemap.xml');
  }

  await writeFileAsync("./sitemaps/market-sitemap.xml", sitemap, "utf8");
  copyFile('./sitemaps/market-sitemap.xml', '../../static/market-sitemap.xml', (error) => {
    if (error) {
      throw error;
    }
  })
  pBar.run({ value: 100, total: 100, prefix: 'Market Sitemap Created Successfully : build/market-sitemap.xml' });

}


