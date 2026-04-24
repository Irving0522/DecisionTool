document.addEventListener('DOMContentLoaded', () => {
    // Tabs logic
    const tabBtns = document.querySelectorAll('.tab-btn');
    const sections = document.querySelectorAll('.tool-section');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active-section'));

            btn.classList.add('active');
            document.getElementById(btn.dataset.target).classList.add('active-section');
        });
    });

    // Coin logic
    const coin = document.getElementById('coin');
    const flipBtn = document.getElementById('flip-btn');
    const coinResult = document.getElementById('coin-result');
    let isFlipping = false;

    flipBtn.addEventListener('click', () => {
        if (isFlipping) return;
        isFlipping = true;
        flipBtn.disabled = true;

        // Reset classes
        coin.style.transition = 'none';
        coin.style.transform = 'rotateY(0deg)';

        // Remove old result text
        coinResult.textContent = '翻滾中...';
        coinResult.style.opacity = '0.5';

        // Result: 0 (Head/10元面), 1 (Tail/拾圓面)
        const result = Math.floor(Math.random() * 2);

        // Timeout to allow reset to take effect
        setTimeout(() => {
            coin.style.transition = 'transform 3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            // Adding rotations to ensure it spins multiple times
            // 5 spins (1800deg) + final face
            const rotateVal = 1800 + (result === 1 ? 180 : 0);

            // Add a little randomness so it isn't completely identic each time
            const randomExtra = Math.floor(Math.random() * 20) - 10;

            coin.style.transform = `rotateY(${rotateVal + randomExtra}deg)`;

            setTimeout(() => {
                isFlipping = false;
                flipBtn.disabled = false;
                coinResult.style.opacity = '1';
                coinResult.textContent = result === 0 ? '結果：數字' : '結果：人頭';
            }, 3000);
        }, 50);
    });

    // Dice logic
    const diceCountInput = document.getElementById('dice-count');
    const diceMinus = document.getElementById('dice-minus');
    const dicePlus = document.getElementById('dice-plus');
    const diceContainer = document.getElementById('dice-container');
    const rollBtn = document.getElementById('roll-btn');
    const diceResult = document.getElementById('dice-result');

    let diceCount = 1;

    const updateDiceCount = (newCount) => {
        if (newCount >= 1 && newCount <= 10) {
            diceCount = newCount;
            diceCountInput.value = diceCount;
            renderDice();
        }
    };

    diceMinus.addEventListener('click', () => updateDiceCount(diceCount - 1));
    dicePlus.addEventListener('click', () => updateDiceCount(diceCount + 1));

    const renderDice = () => {
        diceContainer.innerHTML = '';
        for (let i = 0; i < diceCount; i++) {
            const dice = document.createElement('div');
            dice.className = 'dice show-1';

            for (let j = 1; j <= 6; j++) {
                const dot = document.createElement('div');
                dot.className = `dice-dot dot-${j}`;
                dice.appendChild(dot);
            }
            diceContainer.appendChild(dice);
        }
    };

    let isRolling = false;
    rollBtn.addEventListener('click', () => {
        if (isRolling) return;
        isRolling = true;
        rollBtn.disabled = true;
        diceResult.textContent = '擲骰子中...';
        diceResult.style.opacity = '0.5';

        const allDice = document.querySelectorAll('.dice');
        let totalSum = 0;
        let faces = [];

        allDice.forEach((dice) => {
            // Remove previous face classes
            dice.className = 'dice rolling';

            const face = Math.floor(Math.random() * 6) + 1;
            faces.push(face);
            totalSum += face;
        });

        setTimeout(() => {
            allDice.forEach((dice, index) => {
                dice.className = `dice show-${faces[index]}`;
            });
            isRolling = false;
            rollBtn.disabled = false;
            diceResult.style.opacity = '1';
            diceResult.textContent = `結果：${totalSum} 點`;
        }, 600); // Mathces CSS animation duration
    });

    // Initial render
    renderDice();

    // Poker logic
    const pokerCard = document.getElementById('poker-card');
    const drawCardBtn = document.getElementById('draw-card-btn');
    const restartPokerBtn = document.getElementById('restart-poker-btn');
    const pokerRule = document.getElementById('poker-rule');
    const cardsLeftDisplay = document.getElementById('cards-left');

    const cardFront = document.getElementById('card-front');
    const cardValueEls = document.querySelectorAll('.card-value');
    const cardSuitEls = document.querySelectorAll('.card-suit');
    const cardSuitLarge = document.querySelector('.card-suit-large');

    const rules = {
        'A': { title: '指定人喝', desc: '' },
        '2': { title: '陪酒員', desc: '當其他人輸時，陪酒員播必須陪喝，抽到2的人就要陪喝，直到別人再抽到下一張2才能退位' },
        '3': { title: '逢三', desc: '喊一個數字開始，有3、或3倍數就要拍手' },
        '4': { title: '免死金牌', desc: '可保留，等適當時機使用' },
        '5': { title: '照相機', desc: '可保留，隨時可丟牌比出相機手勢，最後一個靜止的人就要喝' },
        '6': { title: '摸鼻子', desc: '可保留，隨機摸鼻子，抓最慢摸鼻子的人就要喝' },
        '7': { title: '遮眼睛', desc: '可選擇左或右邊的人矇住自己的眼睛。其他人現場隨機找人當莊，問抽牌的人這個人要不要喝，喝幾杯？被喊到喝的人就要喝' },
        '8': { title: '上廁所牌', desc: '可保留（沒有8的不能上廁所）' },
        '9': { title: '自己喝', desc: '' },
        '10': { title: '神經病', desc: '其他人不能跟神經病講話，不小心犯規就要喝。神經病間可以互相聊天，陷害別人喝酒' },
        'J': { title: '右邊喝', desc: '' },
        'Q': { title: '左邊喝', desc: '' },
        'K': { title: '果園菜園動物園', desc: '選1種聯想接龍' }
    };

    let deck = [];

    function initDeck() {
        const suits = ['♠', '♥', '♦', '♣'];
        const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        deck = [];
        for (let suit of suits) {
            for (let value of values) {
                deck.push({ suit, value, color: (suit === '♥' || suit === '♦') ? 'red' : 'black' });
            }
        }
        // Shuffle
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
    }

    function resetPokerGame() {
        initDeck();
        cardsLeftDisplay.textContent = `剩餘牌數：${deck.length}`;
        pokerRule.textContent = '點擊抽牌開始遊戲';
        pokerCard.classList.remove('flipped');
        restartPokerBtn.style.display = 'none';
        drawCardBtn.style.display = 'block';
    }

    let isDrawing = false;
    drawCardBtn.addEventListener('click', () => {
        if (isDrawing || deck.length === 0) return;
        isDrawing = true;
        drawCardBtn.disabled = true;

        pokerCard.style.transition = 'none';
        pokerCard.classList.remove('flipped');

        // Wait a frame for transition reset to take effect
        setTimeout(() => {
            pokerCard.style.transition = 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            const card = deck.pop();

            cardFront.style.color = card.color === 'red' ? '#ef4444' : '#1e293b';
            cardValueEls.forEach(el => el.textContent = card.value);
            cardSuitEls.forEach(el => el.textContent = card.suit);
            cardSuitLarge.textContent = card.suit;

            pokerCard.classList.add('flipped');

            setTimeout(() => {
                const rule = rules[card.value];
                let html = `<strong>${card.suit}${card.value} - ${rule.title}</strong>`;
                if (rule.desc) {
                    html += `<br><span style="display:inline-block; margin-top:8px;">${rule.desc}</span>`;
                }
                pokerRule.innerHTML = html;
                cardsLeftDisplay.textContent = `剩餘牌數：${deck.length}`;
                isDrawing = false;
                drawCardBtn.disabled = false;

                if (deck.length === 0) {
                    drawCardBtn.style.display = 'none';
                    restartPokerBtn.style.display = 'block';
                }
            }, 300); // Wait half of flip animation to change text
        }, 50);
    });

    restartPokerBtn.addEventListener('click', resetPokerGame);

    // Initialize poker deck on load
    initDeck();
});
