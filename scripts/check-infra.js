const { Client, Databases } = require('node-appwrite');
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '../.env.local');
if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split('=');
        if (key && valueParts.length > 0) {
            process.env[key.trim()] = valueParts.join('=').trim().replace(/['"]/g, '');
        }
    });
}

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);

async function check() {
    try {
        const dbs = await databases.list();
        console.log('--- Databases ---');
        dbs.databases.forEach(db => console.log(`- ${db.$id} (${db.name})`));
        console.log('-----------------');
        
        const myDbId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
        console.log(`Checking Database ID: ${myDbId}`);
        const db = await databases.get(myDbId);
        console.log(`✅ Found Database: ${db.name}`);
        
        const cols = await databases.listCollections(myDbId);
        console.log(`✅ Found ${cols.total} collections.`);
        cols.collections.forEach(c => console.log(`  - ${c.$id} (${c.name})`));

    } catch (e) {
        console.error('❌ CHECK FAILED:', e.message);
        console.error('Details:', JSON.stringify(e, null, 2));
    }
}

check();
