// Global Variables //
let card = document.getElementsByClassName("card"); // Cards array holds all of the cards
let cards = [...card]
const deck = document.getElementById("card-deck"); // Deck of all the cards in game
let moves = 0; // Move counter
let counter = document.querySelector(".moves"); // Visually changes move counter
const stars = document.querySelectorAll(".fa-star"); // Declare variables for the star icons
let matchedCard = document.getElementsByClassName("match"); // Declaring variable of matchedCards
let starsList = document.querySelectorAll(".stars li"); // Stars list
let closeicon = document.querySelector(".close"); // Close icon in modal
let modal = document.getElementById("popup1") // Declare modal
let toggledCards = []; // Array for toggled cards

// Shuffles cards
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

// Shuffles cards when page is refreshed / loads
document.body.onload = startGame();

// Function to start a new play 
function startGame(){
    // shuffle deck
    cards = shuffle(cards);
    // remove all exisiting classes from each card
    for (var i = 0; i < cards.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
    }
    // reset moves
    moves = 0;
    counter.innerHTML = moves;
    // reset rating
    for (var i= 0; i < stars.length; i++){
        stars[i].style.color = "#FFD700";
        stars[i].style.visibility = "visible";
    }
    //reset timer
    seconds = 0;
    minutes = 0; 
    hour = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0m 0s";
    clearInterval(interval);
}

// Toggles the open and show class' to show cards
var showCard = function (){
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};


// Add cards to toggledCard list, and checks if the cards are a match or not
function cardToggled() {
    toggledCards.push(this);
    var len = toggledCards.length;
    if(len === 2){
        moveCount();
        if(toggledCards[0].type === toggledCards[1].type){
            matched();
        } else {
            unmatched();
        }
    }
};


// This tracks if the cards match
function matched(){
    toggledCards[0].classList.add("match", "disabled");
    toggledCards[1].classList.add("match", "disabled");
    toggledCards[0].classList.remove("show", "open", "no-event");
    toggledCards[1].classList.remove("show", "open", "no-event");
    toggledCards = [];
}


// This tracks if the cards do not match
function unmatched(){
    toggledCards[0].classList.add("unmatched");
    toggledCards[1].classList.add("unmatched");
    disable(); // Prevents user from clicking on cards when 2 cards are showing
    setTimeout(function(){
        toggledCards[0].classList.remove("show", "open", "no-event","unmatched");
        toggledCards[1].classList.remove("show", "open", "no-event","unmatched");
        enable(); // Allows user to pick cards again
        toggledCards = [];
    },1100);
}


// Disable cards. Used to prevent move count from incrementing
function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}


// Enable cards and disable matched cards
function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(var i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
    });
}


// This is the move counter
function moveCount(){
    moves++;
    counter.innerHTML = moves;
    // Start timer on first click
    if(moves == 1){
        seconds = 0;
        minutes = 0; 
        hour = 0;
        startTimer();
    }
    // Score based on number of moves
    if (moves === 10){
        for( i= 0; i < 3; i++){
            if(i > 1){
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves === 15){
        for( i= 0; i < 3; i++){
            if(i > 0){
                stars[i].style.visibility = "collapse";
            }
        }
    }
}


// Game timer
var seconds = 0, minutes = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minutes + "m " + seconds + "s";
        seconds++;
        if(seconds == 60){
            minutes++;
            seconds = 0;
        }
    },1000);
}


// Brings up model
function openModal(){
    if (matchedCard.length == 16){ // Amount of turned cards to enable the modal screen
        clearInterval(interval);
        finalTime = timer.innerHTML;

        // Show modal
        modal.classList.add("show");

        // Seclare star rating variable
        var starRating = document.querySelector(".stars").innerHTML;

        // Show's game stats
        document.getElementById("modal_moves").innerHTML = moves;
        document.getElementById("modal_stars").innerHTML = starRating;
        document.getElementById("modal_time").innerHTML = finalTime;

        // Attached to close icon
        closeModal();
    };
}


// Close icon on modal
function closeModal(){
    closeicon.addEventListener("click", function(e){
        modal.classList.remove("show");
        startGame();
    });
}


// Asks user to play again 
function playAgain(){
    modal.classList.remove("show");
    startGame();
}


// Event listener for each card
for (var i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener("click", showCard);
    card.addEventListener("click", cardToggled);
    card.addEventListener("click",openModal);
};
