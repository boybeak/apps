let config = {};

async function loadConfig() {
    try {
        const response = await fetch('data/config.json');
        config = await response.json();
        applyConfig();
    } catch (error) {
        console.error('加载配置数据失败:', error);
    }
}

function applyConfig() {
    const logoSpans = document.querySelectorAll('.logo span');
    logoSpans.forEach(span => {
        if (!span.classList.contains('logo-dot')) {
            span.textContent = config.site.subtitle;
        }
    });
    
    const footerSections = document.querySelectorAll('.footer-section');
    if (footerSections.length >= 3) {
        footerSections[0].querySelector('h3').textContent = config.site.subtitle;
        footerSections[0].querySelector('p').textContent = '一个展示我个人数字作品的网站，记录我的创造历程和技术探索。';
        
        const socialLinks = document.querySelectorAll('.social-link');
        if (socialLinks.length >= 4) {
            socialLinks[0].href = config.social.github;
            socialLinks[1].href = config.social.twitter;
            socialLinks[2].href = config.social.linkedin;
            socialLinks[3].href = config.social.email;
        }
        
        footerSections[1].querySelector('h3').textContent = config.techStack.title;
        const techPs = footerSections[1].querySelectorAll('p');
        techPs[0].textContent = config.techStack.description;
        techPs[1].textContent = config.techStack.technologies;
        
        footerSections[2].querySelector('h3').textContent = config.site.contact.title;
        const contactPs = footerSections[2].querySelectorAll('p');
        contactPs[0].textContent = config.site.contact.description;
        contactPs[1].textContent = config.site.contact.email;
    }
    
    const copyright = document.querySelector('.copyright p');
    if (copyright) {
        copyright.textContent = config.site.copyright;
    }
    
    const navLinks = document.querySelectorAll('.nav-links a');
    if (navLinks.length >= 3) {
        navLinks[0].textContent = config.navigation.works;
        navLinks[1].textContent = config.navigation.about;
        navLinks[2].textContent = config.navigation.contact;
    }
    
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-links a');
    if (mobileMenuLinks.length >= 3) {
        mobileMenuLinks[0].textContent = config.navigation.works;
        mobileMenuLinks[1].textContent = config.navigation.about;
        mobileMenuLinks[2].textContent = config.navigation.contact;
    }
}

function initNavScroll() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    const menuLinks = document.querySelectorAll('.mobile-menu-links a');
    
    if (!mobileMenuBtn || !mobileMenu || !menuOverlay) return;
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.add('active');
        menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', closeMenu);
    }
    menuOverlay.addEventListener('click', closeMenu);
    
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMenu();
        });
    });
    
    function closeMenu() {
        mobileMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}
