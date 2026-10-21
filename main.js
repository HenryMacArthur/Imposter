import questions from './questions.js';

// Here's all our html element variables
const startbtn = document.getElementById('startbtn');
const numPlaying = document.getElementById('pplplaying');
const beginningStuff = document.getElementById('beginningStuff');
const notBeginningStuff = document.getElementById('notBeginningStuff');
const question = document.getElementById('question');
const nextPersonBtn = document.getElementById('nextPerson');

// These change so keep em let
let thisRoundCat;
let impPerson;
let personNum = 0;
let numPlayers = 0;

function startPlaying() {
    numPlayers = Number(numPlaying.value);

    if (!Number.isInteger(numPlayers) || numPlayers < 1) {
        console.log('Please enter a valid number of players.');
        // Maybe we wanna add a popup or smth so it doesn't just fail silently?
        return;
    }

    console.log(`Game started. People playing: ${numPlayers}`);

    beginningStuff.style.display = 'none';
    notBeginningStuff.style.display = 'unset';

    newRound();
}

function newRound() {
    // get a random set of questions from questions.js (each set is stored as an object in the array)
    thisRoundCat = questions[
        Math.floor(Math.random() * questions.length)
    ];

    console.log(`New round started. Category: ${thisRoundCat.category}`);

    // pick the imposter
    impPerson = Math.floor(Math.random() * numPlayers);

    console.log(`Person who will be Imposter this round: ${impPerson}`);

    // we're gonna use a 0-index cuz it's simpler
    personNum = 0;

    displayQuestion();
}

function displayQuestion() {
    if (personNum === impPerson) {
        question.innerHTML = thisRoundCat.imp;
        console.log(`Displaying imp question for person ${personNum}`);
    } else {
        question.innerHTML = thisRoundCat.nonimp;
        console.log(`Displaying nonimp question for person ${personNum}`);
    }

    // Change the button when everyone has received a question
    if (personNum === numPlayers - 1) {
        nextPersonBtn.innerHTML = 'Next Round';
    } else {
        nextPersonBtn.innerHTML = 'Next Person';
    }
}

nextPersonBtn.addEventListener('click', function() {
    console.log('Next Person button has been clicked.');

    if (personNum === numPlayers - 1) {
        // Everyone has received their question; start another round
        newRound();
    } else {
        // Move to the next player
        personNum++;

        displayQuestion();
    }
});

startbtn.addEventListener('click', startPlaying);