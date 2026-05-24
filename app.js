const tg = window.Telegram.WebApp;
tg.expand();
const urlParams = new URLSearchParams(window.location.search);
const totalCards = parseInt(urlParams.get('total')) || 9;
const winIndex = parseInt(urlParams.get('win')) || Math.floor(Math.random() * totalCards);
const prizeName = urlParams.get('prize') || "Приз";
document.getElementById('prize-title').innerText = prizeName;
const grid = document.getElementById('grid');
let canPlay = true;
for (let i = 0; i < totalCards; i++) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerText = '🎁';
    card.addEventListener('click', () => {
        if (!canPlay) return;
        canPlay = false;
        if (i === winIndex) {
            card.className = 'card revealed-win';
            card.innerText = '🏆';
            document.getElementById('status-text').innerText = '🎉 ВЫИГРЫШ!';
            setTimeout(() => { tg.sendData(JSON.stringify({ result: "win", prize: prizeName })); tg.close(); }, 1500);
        } else {
            card.className = 'card revealed-lose';
            card.innerText = '❌';
            document.getElementById('status-text').innerText = 'Мимо!';
            setTimeout(() => { tg.sendData(JSON.stringify({ result: "lose" })); tg.close(); }, 1500);
        }
    });
    grid.appendChild(card);
}
