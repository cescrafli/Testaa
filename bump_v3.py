import os

html_files = [
    'index.html', 'katalog.html', 'proyek.html', 'artikel.html', 'tentang.html', 'kontak.html',
    'en/index.html', 'en/katalog.html', 'en/proyek.html', 'en/artikel.html', 'en/tentang.html', 'en/kontak.html'
]

for filename in html_files:
    if os.path.exists(filename):
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
            
        content = content.replace('components.js?v=2', 'components.js?v=3')
        
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)

print("Bumped to v3")
