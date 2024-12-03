const domain = import.meta.env.DEV ? 'http://localhost:9999' : '';
const baseUrl = domain + '/.netlify/functions/';

export async function getFEFocus() {
    try {
        const response = await fetch(`${baseUrl}f-e-focus/`);
        console.log(response);
        const stories = await response.json();
        return stories;
    } catch (err) {
        console.error('error fetching fefocus newsletter', err);
    }
}

export async function getJSWeekly() {
    try {
        const response = await fetch(`${baseUrl}js-weekly/`);
        console.log(response);
        const stories = await response.json();
        return stories;
    } catch (err) {
        console.error('error fetching js weekly newsletter', err);
    }
}
