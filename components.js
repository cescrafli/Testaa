// components.js

document.addEventListener('DOMContentLoaded', () => {
    
    // Determine active page
    const path = window.location.pathname;
    const isKatalog = path.includes('katalog');
    const isTentang = path.includes('tentang');
    const isBeranda = (!isKatalog && !isTentang) || path.endsWith('/') || path.endsWith('index.html');

    // Link styling helper
    const activeClassDesk = "text-brand-accent font-semibold transition-colors text-sm";
    const inactiveClassDesk = "text-gray-300 hover:text-white transition-colors text-sm font-medium";
    const activeClassMob = "block px-3 py-2 text-base font-semibold text-brand-accent bg-slate-800 rounded-md";
    const inactiveClassMob = "block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-slate-800 rounded-md";

    const navbarHTML = `
        <nav class="fixed w-full z-50 transition-all duration-300 ${isBeranda ? 'glass-nav' : 'shadow-lg bg-slate-950/90'}" id="navbar">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-20">
                    <a href="index.html" class="flex-shrink-0 flex items-center gap-2 block">
                        <div class="w-8 h-8 bg-brand-accent rounded-sm flex items-center justify-center font-bold text-brand-dark text-xl">B</div>
                        <span class="font-bold text-2xl tracking-tight text-white">Besi<span class="text-brand-accent text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-yellow-300">Karya</span></span>
                    </a>
                    <div class="hidden md:flex space-x-8 items-center">
                        <a href="index.html" class="${isBeranda ? activeClassDesk : inactiveClassDesk}">Beranda</a>
                        <a href="katalog.html" class="${isKatalog ? activeClassDesk : inactiveClassDesk}">Katalog</a>
                        <a href="tentang.html" class="${isTentang ? activeClassDesk : inactiveClassDesk}">Tentang Kami</a>
                        <a href="#" class="wa-global-btn bg-brand-accent text-brand-dark px-5 py-2.5 rounded-md font-semibold text-sm btn-hover flex items-center gap-2" target="_blank" rel="noopener noreferrer">
                            Hubungi Kami
                        </a>
                    </div>
                    <!-- Mobile menu button -->
                    <div class="md:hidden flex items-center">
                        <button id="mobile-menu-btn" aria-label="Buka menu utama" aria-expanded="false" class="text-gray-300 hover:text-white focus:outline-none">
                            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <!-- Mobile Menu -->
            <div id="mobile-menu" class="hidden md:hidden bg-slate-900 border-b border-slate-800 absolute w-full">
                <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <a href="index.html" class="${isBeranda ? activeClassMob : inactiveClassMob}">Beranda</a>
                    <a href="katalog.html" class="${isKatalog ? activeClassMob : inactiveClassMob}">Katalog</a>
                    <a href="tentang.html" class="${isTentang ? activeClassMob : inactiveClassMob}">Tentang Kami</a>
                    <a href="#" class="wa-global-btn block px-3 py-2 text-base font-medium text-brand-accent hover:text-yellow-400 rounded-md" target="_blank" rel="noopener noreferrer">Hubungi Kami</a>
                </div>
            </div>
        </nav>
    `;

    const footerHTML = `
        <footer class="bg-[#020617] border-t border-slate-800 pt-16 pb-8 mt-auto">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid md:grid-cols-3 gap-12 mb-12">
                    <div>
                        <div class="flex items-center gap-2 mb-4">
                            <div class="w-8 h-8 bg-brand-accent rounded-sm flex items-center justify-center font-bold text-brand-dark text-xl">B</div>
                            <span class="font-bold text-2xl tracking-tight text-white">Besi<span class="text-brand-accent text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-yellow-300">Karya</span></span>
                        </div>
                        <p class="text-slate-400 text-sm leading-relaxed mb-6">
                            Menghadirkan keindahan dan kekuatan maksimal pada setiap sudut rumah Anda melalui mahakarya besi kustom berkualitas premium.
                        </p>
                    </div>
                    <div>
                        <h4 class="text-white font-bold mb-4">Akses Cepat</h4>
                        <ul class="space-y-2 text-sm text-slate-400">
                            <li><a href="index.html" class="hover:text-brand-accent transition-colors">Beranda</a></li>
                            <li><a href="katalog.html" class="hover:text-brand-accent transition-colors">Digital Showcase</a></li>
                            <li><a href="tentang.html" class="hover:text-brand-accent transition-colors">Tentang Kami</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="text-white font-bold mb-4">Kontak Studio</h4>
                        <ul class="space-y-3 text-sm text-slate-400">
                            <li class="flex items-start gap-3">
                                <svg class="w-5 h-5 flex-shrink-0 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
                                <span>Jl. Arsitektur No. 128, Jakarta Barat, 11440</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p class="text-xs text-slate-500">© 2026 BesiKarya Custom Ironworks. All rights reserved.</p>
                    <p class="text-xs text-slate-600">Built with static aesthetic pipeline.</p>
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
