// Pricing Script untuk Dynamic Pricing berdasarkan Region

// Show region modal on first visit
document.addEventListener('DOMContentLoaded', () => {
    // Check if pricing data is loaded
    if (typeof pricingData === 'undefined') {
        console.error('Pricing data not loaded');
        return;
    }
    
    const selectedRegion = getSelectedRegion();
    
    if (!selectedRegion) {
        // First time visit, hide all prices and show modal
        hideAllPrices();
        setTimeout(() => {
            showRegionModal();
        }, 1000);
    } else {
        // Update all prices based on saved region
        updateAllPrices(selectedRegion);
        updateRegionDisplay(selectedRegion);
    }
    
    // Setup region card click handlers
    setupRegionCards();
    
    // Setup tab switching
    setupTabs();
    
    // Setup change region button
    setupChangeRegionButton();
});

// Hide all prices (show Rp 0)
function hideAllPrices() {
    // Hide all price elements
    const priceElements = document.querySelectorAll(
        '[data-price], [data-price-newborn], [data-price-mom], ' +
        '[data-price-mom-care], [data-price-baby]'
    );
    
    priceElements.forEach(element => {
        element.textContent = 'Rp 0';
        element.style.opacity = '0.5';
    });
}

// Show region modal
function showRegionModal() {
    const modal = document.getElementById('regionModal');
    if (modal) {
        modal.classList.add('active');
    }
}

// Hide region modal
function hideRegionModal() {
    const modal = document.getElementById('regionModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Setup region card click handlers
function setupRegionCards() {
    const regionCards = document.querySelectorAll('.region-card');
    
    regionCards.forEach(card => {
        card.addEventListener('click', () => {
            const region = card.dataset.region;
            selectRegion(region);
        });
    });
}

// Setup change region button
function setupChangeRegionButton() {
    const changeRegionBtn = document.getElementById('changeRegionBtn');
    
    if (changeRegionBtn) {
        changeRegionBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showRegionModal();
        });
    }
    
    // Close modal when clicking outside
    const modal = document.getElementById('regionModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                hideRegionModal();
            }
        });
    }
    
    // Close modal with ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const modal = document.getElementById('regionModal');
            if (modal && modal.classList.contains('active')) {
                hideRegionModal();
            }
        }
    });
}

// Select region
function selectRegion(region) {
    setSelectedRegion(region);
    updateAllPrices(region);
    updateRegionDisplay(region);
    
    // Auto close modal after selection
    hideRegionModal();
    
    // Show success notification
    showNotification(`Wilayah berhasil diubah ke ${getPricing(region).name}`, 'success');
    
    // Smooth scroll to pricing section
    setTimeout(() => {
        const pricingSection = document.querySelector('.premium-packages');
        if (pricingSection) {
            pricingSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }, 500);
}

// Update region display
function updateRegionDisplay(region) {
    const regionDisplay = document.getElementById('currentRegion');
    if (regionDisplay) {
        regionDisplay.textContent = getPricing(region).name;
    }
}

// Update all prices on page
function updateAllPrices(region) {
    const pricing = getPricing(region);
    
    // Update Pendampingan Persalinan prices
    updatePrice('[data-price="readyBirth"]', pricing.pendampinganPersalinan.readyBirth.price);
    updatePrice('[data-price="comfortSupport"]', pricing.pendampinganPersalinan.comfortSupport.price);
    updatePrice('[data-price="holisticSupport"]', pricing.pendampinganPersalinan.holisticSupport.price);
    
    // Update Newborn Care prices
    updatePrice('[data-price-newborn="insidentil"]', pricing.newbornCare.insidentil.price);
    updatePrice('[data-price-newborn="hari3"]', pricing.newbornCare.hari3.price);
    updatePrice('[data-price-newborn="hari7"]', pricing.newbornCare.hari7.price);
    updatePrice('[data-price-newborn="hari14"]', pricing.newbornCare.hari14.price);
    updatePrice('[data-price-newborn="hari30"]', pricing.newbornCare.hari30.price);
    
    // Update Newborn & Mom prices
    updatePrice('[data-price-mom="insidentil"]', pricing.paketNewbornMom.insidentil.price);
    updatePrice('[data-price-mom="bronze"]', pricing.paketNewbornMom.bronze.price);
    updatePrice('[data-price-mom="silver"]', pricing.paketNewbornMom.silver.price);
    updatePrice('[data-price-mom="gold"]', pricing.paketNewbornMom.gold.price);
    updatePrice('[data-price-mom="platinum"]', pricing.paketNewbornMom.platinum.price);
    
    // Update Mom Care prices
    updatePrice('[data-price-mom-care="yogaHamil"]', pricing.momCare.yogaHamil.price);
    updatePrice('[data-price-mom-care="yogaCouple"]', pricing.momCare.yogaCouple.price);
    updatePrice('[data-price-mom-care="pijatPayudara"]', pricing.momCare.pijatPayudara.price);
    updatePrice('[data-price-mom-care="pijatOksitosin"]', pricing.momCare.pijatOksitosin.price);
    updatePrice('[data-price-mom-care="pijatLaktasi"]', pricing.momCare.pijatLaktasi.price);
    
    // Update Baby Treatment prices
    updatePrice('[data-price-baby="massage30"]', pricing.babyTreatment.massage30.price);
    updatePrice('[data-price-baby="massage45"]', pricing.babyTreatment.massage45.price);
    updatePrice('[data-price-baby="massageScrub"]', pricing.babyTreatment.massageScrub.price);
    updatePrice('[data-price-baby="massageGym"]', pricing.babyTreatment.massageGym.price);
    updatePrice('[data-price-baby="cukurBath"]', pricing.babyTreatment.cukurBath.price);
}

// Update single price element
function updatePrice(selector, price) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
        // Add animation class
        element.classList.add('price-updating');
        
        // Update price with animation
        setTimeout(() => {
            element.textContent = formatPrice(price);
            element.style.opacity = '1'; // Show price with full opacity
            element.style.color = '#333'; // Change to dark color (not gray)
            element.style.fontStyle = 'normal'; // Remove italic
        }, 100);
        
        // Remove animation class after animation completes
        setTimeout(() => {
            element.classList.remove('price-updating');
        }, 600);
    });
}

// Setup tab switching
function setupTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;
            
            // Remove active class from all tabs
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab
            btn.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Notification function (reuse from existing script.js if available, otherwise create new)
function showNotification(message, type = 'success') {
    // Check if notification function already exists from script.js
    if (window.showNotificationOriginal) {
        window.showNotificationOriginal(message, type);
        return;
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    const styles = {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 25px',
        borderRadius: '10px',
        color: 'white',
        fontWeight: '600',
        zIndex: '10000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
    };
    
    if (type === 'success') {
        styles.background = '#ff6b9d';
    } else if (type === 'error') {
        styles.background = '#ff4757';
    }
    
    Object.assign(notification.style, styles);
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Smooth scroll to pricing sections
function scrollToPricing(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}