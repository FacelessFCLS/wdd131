document.addEventListener("DOMContentLoaded", function() {
    const dice = document.getElementById("dice");
    const rollBtn = document.getElementById("roll-btn");
    const result = document.getElementById("result");
    const historyList = document.getElementById("history-list");

    let rollHistory = [];
    let rollCount = 0;

    // Function to roll the dice
    function rollDice() {
        // Add a little animation to the dice
        dice.classList.add("rolling");

        // Disable button while rolling
        rollBtn.disabled = true;

        //generate random number between 1 and 6
        const randomNumber = Math.floor(Math.random() * 6) + 1;

        // After animation completes
        setTimeout(() => {
            // Remove rolling animation
            dice.classList.remove("rolling");

            // Set dice to show correct face
            setDiceFace(randomNumber);

            // Display result
            result.innerHTML = `You rolled a <span style="color: #ff6b6b; font-weight: bold; font-size: 2rem">${randomNumber}</span>!`;

            // Add to history
            addToHistory(randomNumber);

            // Re-enable button
            rollBtn.disabled = false;
        }, 1000); // Match this duration to your CSS animation

    }

    // Function to set the dice face based on the rolled number
    function setDiceFace(number) {
        // Reset all faces
        dice.style.transform = "rotateX(0) rotateY(0)";

        switch (number) {
            case 1:
                dice.style.transform = "rotateX(0) rotateY(0)";
                break;
            case 2:
                dice.style.transform = "rotateX(180deg) rotateY(0)";
                break;
            case 3:
                dice.style.transform = "rotateX(0) rotateY(90deg)";
                break;
            case 4:
                dice.style.transform = "rotateX(0) rotateY(-90deg)";
                break;
            case 5:
                dice.style.transform = "rotateX(90deg) rotateY(0)";
                break;
            case 6:
                dice.style.transform = "rotateX(-90deg) rotateY(0)";
                break;
        }
    }

    // Function to add roll to history
    function addToHistory(number) {
        rollCount++;
        rollHistory.unshift({ roll: rollCount, value: number });

        // Update history list
        updateHistoryList();
    }

    // Function to update the history list
    function updateHistoryList() {
        historyList.innerHTML = "";

        // Add up to 10 recent rolls
        const recentRolls = rollHistory.slice(0, 10);
        recentRolls.forEach(item => {
            const li = document.createElement("li");
            li.innerHTML = `Roll ${item.roll}: <span style="color: #ff6b6b; font-weight: bold;">${item.value}</span>`;
            historyList.appendChild(li);
        });
    }

    // Event Listener for roll button
    rollBtn.addEventListener("click", rollDice);

    // Initial dice face
    const initialNumber = Math.floor(Math.random() * 6) + 1;
    setDiceFace(initialNumber);
    result.innerHTML = `The die is showing <span style="color: #ff6b6b; font-weight: bold; font-size: 3rem">${initialNumber}</span>`;
});
