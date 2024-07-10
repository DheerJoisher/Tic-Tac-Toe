let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset");
let newbtn = document.querySelector("#new");
let msg_container = document.querySelector("#msgbox");
let winnermsg = document.querySelector("#win-text");
let turnX = true;
const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const reset = () => {
  boxes.forEach((box) => {
    box.innerHTML = "";
    box.disabled = false;
  });
  turnX = true;
  msg_container.style.display = 'none'; // Hide the message container
};

resetbtn.addEventListener("click", reset);
newbtn.addEventListener("click", reset);

const disableBox = () => {
  boxes.forEach((box) => {
    box.disabled = true;
  });
};

const checkWinner = () => {
  let winner = null;
  winPatterns.forEach((pattern) => {
    if (
      boxes[pattern[0]].innerHTML === boxes[pattern[1]].innerHTML &&
      boxes[pattern[1]].innerHTML === boxes[pattern[2]].innerHTML &&
      boxes[pattern[0]].innerHTML !== ""
    ) {
      winner = `${boxes[pattern[0]].innerHTML} wins!`;
    }
    else if (winner === null && [...boxes].every(box => box.innerHTML !== "")) {
      winner = "It's a tie!";
    }
  });
  return winner;
};

const showWinner = (winner) => {
  if (winner) {
    msg_container.style.display = 'flex'; // Show the message container
    winnermsg.innerHTML = `${winner}`;
    disableBox();
  }
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (!box.innerHTML) {
      box.innerHTML = turnX ? "X" : "O";
      box.disabled = true;
      turnX = !turnX;

      const winner = checkWinner();
      showWinner(winner);
    }
  });
});
