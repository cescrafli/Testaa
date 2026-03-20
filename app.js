// Core Logic for Digital Showcase (Multi-Page Version)

class DigitalShowcase {
    constructor(data, waNumber) {
        this.data = data;
        this.waNumber = waNumber;
        
        // Element references
        this.galleryContainer = document.getElementById('gallery-grid');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.globalWaBtns = document.querySelectorAll('.wa-global-btn');
        
        this.init();
    }

    init() {
        // Global UI Setup (runs on all pages)
        this.setupNavbarScroll();
        this.setupMobileMenu();
        this.setupGlobalWhatsAppButtons();

        // Catalog-specific Setup (only runs on katalog.html)
        if (this.galleryContainer) {
            this.renderGallery('all');
            this.setupFilters();
        }
    }

    setupNavbarScroll() {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;
        
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
                mobileMenu.classList.toggle('hidden');
            });
            
            // Hide mobile menu when clicking links
            mobileMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
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
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                        Tanya Harga & Kustomisasi
                    </a>
                </div>
            </div>
        `;
    }

    // Render items to the grid based on category (Katalog Page Only)
    renderGallery(category) {
        if (!this.galleryContainer) return;

        // Clear existing content
        this.galleryContainer.innerHTML = '';
        
        // Filter data
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

        // Slight delay for animation reset
        setTimeout(() => {
            const html = filteredData.map(item => this.createCardTemplate(item)).join('');
            this.galleryContainer.innerHTML = html;
        }, 50);
    }

    // Set up click listeners for filter buttons (Katalog Page Only)
    setupFilters() {
        if (!this.filterButtons.length) return;

        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Update active state class
                this.filterButtons.forEach(b => {
                    b.classList.remove('active', 'bg-brand-accent', 'text-brand-dark', 'font-semibold');
                    b.classList.add('text-slate-300', 'border-slate-700');
                });
                
                const currentBtn = e.target;
                currentBtn.classList.add('active', 'bg-brand-accent', 'text-brand-dark', 'font-semibold');
                currentBtn.classList.remove('text-slate-300');

                // Get filter value and render
                const category = currentBtn.getAttribute('data-filter');
                this.renderGallery(category);
            });
        });
    }
}

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if portfolioData is globally available (loaded via data.js)
    if (typeof portfolioData !== 'undefined') {
        new DigitalShowcase(portfolioData, WHATSAPP_NUMBER);
        console.log("Digital Showcase multi-page engine initialized.");
    } else {
        console.error("Error: portfolioData is not defined. Ensure data.js is loaded before app.js");
    }
});
