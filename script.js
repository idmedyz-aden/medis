// Smooth scrolling untuk navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile menu toggle
const createMobileMenu = () => {
    const nav = document.querySelector('.main-nav');
    const navMenu = document.querySelector('.nav-menu');
    
    // Create hamburger button
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    hamburger.style.cssText = `
        display: none;
        background: none;
        border: none;
        font-size: 24px;
        color: #ff6b9d;
        cursor: pointer;
        padding: 10px;
    `;
    
    // Insert hamburger before nav menu
    navMenu.parentNode.insertBefore(hamburger, navMenu);
    
    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('mobile-active');
        const icon = hamburger.querySelector('i');
        icon.className = navMenu.classList.contains('mobile-active') 
            ? 'fas fa-times' 
            : 'fas fa-bars';
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target)) {
            navMenu.classList.remove('mobile-active');
            hamburger.querySelector('i').className = 'fas fa-bars';
        }
    });
};

// Add mobile menu styles
const addMobileStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .hamburger {
                display: block !important;
            }
            
            .nav-menu {
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                flex-direction: column;
                box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                transform: translateY(-100%);
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                z-index: 1000;
            }
            
            .nav-menu.mobile-active {
                transform: translateY(0);
                opacity: 1;
                visibility: visible;
            }
            
            .nav-menu li {
                margin: 0;
                border-bottom: 1px solid #f0f0f0;
            }
            
            .nav-menu a {
                padding: 15px 20px;
                display: block;
            }
            
            .dropdown-menu {
                position: static;
                opacity: 1;
                visibility: visible;
                transform: none;
                box-shadow: none;
                background: #f8f9fa;
                margin-left: 20px;
            }
        }
    `;
    document.head.appendChild(style);
};

// Counter animation untuk statistics
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    const updateCount = (counter) => {
        const target = parseInt(counter.textContent.replace(/[^0-9]/g, ''));
        const count = +counter.getAttribute('data-count') || 0;
        const increment = target / speed;
        
        if (count < target) {
            counter.setAttribute('data-count', Math.ceil(count + increment));
            if (counter.textContent.includes('K')) {
                counter.textContent = Math.ceil(count + increment) + 'K+';
            } else if (counter.textContent.includes('/')) {
                counter.textContent = '24/7';
            } else {
                counter.textContent = Math.ceil(count + increment) + '+';
            }
            setTimeout(() => updateCount(counter), 1);
        } else {
            counter.textContent = counter.textContent;
        }
    };
    
    // Intersection Observer untuk trigger animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                counter.setAttribute('data-count', '0');
                updateCount(counter);
                observer.unobserve(counter);
            }
        });
    });
    
    counters.forEach(counter => observer.observe(counter));
};

// Parallax effect untuk hero section
const addParallaxEffect = () => {
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
};

// Loading animation
const addLoadingAnimation = () => {
    // Add fade-in animation to elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .news-card, .stat-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
};

// Search functionality (placeholder)
const addSearchFunctionality = () => {
    // Create search modal
    const searchModal = document.createElement('div');
    searchModal.className = 'search-modal';
    searchModal.innerHTML = `
        <div class="search-overlay">
            <div class="search-container">
                <div class="search-header">
                    <h3>Cari Layanan Kesehatan</h3>
                    <button class="close-search"><i class="fas fa-times"></i></button>
                </div>
                <div class="search-form">
                    <input type="text" placeholder="Cari dokter, rumah sakit, atau layanan..." class="search-input">
                    <button class="search-btn"><i class="fas fa-search"></i></button>
                </div>
                <div class="search-suggestions">
                    <h4>Pencarian Populer:</h4>
                    <div class="suggestion-tags">
                        <span class="tag">Dokter Umum</span>
                        <span class="tag">Dokter Anak</span>
                        <span class="tag">Dokter Jantung</span>
                        <span class="tag">Rumah Sakit Terdekat</span>
                        <span class="tag">Tes COVID-19</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(searchModal);
    
    // Add search modal styles
    const searchStyles = document.createElement('style');
    searchStyles.textContent = `
        .search-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            z-index: 10000;
            display: none;
            align-items: center;
            justify-content: center;
        }
        
        .search-container {
            background: white;
            border-radius: 20px;
            padding: 40px;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
        }
        
        .search-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
        }
        
        .close-search {
            background: none;
            border: none;
            font-size: 24px;
            color: #999;
            cursor: pointer;
        }
        
        .search-form {
            display: flex;
            gap: 10px;
            margin-bottom: 30px;
        }
        
        .search-input {
            flex: 1;
            padding: 15px 20px;
            border: 2px solid #ff6b9d;
            border-radius: 25px;
            font-size: 16px;
            outline: none;
        }
        
        .search-btn {
            background: #ff6b9d;
            color: white;
            border: none;
            padding: 15px 25px;
            border-radius: 25px;
            cursor: pointer;
            font-size: 16px;
        }
        
        .suggestion-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 15px;
        }
        
        .tag {
            background: #ffe0e6;
            color: #ff6b9d;
            padding: 8px 15px;
            border-radius: 20px;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.3s;
        }
        
        .tag:hover {
            background: #ff6b9d;
            color: white;
        }
    `;
    document.head.appendChild(searchStyles);
};

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createMobileMenu();
    addMobileStyles();
    animateCounters();
    addParallaxEffect();
    addLoadingAnimation();
    addSearchFunctionality();
    
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add header scroll effect
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    header.style.transition = 'transform 0.3s ease';
});

// Service card interactions
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Form validation (untuk future forms)
const validateForm = (form) => {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#ff4757';
            isValid = false;
        } else {
            input.style.borderColor = '#ff6b9d';
        }
    });
    
    return isValid;
};

// Notification system
const showNotification = (message, type = 'success') => {
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
        transition: 'transform 0.3s ease'
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
};

// Pregnancy Calculator
const createPregnancyCalculator = () => {
    const calculatorModal = document.createElement('div');
    calculatorModal.className = 'calculator-modal';
    calculatorModal.innerHTML = `
        <div class="calculator-overlay">
            <div class="calculator-container">
                <div class="calculator-header">
                    <h3>Kalkulator Kehamilan</h3>
                    <button class="close-calculator"><i class="fas fa-times"></i></button>
                </div>
                <div class="calculator-form">
                    <div class="form-group">
                        <label>Tanggal Hari Pertama Haid Terakhir (HPHT)</label>
                        <input type="date" id="hpht-date" class="calculator-input">
                    </div>
                    <button class="calculate-btn">Hitung Kehamilan</button>
                </div>
                <div class="calculator-result" style="display: none;">
                    <h4>Hasil Perhitungan:</h4>
                    <div class="result-grid">
                        <div class="result-item">
                            <strong>Usia Kehamilan:</strong>
                            <span id="pregnancy-age"></span>
                        </div>
                        <div class="result-item">
                            <strong>Perkiraan Lahir (HPL):</strong>
                            <span id="due-date"></span>
                        </div>
                        <div class="result-item">
                            <strong>Trimester:</strong>
                            <span id="trimester"></span>
                        </div>
                        <div class="result-item">
                            <strong>Sisa Hari:</strong>
                            <span id="days-left"></span>
                        </div>
                    </div>
                    <div class="pregnancy-tips">
                        <h5>Tips untuk Trimester Ini:</h5>
                        <div id="trimester-tips"></div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(calculatorModal);
    
    // Add calculator styles
    const calculatorStyles = document.createElement('style');
    calculatorStyles.textContent = `
        .calculator-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            z-index: 10000;
            display: none;
            align-items: center;
            justify-content: center;
        }
        
        .calculator-container {
            background: white;
            border-radius: 20px;
            padding: 40px;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
        }
        
        .calculator-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #f0f0f0;
            padding-bottom: 20px;
        }
        
        .close-calculator {
            background: none;
            border: none;
            font-size: 24px;
            color: #999;
            cursor: pointer;
        }
        
        .calculator-input {
            width: 100%;
            padding: 15px;
            border: 2px solid #ff6b9d;
            border-radius: 10px;
            font-size: 16px;
            margin-bottom: 20px;
        }
        
        .calculate-btn {
            background: #ff6b9d;
            color: white;
            padding: 15px 30px;
            border: none;
            border-radius: 25px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            width: 100%;
            transition: all 0.3s;
        }
        
        .calculate-btn:hover {
            background: #ff5a8a;
        }
        
        .calculator-result {
            margin-top: 30px;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 15px;
        }
        
        .result-grid {
            display: grid;
            gap: 15px;
            margin-bottom: 20px;
        }
        
        .result-item {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid #e0e0e0;
        }
        
        .pregnancy-tips {
            background: #ffe0e6;
            padding: 20px;
            border-radius: 10px;
            margin-top: 20px;
        }
        
        .pregnancy-tips h5 {
            color: #ff6b9d;
            margin-bottom: 15px;
        }
    `;
    document.head.appendChild(calculatorStyles);
    
    // Calculator functionality
    const calculateBtn = calculatorModal.querySelector('.calculate-btn');
    const hphtInput = calculatorModal.querySelector('#hpht-date');
    const resultDiv = calculatorModal.querySelector('.calculator-result');
    
    calculateBtn.addEventListener('click', () => {
        const hphtDate = new Date(hphtInput.value);
        const today = new Date();
        
        if (!hphtInput.value) {
            alert('Silakan masukkan tanggal HPHT');
            return;
        }
        
        // Calculate pregnancy age in weeks
        const diffTime = today - hphtDate;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const weeks = Math.floor(diffDays / 7);
        const days = diffDays % 7;
        
        // Calculate due date (280 days from HPHT)
        const dueDate = new Date(hphtDate);
        dueDate.setDate(dueDate.getDate() + 280);
        
        // Calculate days left
        const daysLeft = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
        
        // Determine trimester
        let trimester = '';
        let tips = '';
        
        if (weeks <= 12) {
            trimester = 'Trimester 1';
            tips = 'Konsumsi asam folat, hindari alkohol dan rokok, istirahat cukup, dan konsultasi rutin dengan dokter.';
        } else if (weeks <= 28) {
            trimester = 'Trimester 2';
            tips = 'Lakukan olahraga ringan, konsumsi makanan bergizi, mulai persiapan persalinan, dan ikuti kelas senam hamil.';
        } else {
            trimester = 'Trimester 3';
            tips = 'Persiapkan perlengkapan bayi, pelajari teknik pernapasan, siapkan tas persalinan, dan rutin kontrol ke dokter.';
        }
        
        // Display results
        document.getElementById('pregnancy-age').textContent = `${weeks} minggu ${days} hari`;
        document.getElementById('due-date').textContent = dueDate.toLocaleDateString('id-ID');
        document.getElementById('trimester').textContent = trimester;
        document.getElementById('days-left').textContent = `${daysLeft} hari lagi`;
        document.getElementById('trimester-tips').textContent = tips;
        
        resultDiv.style.display = 'block';
    });
    
    // Close calculator
    calculatorModal.querySelector('.close-calculator').addEventListener('click', () => {
        calculatorModal.style.display = 'none';
    });
    
    calculatorModal.addEventListener('click', (e) => {
        if (e.target === calculatorModal) {
            calculatorModal.style.display = 'none';
        }
    });
};

// Booking System
const createBookingSystem = () => {
    const bookingModal = document.createElement('div');
    bookingModal.className = 'booking-modal';
    bookingModal.innerHTML = `
        <div class="booking-overlay">
            <div class="booking-container">
                <div class="booking-header">
                    <h3>Booking Kelas Privat</h3>
                    <button class="close-booking"><i class="fas fa-times"></i></button>
                </div>
                
                <div class="booking-steps">
                    <div class="step active" data-step="1">
                        <span class="step-number">1</span>
                        <span class="step-title">Pilih Kelas</span>
                    </div>
                    <div class="step" data-step="2">
                        <span class="step-number">2</span>
                        <span class="step-title">Pilih Jadwal</span>
                    </div>
                    <div class="step" data-step="3">
                        <span class="step-number">3</span>
                        <span class="step-title">Data Diri</span>
                    </div>
                    <div class="step" data-step="4">
                        <span class="step-number">4</span>
                        <span class="step-title">Konfirmasi</span>
                    </div>
                </div>
                
                <div class="booking-content">
                    <!-- Step 1: Class Selection -->
                    <div class="booking-step" id="step-1">
                        <h4>Pilih Jenis Kelas</h4>
                        <div class="class-options">
                            <div class="class-option" data-class="senam-hamil" data-price="150000">
                                <div class="option-icon"><i class="fas fa-dumbbell"></i></div>
                                <div class="option-info">
                                    <h5>Senam Hamil</h5>
                                    <p>Olahraga khusus ibu hamil</p>
                                    <span class="option-price">Rp 150.000</span>
                                </div>
                            </div>
                            <div class="class-option" data-class="kelas-menyusui" data-price="200000">
                                <div class="option-icon"><i class="fas fa-baby"></i></div>
                                <div class="option-info">
                                    <h5>Kelas Menyusui</h5>
                                    <p>Panduan teknik menyusui</p>
                                    <span class="option-price">Rp 200.000</span>
                                </div>
                            </div>
                            <div class="class-option" data-class="kelas-mpasi" data-price="250000">
                                <div class="option-icon"><i class="fas fa-utensils"></i></div>
                                <div class="option-info">
                                    <h5>Kelas MPASI</h5>
                                    <p>Workshop makanan bayi</p>
                                    <span class="option-price">Rp 250.000</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Step 2: Schedule Selection -->
                    <div class="booking-step" id="step-2" style="display: none;">
                        <h4>Pilih Tanggal & Waktu</h4>
                        <div class="calendar-section">
                            <div class="calendar-header">
                                <button class="calendar-nav" id="prev-month">&lt;</button>
                                <h5 id="calendar-month"></h5>
                                <button class="calendar-nav" id="next-month">&gt;</button>
                            </div>
                            <div class="calendar-grid" id="calendar-grid"></div>
                        </div>
                        <div class="time-section">
                            <h5>Pilih Waktu</h5>
                            <div class="time-slots" id="time-slots"></div>
                        </div>
                    </div>
                    
                    <!-- Step 3: Personal Data -->
                    <div class="booking-step" id="step-3" style="display: none;">
                        <h4>Data Diri</h4>
                        <div class="booking-form">
                            <div class="form-group">
                                <label>Nama Lengkap *</label>
                                <input type="text" id="customer-name" required>
                            </div>
                            <div class="form-group">
                                <label>Email *</label>
                                <input type="email" id="customer-email" required>
                            </div>
                            <div class="form-group">
                                <label>No. WhatsApp *</label>
                                <input type="tel" id="customer-phone" required>
                            </div>
                            <div class="form-group">
                                <label>Usia Kehamilan (jika hamil)</label>
                                <input type="text" id="pregnancy-age-input" placeholder="contoh: 20 minggu">
                            </div>
                            <div class="form-group">
                                <label>Catatan Khusus</label>
                                <textarea id="special-notes" rows="3" placeholder="Kondisi kesehatan khusus, alergi, dll."></textarea>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Step 4: Confirmation -->
                    <div class="booking-step" id="step-4" style="display: none;">
                        <h4>Konfirmasi Booking</h4>
                        <div class="booking-summary">
                            <div class="summary-item">
                                <span>Kelas:</span>
                                <span id="summary-class"></span>
                            </div>
                            <div class="summary-item">
                                <span>Tanggal:</span>
                                <span id="summary-date"></span>
                            </div>
                            <div class="summary-item">
                                <span>Waktu:</span>
                                <span id="summary-time"></span>
                            </div>
                            <div class="summary-item">
                                <span>Nama:</span>
                                <span id="summary-name"></span>
                            </div>
                            <div class="summary-item summary-total">
                                <span>Total Biaya:</span>
                                <span id="summary-price"></span>
                            </div>
                        </div>
                        <div class="payment-info">
                            <h5>Informasi Pembayaran</h5>
                            <p>Silakan transfer ke rekening berikut:</p>
                            <div class="bank-info">
                                <strong>Bank BCA: 1234567890</strong><br>
                                <strong>a.n. Mediz.id</strong>
                            </div>
                            <p><small>Konfirmasi pembayaran akan dikirim via WhatsApp</small></p>
                        </div>
                    </div>
                </div>
                
                <div class="booking-actions">
                    <button class="btn-cancel" id="booking-cancel">Batal</button>
                    <button class="btn-back" id="booking-back" style="display: none;">Kembali</button>
                    <button class="btn-next" id="booking-next">Selanjutnya</button>
                    <button class="btn-confirm" id="booking-confirm" style="display: none;">Konfirmasi Booking</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(bookingModal);
    
    // Add booking system styles
    const bookingStyles = document.createElement('style');
    bookingStyles.textContent = `
        .booking-steps {
            display: flex;
            justify-content: space-between;
            margin-bottom: 40px;
            padding: 0 20px;
        }
        
        .step {
            display: flex;
            flex-direction: column;
            align-items: center;
            opacity: 0.5;
            transition: all 0.3s;
        }
        
        .step.active {
            opacity: 1;
        }
        
        .step-number {
            width: 40px;
            height: 40px;
            background: #f0f0f0;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            margin-bottom: 10px;
            transition: all 0.3s;
        }
        
        .step.active .step-number {
            background: #ff6b9d;
            color: white;
        }
        
        .step-title {
            font-size: 14px;
            text-align: center;
        }
        
        .class-options {
            display: grid;
            gap: 20px;
        }
        
        .class-option {
            display: flex;
            align-items: center;
            padding: 20px;
            border: 2px solid #f0f0f0;
            border-radius: 15px;
            cursor: pointer;
            transition: all 0.3s;
        }
        
        .class-option:hover {
            border-color: #ff6b9d;
            background: #ffe0e6;
        }
        
        .class-option.selected {
            border-color: #ff6b9d;
            background: #ffe0e6;
        }
        
        .option-icon {
            width: 60px;
            height: 60px;
            background: #ff6b9d;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 20px;
        }
        
        .option-icon i {
            color: white;
            font-size: 24px;
        }
        
        .option-info h5 {
            margin-bottom: 5px;
            color: #333;
        }
        
        .option-info p {
            color: #666;
            margin-bottom: 10px;
        }
        
        .option-price {
            font-weight: 700;
            color: #ff6b9d;
            font-size: 18px;
        }
        
        .calendar-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }
        
        .calendar-nav {
            background: #ff6b9d;
            color: white;
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 18px;
        }
        
        .bank-info {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 10px;
            margin: 15px 0;
            text-align: center;
        }
        
        .btn-back, .btn-next {
            padding: 12px 25px;
            background: #ff6b9d;
            color: white;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s;
        }
        
        .btn-back {
            background: #f0f0f0;
            color: #666;
        }
        
        .btn-back:hover {
            background: #e0e0e0;
        }
        
        .btn-next:hover, .btn-confirm:hover {
            background: #ff5a8a;
        }
    `;
    document.head.appendChild(bookingStyles);
    
    // Booking system functionality will be added here
    let currentStep = 1;
    let selectedClass = null;
    let selectedDate = null;
    let selectedTime = null;
    
    // Initialize booking system
    const initBookingSystem = () => {
        // Class selection
        const classOptions = bookingModal.querySelectorAll('.class-option');
        classOptions.forEach(option => {
            option.addEventListener('click', () => {
                classOptions.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                selectedClass = {
                    type: option.dataset.class,
                    price: option.dataset.price,
                    name: option.querySelector('h5').textContent
                };
            });
        });
        
        // Navigation buttons
        const nextBtn = bookingModal.querySelector('#booking-next');
        const backBtn = bookingModal.querySelector('#booking-back');
        const confirmBtn = bookingModal.querySelector('#booking-confirm');
        const cancelBtn = bookingModal.querySelector('#booking-cancel');
        
        nextBtn.addEventListener('click', () => {
            if (validateStep(currentStep)) {
                nextStep();
            }
        });
        
        backBtn.addEventListener('click', () => {
            prevStep();
        });
        
        confirmBtn.addEventListener('click', () => {
            confirmBooking();
        });
        
        cancelBtn.addEventListener('click', () => {
            bookingModal.style.display = 'none';
        });
        
        // Generate calendar and time slots
        generateCalendar();
        generateTimeSlots();
    };
    
    const validateStep = (step) => {
        switch(step) {
            case 1:
                if (!selectedClass) {
                    alert('Silakan pilih jenis kelas');
                    return false;
                }
                break;
            case 2:
                if (!selectedDate || !selectedTime) {
                    alert('Silakan pilih tanggal dan waktu');
                    return false;
                }
                break;
            case 3:
                const name = document.getElementById('customer-name').value;
                const email = document.getElementById('customer-email').value;
                const phone = document.getElementById('customer-phone').value;
                
                if (!name || !email || !phone) {
                    alert('Silakan lengkapi data yang wajib diisi');
                    return false;
                }
                break;
        }
        return true;
    };
    
    const nextStep = () => {
        if (currentStep < 4) {
            currentStep++;
            updateStepDisplay();
        }
    };
    
    const prevStep = () => {
        if (currentStep > 1) {
            currentStep--;
            updateStepDisplay();
        }
    };
    
    const updateStepDisplay = () => {
        // Update step indicators
        const steps = bookingModal.querySelectorAll('.step');
        steps.forEach((step, index) => {
            if (index + 1 <= currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
        
        // Show/hide step content
        const stepContents = bookingModal.querySelectorAll('.booking-step');
        stepContents.forEach((content, index) => {
            content.style.display = index + 1 === currentStep ? 'block' : 'none';
        });
        
        // Update buttons
        const nextBtn = bookingModal.querySelector('#booking-next');
        const backBtn = bookingModal.querySelector('#booking-back');
        const confirmBtn = bookingModal.querySelector('#booking-confirm');
        
        backBtn.style.display = currentStep > 1 ? 'inline-block' : 'none';
        nextBtn.style.display = currentStep < 4 ? 'inline-block' : 'none';
        confirmBtn.style.display = currentStep === 4 ? 'inline-block' : 'none';
        
        // Update summary on step 4
        if (currentStep === 4) {
            updateSummary();
        }
    };
    
    const generateCalendar = () => {
        const calendarGrid = bookingModal.querySelector('#calendar-grid');
        const today = new Date();
        
        // Generate next 30 days
        for (let i = 1; i <= 30; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day available';
            dayElement.textContent = date.getDate();
            dayElement.dataset.date = date.toISOString().split('T')[0];
            
            dayElement.addEventListener('click', () => {
                calendarGrid.querySelectorAll('.calendar-day').forEach(day => {
                    day.classList.remove('selected');
                });
                dayElement.classList.add('selected');
                selectedDate = date.toISOString().split('T')[0];
            });
            
            calendarGrid.appendChild(dayElement);
        }
    };
    
    const generateTimeSlots = () => {
        const timeSlotsContainer = bookingModal.querySelector('#time-slots');
        const timeSlots = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];
        
        timeSlots.forEach(time => {
            const timeElement = document.createElement('div');
            timeElement.className = 'time-slot';
            timeElement.textContent = time;
            
            timeElement.addEventListener('click', () => {
                timeSlotsContainer.querySelectorAll('.time-slot').forEach(slot => {
                    slot.classList.remove('selected');
                });
                timeElement.classList.add('selected');
                selectedTime = time;
            });
            
            timeSlotsContainer.appendChild(timeElement);
        });
    };
    
    const updateSummary = () => {
        document.getElementById('summary-class').textContent = selectedClass.name;
        document.getElementById('summary-date').textContent = new Date(selectedDate).toLocaleDateString('id-ID');
        document.getElementById('summary-time').textContent = selectedTime;
        document.getElementById('summary-name').textContent = document.getElementById('customer-name').value;
        document.getElementById('summary-price').textContent = `Rp ${parseInt(selectedClass.price).toLocaleString('id-ID')}`;
    };
    
    const confirmBooking = () => {
        const bookingData = {
            class: selectedClass,
            date: selectedDate,
            time: selectedTime,
            customer: {
                name: document.getElementById('customer-name').value,
                email: document.getElementById('customer-email').value,
                phone: document.getElementById('customer-phone').value,
                pregnancyAge: document.getElementById('pregnancy-age-input').value,
                notes: document.getElementById('special-notes').value
            }
        };
        
        // Here you would normally send the data to your backend
        console.log('Booking confirmed:', bookingData);
        
        // Show success message
        alert('Booking berhasil! Kami akan menghubungi Anda via WhatsApp untuk konfirmasi pembayaran.');
        
        // Close modal
        bookingModal.style.display = 'none';
        
        // Reset form
        currentStep = 1;
        selectedClass = null;
        selectedDate = null;
        selectedTime = null;
        updateStepDisplay();
    };
    
    // Initialize the booking system
    initBookingSystem();
    
    // Close modal when clicking outside
    bookingModal.addEventListener('click', (e) => {
        if (e.target === bookingModal) {
            bookingModal.style.display = 'none';
        }
    });
};

// Baby Development Tracker
const createBabyTracker = () => {
    const trackerModal = document.createElement('div');
    trackerModal.className = 'tracker-modal';
    trackerModal.innerHTML = `
        <div class="tracker-overlay">
            <div class="tracker-container">
                <div class="tracker-header">
                    <h3>Tracker Perkembangan Bayi</h3>
                    <button class="close-tracker"><i class="fas fa-times"></i></button>
                </div>
                <div class="tracker-form">
                    <div class="form-group">
                        <label>Tanggal Lahir Bayi</label>
                        <input type="date" id="baby-birthdate" class="tracker-input">
                    </div>
                    <button class="track-btn">Lihat Perkembangan</button>
                </div>
                <div class="tracker-result" style="display: none;">
                    <div class="baby-age">
                        <h4>Usia Bayi: <span id="baby-age-display"></span></h4>
                    </div>
                    <div class="milestones">
                        <h5>Milestone yang Sudah Dicapai:</h5>
                        <div id="achieved-milestones"></div>
                        <h5>Milestone Selanjutnya:</h5>
                        <div id="upcoming-milestones"></div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(trackerModal);
    
    // Milestone data
    const milestones = {
        1: ['Mengangkat kepala sebentar', 'Merespons suara'],
        2: ['Tersenyum sosial', 'Mengikuti objek dengan mata'],
        3: ['Mengangkat kepala 45 derajat', 'Tertawa'],
        4: ['Berguling dari telentang ke tengkurap', 'Meraih mainan'],
        6: ['Duduk dengan bantuan', 'Mulai makan MPASI'],
        9: ['Merangkak', 'Berdiri dengan pegangan'],
        12: ['Berjalan dengan bantuan', 'Mengucapkan kata pertama'],
        18: ['Berjalan mandiri', 'Mengatakan 10-20 kata'],
        24: ['Berlari', 'Menggabungkan 2 kata']
    };
    
    // Tracker functionality
    const trackBtn = trackerModal.querySelector('.track-btn');
    const birthdateInput = trackerModal.querySelector('#baby-birthdate');
    const resultDiv = trackerModal.querySelector('.tracker-result');
    
    trackBtn.addEventListener('click', () => {
        const birthdate = new Date(birthdateInput.value);
        const today = new Date();
        
        if (!birthdateInput.value) {
            alert('Silakan masukkan tanggal lahir bayi');
            return;
        }
        
        const ageInMonths = Math.floor((today - birthdate) / (1000 * 60 * 60 * 24 * 30.44));
        
        document.getElementById('baby-age-display').textContent = `${ageInMonths} bulan`;
        
        // Show achieved milestones
        const achievedDiv = document.getElementById('achieved-milestones');
        const upcomingDiv = document.getElementById('upcoming-milestones');
        
        achievedDiv.innerHTML = '';
        upcomingDiv.innerHTML = '';
        
        Object.keys(milestones).forEach(month => {
            const monthNum = parseInt(month);
            if (monthNum <= ageInMonths) {
                milestones[month].forEach(milestone => {
                    const milestoneEl = document.createElement('div');
                    milestoneEl.className = 'milestone-item achieved';
                    milestoneEl.innerHTML = `<i class="fas fa-check"></i> ${milestone} (${month} bulan)`;
                    achievedDiv.appendChild(milestoneEl);
                });
            } else if (monthNum === ageInMonths + 1 || (ageInMonths < 1 && monthNum === 1)) {
                milestones[month].forEach(milestone => {
                    const milestoneEl = document.createElement('div');
                    milestoneEl.className = 'milestone-item upcoming';
                    milestoneEl.innerHTML = `<i class="fas fa-clock"></i> ${milestone} (${month} bulan)`;
                    upcomingDiv.appendChild(milestoneEl);
                });
            }
        });
        
        resultDiv.style.display = 'block';
    });
    
    // Close tracker
    trackerModal.querySelector('.close-tracker').addEventListener('click', () => {
        trackerModal.style.display = 'none';
    });
    
    trackerModal.addEventListener('click', (e) => {
        if (e.target === trackerModal) {
            trackerModal.style.display = 'none';
        }
    });
};

// Initialize all new features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createPregnancyCalculator();
    // createBookingSystem(); // DISABLED - All buttons redirect to WhatsApp
    createBabyTracker();
    
    // Add event listeners for tool buttons
    document.addEventListener('click', (e) => {
        if (e.target.closest('.tool-btn')) {
            const toolCard = e.target.closest('.tool-card');
            const toolIcon = toolCard.querySelector('.tool-icon i');
            
            if (toolIcon.classList.contains('fa-calculator')) {
                document.querySelector('.calculator-modal').style.display = 'flex';
            } else if (toolIcon.classList.contains('fa-chart-line')) {
                document.querySelector('.tracker-modal').style.display = 'flex';
            } else if (toolIcon.classList.contains('fa-bell')) {
                showNotification('Fitur reminder akan segera hadir!', 'success');
            } else if (toolIcon.classList.contains('fa-comments')) {
                // Open WhatsApp chat
                window.open('https://wa.link/q0zct5', '_blank');
            }
        }
        
        // DISABLED - Booking modal, all buttons now redirect to WhatsApp
        // if (e.target.closest('.class-btn') || e.target.closest('.service-link')) {
        //     document.querySelector('.booking-modal').style.display = 'flex';
        // }
    });
    
    // Add floating animation to hero stats
    const statBubbles = document.querySelectorAll('.stat-bubble');
    statBubbles.forEach((bubble, index) => {
        bubble.style.animation = `float 3s ease-in-out infinite ${index * 0.5}s`;
    });
    
    // Add CSS for floating animation
    const floatingStyles = document.createElement('style');
    floatingStyles.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
        
        .milestone-item {
            padding: 10px 15px;
            margin: 10px 0;
            border-radius: 10px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .milestone-item.achieved {
            background: #e8f5e8;
            color: #2e7d32;
        }
        
        .milestone-item.upcoming {
            background: #fff3e0;
            color: #f57c00;
        }
        
        .tracker-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            z-index: 10000;
            display: none;
            align-items: center;
            justify-content: center;
        }
        
        .tracker-container {
            background: white;
            border-radius: 20px;
            padding: 40px;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
        }
        
        .tracker-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #f0f0f0;
            padding-bottom: 20px;
        }
        
        .close-tracker {
            background: none;
            border: none;
            font-size: 24px;
            color: #999;
            cursor: pointer;
        }
        
        .tracker-input {
            width: 100%;
            padding: 15px;
            border: 2px solid #ff6b9d;
            border-radius: 10px;
            font-size: 16px;
            margin-bottom: 20px;
        }
        
        .track-btn {
            background: #ff6b9d;
            color: white;
            padding: 15px 30px;
            border: none;
            border-radius: 25px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            width: 100%;
            transition: all 0.3s;
        }
        
        .track-btn:hover {
            background: #ff5a8a;
        }
        
        .tracker-result {
            margin-top: 30px;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 15px;
        }
        
        .baby-age {
            text-align: center;
            margin-bottom: 30px;
            padding: 20px;
            background: #ffe0e6;
            border-radius: 15px;
        }
        
        .baby-age h4 {
            color: #ff6b9d;
            font-size: 24px;
        }
    `;
    document.head.appendChild(floatingStyles);
});