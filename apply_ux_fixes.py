import os
import re
import glob

# 1. Update app.js Empty States
def patch_app_js(filepath, is_en=False):
    if not os.path.exists(filepath): return
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Search Empty State
    search_old = 'No results found. Please try a different keyword.' if is_en else 'Hasil tidak ditemukan. Silakan gunakan kata kunci lainnya.'
    search_cta = 'Can\'t find what you\'re looking for?<br>Consult Custom Fabrication' if is_en else 'Tidak menemukan yang Anda cari?<br>Konsultasikan Fabrikasi Kustom'
    cta_html = f'<br><a href="kontak.html" class="mt-6 inline-block px-8 py-4 bg-primary text-white font-black tracking-widest uppercase text-xs hover:bg-primary-container transition-all shadow-xl active:scale-95">{search_cta}</a>'
    
    if search_cta not in content:
        content = content.replace(f'</p>', f'</p>{cta_html}', 1) # Only replace the first </p> in renderSearchData
        
        # We need a more robust replace for the search data empty state
        # The empty state is inside renderSearchData
        search_block_pattern = r'(<svg class="w-24 h-24 text-slate-300.*?<p class="text-slate-500.*?>)(.*?)(</p>)'
        # Let's just do a direct string replace if possible
        if f'>{search_old}</p>' in content:
             content = content.replace(f'>{search_old}</p>', f'>{search_old}</p>{cta_html}')

    # Gallery Empty State
    gallery_old = 'Katalog belum tersedia untuk kategori ini.'
    if is_en:
        content = content.replace(gallery_old, 'Catalog not yet available for this category.')
        gallery_old = 'Catalog not yet available for this category.'

    if search_cta not in content.split('renderGallery')[-1]: # Check if CTA is in the renderGallery block
        content = content.replace(f'>{gallery_old}</p>', f'>{gallery_old}</p>{cta_html}')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

patch_app_js('app.js', False)
patch_app_js('en/app.js', True)

# 2. Update kontak.html Microcopy and Form Validation UX
def patch_kontak(filepath, is_en=False):
    if not os.path.exists(filepath): return
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Add HTML5 pseudo-class invalid styles
    # Replace standard input focus classes with focus + invalid combos
    content = content.replace('focus:border-primary', 'focus:border-primary focus:invalid:border-red-500 focus:invalid:ring-red-500/20 transition-all')
    
    # Microcopy addition
    old_upload_sub = 'Mendukung format DWG, DXF, PDF, atau STEP. Ukuran maks file: 150MB per lembar.'
    new_upload_sub = 'Mendukung format DWG, DXF, PDF, atau STEP. Ukuran maks file: 150MB per lembar.<br><br><strong class="text-primary tracking-widest">FILE EKSTREM?</strong><br>Lampirkan tautan Google Drive / Dropbox Anda di kolom Catatan Teknis.'
    
    old_en_sub = 'Supports DWG, DXF, PDF, or STEP formats. Max file size: 150MB per sheet.'
    new_en_sub = 'Supports DWG, DXF, PDF, or STEP formats. Max file size: 150MB per sheet.<br><br><strong class="text-primary tracking-widest">EXTREME SIZE FILE?</strong><br>Attach your Google Drive / Dropbox link directly in the Technical Notes column.'

    if is_en and old_en_sub in content:
        content = content.replace(old_en_sub, new_en_sub)
    elif not is_en and old_upload_sub in content:
        content = content.replace(old_upload_sub, new_upload_sub)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

patch_kontak('kontak.html', False)
patch_kontak('en/kontak.html', True)

# 3. Update Mobile Menu Touch Target Padding
for file in glob.glob('*.html') + glob.glob('en/*.html'):
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # The div has: class="flex items-center gap-4 mt-8 border-t border-outline-variant/30 pt-8 w-64 justify-center"
    # Inside: <a href="#" class="px-3 py-1 ...">ID</a>
    # We change px-3 py-1 to px-6 py-4 for huge 44px+ hitboxes
    content = content.replace('px-3 py-1 bg-primary', 'px-6 py-4 bg-primary')
    content = content.replace('px-3 py-1 bg-surface-container-highest', 'px-6 py-4 bg-surface-container-highest')
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

# 4. Preload LCP Hero Image on Index
def patch_preload(filepath):
    if not os.path.exists(filepath): return
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find the first swiper image
    # https://images.unsplash.com/photo-1541819661448-6a3f019bd1e1?auto=format...
    if '1541819661448-6a3f019bd1e1' in content and 'rel="preload"' not in content:
        preload_tag = '<link rel="preload" as="image" href="https://images.unsplash.com/photo-1541819661448-6a3f019bd1e1?auto=format&fit=crop&q=80&w=2000">\n'
        content = content.replace('</head>', f'{preload_tag}</head>')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

patch_preload('index.html')
patch_preload('en/index.html')

print("UX 4-Point Audit Applied!")
