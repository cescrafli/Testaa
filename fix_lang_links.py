import os
import glob

def fix_lang_links():
    # Fix Indonesian root pages to point to their English counterparts
    for filepath in glob.glob('*.html'):
        filename = os.path.basename(filepath)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # Target 1: <a href="en/index.html"
        # Since these were hardcoded when cloning the navbar, we change them to point to their own filename
        content = content.replace('href="en/index.html"', f'href="en/{filename}"')

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

    # Fix English pages to point back to their Indonesian counterparts
    for filepath in glob.glob('en/*.html'):
        filename = os.path.basename(filepath)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # Target 2: <a href="../index.html"
        content = content.replace('href="../index.html"', f'href="../{filename}"')

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

fix_lang_links()
print("Language lateral navigation bindings successfully hardened.")
