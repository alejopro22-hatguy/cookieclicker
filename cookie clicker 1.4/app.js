const cookie = document.getElementById('cookie');
const clickCountDisplay = document.getElementById('clickCount');
const autoCPSDisplay = document.getElementById('autoCPS');
const cpsDisplay = document.getElementById('cps');
const openUpgradesButton = document.getElementById('openUpgradesButton');
const upgradesMenu = document.getElementById('upgradesMenu');
const autoClickerButton = document.getElementById('autoClickerButton');
const doubleAutoClickerButton = document.getElementById('doubleAutoClickerButton');
const superClickButton = document.getElementById('superClickButton');
const closeUpgradesButton = document.getElementById('closeUpgradesButton');
const autoClickerImage = document.getElementById('autoClickerImage');
const warning = document.getElementById('warning');
const settingsButton = document.getElementById('settingsButton');
const settingsMenu = document.getElementById('settingsMenu');
const achievementsMenu = document.getElementById('achievementsMenu');
const statsMenu = document.getElementById('statsMenu');
const codesMenu = document.getElementById('codesMenu');
const codeInput = document.getElementById('codeInput');
const submitCodeButton = document.getElementById('submitCodeButton');
const comingSoonButton = document.getElementById('comingSoonButton');
const achievementsButton = document.getElementById('achievementsButton');
const statsButton = document.getElementById('statsButton');
const backButton = document.getElementById('backButton');
const backToSettingsButton = document.getElementById('backToSettingsButton');
const backToSettingsFromStatsButton = document.getElementById('backToSettingsFromStatsButton');
const backToSettingsFromCodesButton = document.getElementById('backToSettingsFromCodesButton');
const achievement1 = document.getElementById('achievement1');
const achievement2 = document.getElementById('achievement2');
const achievement3 = document.getElementById('achievement3');
const achievement4 = document.getElementById('achievement4');
const achievement5 = document.getElementById('achievement5');
const notification = document.getElementById('notification');
const totalClicksDisplay = document.getElementById('totalClicks');
const timePlayedDisplay = document.getElementById('timePlayed');
const upgradesPurchasedDisplay = document.getElementById('upgradesPurchased');

let clickCount = 0;
let pointsPerClick = 1;
let upgradeCost = 10;
let clicks = 0;
let totalClicks = 0;
let upgradesPurchased = 0;
let startTime = Date.now();
let autoClickerActive = false;
let autoClickerCPS = 0.1;
let superClickMultiplier = 1;
let autoClickerCost = 10;
let doubleAutoClickerPurchased = false;
let superClickCost = 200;
let achievementsUnlocked = {
    achievement1: false,
    achievement2: false,
    achievement3: false,
    achievement4: false,
    achievement5: false,
};

// Comprobar preferencias de imágenes almacenadas localmente
document.addEventListener('DOMContentLoaded', () => {
    const hideCookiePreference = localStorage.getItem('hideCookie');
    if (hideCookiePreference === 'true') {
        hideCookie();
    }
});

cookie.addEventListener('click', (event) => {
    clickCount += pointsPerClick * superClickMultiplier;
    totalClicks++;
    clicks++;
    clickCountDisplay.textContent = clickCount;

    // Reproducir el sonido de clic
    const clickSound = new Audio('audio/click.mp3');
    clickSound.play();

    // Animar la galleta
    cookie.style.animation = 'shrink 0.1s ease';

    // Eliminar la animación después de completarla
    setTimeout(() => {
        cookie.style.animation = 'none';
    }, 100);

    // Crear partículas
    createParticles(event.clientX, event.clientY);

    // Comprobar logros
    checkAchievements();
});

openUpgradesButton.addEventListener('click', () => {
    upgradesMenu.style.display = 'block';
});

closeUpgradesButton.addEventListener('click', () => {
    upgradesMenu.style.display = 'none';
});

autoClickerButton.addEventListener('click', () => {
    if (clickCount >= autoClickerCost) {
        clickCount -= autoClickerCost;
        autoClickerCost = Math.round(autoClickerCost * 1.05);
        autoClickerButton.textContent = `Auto Clicker (${autoClickerCost} puntos)`;
        autoClickerCPS += 0.1;
        autoCPSDisplay.textContent = autoClickerCPS.toFixed(1);
        if (!autoClickerActive) {
            autoClickerActive = true;
            setInterval(() => {
                clickCount += autoClickerCPS;
                clickCountDisplay.textContent = Math.floor(clickCount);
            }, 1000);
        }
    } else {
        showWarning();
    }
});

doubleAutoClickerButton.addEventListener('click', () => {
    if (clickCount >= 100 && !doubleAutoClickerPurchased) {
        clickCount -= 100;
        autoClickerCPS *= 2;
        autoCPSDisplay.textContent = autoClickerCPS.toFixed(1);
        doubleAutoClickerPurchased = true;
        doubleAutoClickerButton.style.display = 'none';
        autoClickerImage.style.display = 'block';
    } else {
        showWarning();
    }
});

superClickButton.addEventListener('click', () => {
    if (clickCount >= superClickCost) {
        clickCount -= superClickCost;
        superClickMultiplier *= 2;
        superClickCost *= 3;
        superClickButton.textContent = `Super Click (${superClickCost} puntos)`;
    } else {
        showWarning();
    }
});

settingsButton.addEventListener('click', () => {
    document.getElementById('game').style.display = 'none';
    settingsMenu.style.display = 'block';
});

comingSoonButton.addEventListener('click', () => {
    alert('Esta funcionalidad estará disponible próximamente.');
});

achievementsButton.addEventListener('click', () => {
    settingsMenu.style.display = 'none';
    achievementsMenu.style.display = 'block';
});

statsButton.addEventListener('click', () => {
    settingsMenu.style.display = 'none';
    statsMenu.style.display = 'block';
    updateStats();
});

codesButton.addEventListener('click', () => {
    settingsMenu.style.display = 'none';
    codesMenu.style.display = 'block';
});

backButton.addEventListener('click', () => {
    settingsMenu.style.display = 'none';
    document.getElementById('game').style.display = 'block';
});

backToSettingsButton.addEventListener('click', () => {
    achievementsMenu.style.display = 'none';
    settingsMenu.style.display = 'block';
});

backToSettingsFromStatsButton.addEventListener('click', () => {
    statsMenu.style.display = 'none';
    settingsMenu.style.display = 'block';
});

backToSettingsFromCodesButton.addEventListener('click', () => {
    codesMenu.style.display = 'none';
    settingsMenu.style.display = 'block';
});

submitCodeButton.addEventListener('click', () => {
    const code = codeInput.value.toUpperCase().trim();
    if (code === 'NO-COOKIE') {
        hideCookie();
    } else if (code === 'SI-COOKIE') {
        showCookie();
    } else if (code === 'GIGACHAD') {
        showGigachad();
    } else if (code === 'GATO-MEME') {
        showGatoMeme();
    } else if (code === 'CAT-C418') {
        playCatC418();
    } else {
        showNotification('No me suena algún código así');
    }
    codeInput.value = '';
});

function hideCookie() {
    cookie.src = 'images/no-cookie.png';
    cookie.style.pointerEvents = 'none';
    localStorage.setItem('hideCookie', 'true');
}

function showCookie() {
    cookie.src = 'images/cookie.png';
    cookie.style.pointerEvents = 'auto';
    localStorage.setItem('hideCookie', 'false');
}

function showGigachad() {
    const gigachadImage = document.createElement('img');
    gigachadImage.src = 'images/gigachad.png';
    gigachadImage.classList.add('full-screen');
    document.body.appendChild(gigachadImage);

    const gigachadSound = new Audio('audio/gigachad.mp3');
    gigachadSound.play();

    setTimeout(() => {
        gigachadImage.remove();
    }, 23000); // Mostrar la imagen por 23 segundos
}

function showGatoMeme() {
    const gatoMemeImage = document.createElement('img');
    gatoMemeImage.src = 'images/gato-meme.png';
    gatoMemeImage.classList.add('full-screen');
    document.body.appendChild(gatoMemeImage);

    const gatoMemeSound = new Audio('audio/gato-meme.mp3');
    gatoMemeSound.play();

    setTimeout(() => {
        gatoMemeImage.remove();
    }, 5000); // Mostrar la imagen por 5 segundos
}

function showWarning() {
    // Reproducir el sonido de advertencia
    const warningSound = new Audio('audio/warning.mp3');
    warningSound.play();

    // Mostrar la imagen de advertencia
    warning.style.display = 'flex';
    setTimeout(() => {
        warning.style.display = 'none';
    }, 4000); // Mostrar la advertencia durante 4 segundos
}

function showNotification(message) {
    // Mostrar la notificación
    notification.textContent = message;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 2000);
}

function createParticles(x, y) {
    const particleCount = 15;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        document.body.appendChild(particle);

        const size = Math.random() * 8 + 4; // Tamaño aleatorio entre 4 y 12 píxeles
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        const colors = ['#FF4500', '#FFD700', '#ADFF2F', '#00CED1', '#1E90FF', '#FF69B4'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.backgroundColor = color;

        const destinationX = (Math.random() - 0.5) * 200;
        const destinationY = (Math.random() - 0.5) * 200;

        particle.style.left = `${x - size / 2}px`;
        particle.style.top = `${y - size / 2}px`;

        particle.style.setProperty('--x', `${destinationX}px`);
        particle.style.setProperty('--y', `${destinationY}px`);

        particle.addEventListener('animationend', () => {
            particle.remove();
        });
    }
}

function updateCPS() {
    cpsDisplay.textContent = clicks;
    clicks = 0;
}

setInterval(updateCPS, 1000); // Actualiza el CPS cada segundo

function checkAchievements() {
    if (!achievementsUnlocked.achievement5 && totalClicks >= 1) {
        achievement5.textContent = 'Logro 5: ¡1 click! facilisimo, ¿verdad? - Completado 🎉';
        showNotification("Logro completado: ¡1 click! facilisimo, ¿verdad? Código: NO-COOKIE");
        achievementsUnlocked.achievement5 = true;
    }
    if (!achievementsUnlocked.achievement1 && totalClicks >= 100) {
        achievement1.textContent = 'Logro 1: 100 clicks, muy facil - Completado 🎉';
        showNotification("Logro completado: 100 clicks, muy facil. Código: Cat-C418");
        achievementsUnlocked.achievement1 = true;
    }
    if (!achievementsUnlocked.achievement2 && totalClicks >= 500) {
        achievement2.textContent = 'Logro 2: ¿por qué clickeas una galleta? - Completado 🎉';
        showNotification("Logro completado: ¿por qué clickeas una galleta? Código: GATO-MEME");
        achievementsUnlocked.achievement2 = true;
    }
    if (!achievementsUnlocked.achievement3 && upgradesPurchased >= 10) {
        achievement3.textContent = 'Logro 3: 10 puntos por click que genial :D - Completado 🎉';
        showNotification("Logro completado: 10 puntos por click que genial :D Código: GIGACHAD");
        achievementsUnlocked.achievement3 = true;
    }
    if (!achievementsUnlocked.achievement4 && warning.style.display === 'flex') {
        achievement4.textContent = 'Logro 4: ¿por qué comprarías una mejora sin puntos suficientes? - Completado 🎉';
        showNotification("Logro completado: ¿por qué comprarías una mejora sin puntos suficientes? Código: SI-COOKIE");
        achievementsUnlocked.achievement4 = true;
    }
}

function updateStats() {
    const currentTime = Date.now();
    const timePlayed = Math.floor((currentTime - startTime) / 1000);

    totalClicksDisplay.textContent = `Clicks totales: ${totalClicks}`;
    timePlayedDisplay.textContent = `Tiempo jugado: ${timePlayed}s`;
    upgradesPurchasedDisplay.textContent = `Mejoras compradas: ${upgradesPurchased}`;
}

function playCatC418() {
    const catC418Sound = new Audio('audio/cat-C418.mp3');
    catC418Sound.play();
    showNotification('Sonando... cat-C418');
}
