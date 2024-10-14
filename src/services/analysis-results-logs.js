const domain = import.meta.env.DEV ? 'http://localhost:9999' : '';
const url = domain + '/.netlify/functions/';

export async function logAnalysisResults(data) {
    try {
        const response = await fetch(url + 'log-analysis-results', {
            method: 'POST',
            body: JSON.stringify(data),
        });

        return response.status === 200;
    } catch (err) {
        console.error(err);
        throw new Error('error loggins status');
    }
}

export async function getLogs() {
    try {
        const response = await fetch(url + 'get-logs');
        const logs = await response.json();

        return logs;
    } catch (err) {
        console.log(err);
        throw new Error('error getting logs');
    }
}
