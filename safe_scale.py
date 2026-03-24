import os
import re
import glob

def safe_scale(filepath):
    if not os.path.exists(filepath): return
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. H1 Header Scales
    content = content.replace('text-7xl md:text-9xl', 'text-6xl md:text-8xl')
    content = content.replace('text-6xl md:text-8xl', 'text-5xl md:text-7xl')
    
    # 2. Form & Metadata Upscales (kontak.html)
    content = content.replace('text-[10px]', 'text-xs')
    content = content.replace('text-[11px]', 'text-xs')
    content = content.replace('text-[9px]', 'text-[10px]')
    
    # 3. Form Drop Zone Alignment
    content = content.replace('min-h-[500px]', 'min-h-[350px]')
    content = content.replace('py-6 text-sm font-black', 'py-4 text-sm font-black') # Submit button
    
    # 4. Mobile Menu Touch Padding
    # Find the specific div housing the mobile toggle
    mobile_menu_block = r'(<div class="flex items-center gap-4 mt-8 border-t border-outline-variant/30 pt-8 w-64 justify-center">)\s*<a href="[^"]*" class="px-3 py-1 bg-primary text-white text-xs font-bold">([^<]+)</a>\s*<a href="[^"]*" class="px-3 py-1 bg-surface-container-highest text-on-surface text-xs font-bold">([^<]+)</a>\s*(</div>)'
    
    # We will use re.sub but only matching this specific signature to upscale padding safely
    def replace_mobile_btns(m):
        return f'{m.group(1)}\n                <a href="#" class="px-5 py-3 bg-primary text-white text-xs font-bold">{m.group(2)}</a>\n                <a href="#" class="px-5 py-3 bg-surface-container-highest text-on-surface text-xs font-bold">{m.group(3)}</a>\n            {m.group(4)}'
    
    # Note: the above regex is tricky because of the links. Let's just do a string replace on exactly that block 
    mobile_id = '<a href="#" class="px-3 py-1 bg-primary text-white text-xs font-bold">ID</a>'
    new_mobile_id = '<a href="#" class="px-6 py-3 bg-primary text-white text-xs font-bold">ID</a>'
    
    mobile_en = '<a href="en/index.html" class="px-3 py-1 bg-surface-container-highest text-on-surface text-xs font-bold">EN</a>'
    new_mobile_en = '<a href="en/index.html" class="px-6 py-3 bg-surface-container-highest text-on-surface text-xs font-bold">EN</a>'
    
    mobile_id_ind_en = '<a href="../index.html" class="px-3 py-1 bg-surface-container-highest text-on-surface text-xs font-bold">ID</a>'
    new_mobile_id_ind_en = '<a href="../index.html" class="px-6 py-3 bg-surface-container-highest text-on-surface text-xs font-bold">ID</a>'
    
    mobile_en_ind_en = '<a href="#" class="px-3 py-1 bg-primary text-white text-xs font-bold">EN</a>'
    new_mobile_en_ind_en = '<a href="#" class="px-6 py-3 bg-primary text-white text-xs font-bold">EN</a>'

    # But we ONLY want to replace it INSIDE the mobile menu overlay to prevent mutating standard buttons!
    # Let's target the exact line using regex 
    pattern = r'<div class="flex items-center gap-4 mt-8 border-t border-outline-variant/30 pt-8 w-64 justify-center">.*?</div>'
    def fix_mobile_div(m):
        block = m.group(0)
        block = block.replace('px-3 py-1', 'px-6 py-3')
        return block
    content = re.sub(pattern, fix_mobile_div, content, flags=re.DOTALL)

    # 5. Proyek.html Metric Normalizer
    # We strip all `aspect-[16/9]`, `aspect-[3/4]`, `aspect-square` and map to `aspect-[4/5]`
    # We DO NOT modify columns!
    if 'proyek.html' in filepath:
        content = content.replace('aspect-[16/9]', 'aspect-[4/5]')
        content = content.replace('aspect-[3/4]', 'aspect-[4/5]')
        content = content.replace('aspect-square', 'aspect-[4/5]')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

for f in glob.glob('*.html') + glob.glob('en/*.html'):
    safe_scale(f)

print("Safe Metric Scaling Concluded")
