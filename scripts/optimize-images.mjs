import sharp from 'sharp';
import { readdirSync, statSync, unlinkSync, writeFileSync, existsSync } from 'node:fs';
import { join, extname, basename } from 'node:path';

const PUBLIC_DIR = 'public';
const MAX_WIDTH = 1920;
const JPG_QUALITY = 85;
const WEBP_QUALITY = 82;
const PHOTO_THRESHOLD = 500 * 1024;
const GRAPHIC_KEEP_PNG = new Set(['logo']);
const SKIP_EXTENSIONS = new Set(['.svg', '.ico', '.html', '.webp']);

const stats = { before: 0, after: 0, processed: 0, skipped: 0, deleted: [] };

function fmtMB(n) { return (n / 1e6).toFixed(2) + ' MB'; }
function fmtKB(n) { return (n / 1024).toFixed(0) + ' KB'; }

async function processFile(filename) {
  const full = join(PUBLIC_DIR, filename);
  const ext = extname(filename).toLowerCase();
  const base = basename(filename, ext);
  const sz = statSync(full).size;

  if (SKIP_EXTENSIONS.has(ext)) {
    stats.skipped++;
    return;
  }

  stats.before += sz;
  const isGraphic = GRAPHIC_KEEP_PNG.has(base) && ext === '.png';
  const isLargePhoto = sz > PHOTO_THRESHOLD && (ext === '.png' || ext === '.jpg' || ext === '.jpeg');
  const isSmallRaster = sz <= PHOTO_THRESHOLD && (ext === '.png' || ext === '.jpg' || ext === '.jpeg');

  if (isGraphic) {
    const optimized = await sharp(full)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .png({ palette: true, quality: 90, compressionLevel: 9, effort: 10 })
      .toBuffer();
    writeFileSync(full, optimized);

    const webpPath = join(PUBLIC_DIR, `${base}.webp`);
    const webpBuf = await sharp(full).webp({ quality: WEBP_QUALITY, effort: 6 }).toBuffer();
    writeFileSync(webpPath, webpBuf);

    const totalAfter = optimized.length + webpBuf.length;
    console.log(`[graphic] ${filename}: ${fmtKB(sz)} → png ${fmtKB(optimized.length)} + webp ${fmtKB(webpBuf.length)}`);
    stats.after += totalAfter;
    stats.processed++;
    return;
  }

  if (isLargePhoto) {
    const jpgPath = join(PUBLIC_DIR, `${base}.jpg`);
    const webpPath = join(PUBLIC_DIR, `${base}.webp`);

    const resized = sharp(full).resize({ width: MAX_WIDTH, withoutEnlargement: true });
    const jpgBuf = await resized.clone().jpeg({ quality: JPG_QUALITY, mozjpeg: true }).toBuffer();
    const webpBuf = await resized.clone().webp({ quality: WEBP_QUALITY, effort: 6 }).toBuffer();

    writeFileSync(jpgPath, jpgBuf);
    writeFileSync(webpPath, webpBuf);

    if (ext === '.png' && full !== jpgPath) {
      unlinkSync(full);
      stats.deleted.push(filename);
    }

    console.log(`[photo] ${filename} ${fmtMB(sz)} → ${base}.jpg ${fmtKB(jpgBuf.length)} + ${base}.webp ${fmtKB(webpBuf.length)}`);
    stats.after += jpgBuf.length + webpBuf.length;
    stats.processed++;
    return;
  }

  if (isSmallRaster) {
    const webpPath = join(PUBLIC_DIR, `${base}.webp`);
    if (existsSync(webpPath)) {
      stats.after += sz;
      stats.skipped++;
      return;
    }
    const webpBuf = await sharp(full).webp({ quality: WEBP_QUALITY, effort: 6 }).toBuffer();
    writeFileSync(webpPath, webpBuf);
    console.log(`[small+webp] ${filename}: ${fmtKB(sz)}, added ${base}.webp ${fmtKB(webpBuf.length)}`);
    stats.after += sz + webpBuf.length;
    stats.processed++;
    return;
  }

  stats.after += sz;
  stats.skipped++;
}

const files = readdirSync(PUBLIC_DIR).filter((f) => statSync(join(PUBLIC_DIR, f)).isFile());
console.log(`Found ${files.length} files in ${PUBLIC_DIR}/\n`);

for (const f of files) {
  try {
    await processFile(f);
  } catch (e) {
    console.error(`[error] ${f}: ${e.message}`);
  }
}

console.log('\n═══ SUMMARY ═══');
console.log(`Files processed: ${stats.processed}`);
console.log(`Files skipped:   ${stats.skipped}`);
console.log(`Files deleted:   ${stats.deleted.length}${stats.deleted.length ? ' (' + stats.deleted.join(', ') + ')' : ''}`);
console.log(`Before: ${fmtMB(stats.before)}`);
console.log(`After:  ${fmtMB(stats.after)}`);
const saved = stats.before - stats.after;
const pct = stats.before > 0 ? (saved / stats.before * 100).toFixed(1) : 0;
console.log(`Saved:  ${fmtMB(saved)} (${pct}%)`);
