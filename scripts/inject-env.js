#!/usr/bin/env node

/**
 * Environment Variable Injection Script
 * Reads Netlify environment variables and generates env-inject.js
 * This script runs during Netlify build process
 */

const fs = require('fs');
const path = require('path');

// Read environment variables
const rebrandlyKey = process.env.REBRANDLY_API_KEY || '';
const qrCodeKey = process.env.QR_CODE_API_KEY || '';
const nodeEnv = process.env.NODE_ENV || 'production';

console.log('🔧 Injecting environment variables...');
console.log(`📋 REBRANDLY_API_KEY: ${rebrandlyKey ? '[SET]' : '[MISSING]'}`);
console.log(`📋 QR_CODE_API_KEY: ${qrCodeKey ? '[SET]' : '[MISSING]'}`);
console.log(`📋 NODE_ENV: ${nodeEnv}`);

// Generate the env-inject.js content
const envContent = `// Auto-generated environment variables
// Generated on: ${new Date().toISOString()}
// Do not edit manually - regenerated on each build

window.ENV = {
  URL_SHORTENER_API_KEY: "${rebrandlyKey}",
  QR_CODE_API_KEY: "${qrCodeKey}",
  NODE_ENV: "${nodeEnv}",
  NETLIFY: "true"
};

console.log('✅ Environment variables loaded:', Object.keys(window.ENV));
`;

// Write to js/env-inject.js
const outputPath = path.join(__dirname, '..', 'js', 'env-inject.js');

try {
  fs.writeFileSync(outputPath, envContent, 'utf8');
  console.log('✅ Environment variables injected successfully');
  console.log(`📁 Generated: ${outputPath}`);
} catch (error) {
  console.error('❌ Failed to write env-inject.js:', error);
  process.exit(1);
}