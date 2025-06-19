document.addEventListener('DOMContentLoaded', () => {
    const cards = ['owl', 'sloth', 'owl', 'deer', 'giraffe', 'deer', 'giraffe', 'sloth']; // Fixed typo: 'girrafe' → 'giraffe'
    let flippedCards = [];
    let matchedPairs = 0;
    
    // Shuffle cards
    cards.sort(() => 0.5 - Math.random());
    
    // Create game board
    const gameBoard = document.getElementById('game-board');
    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.dataset.value = card;
        
        // Pre-set background styles (better performance)
        cardElement.style.backgroundSize = 'cover';
        cardElement.style.backgroundPosition = 'center';
        cardElement.style.backgroundRepeat = 'no-repeat';
        
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
    
    function flipCard() {
        if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
            this.style.backgroundImage = `url(images/${this.dataset.value}.png)`;
            this.classList.add('flipped');
            flippedCards.push(this);
            
            if (flippedCards.length === 2) {
                setTimeout(checkForMatch, 500);
            }
        }
    }
    
    function checkForMatch() {
        const [card1, card2] = flippedCards;
        
        if (card1.dataset.value === card2.dataset.value) {
            matchedPairs++;
            if (matchedPairs === cards.length / 2) {
                setTimeout(() => alert('You won!'), 300);
            }
        } else {
            setTimeout(() => {
                card1.style.backgroundImage = '';
                card2.style.backgroundImage = '';
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
            }, 500);
        }
        
        flippedCards = [];
    }
});