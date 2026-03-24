import os
import glob
import re

def purge_legacy_cdns(filepath):
    if not os.path.exists(filepath): return
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Remove CDN Tailwind Script
    content = re.sub(r'<script src="https://cdn\.tailwindcss\.com.*?</script>', '', content, flags=re.DOTALL)
    
    # 2. Remove tailwind-config block
    content = re.sub(r'<script id="tailwind-config">.*?</script>', '', content, flags=re.DOTALL)
    
    # 3. Remove inline <style> blocks (specifically the material-symbols-outlined / Inter body definitions)
    content = re.sub(r'<style>.*?</style>', '', content, flags=re.DOTALL)

    # 4. Inject local style.css into the <head> section
    target_link = '<link href="/style.css" rel="stylesheet" />'
    if target_link not in content:
        content = content.replace('</head>', f'    {target_link}\n</head>')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

for script_file in glob.glob('*.html') + glob.glob('en/*.html'):
    purge_legacy_cdns(script_file)

print("Legacy CDNs purged. Vite architecture permanently embedded.")
