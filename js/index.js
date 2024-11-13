const btnMenu = document.getElementById('btnMenu');
const mobileMenu = document.getElementById('mobileMenu');

btnMenu.addEventListener('click', () => {
    toggleMenu();
})

let toggle = false;
const toggleMenu = () => {
    toggle = !toggle;
    toggle ?
        mobileMenu.classList.add('active')
        : mobileMenu.classList.remove('active')
}