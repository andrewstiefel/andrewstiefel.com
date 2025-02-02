import fetch from 'node-fetch';
import fs from 'fs';
import { createClient } from "@1password/sdk";

const { OP_SERVICE_ACCOUNT_TOKEN } = process.env;

const client = await createClient({
    auth: OP_SERVICE_ACCOUNT_TOKEN,
    integrationName: "andrewstiefel.com",
    integrationVersion: "v1.1",
  });
  
const FATHOM_API_KEY = await client.secrets.resolve("op://website/fathom-api/credential");
const SITE_ID = "BKYGCADM";
const API_URL = "https://api.usefathom.com/v1/aggregations";

// Query Parameters
const params = new URLSearchParams({
    entity: "pageviews",
    entity_id: SITE_ID,
    aggregates: "pageviews",
    group_by: "pathname",
    date_from: "30d"
});

// Headers for authentication
const headers = {
    "Authorization": `Bearer ${FATHOM_API_KEY}`,
    "Content-Type": "application/json"
};

// Fetch pageviews data from Fathom Analytics
async function fetchPageviews() {
    try {
        const response = await fetch(`${API_URL}?${params.toString()}`, { headers });

        if (!response.ok) {
            console.error("Error fetching data:", await response.text());
            return [];
        }

        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Fetch error:", error);
        return [];
    }
}

// Get top 3 pages by view count
function getTopPages(data, topN = 3) {
    return data.sort((a, b) => b.pageviews - a.pageviews).slice(0, topN);
}

// Save data to Jekyll's _data directory
function saveToJekyllData(topPages, outputFile = "_data/popular_posts.json") {
    fs.mkdirSync("_data", { recursive: true });
    fs.writeFileSync(outputFile, JSON.stringify(topPages, null, 4));
    console.log(`✅ Saved top ${topPages.length} pages to ${outputFile}`);
}

// Main function
async function main() {
    const pages = await fetchPageviews();

    if (pages.length === 0) {
        console.log("⚠ No data retrieved.");
        return;
    }

    const topPages = getTopPages(pages);
    saveToJekyllData(topPages);
}

// Run the script
main();