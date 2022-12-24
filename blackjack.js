// Create deck of cards - ignore suits for simplicity
var deck = ["Ace", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King"]

// Randomizer -- I just found this code online and stole it :3
function pickACard(arr) {
    // get random index value
    const randomIndex = Math.floor(Math.random() * arr.length);
    // get random item
    const item = arr[randomIndex];
    return item;
}

// Pick Cards - need to keep track for later
var dealerCards = [pickACard(deck), pickACard(deck)]
var playerCards = [pickACard(deck), pickACard(deck)]

// This will start the game by giving the dealer and player two cards each
function startGame() {
  // Display picked cards
  document.getElementById('dealer').innerHTML = "Dealer Cards:" + " XXXX" + " and " + dealerCards[1]
  document.getElementById('player').innerHTML = "Player Cards: " + playerCards[0] + " and " + playerCards[1]
  // Add hit or stay button
  document.getElementById('hit').innerHTML = '<button id="hitBut" type="button" onclick="Hit()">Hit Me!</button>'
  document.getElementById('stay').innerHTML = '<button id="stayBut" type="button" onclick="Stay()">Stay!</button>'
  // Check right away if player busted
  bustChecker(playerCards, "player")
  // Prevent player from starting game while active
  document.querySelector('button').disabled = true
  
}

// Will handle tranforming cards to numbers
function transformCards(hand) {
  // First need to turn Ace to 1 and Jack/Queen/King to 11
  for (let i = 0; i < hand.length; i++) {
    if (hand[i] == "Ace") {
      hand[i] = 1
    } else if (hand[i] == "Jack" || hand[i] == "Queen" || hand[i] == "King") {
      hand[i] = 11
    } 
  }
}

// Sum function
function addStuff(hand) {
  var sum = 0
  for (let i = 0; i < hand.length; i++) {
    sum += hand[i]
  }
  return sum
}

// Will check to see if player > 21
function bustChecker(hand, player) {
  transformCards(hand)
  sum = addStuff(hand)
  // Now we check if sum is greater than 21
  if (sum > 21) {
    if (player == "player") {
      document.getElementById('status').innerHTML = "Bust! You lost with: " + sum + ". Please refresh the page to play again."
    } else {
      document.getElementById('status').innerHTML = "You win! The dealer busted with: " + sum + ". Please refresh the page to play again."
      key = 1
    }
    // these disable the buttons once the game is over.
    document.getElementById('hitBut').disabled = true
    document.getElementById('stayBut').disabled = true
  }
}

// Will handle whenever the player wants to get another card
function Hit() {
  playerCards.push(pickACard(deck))
  document.getElementById('player').innerHTML = document.getElementById('player').innerHTML + " and " + playerCards[playerCards.length - 1]
  bustChecker(playerCards, "player") // function to check if player fucked up
}

var key = 0 // global variable just to control stuff
function Stay() {
  document.getElementById('dealer').innerHTML = "Dealer Cards: " + dealerCards[0] + " and " + dealerCards[1] // show the first card
  transformCards(dealerCards)
  bustChecker(dealerCards, "dealer")
  playerSum = addStuff(playerCards)
  dealerSum = addStuff(dealerCards)
  while (key == 0) {
    dealerSum = addStuff(dealerCards)
    if (dealerSum > playerSum) {
      document.getElementById('status').innerHTML = "Dealer won with " + dealerSum + " compared to your " + playerSum + ". Please refresh the page to play again."
      document.getElementById('hitBut').disabled = true
      document.getElementById('stayBut').disabled = true
      key = 1
    } else if (dealerSum == playerSum) {
      document.getElementById('status').innerHTML = "Tie game! Please refresh the page to play again."
      document.getElementById('hitBut').disabled = true
      document.getElementById('stayBut').disabled = true
      key = 1
    } else {
      dealerCards.push(pickACard(deck))
      document.getElementById('dealer').innerHTML = document.getElementById('dealer').innerHTML + " and " + dealerCards[dealerCards.length - 1]
      bustChecker(dealerCards, "dealer")
    }
  }
}
