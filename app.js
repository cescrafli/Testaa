// Core Logic for Digital Showcase (Multi-Page Version)

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

        // Global UI Setup (runs on all pages)
        this.setupNavbarScroll();
        this.setupMobileMenu();
        this.setupGlobalWhatsAppButtons();
        this.setupBackToTop();

        // Catalog-specific Setup (only runs on katalog.html)
        if (this.galleryContainer) {
            this.renderGallery('all');
            this.setupFilters();
            this.setupLiveSearch();
        }
    }

    setupNavbarScroll() {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;
        
        // Fix: Only apply transparent transition on Beranda (Hero image). For others, it remains solid.
        if (!this.isBeranda) {
            navbar.classList.add('shadow-lg', 'bg-slate-950/90');
            navbar.classList.remove('glass-nav');
            return;
        }

        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                navbar.classList.add('shadow-lg', 'bg-slate-950/90');
                navbar.classList.remove('glass-nav');
            } else {
                navbar.classList.remove('shadow-lg', 'bg-slate-950/90');
                navbar.classList.add('glass-nav');
            }
        });
    }

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
            
            // Hide mobile menu when clicking links
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

    setupBackToTop() {
        const btn = document.createElement('button');
        btn.innerHTML = `<svg class="w-6 h-6 outline-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>`;
        btn.className = 'fixed bottom-8 right-8 bg-brand-accent text-brand-dark p-3 rounded-full shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:bg-yellow-400 transition-all duration-300 z-50 opacity-0 pointer-events-none translate-y-4';
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

        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            
            // Clear active filter buttons visually
            if (this.filterButtons.length) {
                this.filterButtons.forEach(b => {
                    b.classList.remove('active', 'bg-brand-accent', 'text-brand-dark', 'font-semibold');
                    b.classList.add('text-slate-300', 'border-slate-700');
                });
            }

            if (query === '') {
                // Restore active state to "Semua"
                const allBtn = document.querySelector('[data-filter="all"]');
                if (allBtn) {
                    allBtn.classList.add('active', 'bg-brand-accent', 'text-brand-dark', 'font-semibold');
                    allBtn.classList.remove('text-slate-300');
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
        });
    }

    renderSearchData(filteredData) {
        if (!this.galleryContainer) return;
        this.galleryContainer.innerHTML = '';

        if (filteredData.length === 0) {
            this.galleryContainer.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <p class="text-slate-500">Pencarian tidak menemukan hasil. Coba kata kunci lain.</p>
                </div>
            `;
            return;
        }

        setTimeout(() => {
            const html = filteredData.map(item => this.createCardTemplate(item)).join('');
            this.galleryContainer.innerHTML = html;
        }, 50);
    }

    // Creates the HTML structure for a single card
    createCardTemplate(item) {
        // Encode message for WhatsApp URL
        const encodedMessage = encodeURIComponent(item.message);
        const waLink = `https://wa.me/${this.waNumber}?text=${encodedMessage}`;

        return `
            <div class="project-card bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden group flex flex-col h-full animate-fade-in shadow-lg">
                <div class="relative overflow-hidden aspect-[4/3]">
                    <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover" loading="lazy">
                    <div class="absolute inset-0 bg-brand-dark/20 group-hover:bg-transparent transition-colors duration-300"></div>
                    <div class="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-xs font-semibold text-brand-accent shadow-sm">
                        ${item.category}
                    </div>
                </div>
                <div class="p-6 flex flex-col flex-grow">
                    <h3 class="text-xl font-bold text-white mb-2 line-clamp-1">${item.title}</h3>
                    <p class="text-slate-400 text-sm mb-6 flex-grow line-clamp-2">${item.description}</p>
                    
                    <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="w-full inline-flex justify-center items-center gap-2 bg-slate-800 hover:bg-brand-accent hover:text-brand-dark text-white py-3 rounded-lg font-bold text-sm transition-all duration-300 border border-slate-700 hover:border-brand-accent">
                        <svg class="w-4 h-4" outline="none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                        Tanya Harga & Kustomisasi
                    </a>
                </div>
            </div>
        `;
    }

    // Render items to the grid based on category (Katalog Page Only)
    renderGallery(category) {
        if (!this.galleryContainer) return;
        this.galleryContainer.innerHTML = '';
        
        const filteredData = category === 'all' 
            ? this.data 
            : this.data.filter(item => item.category === category);

        if (filteredData.length === 0) {
            this.galleryContainer.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <p class="text-slate-500">Katalog belum tersedia untuk kategori ini.</p>
                </div>
            `;
            return;
        }

        setTimeout(() => {
            const html = filteredData.map(item => this.createCardTemplate(item)).join('');
            this.galleryContainer.innerHTML = html;
        }, 50);
    }

    // Set up click listeners for filter buttons (Katalog Page Only)
    setupFilters() {
        if (!this.filterButtons.length) return;
        const searchInput = document.getElementById('katalog-search');

        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Clear search input text if user clicks a category filter
                if(searchInput) searchInput.value = '';

                this.filterButtons.forEach(b => {
                    b.classList.remove('active', 'bg-brand-accent', 'text-brand-dark', 'font-semibold');
                    b.classList.add('text-slate-300', 'border-slate-700');
                });
                
                const currentBtn = e.target;
                currentBtn.classList.add('active', 'bg-brand-accent', 'text-brand-dark', 'font-semibold');
                currentBtn.classList.remove('text-slate-300');

                const category = currentBtn.getAttribute('data-filter');
                this.renderGallery(category);
            });
        });
    }
}

// Initialize when Components are Loaded into DOM
window.addEventListener('ComponentsLoaded', () => {
    if (typeof portfolioData !== 'undefined') {
        new DigitalShowcase(portfolioData, WHATSAPP_NUMBER);
        console.log("Digital Showcase UI + Plugins successfully initialized.");
    } else {
        console.error("Error: portfolioData is not defined. Ensure data.js is loaded before app.js");
    }
});
