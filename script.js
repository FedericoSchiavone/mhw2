
const boxes = document.querySelectorAll('.choice-grid div');

let grid1 = false;
let grid2 = false;
let grid3 = false;

let choice1 = null;
let choice2 = null;
let choice3 = null;


for(const box of boxes) 
{
    box.addEventListener('click', changeToChecked);
}




function changeColorIn(event) {
    const box = event.currentTarget;
    box.style.background = '#e0e0e0';
}

function changeColorOut(event) {
    const box = event.currentTarget;
    box.style.background = '#cecece';
}

function changeToChecked(event) {
    const box = event.currentTarget;
    let check = box.lastElementChild;
    let grid = box.parentElement;
    

        if(!(grid1 && grid2 && grid3)) {
            switch(box.dataset.questionId) {
                case 'one': 
                    grid1 = true;
                    choice1 = box.dataset.choiceId
                    break;
                case 'two':
                    grid2 = true;
                    choice2 = box.dataset.choiceId
                    break;
                case 'three':
                    grid3 = true;
                    choice3 = box.dataset.choiceId
                    break;
            }
            
            check.src = './images/checked.png';
            box.style.background = '#cfe3ff';
            box.style.opacity = '1';

            for(const choice of boxes) {
                if(choice.dataset.choiceId != box.dataset.choiceId && choice.dataset.questionId == box.dataset.questionId) {
                    choice.style.opacity = '0.6';
                    choice.style.background = '#f4f4f4';
                    choice.lastElementChild.src = './images/unchecked.png';
                }
            }
        }
        if(grid1 && grid2 && grid3) {
        giveResults();
        for(const box of boxes) 
            {
                box.removeEventListener('click', changeToChecked);
            }
        }
    }

function reset(event) {
    const boxes1 = document.querySelectorAll('.choice-grid div');
    for(const box of boxes1) {
        box.style.background = '#f4f4f4';
        box.style.opacity = '1';
        box.lastElementChild.src = './images/unchecked.png';

        grid1 = false;
        grid2 = false;
        grid3 = false;

        choice1 = null;
        choice2 = null;
        choice3 = null;

        const risultato = document.querySelector('#risultato');
        risultato.innerHTML = '';

        for(const box of boxes) 
        {
            box.addEventListener('click', changeToChecked);
        }


    }
}
    
function giveResults() {
    let i = choice1;
    if(choice1 == choice2) i = choice1;
    if(choice2 == choice3) i = choice2;
    if(choice1 == choice3) i = choice3;

    const titolo = document.createElement('h2');
    titolo.textContent = RESULTS_MAP[i].title;

    const contenuto = document.createElement('p');
    contenuto.classList.add('contenuto');
    contenuto.textContent = RESULTS_MAP[i].contents;

    const ricomincia = document.createElement('button');
    ricomincia.classList.add('ricomincia');
    ricomincia.textContent = 'Ricomincia il quiz';

    const risultato = document.querySelector('#risultato');
    risultato.appendChild(titolo);
    risultato.appendChild(contenuto);
    risultato.appendChild(ricomincia);

    const restart = document.querySelector('button');
    restart.addEventListener('click', reset);
    restart.addEventListener('mouseenter', changeColorIn);
    restart.addEventListener('mouseleave', changeColorOut);
    
}

