import { headers, getMostRecentStories, filterStories } from './shared/newsletters';

exports.handler = async function (event, context) {
    const filtersString = event.queryStringParameters.filters || '';
    // split returns an array of 1 [''] when provided an empty string, use empty array instead
    const filters = filtersString ? filtersString.toLowerCase().split(',') : [];

    try {
        const url = 'https://javascriptweekly.com'; // no trailing slash
        let stories = await getMostRecentStories(url);
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
