import { CosmosClient } from '@azure/cosmos';

const key = process.env.COSMOS_KEY || '<cosmos key>';
const endpoint = process.env.COSMOS_ENDPOINT || '<cosmos endpoint>';
const containerId = process.env.COSMOS_CONTAINER || '<cosmos container>';
const databaseId = process.env.COSMOS_DATABASE || '<cosmos database>';
const corsHeader = {
    'Access-Control-Allow-Origin': process.env.PORT ? 'https://x-filter-for-hn.netlify.app/' : '*',
};

async function getLogs() {
    try {
        const client = new CosmosClient({ endpoint, key });
        const { resources } = await client
            .database(databaseId)
            .container(containerId)
            .items.readAll()
            .fetchAll();

            return resources;
    } catch (err) {
        console.error(err);
        throw new Error('error getting logs');
    }
}

exports.handler = async function (event, context) {
    try {
        const logs = await getLogs();
        return {
            headers: corsHeader,
            statusCode: 200,
            body: JSON.stringify(logs),
        };
    } catch (err) {
        console.error(err);
        return {
            headers: corsHeader,
            statusCode: 500,
        };
    }
};
