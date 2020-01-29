const suits = ["spades", "hearts", "diamonds", "clubs"];
const values = ["ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king"];
var deckOfCards = [];
const dealerBox = document.getElementById("dealer-cards");
const playerBox = document.getElementById("player-cards");
const btnBox = document.getElementById("btns");

class Card {
    constructor(value, suit) {
        this.value = value;
        this.suit = suit;
        this.imgSrc = "images/" + this.value + "_of_" + this.suit + ".png";
    }
};

class Deck {
    constructor() {


    }

    createDeck() {
        //create 52 Card objects
        for (const value of values) {
            for (const suit of suits) {
                deckOfCards.push(new Card(value, suit))
            }
        }
    }

    shuffle(arr) {

        var i, j, temp;
        for (i = arr.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
        return arr;
    };

    hit(player) {
        //appends one card to player.hand
        //creats img elem and sticks in approriate box
        // fucntyion does too much

        var card = deckOfCards.pop()
        player.hand.push(card)

        var img = document.createElement('img');
        img.src = card.imgSrc;

        if (player.dealer == false) {
            document.getElementById("player-cards").appendChild(img);
        } else {
            document.getElementById("dealer-cards").appendChild(img);
        }

        //this is here because it needs to be updated everytime the player takes a card.
        if (card.value === "ace") {
            player.score += 11
            player.aces += 1;
            if (player.score > 21 && player.aces > 0) {
                player.score -= 10;
                player.aces -= 1;
            }
        } else if (card.value === "jack" || card.value === "queen" || card.value === "king") {
            player.score += 10;
        } else {
            player.score += card.value;
        }

        showScore(player);
        console.log(player.score);
        console.log(player.hand);
    }
}

class Player {
    constructor(dealer) {
        this.score = 0;
        this.aces = 0;
        this.hand = [];
        this.dealer = dealer;
    }


}

function deal(player, dealer) {
    //deals initial two cards to the player and one card to the dealer.
    deck.createDeck();
    deck.shuffle(deckOfCards);

    deck.hit(player);
    deck.hit(player);
    deck.hit(dealer);
    document.getElementsByClassName("deal-btn")[0].style.display = "none";
    document.getElementsByClassName("hit-btn")[0].style.display = "inline";
    document.getElementsByClassName("stand-btn")[0].style.display = "inline";
}

function winCheck(player, dealer) {
    if (player.score > dealer.score && player.score <= 21) {
        console.log("playerwins");

    } else if (player.score === dealer.score) {
        console.log("push");
    } else if (dealer.score > player.score && dealer.score <= 21) {
        console.log("dealerwisn ");
    } else if (dealer.score > 21) {
        console.log("player wins");
    }
}

function finishDealer(dealer) {
    while (dealer.score < 17) {
        deck.hit(dealer);
    }
    document.getElementsByClassName("play-again-btn")[0].style.display = "inline";
    document.getElementsByClassName("hit-btn")[0].style.display = "none";
    document.getElementsByClassName("stand-btn")[0].style.display = "none";

}

function showScore(player) {
    //trash
    if (player.dealer == false) {
        document.getElementsByClassName("player-score")[0].innerHTML = player.score;
    } else {
        document.getElementsByClassName("dealer-score")[0].innerHTML = player.score;
    }
}

function playAgain(player, dealer) {
    //trash
    player.hand = [];
    player.score = 0;
    dealer.hand = [];
    dealer.score = 0;
    
    const myNode = document.getElementById("dealer-cards");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }

    const myNode2 = document.getElementById("player-cards");
    while (myNode2.firstChild) {
        myNode2.removeChild(myNode2.firstChild);
    }
    
    document.getElementsByClassName("deal-btn")[0].style.display = "inline";
    document.getElementsByClassName("play-again-btn")[0].style.display = "none";
}



    




var deck = new Deck();
var dealer = new Player(true);
var player = new Player(false);