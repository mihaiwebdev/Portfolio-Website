const workHeading = document.getElementById('work-heading');
const workItems = document.querySelectorAll('.item');
const aboutHeading = document.querySelector('.about-heading');
const aboutA = document.querySelector('.about-a');
const awards = document.querySelectorAll('.award');
const aboutC = document.querySelector('.about-c');
const contactHeading = document.querySelector('.contact-heading');
const form = document.querySelector('#form');
const input = document.querySelectorAll('input');
const message = document.getElementById('message');
const navbar = document.querySelector('.navbar');
const aboutLogos = document.querySelectorAll('.logo-skill');
const navMobile = document.querySelector('.navbar-mobile');
const mobileUl = document.querySelector('.mobile-ul');
const logos = document.querySelectorAll('.logos img');
const navLogo = document.querySelector('.logo');
const navUl = document.querySelector('.nav-ul');





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







// Animate DOM elements

function showDOMElements(el) {
    if (el >= workHeading.offsetTop) {
        workHeading.classList.add('show');
    }
    if (el >= aboutHeading.offsetTop) {
        aboutHeading.classList.add('show');
    }

    if (el >= aboutA.offsetTop) {
        aboutA.classList.add('show');
    }
    if (el >= aboutC.offsetTop) {
        aboutC.classList.add('show');
    }
    if (el >= contactHeading.offsetTop) {
        contactHeading.classList.add('show');
    }
    if (el >= form.offsetTop) {
        form.classList.add('show')
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
const speed = 1;
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
    navUl.classList.add('show');
    navMobile.classList.add('scale')
}
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > 500 && scrollTop < lastScrollTop) {
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
    mobileUl.classList.toggle('show');

})









