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
    { text: "黃金卡牌！", points: "gold" },
    { text: "黃金卡牌！", points: "gold" },
    { text: "黃金卡牌！", points: "gold" },
    { text: "黃金卡牌！", points: "gold" },
    { text: "黃金卡牌！", points: "gold" },
    { text: "黃金卡牌！", points: "gold" },
    { text: "黃金卡牌！", points: "gold" },
    { text: "黃金卡牌！", points: "gold" },
    { text: "黃金卡牌！", points: "gold" },
    { text: "黃金卡牌！", points: "gold" },
    { text: "黃金卡牌！", points: "gold" },
    { text: "黃金卡牌！", points: "gold" },
    { text: "黃金卡牌！", points: "gold" },
    { text: "黃金卡牌！", points: "gold" },
    { text: "黃金卡牌！", points: "gold" },
    { text: "黃金卡牌！", points: "gold" },
    { text: "黃金卡牌！", points: "gold" },
    { text: "黃金卡牌！", points: "gold" },
    { text: "黃金卡牌！", points: "gold" },
    { text: "黃金卡牌！", points: "gold" },
    { text: "學語法則 遊戲期間不能說出你我他 -2", points: -2 },
    { text: "拎包法則 遊戲期間雙手手肘必須保持彎曲 -3", points: -3 }, 
    { text: "負擔法則 從抽取這張牌的下一回合開始 玩家總牌數不得多餘5張 -4", points: -4 },
    { text: "保鑣法則 擋下下一個其他玩家的懲罰", points: -5 },
    { text: "庫存法則 玩家需要在其他玩家抽牌前喊出所有人的卡牌數 -2", points: -2 },
    { text: "荷官法則 玩家需要在其他玩家抽牌前喊出所有人的點數 -2", points: -3 },
    { text: "點名法則 玩家需要在其他玩家抽牌前喊出所有人的名字 -2", points: -5 },
    { text: "清點法則 玩家需要在其他玩家抽牌前喊出自己的卡牌數量 -2", points: -2 },
    { text: "高風險無回報法則 玩家之後的懲罰加倍 x2", points: -2 },
    { text: "開心法則 玩家需要每次在其他玩家抽牌前講一個冷笑話 -3", points: -3 },
    { text: "好學生法則 玩家每次說話前需要舉起右手 -3", points: -3 },
    { text: "暱稱法則 所有玩家需要在自己抽牌前喊出自己的中文綽號 -3", points: -3 },
    { text: "情緒價值法則 在其他玩家抽到黃金卡牌時需要給予滿滿的情緒價值 -4", points: -4 },
    { text: "觀眾法則 在其他玩家抽到黃金卡牌時需要鼓掌3下 -5", points: -5 },
    { text: "Yes Man法則 不可說「不」 -2", points: -2 },
    { text: "落枕法則 玩家不能轉動脖子 -3", points: -3 },
    { text: "害羞法則 1分鐘內說出一件自己的糗事 -5", points: -5 },
    { text: "戀愛法則 1分鐘內說出一件自己的戀愛故事 -5", points: -5 },
    { text: "圖書館法則 說話必須輕聲細語 -2", points: -2 },
    { text: "秘密法則 1分鐘內說出一件自己的秘密 -5", points: -5 },
    { text: "真心話法則 問其他玩家裡分數最低的人一個真心話 -5", points: -5 },
    { text: "大冒險法則 給予其他玩家裡分數最低的人一個大冒險 -5", points: -5 },
    { text: "真心話法則 問其他玩家裡分數最高的人一個真心話 -5", points: -5 },
    { text: "大冒險法則 給予其他玩家裡分數最高的人一個大冒險 -5", points: -5 },
    { text: "真心話法則 問其他玩家裡牌數最多的人一個真心話 -5", points: -5 },
    { text: "大冒險法則 給予其他玩家裡牌數最多的人一個大冒險 -5", points: -5 },
    { text: "真心話法則 問其他玩家裡牌數最少的人一個真心話 -5", points: -5 },
    { text: "大冒險法則 給予其他玩家裡牌數最少的人一個大冒險 -5", points: -5 },
    { text: "真心話法則 問其他玩家裡的一位異性一個真心話 -5", points: -5 },
    { text: "大冒險法則 給予其他玩家裡的一位異性一個大冒險 -5", points: -5 },
    { text: "真心話法則 問其他玩家裡的一位同性一個真心話 -5", points: -5 },
    { text: "大冒險法則 給予其他玩家裡的一位同性一個大冒險 -5", points: -5 },
    { text: "好寶寶法則 玩家不能罵髒話 -4", points: -4 },
    { text: "詩人法則 每句話只能講7個字 -3", points: -3 },
    { text: "饒舌法則 每句話都必須押韻 -3", points: -3 },
    { text: "歌手法則 說話必須有音調 -2", points: -2 },
    { text: "木乃伊法則 雙手必須放在胸前 -3", points: -3 },
    { text: "束縛法則 兩隻手肘必須一直貼住身體 -3", points: -3 },
    { text: "好奇法則 說話時需要歪著頭講話 -3", points: -3 },
    { text: "裝可愛法則 需要一直兩手比一指著自己的臉頰 -3", points: -3 },
    { text: "討債法則 所有其餘玩家扣一分 -1", points: -1 },
    { text: "富士山法則 失去4分 下一局如抽重黃金卡牌則再失去三分 -7", points: -7 },
    { text: "花朵法則 雙手必須貼在臉頰上扮成一朵花 -2", points: -2 },
    { text: "兔子法則 雙手比Ya放在頭頂扮成一隻兔子 -2", points: -2 },
    { text: "糾察官法則 抓到其他玩家沒有遵守規定 則懲罰翻倍 -4", points: -4 },
    { text: "國文小老師法則 聽到有玩家說出「他」時需要說抓 -2", points: -2 },
    { text: "模仿法則 需要模仿分數最低的玩家平時的行為 -3", points: -3 },
    { text: "E人法則 需要持續看著分數最低的玩家 -2", points: -2 },
    { text: "I人法則 不能直視分數最低的玩家 -2", points: -2 },
    { text: "熱舞法則 如果是分數最低玩家的回合時 需要持續扭動身體直到回合結束 -3", points: -3 },
    { text: "擔當法則 分數最低的玩家轉嫁其中一張卡牌給你", points: -4 },
    { text: "忌妒法則 如果有玩家一次獲得5分以上則你扣一分 -1", points: -4 },
    { text: "羨慕法則 如果有玩家一次獲得5分以上則他扣一分 -1", points: -4 },
    { text: "動物園法則 所有玩家在抽牌後3秒內說一種動物 直到有人沒說 -5", points: -5 },
    { text: "我從來沒有法則 所有玩家在抽牌前說一件自己從來沒有的事情 有的玩家扣一分 如果忘記問扣5分 -1/-5", points: -5 },
    { text: "情緒價值法則 在其他玩家抽到黃金卡牌時需要給予滿滿的情緒價值 -4", points: -4 },
    { text: "討厭鬼法則 每次抽牌前指定一個人扣他一分 -1", points: -1 },
    { text: "龜苓膏法則 分數歸零(負分則不用)", points: -4 },
    { text: "核彈法則 除了自己的所有玩家分數歸零(負分則不用)", points: -4 },
    { text: "炸彈法則 選擇一位玩家歸零他的分數(負分則不用)", points: -4 },
    { text: "好朋友法則 選擇一位玩家做好朋友 只要你扣分則他需要幫你承擔一半", points: -4 },
    { text: "壞朋友法則 選擇一位玩家做壞朋友 只要他扣分則你需要幫他承擔一半", points: -4 },
    { text: "數支法則 所有玩家比出0~5的數字 加總選到的玩家扣5分 -5", points: -5 },
    { text: "機關槍法則 每次在有人抽牌時對她比出射擊的手勢 -3", points: -3 },
    { text: "好人說好話法則 每次在有人抽牌時說一件他的優點 -4", points: -4 },
    { text: "好人說真心話法則 每次在有人抽牌時說一件他的缺點 -4", points: -4 },
    { text: "自我介紹法則 每次在有人抽牌時說-4", points: -4 },
    { text: "節奏遊戲法則 玩一局節奏遊戲 -5", points: -5 },
    { text: "創造神法則 制定新規則 -5", points: -5 },
    { text: "創造神法則 制定新規則 -5", points: -5 },
    { text: "創造神法則 制定新規則 -5", points: -5 },
    { text: "創造神法則 制定新規則 -5", points: -5 },
    { text: "創造神法則 制定新規則 -5", points: -5 },
    { text: "男生法則 所有男生扣分 -1", points: -1 },
    { text: "天堂法則 抽出這張牌之後最慢舉手的扣四分 -4", points: -4 },
    { text: "地獄法則 抽出這張牌之後最慢碰到地板的扣四分 -4", points: -4 },
    { text: "肚子餓法則 如果你抽到這張牌 你會知道我寫程式到這裡肚子好餓喔 餓到扣其他人的分數 -1", points: -1 },
    { text: "鬼魂法則 玩家需要一直吐舌頭 -2", points: -2 },
    { text: "叛逆期法則 玩家需要一直講反話 -3", points: -3 },
    { text: "嫁禍法則 可以將一次其他玩家的扣分轉嫁給另一位玩家", points: -4 },
    { text: "免死金牌法則 可以免一次任何人的扣分", points: -4 },
    { text: "聖誕老公公法則 送所有玩家一個扣分大禮包 -5", points: -5 },
    { text: "貓咪法則 有人問問題就只能回「喵～」 -2", points: -2 },
    { text: "神奇寶貝法則 在每句話後面要加上自己的中文綽號 -3", points: -3 },
    { text: "地瓜法則 有人問問題就只能回「ㄅㄨˊ～」 -2", points: -2 },
    { text: "王水法則 王水可以腐蝕黃金 因此抽到下一張黃金卡牌的人扣分 -5", points: -5 },
    { text: "歪國人法則 只能說自創語言 並且選擇一個人當自己的翻譯 -3", points: -3 },
    { text: "漫才法則 找一個人當自己的搭檔 只要他說一句話就必須要吐槽她 -3", points: -3 },
    { text: "防災法則 不是自己回合的時候要雙手護住頭 -4", points: -4 },
    { text: "健身法則 選擇做10下伏地挺身+10下仰臥起坐 或者扣分 -7", points: -7 },
    { text: "默契法則 選擇一個玩家跟他玩默契考驗 -4", points: -4 },
    { text: "優雅法則 動作需要非常貴婦 而且每次抽完卡片都需要送一個飛吻給他 -3", points: -3 },
    { text: "殘酷二選一法則 出一題殘酷二選一 選擇少數的人扣分 -2", points: -2 },
    { text: "巨人法則 抽到這張牌的人 頭頂的海拔需要一直是全場最高 -4", points: -4 },
    { text: "最X法則 沒抽到牌的人秘密選出一個人 抽到牌的需要講出這個人應該是在場最「X」的人 成功的話全場扣3分 反之自己扣4分 -3/-4", points: -4 },
    { text: "複製人法則 沒抽到牌的人要想一個綽號來叫所有人 -2", points: -2 },
    { text: "地牢法則 跟所有玩家猜拳 平手的人每到自己的回合扣兩分 輸的人扣四分 -2/-4", points: -4 },
    { text: "算命法則 所有跟抽牌者不同星座的玩家都不幸 需要被扣分 -4", points: -4 },
    { text: "蠟筆小新法則 要學蠟筆小新講話 -4", points: -4 },
    { text: "賭博法則 選擇一個數字以及一位玩家 跟他猜拳後輸的人扣該分數", points: -4 },
    
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
