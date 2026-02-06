let config = {};

async function loadConfig() {
    try {
        const response = await fetch('data/config.json');
        config = await response.json();
        applyConfig();
        applyThemeColors();
        return config;
    } catch (error) {
        console.error('加载配置数据失败:', error);
        return null;
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

function initThemeToggle() {
    console.log('初始化主题切换功能');
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) {
        console.error('主题切换按钮未找到');
        return;
    }
    
    console.log('主题切换按钮找到:', themeToggle);
    
    // 加载保存的主题
    loadSavedTheme();
    
    // 添加点击事件监听器
    themeToggle.addEventListener('click', toggleTheme);
    console.log('主题切换点击事件已添加');
}

function toggleTheme() {
    console.log('主题切换按钮被点击');
    const root = document.documentElement;
    const isDark = root.classList.contains('dark-theme');
    
    console.log('当前主题:', isDark ? '暗色' : '亮色');
    
    if (isDark) {
        // 切换到亮色主题
        console.log('切换到亮色主题');
        root.classList.remove('dark-theme');
        saveTheme('light');
        updateThemeIcon(false);
    } else {
        // 切换到暗色主题
        console.log('切换到暗色主题');
        root.classList.add('dark-theme');
        saveTheme('dark');
        updateThemeIcon(true);
    }
    
    // 应用主题颜色
    console.log('应用主题颜色');
    applyThemeColors();
}

function saveTheme(theme) {
    localStorage.setItem('theme', theme);
}

function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    const root = document.documentElement;
    
    if (savedTheme === 'dark') {
        root.classList.add('dark-theme');
        updateThemeIcon(true);
    } else {
        root.classList.remove('dark-theme');
        updateThemeIcon(false);
    }
    
    // 应用主题颜色
    applyThemeColors();
}

function updateThemeIcon(isDark) {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    const icon = themeToggle.querySelector('i');
    if (icon) {
        if (isDark) {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }
}

function setThemeColors(colors) {
    const root = document.documentElement;
    
    // 设置颜色变量
    root.style.setProperty('--primary', colors.primary || '#2C3E50');
    root.style.setProperty('--primary-light', colors.primaryLight || '#4A6582');
    root.style.setProperty('--secondary', colors.secondary || '#E74C3C');
    root.style.setProperty('--tertiary', colors.tertiary || '#3498DB');
    root.style.setProperty('--accent', colors.accent || '#1ABC9C');
    root.style.setProperty('--dark', colors.dark || '#1A1A1A');
    root.style.setProperty('--gray', colors.gray || '#7F8C8D');
    root.style.setProperty('--light', colors.light || '#F8F9FA');
    root.style.setProperty('--card-bg', colors.cardBg || 'rgba(255, 255, 255, 0.95)');
    root.style.setProperty('--body-bg', colors.bodyBg || '#f9f9f9');
    root.style.setProperty('--header-bg', colors.headerBg || 'rgba(255, 255, 255, 0.95)');
    root.style.setProperty('--header-border', colors.headerBorder || 'rgba(0, 0, 0, 0.08)');
    root.style.setProperty('--mobile-menu-bg', colors.mobileMenuBg || 'white');
    root.style.setProperty('--mobile-menu-shadow', colors.mobileMenuShadow || '-10px 0 30px rgba(0, 0, 0, 0.1)');
    root.style.setProperty('--card-shadow', colors.cardShadow || '0 8px 25px rgba(0, 0, 0, 0.06)');
    root.style.setProperty('--card-border', colors.cardBorder || 'rgba(0, 0, 0, 0.08)');
    root.style.setProperty('--screenshot-bg', colors.screenshotBg || '#f0f2f5');
    root.style.setProperty('--sidebar-bg', colors.sidebarBg || 'white');
    root.style.setProperty('--sidebar-shadow', colors.sidebarShadow || '0 10px 30px rgba(0, 0, 0, 0.06)');
    root.style.setProperty('--transition', colors.transition || 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1)');
}

function applyThemeColors() {
    console.log('应用主题颜色');
    const root = document.documentElement;
    const isDark = root.classList.contains('dark-theme');
    
    console.log('当前主题:', isDark ? '暗色' : '亮色');
    console.log('配置文件加载状态:', Object.keys(config).length > 0);
    console.log('暗色主题颜色配置:', isDark ? config.darkColors : '不适用');
    console.log('亮色主题颜色配置:', config.colors);
    
    if (isDark && config.darkColors) {
        console.log('应用暗色主题颜色');
        setThemeColors(config.darkColors);
    } else if (config.colors) {
        console.log('应用亮色主题颜色');
        setThemeColors(config.colors);
    } else {
        console.error('颜色配置未找到');
    }
}
