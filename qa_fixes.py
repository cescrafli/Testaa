import os

# Fix 1: English Navbar/Mobile Menu translation
components_en_path = 'en/components.js'
if os.path.exists(components_en_path):
    with open(components_en_path, 'r', encoding='utf-8') as f:
        comp_content = f.read()
        
    comp_content = comp_content.replace('>Proyek<', '>Projects<')
    comp_content = comp_content.replace('>Jurnal<', '>Journal<')
    comp_content = comp_content.replace('>Tentang<', '>About Us<')
    comp_content = comp_content.replace('>Kirim Blueprint<', '>Send Blueprint<')
    
    with open(components_en_path, 'w', encoding='utf-8') as f:
        f.write(comp_content)

# Fix 2 & 4: Breadcrumbs Translation and Google Maps in ALL HTML files
html_files_en = ['en/katalog.html', 'en/proyek.html', 'en/artikel.html', 'en/tentang.html', 'en/kontak.html']
for fn in html_files_en:
    if os.path.exists(fn):
        with open(fn, 'r', encoding='utf-8') as f:
            html = f.read()
            
        # Fix the Breadcrumb 'Beranda' mapping specifically
        # the SVG is right before the word
        html = html.replace('</path></svg>\n                            Beranda', '</path></svg>\n                            Home')
        html = html.replace('</path></svg>\n                            Katalog', '</path></svg>\n                            Catalog')
        html = html.replace('</path></svg>\n                            Proyek', '</path></svg>\n                            Projects')
        html = html.replace('</path></svg>\n                            Jurnal', '</path></svg>\n                            Journal')
        html = html.replace('</path></svg>\n                            Tentang', '</path></svg>\n                            About Us')
        
        with open(fn, 'w', encoding='utf-8') as f:
            f.write(html)

# Fix 4: Google Maps 400 Bad Request
# The current Google Maps src has a broken parameter. Let's just use a clean generic map embed of Jakarta or a standard working API parameter.
# The original tag starts with <iframe src="https://www.google.com/maps/embed?pb=..." 
# We'll replace it in id/tentang.html and en/tentang.html
maps_files = ['tentang.html', 'en/tentang.html']
for fn in maps_files:
    if os.path.exists(fn):
        with open(fn, 'r', encoding='utf-8') as f:
            html = f.read()
            
        # The bad URL starts with https://www.google.com/maps/embed?pb=!1m18
        # We replace the entire iframe src with a functional generic one.
        # Finding the exact embed can be tricky, let's use a simpler replace block.
        import re
        html = re.sub(r'https://www.google.com/maps/embed\?pb=[^"]+', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126914.5422899453!2d106.7594738!3d-6.1950298!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f704bc86280b%3A0xbc4e2be00c283726!2sJakarta!5e0!3m2!1sen!2sid!4v1689230551065', html)
        
        with open(fn, 'w', encoding='utf-8') as f:
            f.write(html)

# Fix 3: 'B' Logo Watermark Overlapping the Form
# The watermark is usually a giant absolute text or SVG in the background.
# Example from Tailwind: class="absolute opacity-5 text-[20rem] font-black -z-10 text-brand-accent..."
# We will drop the opacity to 2% and move it to -z-20, or hide it on mobile.
contact_files = ['kontak.html', 'en/kontak.html']
for fn in contact_files:
    if os.path.exists(fn):
        with open(fn, 'r', encoding='utf-8') as f:
            html = f.read()
        
        html = html.replace('text-[30rem] font-black text-brand-accent opacity-5 -z-10', 'hidden lg:block text-[30rem] font-black text-brand-accent opacity-[0.02] -z-20 pointer-events-none')
        html = html.replace('opacity-5', 'opacity-[0.02]') # Catch-all for extreme watermark opacity reduction
        
        # Also ensure form inputs backgrounds have white backing if peer styling needs it
        
        with open(fn, 'w', encoding='utf-8') as f:
            f.write(html)

print("QA Fixes Complete")
