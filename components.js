// components.js

document.addEventListener('DOMContentLoaded', () => {
    
    // Determine active page
    const path = window.location.pathname;
    const isKatalog = path.includes('katalog');
    const isTentang = path.includes('tentang');
    const isBeranda = (!isKatalog && !isTentang) || path.endsWith('/') || path.endsWith('index.html');

    // Link styling helper (Corporate Light Theme)
    const activeClassDesk = "text-brand-accent font-bold transition-colors text-sm uppercase tracking-wider";
    const inactiveClassDesk = "text-slate-600 hover:text-slate-900 transition-colors text-sm font-bold uppercase tracking-wider";
    const activeClassMob = "block px-4 py-3 text-base font-bold text-brand-accent bg-orange-50 rounded-none border-l-4 border-brand-accent uppercase tracking-wide";
    const inactiveClassMob = "block px-4 py-3 text-base font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-none border-l-4 border-transparent uppercase tracking-wide";

    const navbarHTML = `
        <nav class="fixed w-full z-50 transition-all duration-300 bg-white border-b border-gray-200 shadow-sm" id="navbar">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-20">
                    <a href="index.html" class="flex-shrink-0 flex items-center gap-3 block group">
                        <div class="w-10 h-10 bg-brand-accent rounded-sm flex items-center justify-center font-black text-white text-2xl shadow-sm transition-transform group-hover:scale-105">B</div>
                        <span class="font-black text-2xl tracking-tighter text-slate-900 uppercase">Besi<span class="text-brand-accent">Karya</span></span>
                    </a>
                    <div class="hidden md:flex space-x-8 items-center">
                        <a href="index.html" class="${isBeranda ? activeClassDesk : inactiveClassDesk}">Beranda</a>
                        <a href="katalog.html" class="${isKatalog ? activeClassDesk : inactiveClassDesk}">Katalog</a>
                        <a href="tentang.html" class="${isTentang ? activeClassDesk : inactiveClassDesk}">Tentang Kami</a>
                        <a href="#" class="wa-global-btn bg-brand-accent text-white px-6 py-2.5 rounded-sm font-bold text-sm btn-hover flex items-center gap-2 uppercase tracking-wide shadow-sm" target="_blank" rel="noopener noreferrer">
                            Hubungi Kami
                        </a>
                    </div>
                    <!-- Mobile menu button -->
                    <div class="md:hidden flex items-center">
                        <button id="mobile-menu-btn" aria-label="Buka menu utama" aria-expanded="false" class="text-slate-600 hover:text-slate-900 focus:outline-none bg-slate-50 p-2 rounded-sm border border-gray-200">
                            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <!-- Mobile Menu -->
            <div id="mobile-menu" class="hidden md:hidden bg-white border-b border-gray-200 absolute w-full shadow-lg">
                <div class="px-0 pt-2 pb-4 space-y-1">
                    <a href="index.html" class="${isBeranda ? activeClassMob : inactiveClassMob}">Beranda</a>
                    <a href="katalog.html" class="${isKatalog ? activeClassMob : inactiveClassMob}">Katalog</a>
                    <a href="tentang.html" class="${isTentang ? activeClassMob : inactiveClassMob}">Tentang Kami</a>
                    <div class="px-4 mt-4">
                        <a href="#" class="wa-global-btn block w-full text-center px-4 py-3 text-base font-bold text-white bg-brand-accent rounded-sm shadow-sm uppercase tracking-wide" target="_blank" rel="noopener noreferrer">Hubungi Kami Spesialis</a>
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
                            <li><a href="katalog.html" class="hover:text-brand-accent transition-colors flex items-center gap-2"><div class="w-1.5 h-1.5 bg-brand-accent rounded-sm"></div> Katalog Katalog</a></li>
                            <li><a href="tentang.html" class="hover:text-brand-accent transition-colors flex items-center gap-2"><div class="w-1.5 h-1.5 bg-brand-accent rounded-sm"></div> Filosofi Material</a></li>
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
                                <span class="font-bold">+62 812 3456 7890</span>
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
