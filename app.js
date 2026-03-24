// Core Logic for Digital Showcase (Corporate Light Theme)

class DigitalShowcase {
    constructor(data, waNumber) {
        this.data = data;
        this.waNumber = waNumber;
        
        // Element references are retrieved AFTER ComponentsLoaded
        this.path = window.location.pathname;
        this.isBeranda = (!this.path.includes('katalog') && !this.path.includes('tentang') && !this.path.includes('404')) || this.path.endsWith('/') || this.path.endsWith('index.html');
        
        this.init();
    }

    init() {
        this.galleryContainer = document.getElementById('gallery-grid');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.globalWaBtns = document.querySelectorAll('.wa-global-btn');

        // Global UI Setup
        this.setupMobileMenu();
        this.setupGlobalWhatsAppButtons();
        this.setupBackToTop();

        // Catalog Setup
        if (this.galleryContainer) {
            this.renderGallery('all');
            this.setupFilters();
            this.setupLiveSearch();
        }
    }

    // Navbar scroll logic is removed because the navbar is permanently solid white in light theme design.
    // The visual separation is handled by a thin gray border in components.js.

    setupMobileMenu() {
        const mobileBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');

        if(mobileBtn && mobileMenu) {
            mobileBtn.addEventListener('click', () => {
                const isHidden = mobileMenu.classList.contains('hidden');
                if (isHidden) {
                    mobileMenu.classList.remove('hidden');
                    mobileBtn.setAttribute('aria-expanded', 'true');
                } else {
                    mobileMenu.classList.add('hidden');
                    mobileBtn.setAttribute('aria-expanded', 'false');
                }
            });
            
            mobileMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                    mobileBtn.setAttribute('aria-expanded', 'false');
                });
            });
        }
    }

    setupGlobalWhatsAppButtons() {
        if (this.globalWaBtns.length > 0) {
            const defaultMessage = "Halo BesiKarya, saya tertarik untuk konsultasi pembuatan custom besi.";
            const waUrl = `https://wa.me/${this.waNumber}?text=${encodeURIComponent(defaultMessage)}`;
            
            this.globalWaBtns.forEach(btn => {
                btn.href = waUrl;
            });
        }
    }

    setupFloatingWhatsApp() {
        const waLink = document.createElement('a');
        const defaultMessage = encodeURIComponent("Halo BesiKarya, saya ingin konsultasi eksekutif terkait pembuatan konstruksi besi custom.");
        waLink.href = `https://wa.me/${this.waNumber}?text=${defaultMessage}`;
        waLink.target = "_blank";
        waLink.rel = "noopener noreferrer";
        waLink.className = "fixed bottom-6 right-4 md:right-6 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#20bd5a] hover:scale-110 transition-all duration-300 z-50 flex items-center justify-center group touch-manipulation";
        waLink.setAttribute('aria-label', 'Konsultasi via WhatsApp');
        waLink.innerHTML = `
            <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 0C5.385 0 0 5.387 0 12.035c0 2.126.553 4.195 1.604 6.014L.226 23.336l5.422-1.423a12.028 12.028 0 006.383 1.834h.005c6.645 0 12.03-5.387 12.03-12.035C24.066 5.387 18.677 0 12.031 0zm0 21.734h-.004a9.982 9.982 0 01-5.088-1.385l-.365-.217-3.784.992.992-3.69-.238-.378a9.972 9.972 0 01-1.53-5.321C1.983 6.495 6.494 1.984 12.03 1.984c5.539 0 10.046 4.511 10.046 10.047 0 5.536-4.507 10.047-10.045 10.047zm5.514-7.53c-.302-.151-1.791-.884-2.068-.985-.278-.101-.482-.151-.683.151-.202.302-.782.985-.959 1.187-.175.202-.352.226-.654.075-1.554-.775-2.731-1.455-3.782-3.25-.215-.367-.024-.565.127-.716.136-.135.302-.352.453-.528.151-.176.202-.302.302-.503.1-.202.05-.378-.025-.528-.076-.151-.683-1.649-.935-2.257-.246-.593-.497-.512-.683-.522H7.43c-.201 0-.528.075-.805.378-.277.302-1.056 1.031-1.056 2.515s1.082 2.917 1.233 3.118c.151.202 2.126 3.243 5.147 4.545 1.701.734 2.522.84 3.425.968 1.011.144 2.13.06 2.66-.411.666-.594 1.272-1.636 1.4-2.316.128-.68.128-1.263.09-1.385-.038-.122-.138-.151-.44-.302z"/></svg>            
            <span class="absolute right-full mr-4 bg-slate-900 text-white text-sm px-3 py-1.5 rounded-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none font-medium">Chat Interaktif Langsung</span>
        `;
        document.body.appendChild(waLink);
    }

    setupBackToTop() {
        const btn = document.createElement('button');
        btn.innerHTML = `<svg class="w-6 h-6 outline-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>`;
        // Offset higher than WhatsApp floating button with safe-zone distance on mobile
        btn.className = 'fixed bottom-28 right-4 md:right-7 md:bottom-[5.5rem] bg-brand-accent text-white p-3 rounded-sm shadow-md hover:bg-orange-700 transition-all duration-300 z-50 opacity-0 pointer-events-none translate-y-4 flex items-center justify-center touch-manipulation';
        btn.setAttribute('aria-label', 'Kembali ke Atas');
        document.body.appendChild(btn);

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                btn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
                btn.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');
            } else {
                btn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
                btn.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
            }
        });

        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    setupLiveSearch() {
        const searchInput = document.getElementById('katalog-search');
        if (!searchInput) return;

        let debounceTimer;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                const query = e.target.value.toLowerCase();
            
                // Clear active filter visually
                if (this.filterButtons.length) {
                    this.filterButtons.forEach(b => {
                        b.classList.remove('active', 'bg-slate-900', 'text-white');
                        b.classList.add('text-slate-600', 'border-gray-300');
                    });
                }

                if (query === '') {
                    const allBtn = document.querySelector('[data-filter="all"]');
                    if (allBtn) {
                        allBtn.classList.add('active', 'bg-slate-900', 'text-white');
                        allBtn.classList.remove('text-slate-600', 'border-gray-300');
                    }
                    this.renderSearchData(this.data);
                    return;
                }

                const searchMatches = this.data.filter(item => 
                    item.title.toLowerCase().includes(query) || 
                    item.description.toLowerCase().includes(query) ||
                    item.category.toLowerCase().includes(query)
                );

                this.renderSearchData(searchMatches);
            }, 300);
        });
    }

    renderSearchData(filteredData) {
        if (!this.galleryContainer) return;
        this.galleryContainer.innerHTML = '';
        if (this.renderTimer) clearTimeout(this.renderTimer);

        if (filteredData.length === 0) {
            this.galleryContainer.innerHTML = `
                
                <div class="col-span-full text-center py-16 flex flex-col items-center justify-center opacity-80 animate-fade-in">
                    <svg class="w-24 h-24 text-slate-300 mb-6 drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 21h4c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8c0 1.956.702 3.748 1.865 5.135"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10l-4 4m0-4l4 4"></path>
                        <circle cx="12" cy="12" r="9" stroke-width="1.5" stroke-dasharray="2 4"></circle>
                    </svg>
                    <p class="text-slate-500 font-semibold tracking-wide uppercase">Hasil tidak ditemukan. Silakan gunakan kata kunci lainnya.</p>
                </div>
            `;
            return;
        }

        const skeletonHTML = `
            <div class="project-card bg-white border border-gray-200 rounded-sm overflow-hidden flex flex-col h-full shadow-sm animate-pulse">
                <div class="aspect-[4/3] bg-slate-200 w-full"></div>
                <div class="p-6 flex flex-col flex-grow">
                    <div class="h-6 bg-slate-200 rounded w-3/4 mb-4 mt-2"></div>
                    <div class="h-4 bg-slate-200 rounded w-full mb-2"></div>
                    <div class="h-4 bg-slate-200 rounded w-5/6 mb-6"></div>
                    <div class="mt-auto h-12 bg-slate-200 rounded w-full"></div>
                </div>
            </div>
        `.repeat(6);
        this.galleryContainer.innerHTML = skeletonHTML;

        this.renderTimer = setTimeout(() => {
            const html = filteredData.map(item => this.createCardTemplate(item)).join('');
            this.galleryContainer.innerHTML = html;
            
            if (typeof GLightbox !== 'undefined') {
                if(this.lightbox) this.lightbox.destroy();
                this.lightbox = GLightbox({
                    selector: '.glightbox',
                    touchNavigation: true,
                    loop: true,
                    autoplayVideos: true
                });
                this.lightbox.on('open', () => {
                    const closeBtn = document.querySelector('.gclose');
                    const nextBtn = document.querySelector('.gnext');
                    const prevBtn = document.querySelector('.gprev');
                    if (closeBtn) closeBtn.setAttribute('aria-label', 'Tutup galeri');
                    if (nextBtn) nextBtn.setAttribute('aria-label', 'Foto selanjutnya');
                    if (prevBtn) prevBtn.setAttribute('aria-label', 'Foto sebelumnya');
                });
            }
        }, 600);
    }

    // Creates the HTML structure for a single card
    createCardTemplate(item) {
        const encodedMessage = encodeURIComponent(item.message);
        const waLink = `https://wa.me/${this.waNumber}?text=${encodedMessage}`;
        const isEng = window.location.pathname.includes('/en/');
        const btnText = isEng ? "GET QUOTATION" : "KONSULTASI HARGA";
        const modelPrefix = `BK-${item.id.toString().padStart(4, '0')}`;
        const numPrefix = item.id.toString().padStart(2, '0');

        return `
            <div class="group">
                <div class="relative aspect-[4/5] overflow-hidden bg-zinc-100 mb-8">
                    <a href="${item.image}" class="glightbox block w-full h-full"><img class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="${item.title}" src="${item.image}" loading="lazy"/></a>
                    <div class="absolute top-6 left-6">
                        <span class="bg-white/90 backdrop-blur-md px-4 py-1 text-[10px] font-black tracking-widest uppercase text-on-surface">Model: ${modelPrefix}</span>
                    </div>
                </div>
                <div class="flex flex-col space-y-4">
                    <div class="flex justify-between items-start">
                        <h3 class="text-3xl font-black tracking-tighter uppercase text-on-surface leading-none">${item.title}</h3>
                        <span class="text-primary font-bold tracking-tighter text-xl">${numPrefix}</span>
                    </div>
                    <p class="text-secondary leading-relaxed font-light">${item.description}</p>
                    <div class="pt-4 border-t border-zinc-100 flex items-center justify-between">
                        <div class="grid grid-cols-2 gap-x-8 gap-y-1">
                            <span class="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">Material</span>
                            <span class="text-[11px] uppercase tracking-tight text-on-surface font-medium">Forged Iron</span>
                            <span class="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">Finish</span>
                            <span class="text-[11px] uppercase tracking-tight text-on-surface font-medium">Matte Powder</span>
                        </div>
                        <a href="${isEng ? 'kontak.html' : 'kontak.html'}" class="bg-primary text-white flex items-center gap-3 px-8 py-4 font-black text-xs uppercase tracking-widest hover:bg-primary-container transition-all active:scale-95">
                            <span class="material-symbols-outlined text-sm">phone_in_talk</span>
                            ${btnText}
                        </a>
                    </div>
                </div>
            </div>
        `;
    }

    renderGallery(category) {
        if (!this.galleryContainer) return;
        this.galleryContainer.innerHTML = '';
        if (this.renderTimer) clearTimeout(this.renderTimer);
        
        const filteredData = category === 'all' 
            ? this.data 
            : this.data.filter(item => item.category === category);

        if (filteredData.length === 0) {
            this.galleryContainer.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <p class="text-slate-500 font-semibold tracking-wide uppercase">Katalog belum tersedia untuk kategori ini.</p>
                </div>
            `;
            return;
        }

        const skeletonHTML = `
            <div class="project-card bg-white border border-gray-200 rounded-sm overflow-hidden flex flex-col h-full shadow-sm animate-pulse">
                <div class="aspect-[4/3] bg-slate-200 w-full"></div>
                <div class="p-6 flex flex-col flex-grow">
                    <div class="h-6 bg-slate-200 rounded w-3/4 mb-4 mt-2"></div>
                    <div class="h-4 bg-slate-200 rounded w-full mb-2"></div>
                    <div class="h-4 bg-slate-200 rounded w-5/6 mb-6"></div>
                    <div class="mt-auto h-12 bg-slate-200 rounded w-full"></div>
                </div>
            </div>
        `.repeat(6);
        this.galleryContainer.innerHTML = skeletonHTML;

        this.renderTimer = setTimeout(() => {
            const html = filteredData.map(item => this.createCardTemplate(item)).join('');
            this.galleryContainer.innerHTML = html;
            
            if (typeof GLightbox !== 'undefined') {
                if(this.lightbox) this.lightbox.destroy();
                this.lightbox = GLightbox({
                    selector: '.glightbox',
                    touchNavigation: true,
                    loop: true,
                    autoplayVideos: true
                });
                this.lightbox.on('open', () => {
                    const closeBtn = document.querySelector('.gclose');
                    const nextBtn = document.querySelector('.gnext');
                    const prevBtn = document.querySelector('.gprev');
                    if (closeBtn) closeBtn.setAttribute('aria-label', 'Tutup galeri');
                    if (nextBtn) nextBtn.setAttribute('aria-label', 'Foto selanjutnya');
                    if (prevBtn) prevBtn.setAttribute('aria-label', 'Foto sebelumnya');
                });
            }
        }, 600);
    }

    setupFilters() {
        if (!this.filterButtons.length) return;
        const searchInput = document.getElementById('katalog-search');

        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                if(searchInput) searchInput.value = '';

                this.filterButtons.forEach(b => {
                    b.classList.remove('active', 'bg-slate-900', 'text-white', 'border-slate-900');
                    b.classList.add('text-slate-600', 'border-gray-300');
                });
                
                const currentBtn = e.target;
                currentBtn.classList.add('active', 'bg-slate-900', 'text-white', 'border-slate-900');
                currentBtn.classList.remove('text-slate-600', 'border-gray-300');

                const category = currentBtn.getAttribute('data-filter');
                this.renderGallery(category);
            });
        });
    }
}

// Initialize when Components are Loaded into DOM
window.addEventListener('ComponentsLoaded', () => {
    // Wait a brief moment for AOS script to load if injected dynamically
    const initPremiumFeatures = setInterval(() => {
        if (typeof AOS !== 'undefined') {
            AOS.init({ duration: 800, once: true, offset: 50 });
            clearInterval(initPremiumFeatures);
        }
    }, 100);

    // Navbar Shrink Effect
    window.addEventListener('scroll', () => {
        const wrapper = document.getElementById('navbar-wrapper');
        const logoBox = document.getElementById('navbar-logo-box');
        const logoText = document.getElementById('navbar-logo-text');
        
        if (wrapper && logoBox && logoText) {
            if (window.scrollY > 50) {
                // Shrink
                wrapper.classList.replace('h-20', 'h-16');
                logoBox.classList.replace('w-10', 'w-8');
                logoBox.classList.replace('h-10', 'h-8');
                logoBox.classList.replace('text-2xl', 'text-xl');
                logoText.classList.replace('text-2xl', 'text-xl');
            } else {
                // Expand
                wrapper.classList.replace('h-16', 'h-20');
                logoBox.classList.replace('w-8', 'w-10');
                logoBox.classList.replace('h-8', 'h-10');
                logoBox.classList.replace('text-xl', 'text-2xl');
                logoText.classList.replace('text-xl', 'text-2xl');
            }
        }
    });

    if (typeof portfolioData !== 'undefined') {
        new DigitalShowcase(portfolioData, WHATSAPP_NUMBER);
        console.log("Digital Showcase UI + Corporate Light Theme initialized.");
    } else {
        console.error("Error: portfolioData is not defined. Ensure data.js is loaded before app.js");
    }
});
