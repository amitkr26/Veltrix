const { Client, Databases } = require('node-appwrite');

const endpoints = [
    'https://cloud.appwrite.io/v1',
    'https://fra.cloud.appwrite.io/v1',
    'https://syd.cloud.appwrite.io/v1',
    'https://blr.cloud.appwrite.io/v1',
    'https://nyc.cloud.appwrite.io/v1'
];

const projectId = '6a02efac001a1a93e462';
const apiKey = 'standard_c2b41c3d612161284e5640e488f9b4925018ec1dd84d3d47edcfec07806527d167bab1459a9c1a69d00600891b8f7af57c1c67acd2f00af02d758a5d98d9bd6b3b440785267972661e617a0872567ee5a783f1e609c61c47bb81ac05b84adecfd36b30644e318c3d7196bad17bdcb42d16bf2b5543c1490c1dbe772bc8e143d1';

async function hunt() {
    for (const endpoint of endpoints) {
        console.log(`Testing endpoint: ${endpoint}`);
        const client = new Client().setEndpoint(endpoint).setProject(projectId).setKey(apiKey);
        const databases = new Databases(client);
        try {
            const dbs = await databases.list();
            console.log(`✅ SUCCESS on ${endpoint}! Found ${dbs.total} databases.`);
            return endpoint;
        } catch (e) {
            console.log(`❌ FAILED on ${endpoint}: ${e.message}`);
        }
    }
    return null;
}

hunt().then(best => {
    if (best) console.log(`Best endpoint: ${best}`);
    else console.log('No working endpoint found.');
});
