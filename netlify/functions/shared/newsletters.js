import * as cheerio from 'cheerio';

export const headers = {
    'Access-Control-Allow-Origin': process.env.PORT ? 'https://x-filter-for-hn.netlify.app/' : '*',
};

export async function getMostRecentStories(baseUrl) {
    try {
        const homeResponse = await fetch(baseUrl);
        const homeHTML = await homeResponse.text();
        const $home = cheerio.load(homeHTML);
        const link = $home('a:contains("Latest Issue"), a:contains("latest issue")').attr('href');

        const latestIssueResponse = await fetch(baseUrl + link);
        const latestIssueHTML = await latestIssueResponse.text();
        const $ = cheerio.load(latestIssueHTML);
        const $stories = $('p.desc');
        const $quickLinks = $('li');

        const bigStories = transformStories($, $stories, true);
        const quickLinks = transformStories($, $quickLinks, false);
        const allStories = bigStories.concat(quickLinks);

        const description = $('meta[property="og:description"]').attr('content');
        const issueNumber = getIssueNumber(description);

        return {
            stories: allStories,
            issueNumber,
        };
    } catch (err) {
        console.error('getMostRecentStories error:', err);
        throw Error('Error getting stories.');
    }
}

export function transformStories($, $stories, attributions = false) {
    let stories = [];

    $stories.each((_i, storyElement) => {
        // prevent attribution from showing up twice or not at all since it appears as part of the storyElementBody sometimes
        const attribution = attributions ? $(storyElement).parent().find('.name').text().trim() : '';
        $(storyElement).parent().find('.name').remove();

        const body = fixUnwantedHTML($(storyElement).html());

        const story = {
            body,
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
            const storyBody = story.body.toLowerCase();
            // lazy yes but I need to account for potential kagi products that are one word (kagiRental or something idk)
            // will result in kagi posts that ALSO have 'packaging' in them to surface, I'll have to live with that
            const kagiFalseAlarm = filter === 'kagi' && storyBody.includes('packaging');

            if (storyBody.includes(filter) && !kagiFalseAlarm) includeStory = false;
            if (story.attribution.toLowerCase().includes(filter)) includeStory = false;
        });
        return includeStory;
    });
}

function fixUnwantedHTML(html) {
    const bannedColors = ['#222222', '#222', '#000000', '#000', '#efc', '#3366aa', '#36a'];
    bannedColors.forEach((color) => {
        html = html.replaceAll(color, '');
    });

    html = html.replaceAll('_blank', '_self');

    return html;
}

function getIssueNumber(description) {
    const splitDescription = description.split(/\u{2014}/u); // /\u{2014}/u === em-dash :)
    if (splitDescription.length >= 2) return splitDescription[1].trim();
    return 'Issue # Not Found';
}
