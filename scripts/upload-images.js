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

// Supabase configuration
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.VITE_SUPABASE_SERVICE_KEY; // Service key for admin operations

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables!');
  console.log('Make sure VITE_SUPABASE_URL and VITE_SUPABASE_SERVICE_KEY are set');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Category mapping from folder names to database categories
const categoryMapping = {
  'Bakery': 'BAKERY',
  'Candy': 'CANDY',
  'Foodservice': 'FOODSERVICE',
  'Kitchen': 'KITCHEN',
  'Marmia': 'MISC',
  'Meat Products': 'MEAT',
  'Misc Items': 'MISC',
  'Nuts': 'NUTS',
  'Olives & Olives Oils': 'OLIVES',
  'Pasta': 'PASTA',
  'Pickles': 'PICKLES',
  'Ready to Eat': 'READY TO EAT',
  'Sauces': 'SAUCES',
  'Snacks': 'SNACKS',
  'Spices': 'SPICES',
  'Sweets': 'SWEETS',
  'Tea & Coffee': 'TEA',
  'Yogurt Products': 'YOGURT'
};

// Supported image extensions
const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

// Images directory path (adjust this to your actual path)
const imagesDir = path.join(__dirname, '..', '..', 'Website Images');

async function createBucket() {
  console.log('🪣 Creating/checking product-images bucket...');
  
  const { data, error } = await supabase.storage.createBucket('product-images', {
    public: true,
    allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
    fileSizeLimit: 5242880 // 5MB limit
  });

  // Check for errors but ignore "already exists" errors
  if (error) {
    if (error.message === 'Bucket already exists' || 
        error.message.includes('already exists') ||
        error.status === 400) {
      console.log('✅ Bucket already exists - continuing...');
      return true;
    } else {
      console.error('❌ Error creating bucket:', error);
      return false;
    }
  }
  
  console.log('✅ Bucket created successfully!');
  return true;
}

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

async function uploadImagesFromDirectory() {
  console.log('📂 Starting image upload process...');
  
  if (!fs.existsSync(imagesDir)) {
    console.error(`❌ Images directory not found: ${imagesDir}`);
    return;
  }

  let totalUploaded = 0;
  let totalErrors = 0;

  // Create bucket first
  const bucketReady = await createBucket();
  if (!bucketReady) {
    console.error('❌ Failed to create/access bucket');
    return;
  }

  // Get all category directories
  const categories = fs.readdirSync(imagesDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .filter(name => categoryMapping[name]); // Only process mapped categories

  console.log(`📁 Found ${categories.length} category directories`);

  for (const categoryFolder of categories) {
    const categoryPath = path.join(imagesDir, categoryFolder);
    const dbCategory = categoryMapping[categoryFolder];
    
    console.log(`\n📂 Processing category: ${categoryFolder} -> ${dbCategory}`);
    
    try {
      const files = fs.readdirSync(categoryPath)
        .filter(file => {
          const ext = path.extname(file).toLowerCase();
          return imageExtensions.includes(ext);
        });

      console.log(`   Found ${files.length} images`);

      for (const file of files) {
        const filePath = path.join(categoryPath, file);
        const sanitizedFileName = sanitizeFileName(file);
        const storagePath = `${dbCategory.toLowerCase()}/${sanitizedFileName}`;

        console.log(`   📤 Uploading: ${file} -> ${storagePath}`);

        const result = await uploadImage(filePath, storagePath);
        
        if (result) {
          totalUploaded++;
          console.log(`   ✅ Uploaded: ${storagePath}`);
        } else {
          totalErrors++;
        }

        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    } catch (error) {
      console.error(`❌ Error processing category ${categoryFolder}:`, error);
      totalErrors++;
    }
  }

  console.log('\n🎉 Upload Summary:');
  console.log(`   ✅ Successfully uploaded: ${totalUploaded} images`);
  console.log(`   ❌ Errors: ${totalErrors}`);
  console.log('\n🔗 Your images are now available at:');
  console.log(`   ${supabaseUrl}/storage/v1/object/public/product-images/[category]/[filename]`);
}

// Run the upload process
uploadImagesFromDirectory().catch(console.error); 