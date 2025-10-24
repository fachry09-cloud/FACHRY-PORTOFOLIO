document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const sectionsContainer = document.querySelector('.sections-container');
    const navButtons = document.querySelectorAll('.nav-btn');
    
    let currentSectionIndex = 0;
    
    const sectionMap = {
        'profil': 0,
        'about': 1,
        'experience': 2,
        'skill': 3
    };
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');
            const targetIndex = sectionMap[targetSection];
            
            if (targetIndex !== currentSectionIndex) {
                navigateToSection(targetIndex);
            }
        });
    });
    
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            const targetIndex = sectionMap[targetSection];
            
            if (targetIndex !== currentSectionIndex) {
                navigateToSection(targetIndex);
            }
        });
    });
    
    function navigateToSection(index) {
        sectionsContainer.style.transform = `translateX(-${index * 25}%)`;
        currentSectionIndex = index;
        
        const sectionNames = ['profil', 'about', 'experience', 'skill'];
        const targetSection = sectionNames[index];
        
        updateActiveNavLink(targetSection);
        updateActiveSection(targetSection);
    }
    
    function updateActiveNavLink(activeSection) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === activeSection) {
                link.classList.add('active');
            }
        });
    }
    
    function updateActiveSection(activeSection) {
        sections.forEach(section => {
            section.classList.remove('active');
            if (section.id === activeSection) {
                section.classList.add('active');
            }
        });
    }
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight' && currentSectionIndex < sections.length - 1) {
            navigateToSection(currentSectionIndex + 1);
        } else if (e.key === 'ArrowLeft' && currentSectionIndex > 0) {
            navigateToSection(currentSectionIndex - 1);
        }
    });
    
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0 && currentSectionIndex < sections.length - 1) {
                navigateToSection(currentSectionIndex + 1);
            } else if (diff < 0 && currentSectionIndex > 0) {
                navigateToSection(currentSectionIndex - 1);
            }
        }
    }
    
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        setTimeout(function() {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    });
});