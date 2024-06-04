var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import xml from "xml";
import { writeFile, copyFile, unlinkSync, existsSync } from "fs";
import { promisify } from "util";
import { ProgressBar } from "@open-tech-world/cli-progress-bar";
import { getDate } from "../tools/index.js";
var writeFileAsync = promisify(writeFile);
export function main() {
    return __awaiter(this, void 0, void 0, function () {
        var pBar, assets, sitemapItems, sitemapObject, sitemap;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pBar = new ProgressBar({ prefix: 'Market Sitemap Generating...' });
                    assets = [
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
                    sitemapItems = assets.map(function (item) {
                        return [
                            {
                                loc: "https://eterex.com/coin/".concat(item)
                            },
                            {
                                lastmod: getDate()
                            },
                            {
                                priority: 0.8
                            },
                            {
                                changefreq: "monthly"
                            },
                        ];
                    });
                    sitemapObject = {
                        urlset: __spreadArray([
                            {
                                _attr: {
                                    xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9",
                                    'xmlns:xhtml': "http://www.w3.org/1999/xhtml",
                                    'xmlns:image': "http://www.google.com/schemas/sitemap-image/1.1",
                                    'xmlns:video': "http://www.google.com/schemas/sitemap-video/1.1"
                                }
                            }
                        ], sitemapItems.map(function (item) { return ({ url: item }); }), true)
                    };
                    sitemap = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>".concat(xml(sitemapObject));
                    return [4 /*yield*/, existsSync('./sitemaps/market-sitemap.xml')];
                case 1:
                    if (!_a.sent()) return [3 /*break*/, 3];
                    return [4 /*yield*/, unlinkSync('./sitemaps/market-sitemap.xml')];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [4 /*yield*/, writeFileAsync("./sitemaps/market-sitemap.xml", sitemap, "utf8")];
                case 4:
                    _a.sent();
                    copyFile('./sitemaps/market-sitemap.xml', '../../static/market-sitemap.xml', function (error) {
                        if (error) {
                            throw error;
                        }
                    });
                    pBar.run({ value: 100, total: 100, prefix: 'Market Sitemap Created Successfully : build/market-sitemap.xml' });
                    return [2 /*return*/];
            }
        });
    });
}
