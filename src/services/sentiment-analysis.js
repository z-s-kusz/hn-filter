const getSentimentAnalysis = async (data) => {
    const domain = import.meta.env.DEV ? 'http://localhost:9999' : '';
    const url = domain + '/.netlify/functions/sentiment-analysis';

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
        });
        const body = await response.json();

        return body;
    } catch (error) {
        console.log('error getting analysis', error);
    }
};

export { getSentimentAnalysis };
