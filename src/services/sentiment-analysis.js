import { logAnalysisResults } from './analysis-results-logs';
import { getLoggingPreference } from './logs-local-sorage';

const getSentimentAnalysis = async (data) => {
    const domain = import.meta.env.DEV ? 'http://localhost:9999' : '';
    const url = domain + '/.netlify/functions/sentiment-analysis';

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
        });
        const body = await response.json();

        if (getLoggingPreference()) {
            logAnalysisResults({
                postId: body.id,
                subject: body.subject,
                text: body.text,
                analysis: body.result,
            });
        }

        return body;
    } catch (error) {
        console.error('error getting analysis', error);
    }
};

export { getSentimentAnalysis };
