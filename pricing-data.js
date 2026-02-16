// Pricing Data untuk semua wilayah
const pricingData = {
    'jakarta-tangerang': {
        name: 'Jakarta - Tangerang',
        momCare: {
            yogaHamil: { price: 120000, duration: '60 menit' },
            yogaCouple: { price: 230000, duration: '60 menit' },
            pijatPayudara: { price: 80000, duration: '40 menit' },
            pijatOksitosin: { price: 110000, duration: '40 menit' },
            pijatLaktasi: { price: 150000, duration: '60 menit' }
        },
        babyTreatment: {
            massage30: { price: 85000, duration: '30 menit' },
            massage45: { price: 100000, duration: '45 menit' },
            massageScrub: { price: 130000, duration: '45 menit' },
            massageGym: { price: 130000, duration: '35 menit' },
            cukurBath: { price: 45000, duration: 'Oral Care' }
        },
        newbornCare: {
            insidentil: { price: 199000, duration: '2-3 jam/hari' },
            hari3: { price: 550000, duration: '3 hari' },
            hari7: { price: 1100000, duration: '7 hari' },
            hari14: { price: 2200000, duration: '14+1 hari' },
            hari30: { price: 4000000, duration: '30 hari' }
        },
        paketNewbornMom: {
            insidentil: { price: 650000, duration: '1 hari' },
            bronze: { price: 1550000, duration: '3 hari' },
            silver: { price: 2250000, duration: '7 hari' },
            gold: { price: 3000000, duration: '14+1 hari' },
            platinum: { price: 5800000, duration: '30 hari' }
        },
        kelasPrivateCouple: {
            persiapanPersalinan: { price: 250000, duration: '120 menit' },
            gentlePregnancy: { price: 385000, priceNoYoga: 285000, duration: '90 menit' },
            hypnobirthing: { price: 385000, priceNoYoga: 285000, duration: '90 menit' },
            momBabyNewborn: { price: 385000, duration: '120 menit' },
            persiapanMenyusui: { price: 275000, duration: '90 menit' }
        },
        kelasPrivate: {
            persiapanPersalinan: { price: 250000, duration: '120 menit' },
            gentlePregnancy: { price: 275000, priceNoYoga: 175000, duration: '90 menit' },
            hypnobirthing: { price: 275000, priceNoYoga: 175000, duration: '90 menit' },
            momBabyNewborn: { price: 385000, duration: '120 menit' },
            persiapanMenyusui: { price: 150000, duration: '60 menit' }
        },
        pendampinganPersalinan: {
            comfortSupport: { price: 8500000, freeModul: 5 },
            holisticSupport: { price: 12500000, freeModul: 7 },
            readyBirth: { price: 4700000, freeModul: 2 }
        }
    },
    'surabaya-malang': {
        name: 'Surabaya - Malang',
        momCare: {
            yogaHamil: { price: 100000, duration: '60 menit' },
            yogaCouple: { price: 200000, duration: '60 menit' },
            pijatPayudara: { price: 70000, duration: '40 menit' },
            pijatOksitosin: { price: 110000, duration: '40 menit' },
            pijatLaktasi: { price: 120000, duration: '60 menit' }
        },
        babyTreatment: {
            massage30: { price: 85000, duration: '30 menit' },
            massage45: { price: 100000, duration: '45 menit' },
            massageScrub: { price: 130000, duration: '45 menit' },
            massageGym: { price: 130000, duration: '35 menit' },
            cukurBath: { price: 35000, duration: 'Oral Care' }
        },
        newbornCare: {
            insidentil: { price: 150000, duration: '2-3 jam/hari' },
            hari3: { price: 420000, duration: '3 hari' },
            hari7: { price: 950000, duration: '7 hari' },
            hari14: { price: 1850000, duration: '14+1 hari' },
            hari30: { price: 3400000, duration: '30 hari' }
        },
        paketNewbornMom: {
            insidentil: { price: 199000, duration: '1 hari' },
            bronze: { price: 575000, duration: '3 hari' },
            silver: { price: 1250000, duration: '7 hari' },
            gold: { price: 2500000, duration: '14+1 hari' },
            platinum: { price: 4700000, duration: '30 hari' }
        },
        kelasPrivateCouple: {
            persiapanPersalinan: { price: 200000, duration: '120 menit' },
            gentlePregnancy: { price: 285000, priceNoYoga: 175000, duration: '90 menit' },
            hypnobirthing: { price: 285000, priceNoYoga: 175000, duration: '90 menit' },
            momBabyNewborn: { price: 300000, duration: '120 menit' },
            persiapanMenyusui: { price: 198000, duration: '90 menit' }
        },
        kelasPrivate: {
            persiapanPersalinan: { price: 200000, duration: '120 menit' },
            gentlePregnancy: { price: 275000, priceNoYoga: 175000, duration: '90 menit' },
            hypnobirthing: { price: 275000, priceNoYoga: 175000, duration: '90 menit' },
            momBabyNewborn: { price: 385000, duration: '120 menit' },
            persiapanMenyusui: { price: 150000, duration: '60 menit' }
        },
        pendampinganPersalinan: {
            comfortSupport: { price: 7500000, freeModul: 5 },
            holisticSupport: { price: 10500000, freeModul: 7 },
            readyBirth: { price: 4200000, freeModul: 2 }
        }
    }
};

// Format currency
function formatPrice(price) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(price);
}

// Get selected region from localStorage or default
function getSelectedRegion() {
    return localStorage.getItem('selectedRegion') || null;
}

// Set selected region
function setSelectedRegion(region) {
    localStorage.setItem('selectedRegion', region);
}

// Get pricing for selected region
function getPricing(region = null) {
    const selectedRegion = region || getSelectedRegion() || 'jakarta-tangerang';
    return pricingData[selectedRegion] || pricingData['jakarta-tangerang'];
}

// Make functions globally available
if (typeof window !== 'undefined') {
    window.pricingData = pricingData;
    window.formatPrice = formatPrice;
    window.getSelectedRegion = getSelectedRegion;
    window.setSelectedRegion = setSelectedRegion;
    window.getPricing = getPricing;
}