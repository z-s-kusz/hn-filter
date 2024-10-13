import { CosmosClient } from '@azure/cosmos';

const key = process.env.COSMOS_KEY || '<cosmos key>';
const endpoint = process.env.COSMOS_ENDPOINT || '<cosmos endpoint>';
const containerId = process.env.COSMOS_CONTAINER || '<cosmos container>';
const databaseId = process.env.COSMOS_DATABASE || '<cosmos database>';
const corsHeader = {
    'Access-Control-Allow-Origin': process.env.PORT ? 'https://x-filter-for-hn.netlify.app/' : '*',
};

async function getLogByPostId(postId, container) {
    const querySpec = {
        query: 'SELECT * FROM logs WHERE logs.postId = @postId',
        parameters: [
            {
                name: '@postId',
                value: postId,
            },
        ],
    };
    const { resources } = await container.items.query(querySpec).fetchAll();

    if (resources.length) {
        const log = resources[0];
        return log;
    }
    return null;
}

async function logAnalysisResult(postId, text, subject, analysis) {
    let logResult;
    const newLog = {
        postId,
        text,
        subject,
        analysis: [analysis],
    };

    try {
        const client = new CosmosClient({ endpoint, key });
        const container = client.database(databaseId).container(containerId);
        const previousLog = await getLogByPostId(postId, container);

        if (previousLog) {
            const patch = [
                {
                    'op': 'set',
                    'path': '/analysis',
                    'value': [...previousLog.analysis, analysis],
                },
            ];
            // even though partition key is marked as optional and it is the same as id in this case it must be passed in
            const { item } = await container.item(previousLog.id, previousLog.id).patch(patch);
            logResult = item;
        } else {
            const { item } = await container.items.create(newLog);
            logResult = item;
        }

        return logResult;
    } catch (err) {
        console.error(err);
        throw new Error('error logging');
    }
}

exports.handler = async function (event, context) {
    const body = JSON.parse(event.body || {});

    if (!body.id || !body.text || !body.subject || !body.analysis) {
        return {
            headers: corsHeader,
            statusCode: 400,
        };
    }

    try {
        await logAnalysisResult(body.id, body.text, body.subject, body.analysis);
        return {
            headers: corsHeader,
            statusCode: 200,
        };
    } catch (err) {
        console.error(err);
        return {
            headers: corsHeader,
            statusCode: 500,
        };
    }
};
