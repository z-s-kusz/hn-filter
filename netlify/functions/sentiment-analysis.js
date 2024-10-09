const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
const corsHeader = {
    'Access-Control-Allow-Origin': process.env.PORT ? 'https://x-filter-for-hn.netlify.app/' : '*',
};

async function getSentimentAnalysis(subject, text) {
    try {
        const completion = await openai.chat.completions.create({
            messages: [
                { role: 'system', content: "Only print 'positive', 'negative', or 'neutral'." },
                {
                    role: 'user',
                    content: `Classify the sentiment of the message \"${text.toLowerCase()}\" in regards to ${subject.toLowerCase()}.`,
                },
            ],
            model: 'gpt-3.5-turbo',
        });

        const assesment = completion.choices[0].message.content;
        return assesment;
    } catch (error) {
        console.log('error making call');
        console.log(error);
        return '';
    }
}

exports.handler = async function (event, context) {
    const body = JSON.parse(event.body || {});

    if (!body.id || !body.text || !body.subject) {
        return {
            headers: corsHeader,
            statusCode: 400,
        };
    }

    try {
        const assesment = await getSentimentAnalysis(body.subject, body.text);
        const responseBody = JSON.stringify({
            id: body.id,
            text: body.text,
            subject: body.subject,
            response: assesment,
        });

        return {
            headers: corsHeader,
            statusCode: 200,
            body: responseBody,
        };
    } catch (error) {
        console.error(err);
        return {
            headers: corsHeader,
            statusCode: 500,
        };
    }
};
