let players = [];
let currentPlayerIndex = 0;
let cardDeck = [];
let playerCards = [];

function setupGame(playerCount) {
  players = Array.from({ length: playerCount }, (_, i) => ({
    name: `玩家 ${i + 1}`,
    score: 0,
  }));
  playerCards = Array.from({ length: playerCount }, () => []);
  initializeDeck();
  document.getElementById("player-setup").style.display = "none";
  document.getElementById("game-area").style.display = "block";
  updateScoreboard();
  updatePlayerCards();
  populatePlayerSelect();
  updateCurrentTurn();
}

function initializeDeck() {
  cardDeck = [
    { text: "遊戲期間不能說出你我他 -3", points: -3 },
    { text: "遊戲期間只能用左手 -5", points: -5 },
    { text: "遊戲期間不能笑 -2", points: -2 },
    { text: "黃金卡牌！", points: "gold" },
    { text: "test 1", points: -3 },
    { text: "test 2", points: -5 },
    { text: "test 3", points: -2 },
    { text: "黃金卡牌！", points: "gold" },
    { text: "test 1", points: -3 },
    { text: "test 2", points: -5 },
    { text: "test 3", points: -2 },
    { text: "黃金卡牌！", points: "gold" },
    // 添加更多卡牌
  ];
}

function populatePlayerSelect() {
  const playerSelect = document.getElementById("player-select");
  playerSelect.innerHTML = players
    .map((player, index) => `<option value="${index}">${player.name}</option>`)
    .join("");
}

function applyPenalty() {
  const selectedPlayer = parseInt(document.getElementById("player-select").value, 10);
  const penaltyPoints = parseInt(document.getElementById("penalty-points").value, 10);
  if (!isNaN(penaltyPoints) && penaltyPoints > 0) {
    players[selectedPlayer].score -= penaltyPoints;
    updateScoreboard();
    alert(`${players[selectedPlayer].name} 扣了 ${penaltyPoints} 分！`);
  } else {
    alert("請輸入有效的扣分數！");
  }
}

function updateScoreboard() {
  const scoreboard = document.getElementById("scoreboard");
  scoreboard.innerHTML = players
    .map(
      (player, index) =>
        `<div class="player-score">${player.name}: ${player.score} 分</div>`
    )
    .join("");
}

function updatePlayerCards() {
  const playerCardsDiv = document.getElementById("player-cards");
  playerCardsDiv.innerHTML = players
    .map((player, index) => {
      const cards = playerCards[index]
        .map(card => `<div class="card"><div class="card-title">${card.text}</div></div>`)
        .join("");
      return `<div class="card-container">
                <h3>${player.name} 的卡牌：</h3>
                ${cards || "<p>目前無卡牌</p>"}
              </div>`;
    })
    .join("");
}

function updateCurrentTurn() {
  const currentPlayerName = players[currentPlayerIndex].name;
  document.getElementById("current-player-name").textContent = currentPlayerName;
}

function drawCard() {
  if (cardDeck.length === 0) {
    alert("卡牌已經用完！");
    return;
  }
  const cardIndex = Math.floor(Math.random() * cardDeck.length);
  const card = cardDeck.splice(cardIndex, 1)[0];
  const cardDisplay = document.getElementById("card-display");

  if (card.points === "gold") {
    const goldPoints = playerCards[currentPlayerIndex].length;
    players[currentPlayerIndex].score += goldPoints;
    cardDisplay.textContent = `${card.text}！所有卡牌變成分數：${goldPoints} 分！`;
    playerCards[currentPlayerIndex] = []; // 清空該玩家的手牌
  } else {
    playerCards[currentPlayerIndex].push(card); // 將卡牌加入玩家手牌
    cardDisplay.textContent = `${card.text}`;
  }

  updateScoreboard();
  updatePlayerCards();
  currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
  updateCurrentTurn();
}
