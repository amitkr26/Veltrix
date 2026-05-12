const { Client, Databases } = require('node-appwrite');
const fs = require('fs');
const path = require('path');

// Load .env.local
const envPath = path.join(__dirname, '../.env.local');
if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split('=');
        if (key && valueParts.length > 0) {
            process.env[key.trim()] = valueParts.join('=').trim();
        }
    });
}

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);

async function test() {
    console.log('Testing Appwrite Connection...');
    try {
        const db = await databases.get(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID);
        console.log('✅ Database access successful:', db.name);
        
        console.log('Attempting to create a temporary collection to verify scopes...');
        try {
            const tempCol = await databases.createCollection(
                process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID, 
                'temp_test_scopes', 
                'Temp Test Scopes'
            );
            console.log('✅ Collection creation successful. Scopes are sufficient.');
            await databases.deleteCollection(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID, 'temp_test_scopes');
        } catch (e) {
            console.log('❌ Collection creation failed:', e.message);
            console.log('Hint: Your API Key might be missing "collections.write" scope.');
        }
    } catch (e) {
        console.log('❌ Database access failed:', e.message);
    }
}

test();
