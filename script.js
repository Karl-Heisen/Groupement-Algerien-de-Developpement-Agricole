// script.js
const translations = {
    en: {
        // ... (keep all existing keys, and add the new ones below) ...
        "partner1": "Ministry of Agriculture",
        "partner2": "ANDI (National Agency of Investment Development)",
        "partner3": "INRA (National Institute of Agronomic Research)",
        "partner4": "CNA (National Chamber of Agriculture)",
        "partner5": "BADR Bank",
        "partner6": "ITDAS (Technical Institute for Agricultural Development)",
        "counter-projects": "Projects Completed",
        "counter-investors": "Investors Supported",
        "counter-hectares": "Hectares Under Monitoring",
        "map-placeholder": "Map placeholder – Headquarters location",
        "footer-reports": "Annual Reports",
        "footer-research": "Research Papers",
        "footer-news": "News & Updates",
        "footer-follow": "Follow Us"
    },
    fr: {
        // ... French translations for the same keys ...
        "partner1": "Ministère de l'Agriculture",
        "partner2": "ANDI",
        "partner3": "INRA",
        "partner4": "CNA",
        "partner5": "Banque BADR",
        "partner6": "ITDAS",
        "counter-projects": "Projets réalisés",
        "counter-investors": "Investisseurs soutenus",
        "counter-hectares": "Hectares sous suivi",
        "map-placeholder": "Emplacement du siège – placeholder",
        "footer-reports": "Rapports annuels",
        "footer-research": "Documents de recherche",
        "footer-news": "Actualités",
        "footer-follow": "Suivez-nous"
    },
    ar: {
        // ... Arabic translations ...
        "partner1": "وزارة الفلاحة",
        "partner2": "الوكالة الوطنية لتطوير الاستثمار",
        "partner3": "المعهد الوطني للبحث الزراعي",
        "partner4": "الغرفة الوطنية للفلاحة",
        "partner5": "بنك بدر",
        "partner6": "المعهد التقني للتنمية الفلاحية",
        "counter-projects": "مشروع مكتمل",
        "counter-investors": "مستثمر مدعوم",
        "counter-hectares": "هكتار تحت المراقبة",
        "map-placeholder": "موقع المقر الرئيسي – placeholder",
        "footer-reports": "التقارير السنوية",
        "footer-research": "أوراق بحثية",
        "footer-news": "الأخبار",
        "footer-follow": "تابعنا"
    }
};

// Application state
let currentLang = localStorage.getItem('gada-lang') || 'en';
let darkMode = localStorage.getItem('gada-theme') === 'dark';

// DOM elements
const html = document.documentElement;
const header = document.getElementById('header');
const langToggle = document.getElementById('languageToggle');
const langMenu = document.getElementById('langMenu');
const currentLangSpan = document.getElementById('currentLang');
const langOptions = document.querySelectorAll('.lang-option');
const themeToggle = document.getElementById('themeToggle');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

// Initialize
function init() {
    applyTheme();
    applyLanguage();
    setupScrollEffects();
    setupCounters();
    // Event listeners
    themeToggle.addEventListener('click', toggleTheme);
    langToggle.addEventListener('click', toggleLangMenu);
    document.addEventListener('click', closeLangMenuOutside);
    langOptions.forEach(opt => opt.addEventListener('click', (e) => {
        e.stopPropagation();
        changeLanguage(opt.dataset.lang);
        toggleLangMenu(); // close after select
    }));
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    document.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', closeMobileMenu));
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

function toggleLangMenu() {
    const expanded = langToggle.getAttribute('aria-expanded') === 'true' ? false : true;
    langToggle.setAttribute('aria-expanded', expanded);
    langMenu.classList.toggle('hidden');
}

function closeLangMenuOutside(e) {
    if (!langToggle.contains(e.target) && !langMenu.contains(e.target)) {
        langMenu.classList.add('hidden');
        langToggle.setAttribute('aria-expanded', 'false');
    }
}

function applyTheme() {
    if (darkMode) {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
    }
    lucide.createIcons();
}

function toggleTheme() {
    darkMode = !darkMode;
    localStorage.setItem('gada-theme', darkMode ? 'dark' : 'light');
    applyTheme();
}

function applyLanguage() {
    // Update RTL and font
    if (currentLang === 'ar') {
        html.dir = 'rtl';
        html.classList.add('font-arabic');
        html.classList.remove('font-french');
    } else if (currentLang === 'fr') {
        html.dir = 'ltr';
        html.classList.add('font-french');
        html.classList.remove('font-arabic');
    } else {
        html.dir = 'ltr';
        html.classList.remove('font-arabic', 'font-french');
    }
    currentLangSpan.textContent = currentLang.toUpperCase();
    // Update checkmarks
    document.querySelectorAll('[id^="check-"]').forEach(el => el.style.display = 'none');
    const check = document.getElementById(`check-${currentLang}`);
    if (check) check.style.display = 'block';
    // Translate all elements with id matching keys
    Object.keys(translations[currentLang]).forEach(key => {
        const el = document.getElementById(key);
        if (el) el.textContent = translations[currentLang][key];
    });
    // Recreate icons to handle RTL/LTR
    lucide.createIcons();
}

function changeLanguage(lang) {
    if (translations[lang]) {
        currentLang = lang;
        localStorage.setItem('gada-lang', lang);
        applyLanguage();
    }
}

function toggleMobileMenu() {
    mobileMenu.classList.toggle('hidden');
    const icon = mobileMenuBtn.querySelector('i');
    if (mobileMenu.classList.contains('hidden')) {
        icon.setAttribute('data-lucide', 'menu');
    } else {
        icon.setAttribute('data-lucide', 'x');
    }
    lucide.createIcons();
}

function closeMobileMenu() {
    mobileMenu.classList.add('hidden');
    mobileMenuBtn.querySelector('i').setAttribute('data-lucide', 'menu');
    lucide.createIcons();
}

function setupScrollEffects() {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('bg-white/90', 'dark:bg-gray-800/90', 'backdrop-blur-md', 'shadow-md');
            header.classList.remove('bg-transparent');
        } else {
            header.classList.remove('bg-white/90', 'dark:bg-gray-800/90', 'backdrop-blur-md', 'shadow-md');
            header.classList.add('bg-transparent');
        }
    });
}

function setupCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText;
                    const increment = target / speed;
                    if (count < target) {
                        counter.innerText = Math.ceil(count + increment);
                        setTimeout(updateCount, 10);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(counter => observer.observe(counter));
}

document.addEventListener('DOMContentLoaded', init);
