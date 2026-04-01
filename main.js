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
});
