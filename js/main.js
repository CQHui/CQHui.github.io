// DOM元素
const progressBar = document.getElementById('progressBar');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navLinks');
const themeToggle = document.getElementById('themeToggle');
const langToggle = document.getElementById('langToggle');
const downloadBtn = document.getElementById('downloadBtn');
const modal = document.getElementById('modalContainer');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const closeModal = document.querySelector('.close-modal');

// 页面滚动进度
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
    
    // 导航栏滚动效果
    if (scrollTop > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    // 更新活动导航链接
    updateActiveNavLink();
});

// 菜单切换 (移动端)
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.querySelector('i').classList.toggle('fa-bars');
    menuToggle.querySelector('i').classList.toggle('fa-times');
});

// 平滑滚动到锚点
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // 关闭移动菜单
        navMenu.classList.remove('active');
        menuToggle.querySelector('i').classList.add('fa-bars');
        menuToggle.querySelector('i').classList.remove('fa-times');
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// 更新活动导航链接
function updateActiveNavLink() {
    // 获取所有部分
    const sections = document.querySelectorAll('section');
    
    // 找到当前在视口中的部分
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    // 更新活动链接
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// 暗色模式切换
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    // 更新图标
    if (document.body.classList.contains('dark-mode')) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        // 存储用户偏好
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'light');
    }
});

// 语言切换
langToggle.addEventListener('click', () => {
    const currentLang = document.documentElement.lang;
    
    if (currentLang === 'zh-CN') {
        // 切换到英文
        document.documentElement.lang = 'en';
        langToggle.innerHTML = '<i class="fas fa-globe"></i> 中';
        toggleLanguageContent('en');
        localStorage.setItem('lang', 'en');
    } else {
        // 切换到中文
        document.documentElement.lang = 'zh-CN';
        langToggle.innerHTML = '<i class="fas fa-globe"></i> EN';
        toggleLanguageContent('zh');
        localStorage.setItem('lang', 'zh');
    }
});

// 切换语言内容
function toggleLanguageContent(lang) {
    const zhElements = document.querySelectorAll('.lang-zh');
    const enElements = document.querySelectorAll('.lang-en');
    
    if (lang === 'zh') {
        zhElements.forEach(el => el.style.display = 'block');
        enElements.forEach(el => el.style.display = 'none');
    } else {
        zhElements.forEach(el => el.style.display = 'none');
        enElements.forEach(el => el.style.display = 'block');
    }
}

// 模态框功能
function openModal(title, content) {
    modalTitle.textContent = title;
    modalBody.innerHTML = content;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // 防止背景滚动
}

function closeModalFunc() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

closeModal.addEventListener('click', closeModalFunc);

// 点击模态框外部关闭
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModalFunc();
    }
});

// 键盘按下ESC关闭模态框
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
        closeModalFunc();
    }
});

// 下载PDF
downloadBtn.addEventListener('click', () => {
    // 此功能可根据需要实现
    alert('PDF下载功能即将实现');
});

// 初始化页面
function initPage() {
    // 检查存储的主题首选项
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // 检查存储的语言首选项
    const savedLang = localStorage.getItem('lang');
    if (savedLang === 'en') {
        document.documentElement.lang = 'en';
        langToggle.innerHTML = '<i class="fas fa-globe"></i> 中';
        toggleLanguageContent('en');
    } else {
        // 默认中文
        toggleLanguageContent('zh');
    }
    
    // 加载各个部分
    loadSections();
    
    // 设置初始活动导航链接
    setTimeout(updateActiveNavLink, 100);
}

// 加载各个部分
function loadSections() {
    // 此功能将在每个部分准备好后实现
}

// 添加动画类
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    initPage();
    
    // 添加滚动动画
    setTimeout(animateOnScroll, 100);
}); 