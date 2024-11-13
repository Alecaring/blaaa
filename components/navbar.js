class Header extends HTMLElement {
    constructor() {
        super();

        //* create a shadow
        const shadow = this.attachShadow({ mode: 'open' });

        //* add css specific file
        const link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', './css/navbar.css'); // Path al tuo file CSS
        shadow.appendChild(link);

        //* add css general file
        const generalLink = document.createElement('link');
        generalLink.setAttribute('rel', 'stylesheet');
        generalLink.setAttribute('href', './css/general.css'); // Path al tuo file CSS
        shadow.appendChild(generalLink);


        //* create header
        const header = document.createElement('header');
        header.classList.add('header');
        header.innerHTML = `
            <ul>
                <li><a href="/index.html">Live <strong>Chat</strong></a></li>
                <li><button id="btnMenu">☰</button></li>
            </ul>
        `;

        //* create mobile menu
        const nav = document.createElement('nav');
        nav.classList.add('mobile-menu');
        nav.id = 'mobileMenu';
        nav.innerHTML = `
            <ul>
                <li><a href="/posts.html">posts</a></li>
                <li><a href="/chats.html">chats</a></li>
                <li><a href="/friends.html">friends</a></li>
            </ul>
        `;

        //* append creations
        shadow.appendChild(header);
        shadow.appendChild(nav);

        //! ------------------------------------
        //* functions js
        //! ------------------------------------

        const btnMenu = shadow.querySelector('#btnMenu');
        const mobileMenu = shadow.querySelector('#mobileMenu');

        //* toggle the menu
        let toggle = false;
        const toggleMenu = () => {
            toggle = !toggle;
            if (toggle) {
                mobileMenu.classList.add('active');
            } else {
                mobileMenu.classList.remove('active');
            }
        };

        //* click event 
        btnMenu.addEventListener('click', toggleMenu);
    }
}

//* define the name of the componet
customElements.define('header-component', Header);
