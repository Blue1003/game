let answer = "";
let tries = 0;

// 產生隨機答案
function makeAnswer() {
  let numbers = [0,1,2,3,4,5,6,7,8,9];
  let result = "";

  // 第一位不能是 0
  let firstIndex = Math.floor(Math.random() * 9) + 1;
  result += numbers[firstIndex];
  numbers.splice(firstIndex, 1);

  // 再選 3 個不重複的數字
  for (let i = 0; i < 3; i++) {
    let index = Math.floor(Math.random() * numbers.length);
    result += numbers[index];
    numbers.splice(index, 1);
  }

  return result;
}

// 新遊戲
function startNewGame() {
  answer = makeAnswer();
  tries = 0;
  document.getElementById("inputBox").value = "";
  document.getElementById("message").textContent = "";
  document.getElementById("history").innerHTML = "";
  console.log("【答案】" + answer); // 開發用，正式版可以拿掉
}

// 玩家猜
function checkAnswer() {
  const input = document.getElementById("inputBox").value;
  const msg = document.getElementById("message");
  const history = document.getElementById("history");

  // 檢查
  if (!/^\d{4}$/.test(input)) {
    msg.textContent = "❌ 請輸入 4 位數字";
    return;
  }

  // 有重複數字
  if (new Set(input).size !== 4) {
    msg.textContent = "❌ 數字不能重複";
    return;
  }

  tries++;
  // 計算幾A幾B
  let A = 0, B = 0;
  for (let i = 0; i < 4; i++) {
    if (input[i] === answer[i]) {
      A++;
    } else if (answer.includes(input[i])) {
      B++;
    }
  }

  if (A === 4) {
    msg.textContent = `🎉 恭喜你猜對了！答案是 ${input}，總共猜了 ${tries} 次！`;
  } else {
    msg.textContent = `${input} ➜ ${A}A${B}B`;
    history.innerHTML += `<div>第 ${tries} 次：${input} ➜ ${A}A${B}B</div>`;
  }

  document.getElementById("inputBox").value = "";
}
// 自動啟動
startNewGame();
