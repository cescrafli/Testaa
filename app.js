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

    setupBackToTop() {
        const btn = document.createElement('button');
        btn.innerHTML = `<svg class="w-6 h-6 outline-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>`;
        btn.className = 'fixed bottom-8 right-8 bg-brand-accent text-white p-3 rounded-sm shadow-md hover:bg-orange-700 transition-all duration-300 z-50 opacity-0 pointer-events-none translate-y-4';
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
        });
    }

    renderSearchData(filteredData) {
        if (!this.galleryContainer) return;
        this.galleryContainer.innerHTML = '';

        if (filteredData.length === 0) {
            this.galleryContainer.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <p class="text-slate-500 font-semibold tracking-wide uppercase">Hasil tidak ditemukan. Silakan gunakan kata kunci lainnya.</p>
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
        const encodedMessage = encodeURIComponent(item.message);
        const waLink = `https://wa.me/${this.waNumber}?text=${encodedMessage}`;

        return `
            <div class="project-card bg-white border border-gray-200 rounded-sm overflow-hidden group flex flex-col h-full animate-fade-in shadow-sm hover:shadow-xl">
                <div class="relative overflow-hidden aspect-[4/3] bg-slate-100">
                    <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105" loading="lazy">
                    <div class="absolute inset-0 bg-slate-900/5 group-hover:bg-transparent transition-colors duration-300"></div>
                    <div class="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-sm border border-gray-200 text-xs font-bold text-brand-accent shadow-sm uppercase tracking-widest">
                        ${item.category}
                    </div>
                </div>
                <div class="p-6 flex flex-col flex-grow">
                    <h3 class="text-xl font-black text-slate-900 mb-2 line-clamp-1 uppercase tracking-tight">${item.title}</h3>
                    <p class="text-slate-600 text-sm mb-6 flex-grow line-clamp-2 font-medium leading-relaxed">${item.description}</p>
                    
                    <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="w-full inline-flex justify-center items-center gap-2 bg-white hover:bg-brand-accent hover:text-white text-slate-900 py-3 rounded-sm font-black text-sm transition-all duration-300 border-2 border-slate-900 hover:border-brand-accent uppercase tracking-widest group-hover:shadow-md">
                        <svg class="w-4 h-4" outline="none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                        Konsultasi Harga
                    </a>
                </div>
            </div>
        `;
    }

    renderGallery(category) {
        if (!this.galleryContainer) return;
        this.galleryContainer.innerHTML = '';
        
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

        setTimeout(() => {
            const html = filteredData.map(item => this.createCardTemplate(item)).join('');
            this.galleryContainer.innerHTML = html;
        }, 50);
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
    if (typeof portfolioData !== 'undefined') {
        new DigitalShowcase(portfolioData, WHATSAPP_NUMBER);
        console.log("Digital Showcase UI + Corporate Light Theme initialized.");
    } else {
        console.error("Error: portfolioData is not defined. Ensure data.js is loaded before app.js");
    }
});
