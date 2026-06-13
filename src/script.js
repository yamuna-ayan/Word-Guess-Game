let currentPlayer = 1;

async function submitGuess(){

    const guess =
    document
    .getElementById("guessInput")
    .value;

    const response =
    await fetch(
        "http://localhost:5000/guess",
        {
            method:"POST",
            headers:{
                "Content-Type":
                "application/json"
            },
            body:JSON.stringify({
                guess
            })
        }
    );

    const data =
    await response.json();

    const banner =
    document.getElementById("banner");

    if(data.status === "WIN"){

        banner.className="win";

        banner.innerHTML=
        `🎉 Player ${currentPlayer} Wins`;

        return;
    }

    if(data.status === "LOSE"){

        banner.className="lose";

        banner.innerHTML=
        `❌ Game Over.
         Word was ${data.word}`;

        return;
    }

    document
    .getElementById("attempts")
    .innerText =
    data.attemptsLeft;

    const li =
    document.createElement("li");

    li.innerText =
    `Player ${currentPlayer}: ${guess}`;

    document
    .getElementById("history")
    .appendChild(li);

    currentPlayer =
    currentPlayer === 1 ? 2 : 1;

    document
    .getElementById("turn")
    .innerText =
    `Player ${currentPlayer} Turn`;
}

async function restartGame(){

    await fetch(
        "http://localhost:5000/restart",
        {
            method:"POST"
        }
    );

    currentPlayer = 1;

    document
    .getElementById("turn")
    .innerText =
    "Player 1 Turn";

    document
    .getElementById("attempts")
    .innerText = 6;

    document
    .getElementById("banner")
    .innerHTML = "";

    document
    .getElementById("history")
    .innerHTML = "";

    document
    .getElementById("guessInput")
    .value = "";
}