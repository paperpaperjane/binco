// scroll animation script
document.addEventListener('DOMContentLoaded', () => {
const fadeElements = document.querySelectorAll('.fade-in');

const checkVisibility = () => {
    const triggerBottom = window.innerHeight / 5 * 4.5;
    fadeElements.forEach(element => {
    const boxTop = element.getBoundingClientRect().top;

    if (boxTop < triggerBottom) {
        element.classList.add('visible');
    } else {
        element.classList.remove('visible');
    }
    });
    };

window.addEventListener('scroll', checkVisibility);
checkVisibility();
});
