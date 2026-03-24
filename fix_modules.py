import glob
import os
import re

def fix_modules():
    # 1. Add type="module" to all local script tags in HTML files
    for filepath in glob.glob('*.html') + glob.glob('en/*.html'):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # Replace script tags
        content = re.sub(r'<script src="([^"]+\.js)"></script>', r'<script type="module" src="\1"></script>', content)

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

    # 2. Bind globals in data.js
    for filepath in ['data.js', 'en/data.js']:
        if not os.path.exists(filepath): continue
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Change const portfolioData = ... to window.portfolioData = ...
        content = re.sub(r'const\s+portfolioData\s*=', 'window.portfolioData =', content)
        content = re.sub(r'const\s+WHATSAPP_NUMBER\s*=', 'window.WHATSAPP_NUMBER =', content)

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

    # 3. Read globals in app.js
    for filepath in ['app.js', 'en/app.js']:
        if not os.path.exists(filepath): continue
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # Ensure app.js reads from window.portfolioData
        content = re.sub(r'typeof\s+portfolioData', "typeof window.portfolioData", content)
        content = re.sub(r'new DigitalShowcase\(portfolioData, WHATSAPP_NUMBER\)', 'new DigitalShowcase(window.portfolioData, window.WHATSAPP_NUMBER)', content)
        content = re.sub(r'portfolioData\.filter', 'window.portfolioData.filter', content)

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

fix_modules()
print("ES6 Module Isolation Resolved. Globals successfully attached to window.")
