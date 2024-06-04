import { main as GeneralSitemap } from "./main-sitemap/index.js"
import { main as MarketSitemap } from "./market-sitemap/index.js"
import { main as BlogSitemap } from "./blog-sitemap/index.js"


async function runner() {
    await GeneralSitemap();
    await MarketSitemap();
    await BlogSitemap();
}
runner();

