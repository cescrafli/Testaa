import os
import re
import glob

def purge_duplicate_switchers(filepath):
    if not os.path.exists(filepath): return
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # The block we want to delete looks like this:
    # <div class="hidden md:flex items-center gap-4 border-l border-zinc-300 dark:border-zinc-700 pl-6 ml-2">
    #     <a href="#" onclick="switchLang('id'); return false;" class="lang-id font-black text-orange-600 dark:text-orange-500 text-sm hover:underline">ID</a>
    #     <span class="text-zinc-300 dark:text-zinc-700 text-sm">|</span>
    #     <a href="#" onclick="switchLang('en'); return false;" class="lang-en font-medium text-zinc-500 dark:text-zinc-400 text-sm hover:text-orange-600 dark:hover:text-orange-500 hover:underline">EN</a>
    # </div>
    # <script>
    # function switchLang(target) { ... }
    # </script>
    
    # We will use regex to find this entire div and its trailing script
    pattern = r'<div class="hidden md:flex items-center gap-4 border-l border-zinc-300 dark:border-zinc-700 pl-6 ml-2">.*?</div>\s*<script>\s*function switchLang\(target\) \{.*?\}\s*</script>'
    
    # The block might be injected twice per page (desktop nav + mobile overlay)
    content = re.sub(pattern, '', content, flags=re.DOTALL)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

for f in glob.glob('*.html') + glob.glob('en/*.html'):
    purge_duplicate_switchers(f)

print("Duplicate Navigation Switchers Purged Globally.")
