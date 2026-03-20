// components.js

// Preloader Style (Head injection prevents FOUC)
if (!document.getElementById('splash-style')) {
    const splashStyle = document.createElement('style');
    splashStyle.id = 'splash-style';
    splashStyle.innerHTML = `
        body { opacity: 0; transition: opacity 0.5s ease-in-out; }
        body.page-loaded { opacity: 1; }
        #splash-screen {
            position: fixed; inset: 0; top: 0; left: 0; width: 100%; height: 100%; z-index: 99999;
            background-color: #ffffff;
            display: flex; align-items: center; justify-content: center;
            opacity: 1; transition: opacity 0.4s ease-in-out;
        }
        #splash-screen.fade-out { opacity: 0; pointer-events: none; }
    `;
    document.head.appendChild(splashStyle);
}

document.addEventListener('DOMContentLoaded', () => {

    // Determine active page
    const path = window.location.pathname;
    const isKatalog = path.includes('katalog');
    const isTentang = path.includes('tentang');
    
    const currentFile = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
    const idLinkHref = currentFile;
    const enLinkHref = 'en/' + currentFile;
    const isProyek = path.includes('proyek');
    const isBeranda = (!isKatalog && !isTentang && !isProyek) || path.endsWith('/') || path.endsWith('index.html');

    // Link styling helper (Corporate Light Theme)
    const activeClassDesk = "text-brand-accent font-bold transition-colors text-sm uppercase tracking-wider relative after:absolute after:-bottom-1.5 after:left-0 after:h-[2px] after:w-full after:bg-brand-accent";
    const inactiveClassDesk = "text-slate-600 hover:text-slate-900 transition-colors text-sm font-bold uppercase tracking-wider relative after:absolute after:-bottom-1.5 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-brand-accent after:transition-all after:duration-300";
    const activeClassMob = "block px-4 py-3 text-base font-bold text-brand-accent bg-orange-50 rounded-none border-l-4 border-brand-accent uppercase tracking-wide";
    const inactiveClassMob = "block px-4 py-3 text-base font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-none border-l-4 border-transparent uppercase tracking-wide";

    // Inject Custom Scrollbar & AOS into head
    if (!document.getElementById('premium-styles')) {
        const style = document.createElement('style');
        style.id = 'premium-styles';
        style.innerHTML = `
            /* Custom Scrollbar */
            ::-webkit-scrollbar { width: 8px; }
            ::-webkit-scrollbar-track { background: #f8fafc; }
            ::-webkit-scrollbar-thumb { background: #ea580c; border-radius: 4px; }
            ::-webkit-scrollbar-thumb:hover { background: #c2410c; }
            
            /* Navbar shrink transitions */
            #navbar-wrapper, #navbar-logo-box, #navbar-logo-text { transition: all 0.3s ease; }
        `;
        document.head.appendChild(style);

        // Inject AOS CSS
        const aosCss = document.createElement('link');
        aosCss.rel = 'stylesheet';
        aosCss.href = 'https://unpkg.com/aos@next/dist/aos.css';
        document.head.appendChild(aosCss);

        // Inject AOS JS if not present
        if (!document.querySelector('script[src*="aos.js"]')) {
            const aosJs = document.createElement('script');
            aosJs.src = 'https://unpkg.com/aos@next/dist/aos.js';
            document.head.appendChild(aosJs);
        }
    }

    // Splash Screen Logic
    const splashHTML = `
        <div id="splash-screen">
            <div class="flex flex-col items-center animate-pulse">
                <div class="w-16 h-16 bg-brand-accent rounded-sm flex items-center justify-center font-black text-white text-4xl shadow-md mb-4">B</div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('afterbegin', splashHTML);

    window.addEventListener('load', () => {
        document.body.classList.add('page-loaded');
        const splash = document.getElementById('splash-screen');
        if (splash) {
            splash.classList.add('fade-out');
            setTimeout(() => { splash.style.display = 'none'; }, 400);
        }
    });

    document.querySelectorAll('a').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            // Valid internal links
            if (href && !href.startsWith('#') && !href.startsWith('http') && anchor.target !== '_blank' && !anchor.hasAttribute('download')) {
                e.preventDefault();
                const splash = document.getElementById('splash-screen');
                if (splash) {
                    splash.style.display = 'flex';
                    // Force reflow
                    void splash.offsetWidth;
                    splash.classList.remove('fade-out');
                    document.body.classList.remove('page-loaded');
                }
                setTimeout(() => {
                    window.location.href = href;
                }, 400); // Wait for fade out
            }
        });
    });

    const navbarHTML = `
        <nav class="fixed w-full z-50 transition-all duration-300 bg-white border-b border-gray-200 shadow-sm" id="navbar">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-20" id="navbar-wrapper">
                    <a href="index.html" class="flex-shrink-0 flex items-center gap-3 block group">
                        <div id="navbar-logo-box" class="w-10 h-10 bg-brand-accent rounded-sm flex items-center justify-center font-black text-white text-2xl shadow-sm transition-transform group-hover:scale-105">B</div>
                        <span id="navbar-logo-text" class="font-black text-2xl tracking-tighter text-slate-900 uppercase">Besi<span class="text-brand-accent">Karya</span></span>
                    </a>
                    <div class="hidden md:flex space-x-6 lg:space-x-8 items-center">
                        <a href="index.html" class="${isBeranda ? activeClassDesk : inactiveClassDesk}">Beranda</a>
                        <a href="katalog.html" class="${isKatalog ? activeClassDesk : inactiveClassDesk}">Katalog</a>
                        <a href="proyek.html" class="${isProyek ? activeClassDesk : inactiveClassDesk}">Proyek</a>
                        <a href="artikel.html" class="${path.includes('artikel') ? activeClassDesk : inactiveClassDesk}">Jurnal</a>
                        <a href="tentang.html" class="${isTentang ? activeClassDesk : inactiveClassDesk}">Tentang</a>
                        <div class="h-6 w-px bg-gray-300 mx-2"></div>
                        <a href="${idLinkHref}" class="text-brand-accent font-black text-sm">ID</a>
                        <span class="text-gray-300">|</span>
                        <a href="${enLinkHref}" class="text-slate-400 hover:text-slate-900 font-bold text-sm transition-colors">EN</a>
                        <a href="kontak.html" class="bg-slate-900 text-white px-6 py-2.5 rounded-sm font-bold text-sm transition-all hover:bg-brand-accent shadow-sm flex items-center gap-2 uppercase tracking-wide">
                            Kirim Blueprint
                        </a>
                    </div>
                    <!-- Mobile menu button -->
                    <div class="md:hidden flex items-center gap-4">
                        <div class="flex items-center gap-2 text-xs font-bold">
                            <a href="${idLinkHref}" class="text-brand-accent">ID</a> <span class="text-gray-300">|</span> <a href="${enLinkHref}" class="text-slate-400">EN</a>
                        </div>
                        <button id="mobile-menu-btn" aria-label="Buka menu utama" aria-expanded="false" class="text-slate-600 hover:text-slate-900 focus:outline-none bg-slate-50 p-2 rounded-sm border border-gray-200">
                            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <!-- Mobile Menu -->
            <div id="mobile-menu" class="hidden md:hidden bg-white border-b border-gray-200 absolute w-full shadow-lg max-h-[80vh] overflow-y-auto">
                <div class="px-0 pt-2 pb-4 space-y-1">
                    <a href="index.html" class="${isBeranda ? activeClassMob : inactiveClassMob}">Beranda</a>
                    <a href="katalog.html" class="${isKatalog ? activeClassMob : inactiveClassMob}">Katalog</a>
                    <a href="proyek.html" class="${isProyek ? activeClassMob : inactiveClassMob}">Proyek Kami</a>
                    <a href="artikel.html" class="${path.includes('artikel') ? activeClassMob : inactiveClassMob}">Jurnal Edukasi</a>
                    <a href="tentang.html" class="${isTentang ? activeClassMob : inactiveClassMob}">Tentang Kami</a>
                    <div class="px-4 mt-4">
                        <a href="kontak.html" class="block w-full text-center px-4 py-3 text-base font-bold text-white bg-slate-900 rounded-sm shadow-sm uppercase tracking-wide">Konsultasi / Quotation</a>
                    </div>
                </div>
            </div>
        </nav>
    `;

    const footerHTML = `
        <footer class="bg-slate-900 pt-16 pb-8 mt-auto border-t-4 border-brand-accent">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid md:grid-cols-3 gap-12 mb-12">
                    <div>
                        <div class="flex items-center gap-3 mb-6 block group">
                            <div class="w-10 h-10 bg-brand-accent rounded-sm flex items-center justify-center font-black text-white text-2xl shadow-sm">B</div>
                            <span class="font-black text-2xl tracking-tighter text-white uppercase">Besi<span class="text-brand-accent">Karya</span></span>
                        </div>
                        <p class="text-slate-400 text-sm leading-relaxed mb-6 font-medium pr-4">
                            Fabrikasi dan instalasi konstruksi besi kustom untuk properti residensial dan komersial eksklusif. Komitmen pada presisi geometri maksimal.
                        </p>
                    </div>
                    <div>
                        <h4 class="text-white font-black mb-6 uppercase tracking-widest text-sm">Akses Cepat</h4>
                        <ul class="space-y-3 text-sm text-slate-400 font-semibold">
                            <li><a href="index.html" class="hover:text-brand-accent transition-colors flex items-center gap-2"><div class="w-1.5 h-1.5 bg-brand-accent rounded-sm"></div> Beranda</a></li>
                            <li><a href="proyek.html" class="hover:text-brand-accent transition-colors flex items-center gap-2"><div class="w-1.5 h-1.5 bg-brand-accent rounded-sm"></div> Galeri Proyek</a></li>
                            <li><a href="tentang.html" class="hover:text-brand-accent transition-colors flex items-center gap-2"><div class="w-1.5 h-1.5 bg-brand-accent rounded-sm"></div> Filosofi Material</a></li>
                            <li><a href="#" download="Company_Profile_BesiKarya.pdf" class="mt-4 hover:text-white transition-colors flex items-center gap-2 text-brand-accent border border-brand-accent/50 hover:bg-brand-accent py-2 px-3 rounded-sm w-fit"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg> Unduh e-Katalog PDF</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="text-white font-black mb-6 uppercase tracking-widest text-sm">Gudang & Studio</h4>
                        <ul class="space-y-4 text-sm text-slate-400 font-medium">
                            <li class="flex items-start gap-4">
                                <div class="bg-slate-800 p-2 rounded-sm shrink-0 text-brand-accent">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
                                </div>
                                <span class="pt-1">Jl. Arsitektur No. 128, Kawasan Industri, Jakarta Barat, 11440</span>
                            </li>
                            <li class="flex items-center gap-4">
                                <div class="bg-slate-800 p-2 rounded-sm shrink-0 text-brand-accent">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                </div>
                                <span class="font-bold">+62 858 5231 7383</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p class="text-xs text-slate-500 font-semibold uppercase tracking-widest">© 2026 BesiKarya Industrial Group.</p>
                    <p class="text-xs text-slate-600 font-semibold uppercase tracking-widest">Multi-Page Static Infrastructure.</p>
                </div>
            </div>
        </footer>
    `;

    const navContainer = document.getElementById('navbar-container');
    const footerContainer = document.getElementById('footer-container');

    if (navContainer) navContainer.innerHTML = navbarHTML;
    if (footerContainer) footerContainer.innerHTML = footerHTML;

    // Dispatch event so app.js knows the DOM is ready for bindings
    window.dispatchEvent(new Event('ComponentsLoaded'));
});
