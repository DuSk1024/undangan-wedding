const fs = require("fs");
const path = require("path");

const indexPath = path.join(__dirname, "index.html");

let html = fs.readFileSync(indexPath, "utf8");

// Ambil URL website dari environment variable
const siteUrl = process.env.SITE_URL;

if (!siteUrl) {
    throw new Error("SITE_URL belum diatur.");
}

// Ganti placeholder
html = html.replaceAll("__SITE_URL__", siteUrl);

// Simpan hasil build
fs.writeFileSync(indexPath, html, "utf8");

console.log(`OG URL: ${siteUrl}`);