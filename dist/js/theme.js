const switchMode = document.querySelector('.switch-theme');
const switchButton = document.querySelector('.theme-input');




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
    if (switchButton.className === 'theme-input switch-sun') {
        localStorage.setItem('theme', 'light')


    } else {
        localStorage.setItem('theme', 'dark')
    }
}

function setTheme() {
    if (localStorage.getItem('theme') === 'light') {
        setLightTheme();
        switchButton.classList.add('switch-sun')

    } else if (localStorage.getItem('theme') === 'dark') {
        setDarkTheme();
        switchButton.classList.remove('switch-sun')
    }
}

setTheme();


// Switch Theme Mode
switchMode.addEventListener('click', () => {
    switchButton.classList.toggle('switch-sun')
    setThemeInLocalStorage();
    setTheme();

})