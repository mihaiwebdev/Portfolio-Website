const switchMode = document.querySelector('.switch-mode');
const lightMode = document.querySelector('.fa-sun');
const darkMode = document.querySelector('.fa-moon');



function setDarkTheme() {

    document.documentElement.style.setProperty('--mainTextColor', 'var(--mainTextColor-dark)');
    document.documentElement.style.setProperty('--secondaryTextColor', 'var(--secondaryTextColor-dark)')
    document.documentElement.style.setProperty('--mainShadowBg', 'var(--mainShadowBg-dark)')
    document.documentElement.style.setProperty('--mainBorderColor', 'var(--mainBorderColor-dark)')
    document.documentElement.style.setProperty('--mainBgColor', 'var(--mainBgColor-dark)')
    document.documentElement.style.setProperty('--secondaryBgColor', 'var(--secondaryBgColor-dark)')

}

function setLightTheme() {

    document.documentElement.style.setProperty('--mainTextColor', 'var(--mainTextColor-light)');
    document.documentElement.style.setProperty('--secondaryTextColor', 'var(--secondaryTextColor-light)')
    document.documentElement.style.setProperty('--mainShadowBg', 'var(--mainShadowBg-light)')
    document.documentElement.style.setProperty('--mainBorderColor', 'var(--mainBorderColor-light)')
    document.documentElement.style.setProperty('--mainBgColor', 'var(--mainBgColor-light)')
    document.documentElement.style.setProperty('--secondaryBgColor', 'var(--secondaryBgColor-light)')
}



function setThemeInLocalStorage() {
    if (lightMode.className === 'fa-solid fa-sun') {
        localStorage.setItem('theme', 'light')


    } else {
        localStorage.setItem('theme', 'dark')
    }
};

function setTheme() {
    if (localStorage.getItem('theme') === 'light') {
        lightMode.classList.remove('switch-moon');
        darkMode.classList.remove('switch-sun');
        setLightTheme();



    } else if (localStorage.getItem('theme') === 'dark') {
        lightMode.classList.add('switch-moon');
        darkMode.classList.add('switch-sun');
        setDarkTheme();

    }
}

setTheme();


// Switch Theme Mode
switchMode.addEventListener('click', () => {

    lightMode.classList.toggle('switch-moon');
    darkMode.classList.toggle('switch-sun');
    setThemeInLocalStorage();
    setTheme();

})