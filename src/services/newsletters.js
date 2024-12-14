import { filters } from '../stores/filters';

const domain = import.meta.env.DEV ? 'http://localhost:9999' : '';
const baseUrl = domain + '/.netlify/functions/';

export async function getFEFocus() {
    try {
        const response = await fetch(`${baseUrl}f-e-focus/${getFilterQuery()}`);
        const { stories, date } = await response.json();
        return { stories, date };
    } catch (err) {
        console.error('error fetching fefocus newsletter', err);
    }
}

export async function getJSWeekly() {
    try {
        const response = await fetch(`${baseUrl}js-weekly/${getFilterQuery()}`);
        console.log(response);
        const { stories, date } = await response.json();
        return { stories, date };
    } catch (err) {
        console.error('error fetching js weekly newsletter', err);
    }
}

function getFilterQuery() {
    const keyWordFilters = filters.filter((filter) => filter.type === 'keyword').map((filter) => filter.value);
    if (keyWordFilters.length < 1) return '';
    return `?filters=${keyWordFilters.join(',')}`;
}
