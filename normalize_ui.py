import os
import re
import glob

# Master UI/UX Normalization Script

def normalize_html_file(filepath):
    if not os.path.exists(filepath): return
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # --- 1. Typography Hierarchy Standardization ---
    # Shrink oversized H1 Headers
    content = re.sub(r'text-7xl md:text-9xl', r'text-5xl md:text-7xl', content)
    content = re.sub(r'text-6xl md:text-8xl', r'text-5xl md:text-7xl', content)
    content = re.sub(r'text-4xl md:text-6xl', r'text-4xl md:text-6xl', content) # Keep standard
    
    # Upscale microscopic form labels & metadata
    content = content.replace('text-[10px]', 'text-xs font-bold')
    content = content.replace('text-[9px]', 'text-[10px] font-bold')

    # Upscale Category Filter Buttons (from text-[11px] or text-xs to text-sm)
    # Be careful not to replace button text that shouldn't be altered, just the classes
    content = content.replace('text-[11px] font-bold tracking-widest', 'text-xs font-bold tracking-widest')
    
    # --- 2. Form & Container Proportions (kontak.html) ---
    content = content.replace('min-h-[500px]', 'min-h-[320px]')
    content = content.replace('py-6 text-sm', 'py-4 text-sm')

    # --- 3. Grid Symmetry (proyek.html) ---
    # Convert all wild aspect ratios to perfect 4:5 vertical portraits like the catalog
    content = content.replace('aspect-[16/9]', 'aspect-[4/5]')
    content = content.replace('aspect-[3/4]', 'aspect-[4/5]')
    content = content.replace('aspect-square', 'aspect-[4/5]')

    # Remove asymmetric masonry off-sets
    content = content.replace('md:mt-24', '')
    content = content.replace('md:-mt-12', 'mt-12')
    content = content.replace('mt-48', 'mt-12')
    content = content.replace('lg:col-span-5', 'lg:col-span-6')
    content = content.replace('lg:col-span-7', 'lg:col-span-6')
    
    # Project Grid Column logic: proyek is natively 12 cols, split 8 & 4. Make them symmetrical 6 & 6
    content = content.replace('md:col-span-8', 'md:col-span-6')
    content = content.replace('md:col-span-4', 'md:col-span-6')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

# Process all HTML files
html_files = glob.glob('*.html') + glob.glob('en/*.html')
for file in html_files:
    normalize_html_file(file)

print(f"UI/UX Normalization Complete across {len(html_files)} files.")
