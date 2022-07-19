    const grid = document.querySelector('.grid');
    const spanPlayer = document.querySelector('.player');
    const timer = document.querySelector('.timer');

    const characters= [

        'diretor',
        'gina',
        'harrypotter',
        'hermione',
        'luna',
        'malfoy',
        'minerva',
        'neville',
        'tom',
        'weseley',

    ];
    const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
    }

    let firstcard = '';
    let secondcard = '';

    const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');

    if (disabledCards.length === 20) {
        clearInterval(this.loop);
        alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi: ${timer.innerHTML}`);
    }
    }

    const checkcards = () => {
    const firstCharacter = firstcard.getAttribute('data-character');
    const secondCharacter = secondcard.getAttribute('data-character');

    if (firstCharacter === secondCharacter) {

        firstcard.firstChild.classList.add('disabled-card');
        secondcard.firstChild.classList.add('disabled-card');

        firstcard = '';
        secondcard = '';

        checkEndGame();

    } else {
        setTimeout(() => {

        firstcard.classList.remove('reveal-card');
        secondcard.classList.remove('reveal-card');

        firstcard = '';
        secondcard = '';

        }, 500);
    }
}


    const revealcard = ({ target }) => {

    if (target.parentNode.className.includes('reveal-card')) {
        return;
        }

        if (firstcard === '') {
            
            target.parentNode.classList.add('reveal-card');
            firstcard = target.parentNode;

        }else if (secondcard === '') {

            target.parentNode.classList.add('reveal-card');
            secondcard = target.parentNode;

            checkcards();

        }

    }

    const createcard = (character) => {

        const card = createElement('div', 'card');
        const front = createElement('div', 'face front');
        const back = createElement('div', 'face back');

    front.style.backgroundImage =`url('../imagens/${character}.jpg')`;

        card.appendChild(front);
        card.appendChild(back);

        card.addEventListener('click', revealcard );
        card.setAttribute('data-character', character)

        return card;
    }

        const loadGame = () => {
            const duplicateCharacters = [ ...characters, ... characters ];
            
            const shuffledArray = duplicateCharacters.sort(() =>  Math.random() -0.5);
            
    shuffledArray.forEach((character) => {
        const card = createcard(character);
        grid.appendChild(card);
    });
    }

    const startTimer = () => {

        this.loop = setInterval(() => {
        const currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1;
    }, 1000);

    }

    window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem('player');
    startTimer();
    loadGame();
    }

    