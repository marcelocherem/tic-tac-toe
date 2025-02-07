document.addEventListener("DOMContentLoaded", function () {
    const squares = document.querySelectorAll(".square");
    const player1ScoreElement = document.querySelector("#player1");
    const player2ScoreElement = document.querySelector("#player2");
    const numberTime1 = document.querySelector("#numberTime1");
    const numberTime2 = document.querySelector("#numberTime2");
    let player1Score = 0;
    let player2Score = 0;
    let currentPlayer = "X";
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function checkWin() {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return squares[index].textContent === currentPlayer;
            });
        });
    }

    function checkDraw() {
        return [...squares].every(square => square.textContent !== "");
    }

    function handleClick(event) {
        const square = event.target;

        if (square.textContent !== "") {
            return;
        }

        square.textContent = currentPlayer;

        if (checkWin()) {
            setTimeout(() => {
                alert(`${currentPlayer} wins!`);
                if (currentPlayer === "X") {
                    player1Score++;
                    player1ScoreElement.textContent = player1Score;
                } else {
                    player2Score++;
                    player2ScoreElement.textContent = player2Score;
                }
                resetGame();
            }, 100);
            return;
        }

        if (checkDraw()) {
            setTimeout(() => {
                alert("it`s a tie!");
                resetGame();
            }, 100);
            return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";
        updateTurnIndicator();
    }

    function resetGame() {
        squares.forEach(square => square.textContent = "");
        currentPlayer = "X";
        updateTurnIndicator();
    }

    function updateTurnIndicator() {
        if (currentPlayer === "X") {
            numberTime1.classList.add("active");
            numberTime2.classList.remove("active");
        } else {
            numberTime1.classList.remove("active");
            numberTime2.classList.add("active");
        }
    }

    squares.forEach(square => square.addEventListener("click", handleClick));
    updateTurnIndicator();
});
