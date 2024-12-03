const cheerio = require('cheerio');

const headers = {
    'Access-Control-Allow-Origin': process.env.PORT ? 'https://x-filter-for-hn.netlify.app/' : '*',
};
const feFocus = 'https://frontendfoc.us'; // no trailing slash

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

        const stories = transformStories($, $stories);

        return stories;
    } catch (err) {
        console.error('getMostRecentStories error:', err);
        throw Error('Error getting stories.');
    }
}

function transformStories($, $stories) {
    let stories = [];

    $stories.each((_i, storyElement) => {
        const links = [];
        const $links = $(storyElement).children('a');
        $links.each((_j, linkElement) => {
            const href = $(linkElement).attr('href');
            links.push(href);
        });

        const story = {
            body: $(storyElement).text(),
            links,
            attribution: $(storyElement).parent().find('p.name').text().trim(),
        };
        stories.push(story);
    });

    return stories;
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
    } catch (err) {
        console.error(err);
        return {
            headers,
            statusCode: 500,
        };
    }
};
