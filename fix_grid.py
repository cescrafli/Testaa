import os
import glob

def fix_aspect_ratio(filepath):
    if not os.path.exists(filepath): return
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # The arbitrary aspect-[4/5] class is failing on Tailwind CDN. 
    # Reverting to the native aspect-square (1:1) to guarantee perfect alignment.
    content = content.replace('aspect-[4/5]', 'aspect-square')
    content = content.replace('aspect-[4/3]', 'aspect-square')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

fix_aspect_ratio('proyek.html')
fix_aspect_ratio('en/proyek.html')
# We also want to apply this to katalog.html since it also uses aspect-[4/5] heavily via app.js
fix_aspect_ratio('app.js')
fix_aspect_ratio('en/app.js')

print("Aspect constraints hardened safely.")
