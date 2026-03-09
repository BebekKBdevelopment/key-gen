const generateBtn = document.getElementById('generateKeyBtn');
const discordBtn = document.getElementById('discordBtn');
const status = document.getElementById('status');

// HWID simulering (userAgent + screen size)
function getHWID() {
    return btoa(navigator.userAgent + screen.width + screen.height);
}

// Key system
const keyStorage = localStorage.getItem('gilbertKey');
const keyData = keyStorage ? JSON.parse(keyStorage) : null;
const now = Date.now();

function saveKey(key) {
    const expire = now + 24*60*60*1000; // 24h
    localStorage.setItem('gilbertKey', JSON.stringify({ key, hwid: getHWID(), expire }));
}

function getRemainingTime() {
    if (!keyData) return 0;
    return keyData.expire - now;
}

function formatTime(ms) {
    const h = Math.floor(ms/3600000);
    const m = Math.floor((ms%3600000)/60000);
    return `${h}h ${m}m`;
}

function updateUI() {
    if (keyData && keyData.hwid === getHWID() && getRemainingTime() > 0) {
        generateBtn.disabled = true;
        status.innerText = `You already have a key! Time remaining: ${formatTime(getRemainingTime())}`;
    } else {
        generateBtn.disabled = false;
        status.innerText = '';
    }
}

generateBtn.addEventListener('click', () => {
    // key genereras först här
    const key = 'GHUB-' + Math.random().toString(36).substring(2,10).toUpperCase();
    saveKey(key);
    updateUI();
    alert('Key generated! Copy it in your loader.');
});

discordBtn.addEventListener('click', () => {
    window.open('https://discord.gg/your-discord', '_blank');
});

updateUI();

// ⭐ Stjärnor bakgrund
const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');
let stars = [];
function initStars() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stars = [];
    for(let i=0;i<200;i++){
        stars.push({
            x: Math.random()*canvas.width,
            y: Math.random()*canvas.height,
            r: Math.random()*1.5,
            dx: (Math.random()-0.5)/2,
            dy: (Math.random()-0.5)/2
        });
    }
}
function animateStars() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let s of stars){
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
        ctx.fillStyle = 'white';
        ctx.fill();
        s.x += s.dx;
        s.y += s.dy;
        if(s.x<0)s.x=canvas.width;
        if(s.x>canvas.width)s.x=0;
        if(s.y<0)s.y=canvas.height;
        if(s.y>canvas.height)s.y=0;
    }
    requestAnimationFrame(animateStars);
}
initStars();
animateStars();
window.addEventListener('resize', initStars);
