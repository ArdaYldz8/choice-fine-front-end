import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file manually
function loadEnvFile() {
  const envPath = path.join(__dirname, '..', '.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const lines = envContent.split('\n');
    
    lines.forEach(line => {
      line = line.trim();
      if (line && !line.startsWith('#') && line.includes('=')) {
        const [key, ...values] = line.split('=');
        const value = values.join('=').trim();
        process.env[key.trim()] = value;
      }
    });
  }
}

// Load environment variables
loadEnvFile();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.VITE_SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Load the bakery mappings
const mappingPath = path.join(__dirname, 'bakery-mapping.json');
const bakeryMappings = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));

// Images directory path
const imagesDir = path.join(__dirname, '..', '..', 'Website Images', 'Bakery');

async function uploadImage(filePath, storagePath) {
  try {
    const fileBuffer = fs.readFileSync(filePath);
    const fileName = path.basename(filePath);
    
    // Fix MIME type for different image formats
    const ext = path.extname(fileName).slice(1).toLowerCase();
    let contentType = 'image/jpeg'; // default
    
    switch(ext) {
      case 'jpg':
      case 'jpeg':
        contentType = 'image/jpeg';
        break;
      case 'png':
        contentType = 'image/png';
        break;
      case 'webp':
        contentType = 'image/webp';
        break;
      case 'gif':
        contentType = 'image/gif';
        break;
    }

    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(storagePath, fileBuffer, {
        contentType: contentType,
        upsert: true
      });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error(`❌ Error uploading ${filePath}:`, error);
    return null;
  }
}

function sanitizeFileName(fileName) {
  return fileName
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9.-_]/g, '')
    .replace(/--+/g, '-');
}

async function uploadBakeryImages() {
  console.log('🍞 Starting Bakery category upload...');
  console.log(`📋 Found ${Object.keys(bakeryMappings.bakery_mappings).length} mapped products`);
  
  let totalUploaded = 0;
  let totalErrors = 0;

  // Upload only mapped images
  for (const [productName, imageFileName] of Object.entries(bakeryMappings.bakery_mappings)) {
    const imagePath = path.join(imagesDir, imageFileName);
    
    if (!fs.existsSync(imagePath)) {
      console.log(`❌ Image file not found: ${imageFileName}`);
      totalErrors++;
      continue;
    }

    const sanitizedFileName = sanitizeFileName(imageFileName);
    const storagePath = `bakery/${sanitizedFileName}`;

    console.log(`📤 Uploading: ${productName}`);
    console.log(`   📁 ${imageFileName} → ${storagePath}`);

    const result = await uploadImage(imagePath, storagePath);
    
    if (result) {
      totalUploaded++;
      console.log(`   ✅ Successfully uploaded!`);
    } else {
      totalErrors++;
    }

    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 200));
  }

  console.log('\n🎉 Bakery Upload Summary:');
  console.log(`   ✅ Successfully uploaded: ${totalUploaded} images`);
  console.log(`   ❌ Errors: ${totalErrors}`);
  console.log(`   📊 Mapping rate: ${bakeryMappings.notes.mapping_rate}`);
  
  console.log('\n📝 Mapping Details:');
  Object.entries(bakeryMappings.bakery_mappings).forEach(([product, image]) => {
    console.log(`   • ${product} → ${image}`);
  });

  console.log('\n🔗 Uploaded images available at:');
  console.log(`   ${supabaseUrl}/storage/v1/object/public/product-images/bakery/[filename]`);
}

// Run the upload process
uploadBakeryImages().catch(console.error); 