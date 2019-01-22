var memoryCard = document.getElementsByClassName("memory-card");

function newGame(){
    var button = document.getElementById('play');

    button.addEventListener('click', slideNewGameScreenUp)
}

newGame();

function slideNewGameScreenUp(){
    var body = document.getElementById('body');
    body.style.transform = "translateY(-50%)";
}

function matchUp(){ 
    var images = randomize();
        
    for (var i = 0; i < memoryCard.length; i++){
        
        memoryCard[i].innerHTML += images[i]
    }
    
};

function randomize(){
    //Fisher-Yeates Shuffle ---- FROM STACK OVERFLOW 
    var array = [
        "<img class='back' src = 'images/back_of_card/wine.svg'>",
        "<img class='back' src = 'images/back_of_card/wifi.svg'>",
        "<img class='back' src = 'images/back_of_card/camera.svg'>",
        "<img class='back' src = 'images/back_of_card/ufo.svg'>",
        "<img class='back' src = 'images/back_of_card/target.svg'>",
        "<img class='back' src = 'images/back_of_card/balloons.svg'>",
        "<img class='back' src = 'images/back_of_card/magic.svg'>",
        "<img class='back' src = 'images/back_of_card/gamepad.svg'>",
        "<img class='back' src = 'images/back_of_card/cocktail.svg'>",
        "<img class='back' src = 'images/back_of_card/bicycle.svg'>",
        "<img class='back' src = 'images/back_of_card/wine.svg'>",
        "<img class='back' src = 'images/back_of_card/wifi.svg'>",
        "<img class='back' src = 'images/back_of_card/camera.svg'>",
        "<img class='back' src = 'images/back_of_card/ufo.svg'>",
        "<img class='back' src = 'images/back_of_card/target.svg'>",
        "<img class='back' src = 'images/back_of_card/balloons.svg'>",
        "<img class='back' src = 'images/back_of_card/magic.svg'>",
        "<img class='back' src = 'images/back_of_card/gamepad.svg'>",
        "<img class='back' src = 'images/back_of_card/cocktail.svg'>",
        "<img class='back' src = 'images/back_of_card/bicycle.svg'>"
    ],
        currentIndex = array.length, temporaryValue, randomIndex;
    
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
    
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
        }
        return array;
    }

matchUp();

for (var i = 0; i < memoryCard.length; i++){
        
    memoryCard[i].addEventListener('click',flip);
}

var firstCardFlipped = false,
firstCard = null,
secondCard = null,
counter = 0,
matches = 0;



function flip(){

    if (firstCard === null || secondCard === null){
        
        flipNCount(this);

        if (firstCardFlipped === false){// first card not flipped yet

            firstCardFlipped = true;
            firstCard = this;
            
        } else /*firstCardFlipped === true*/ {
            secondCard = this;

            if (firstCard.getElementsByClassName("back")[0].src != // have to compare image sources or else it won't work 
                secondCard.getElementsByClassName("back")[0].src){

                
                notMatching();
            
            } else {
                
                matchNCount();
            }

        }
    }
}

function flipNCount(x){
    x.classList.add('flip');
    x.removeEventListener('click', flip);
    counter++;
    document.getElementById('counter').innerHTML = counter;
    console.log("flips: " + counter);
}

function notMatching() {
    setTimeout(function(){ // allows for player to view backface when flipping
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        firstCard.addEventListener('click',flip);
        secondCard.addEventListener('click',flip);
        firstCardFlipped = false;
        firstCard = null;
        secondCard = null;
    }, 1200);
}

function matchNCount() {
    firstCardFlipped = false;
    firstCard = null;
    secondCard = null;
    matches++;
    if (matches === 10){
        playAgain();
    }
}

function playAgain(){
    var changeThisClass = document.getElementById("replay")
    document.getElementById("final").style.visibility = "visible";
    changeThisClass.classList.add("access");
    document.getElementById("replayLink").innerHTML = "Play Again?"
}
