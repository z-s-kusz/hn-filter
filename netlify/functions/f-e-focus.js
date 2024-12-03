const cheerio = require('cheerio');

const headers = {
    'Access-Control-Allow-Origin': process.env.PORT ? 'https://x-filter-for-hn.netlify.app/' : '*',
};
const feFocus = 'https://frontendfoc.us'; // no trailing slash

// story = { title, link, attribution };
// story = { body, link, attribution }; ???? leaning towards this - lots of story titles are written in context

async function getMostRecentStories() {
    try {
        const homeResponse = await fetch(feFocus);
        const homeHTML = await homeResponse.text();
        const $home = cheerio.load(homeHTML);
        const link = $home('a:contains("our latest issue")').attr('href');

        const latestIssueResponse = await fetch(feFocus + link);
        const latestIssueHTML = await latestIssueResponse.text();
        const $ = cheerio.load(latestIssueHTML);

        const $stories = $('p.desc');
        console.log(link);
        return [];
    } catch (error) {
        console.error('getMostRecentStories error:', error);
        throw Error('Error getting stories.');
    }
}

exports.handler = async function (event, context) {
    try {
        const stories = await getMostRecentStories();
        const responseBody = JSON.stringify(stories);

        return {
            headers,
            statusCode: 200,
            body: responseBody,
        };
    } catch (error) {
        console.error(err);
        return {
            headers,
            statusCode: 500,
        };
    }
};
