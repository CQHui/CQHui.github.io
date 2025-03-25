// 强制移除所有背景渐变
document.addEventListener('DOMContentLoaded', function() {
    // 移除body上的背景
    document.body.style.backgroundImage = 'none';
    document.body.style.backgroundColor = '#ffffff';
    
    // 查找所有元素
    const allElements = document.querySelectorAll('*');
    
    // 为每个元素移除背景图像
    allElements.forEach(element => {
        if (element.tagName !== 'BUTTON' && 
            !element.classList.contains('btn-primary') && 
            !element.classList.contains('progress-bar')) {
            
            // 获取计算样式
            const style = window.getComputedStyle(element);
            
            // 如果有背景图像或渐变，移除它
            if (style.backgroundImage && style.backgroundImage !== 'none') {
                if (style.backgroundImage.includes('gradient')) {
                    element.style.backgroundImage = 'none';
                    
                    // 根据元素类型设置背景色
                    if (element.classList.contains('hero-section')) {
                        element.style.backgroundColor = '#f8f9fa';
                    }
                }
            }
        }
    });
});

// 添加MutationObserver来处理动态添加的元素
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.addedNodes && mutation.addedNodes.length > 0) {
            for (let i = 0; i < mutation.addedNodes.length; i++) {
                const node = mutation.addedNodes[i];
                if (node.nodeType === 1) { // Element node
                    if (node.style && node.style.backgroundImage && 
                        node.style.backgroundImage.includes('gradient')) {
                        node.style.backgroundImage = 'none';
                    }
                    
                    // 处理子元素
                    const childElements = node.querySelectorAll('*');
                    childElements.forEach(child => {
                        if (child.style && child.style.backgroundImage && 
                            child.style.backgroundImage.includes('gradient')) {
                            child.style.backgroundImage = 'none';
                        }
                    });
                }
            }
        }
    });
});

// 配置和启动观察器
observer.observe(document.body, {
    childList: true,
    subtree: true
}); 