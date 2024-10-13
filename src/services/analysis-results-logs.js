const domain = import.meta.env.DEV ? 'http://localhost:9999' : '';
const url = domain + '/.netlify/functions/log-analysis-results';

export async function logAnalysisResults(data) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
        });
        return response.status === 200;
    } catch (err) {
        console.error(err);
        throw new Error('error loggins status');
    }
}

export function getAnalysisResults() {
    return console.log('TODO, make this function :)');
}
