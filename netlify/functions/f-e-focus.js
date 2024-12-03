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

function filterStories(stories, filters) {
    return stories.filter((story) => {
        let includeStory = true;
        filters.forEach((filter) => {
            if (story.body.toLowerCase().includes(filter)) includeStory = false;
        });
        return includeStory;
    });
}

exports.handler = async function (event, context) {
    const filtersString = event.queryStringParameters.filters || '';
    // split returns an array of 1 [''] when provided an empty string, use empty array instead
    const filters = filtersString ? filtersString.toLowerCase().split(',') : [];
    console.log(filters);

    try {
        let stories = await getMostRecentStories();
        if (filters.length) stories = filterStories(stories, filters);

        return {
            headers,
            statusCode: 200,
            body: JSON.stringify(stories),
        };
    } catch (err) {
        console.error(err);
        return {
            headers,
            statusCode: 500,
        };
    }
};
