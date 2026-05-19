import { filters } from '../stores/filters';

const domain = import.meta.env.DEV ? 'http://localhost:9999' : '';
const baseUrl = domain + '/.netlify/functions/';

export async function getFEFocus() {
    const response = await fetch(`${baseUrl}f-e-focus/${getFilterQuery()}`);
    if (!response.ok) throw new Error('Fetch error, status: ' + response.status);

    const { stories, date } = await response.json();
    return { stories, date };
}

export async function getJSWeekly() {
    const response = await fetch(`${baseUrl}js-weekly/${getFilterQuery()}`);
    if (!response.ok) throw new Error('Fetch error, status: ' + response.status);

    const { stories, date } = await response.json();
    return { stories, date };
}

function getFilterQuery() {
    const keyWordFilters = filters.filter((filter) => filter.type === 'keyword').map((filter) => filter.value);
    const domainFilters = filters.filter((filter) =>filter.type === 'domain').map((filter) => filter.value);
    const allFilters = keyWordFilters.concat(domainFilters);
    if (allFilters.length < 1) return '';
    return `?filters=${allFilters.join(',')}`;
}
