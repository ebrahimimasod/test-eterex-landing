const execute = require('async-execute');


export default async function (req, res, next) {
    const url = '/generate-sitemap-masoud';
    if (url === req.url) {
        console.info('Start Sitemap Generator....');
        next();
        await execute("npm run generate-sitemap");
        console.info('Start Sitemap Generated successfully.');
    }
    next()
}