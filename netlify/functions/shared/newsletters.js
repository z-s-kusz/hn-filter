import * as cheerio from 'cheerio';

export const headers = {
    'Access-Control-Allow-Origin': process.env.PORT ? 'https://x-filter-for-hn.netlify.app/' : '*',
};

export async function getMostRecentStories(baseUrl) {
    try {
        const homeResponse = await fetch(baseUrl);
        const homeHTML = await homeResponse.text();
        const $home = cheerio.load(homeHTML);
        const link = $home('a:contains("our latest issue")').attr('href');

        const latestIssueResponse = await fetch(baseUrl + link);
        const latestIssueHTML = await latestIssueResponse.text();
        const $ = cheerio.load(latestIssueHTML);
        const $stories = $('p.desc');
        const $quickLinks = $('li');

        const bigStories = transformStories($, $stories, true);
        const quickLinks = transformStories($, $quickLinks, false);
        const allStories = bigStories.concat(quickLinks);

        return allStories;
    } catch (err) {
        console.error('getMostRecentStories error:', err);
        throw Error('Error getting stories.');
    }
}

export function transformStories($, $stories, attributions = false) {
    let stories = [];

    $stories.each((_i, storyElement) => {
        const links = [];
        const $links = $(storyElement).find('a');
        $links.each((_j, linkElement) => {
            const href = $(linkElement).attr('href');
            links.push(href);
        });

        // prevent attribution from showing up twice or not at all since it appears as part of the storyElementBody sometimes
        const attribution = attributions ? $(storyElement).parent().find('.name').text().trim() : '';
        $(storyElement).parent().find('.name').remove();

        const body = removeDarkColors($(storyElement).html());

        const story = {
            body,
            links,
            attribution,
        };
        stories.push(story);
    });

    return stories;
}

export function filterStories(stories, filters) {
    return stories.filter((story) => {
        let includeStory = true;
        filters.forEach((filter) => {
            if (story.body.toLowerCase().includes(filter)) includeStory = false;
        });
        return includeStory;
    });
}

function removeDarkColors(html) {
    const bannedColors = ['#222222', '#222', '#000000', '#000', '#efc'];

    bannedColors.forEach((color) => {
        html = html.replaceAll(color, '');
    });

    return html;
}