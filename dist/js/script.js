const arrOne = document.querySelector('.arr-one')
const arrTwo = document.querySelector('.arr-two')
const homeBtn = document.querySelector('.header-content')
const workHeading = document.querySelector('.work-heading');
const workTitle = document.querySelector('.section-title');
const lead = document.querySelector('.lead');
const workDiv = document.querySelector('.items');
const workItems = document.querySelectorAll('.item');
const aboutHeading = document.querySelector('.about-heading');
const aboutA = document.querySelector('.about-a');
const educationTitle = document.querySelector('.about-b-title');
const awards = document.querySelectorAll('.award');
const aboutC = document.querySelector('.about-c');
const contactHeading = document.querySelector('.contact-heading');
const form = document.querySelector('#form');
const input = document.querySelectorAll('.form-input');
const message = document.getElementById('message');
const navbar = document.querySelector('.navbar');
const aboutLogos = document.querySelectorAll('.logo-skill');
const navMobile = document.querySelector('.navbar-mobile');
const mobileUl = document.querySelector('.mobile-ul');
const logos = document.querySelectorAll('.logos img');
const navLogo = document.querySelector('.logo');
const social = document.querySelector('.social');
const navUl = document.querySelector('.nav-ul');
const switchTheme = document.querySelector('.switch-theme');
const footer = document.getElementById('main-footer');



// Navbar

let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;


function removeNav(nav) {
    nav.classList.add('remove');
    setTimeout(() => {
        nav.classList.remove('small');
        nav.classList.remove('remove')
    }, 400)
    if (mobileUl.classList.contains('show')) {
        mobileUl.classList.remove('show')
        navMobile.classList.toggle('close');
    }
}

// Header Title
const title = 'Welcome to my portfolio page'
const titleArr = title.split('')
let indexes = []


for (let i = 0; i < titleArr.length; i++) {

    if (titleArr[i] === titleArr[i]) {
        indexes.push(i)
        console.log();
    }


    (function (i) {
        setTimeout(() => {

            const letter = document.createElement('h1')
            letter.classList.add('header-title-letter')


            if (i < 14) {
                letter.innerHTML += titleArr[i]
                arrOne.appendChild(letter);
            } else {
                letter.innerHTML += titleArr[i]
                arrTwo.appendChild(letter);
            }

            if (letter.innerHTML === ' ') {
                letter.style.margin = '0 20px 0 0'
            }


        }, 60 * i);
    })(i)


}


// Animate DOM elements

function showDOMElements(el) {
    if (el >= workHeading.offsetTop) {
        workHeading.classList.add('show');
        setTimeout(() => {
            workHeading.classList.add('move');
        }, 1000);
    }
    if (el >= aboutHeading.offsetTop) {
        aboutHeading.classList.add('show');
        setTimeout(() => {
            aboutHeading.classList.add('move');
        }, 1000);
    }

    if (el >= aboutA.offsetTop) {
        aboutA.classList.add('show');
    }
    if (el >= educationTitle.offsetTop) {
        educationTitle.classList.add('show');
    }
    if (el >= aboutC.offsetTop) {
        aboutC.classList.add('show');
    }
    if (el >= contactHeading.offsetTop) {
        contactHeading.classList.add('show');
        setTimeout(() => {
            contactHeading.classList.add('move');
        }, 1000);
    }
    if (el >= form.offsetTop) {
        form.classList.add('show');
    }
};


function showWorkItems(el) {

    workItems.forEach((item) => {

        if (el >= item.offsetTop) {
            item.classList.add('show');
        }

    })
};

function showAwardsElements(el) {

    awards.forEach((item) => {

        if (el >= item.offsetTop) {
            item.classList.add('show');
        }
    })
}


// Logos
const speed = 1.5;
let logosArr = [
    ...logos
]

let logoStyle = logosArr.map((img, index) => {

    const style = {
        width: logosArr[index].offsetWidth,
        left: index * (logosArr[index].offsetWidth + 50),
        height: parseInt(logosArr[index].offsetHeight)
    }
    return style;
})

function animateLogos() {

    const ArrLength = logosArr.length;

    for (let i = 0; i < ArrLength; i++) {
        const logo = logosArr[i];
        const info = logoStyle[i];
        info.left -= speed;



        if (info.left + info.width < 0) {
            const lastElInfo = logoStyle[logoStyle.length - 1];
            info.left = lastElInfo.left + lastElInfo.width + 50;
            logosArr = logosArr.slice(1, ArrLength);
            logosArr.push(logo);

            logoStyle = logoStyle.slice(1, logoStyle.length);
            logoStyle.push(info);

            i--;
        }
        logo.style.left = `${info.left}px`;


    };
    requestAnimationFrame(animateLogos);
}

animateLogos();



// Contact Form 

input.forEach((el) => {
    el.addEventListener('blur', (e) => {
        if (e.target.value !== '') {
            e.target.nextElementSibling.classList.add('filled')
        } else {
            e.target.nextElementSibling.classList.remove('filled');

        }
    })
})

message.addEventListener('blur', e => {
    if (e.target.value !== '') {
        e.target.nextElementSibling.classList.add('msg-filled');

    } else {
        e.target.nextElementSibling.classList.remove('msg-filled');
    }
})



// Event listeners 

// DOM el
window.addEventListener('scroll', () => {

    const { clientHeight, scrollTop } = document.documentElement;
    const clientScroll = clientHeight + scrollTop;

    showDOMElements(clientScroll);
    showWorkItems(clientScroll);
    showAwardsElements(clientScroll);
})


// Navbar
window.onload = () => {
    navLogo.classList.add('show');
    social.classList.add('show');
    navUl.classList.add('show');
    navMobile.classList.add('show');
    switchTheme.classList.add('show');
    setTimeout(() => {
        homeBtn.classList.add('show');
    }, 1500);
}

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > 800 && scrollTop < lastScrollTop) {
        navbar.classList.add('small');
    } else {
        if (navbar.classList.contains('small')) {
            removeNav(navbar);
        }
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

}, false);

// Navbar Mobile
navMobile.addEventListener('click', () => {
    navMobile.classList.toggle('close');
    if (navMobile.classList.contains('close')) {
        mobileUl.classList.add('show')
    } else {
        mobileUl.classList.remove('show')
    }

})


// Work items for mobile
workDiv.addEventListener('click', (e) => {
    if (e.target.parentElement.classList.contains('inner-card')) {
        e.target.parentElement.parentElement.classList.toggle('show-mob-text');

    } if (e.target.parentElement.classList.contains('item-text-wrap')) {
        e.target.parentElement.parentElement.parentElement.parentElement.classList.toggle('show-mob-text')
    } if (e.target.parentElement.classList.contains('item-text')) {
        e.target.parentElement.parentElement.parentElement.classList.toggle('show-mob-text')
    }

})










