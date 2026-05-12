const { Client, Databases, Storage } = require('node-appwrite');
const { COLLECTIONS, BUCKETS } = require('./infra-config');
const fs = require('fs');
const path = require('path');

// Load .env.local manually to avoid external dependencies
const envPath = path.join(__dirname, '../.env.local');
if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split('=');
        if (key && valueParts.length > 0) {
            const value = valueParts.join('=').trim().replace(/['"]/g, '');
            process.env[key.trim()] = value;
        }
    });
}

// Initialize Appwrite Client
console.log('--- Debug Environment ---');
console.log('Endpoint:', process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT);
console.log('Project:', process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);
console.log('Database:', process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID);
console.log('API Key Length:', process.env.APPWRITE_API_KEY?.length);
console.log('-------------------------');
console.log('--- Environment Check ---');
console.log('Endpoint:', process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT);
console.log('Project:', process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);
console.log('-------------------------');

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);
const storage = new Storage(client);

const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;

async function setupCollections() {
    console.log('🚀 Starting Veltrix Collection Setup...');
    
    for (const col of COLLECTIONS) {
        try {
            // Check if collection exists
            try {
                await databases.getCollection(databaseId, col.id);
                console.log(`[Collection] ${col.name} already exists. Skipping creation.`);
            } catch (e) {
                console.log(`[Collection] Creating ${col.name}...`);
                await databases.createCollection(databaseId, col.id, col.name, col.permissions);
            }

            // Setup Attributes
            for (const attr of col.attributes) {
                try {
                    console.log(`  - [Attribute] Creating ${attr.key}...`);
                    if (attr.type === 'string') {
                        await databases.createStringAttribute(databaseId, col.id, attr.key, attr.size, attr.required, attr.default);
                    } else if (attr.type === 'integer') {
                        await databases.createIntegerAttribute(databaseId, col.id, attr.key, attr.required, 0, 100000000, attr.default);
                    } else if (attr.type === 'boolean') {
                        await databases.createBooleanAttribute(databaseId, col.id, attr.key, attr.required, attr.default);
                    }
                } catch (e) {
                    console.log(`    - ${attr.key} already exists or error: ${e.message}`);
                }
            }

            // Wait for attributes to propagate
            console.log('  - Waiting for attributes to process...');
            await new Promise(r => setTimeout(r, 2000));

            // Setup Indexes
            for (const idx of col.indexes) {
                try {
                    console.log(`  - [Index] Creating ${idx.key}...`);
                    await databases.createIndex(databaseId, col.id, idx.key, idx.type, idx.attributes);
                } catch (e) {
                    console.log(`    - Index ${idx.key} already exists or error: ${e.message}`);
                }
            }
        } catch (error) {
            console.error(`❌ Error setting up ${col.name}:`, JSON.stringify(error, null, 2));
        }
    }
}

async function setupBuckets() {
    console.log('📦 Starting Veltrix Storage Setup...');
    for (const bucket of BUCKETS) {
        try {
            try {
                await storage.getBucket(bucket.id);
                console.log(`[Bucket] ${bucket.name} already exists. Skipping.`);
            } catch (e) {
                console.log(`[Bucket] Creating ${bucket.name}...`);
                await storage.createBucket(
                    bucket.id, 
                    bucket.name, 
                    bucket.permissions, 
                    bucket.fileSecurity, 
                    true, 
                    bucket.maxFileSize, 
                    bucket.allowedExtensions
                );
            }
        } catch (error) {
            console.error(`❌ Error setting up bucket ${bucket.name}:`, JSON.stringify(error, null, 2));
        }
    }
}

async function run() {
    if (!process.env.APPWRITE_API_KEY) {
        console.error('❌ ERROR: APPWRITE_API_KEY is missing in environment.');
        process.exit(1);
    }
    if (!databaseId) {
        console.error('❌ ERROR: NEXT_PUBLIC_APPWRITE_DATABASE_ID is missing.');
        process.exit(1);
    }

    try {
        await setupCollections();
        await setupBuckets();
        console.log('\n✅ Veltrix Infrastructure Automation Complete!');
    } catch (error) {
        console.error('❌ Automation Failed:', error.message);
    }
}

run();
