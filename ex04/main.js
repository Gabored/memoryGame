

document.addEventListener("DOMContentLoaded", function () {
    const gallery = document.getElementById("gallery");
    const scoreElement = document.getElementById("score"); // Elemento del marcador
    const data = [
        {
            "id": 1,
            "status": "notFlipped",
            "display": "display",
            "image_url": "https://i.pinimg.com/736x/ab/c4/8b/abc48b4afe75a9c72f5cc162e6bf2be9.jpg"
        },
        {
            "id": 2,
            "status": "notFlipped",
            "display": "display",
            "image_url": "https://i.pinimg.com/236x/7b/0a/2e/7b0a2ec6270c2c36cf17f6f9f4a25faa.jpg"
        },
        {
            "id": 3,
            "status": "notFlipped",
            "display": "display",
            "image_url": "https://i.pinimg.com/236x/13/4f/63/134f63616e82651e6d1d728ec7e1aa6b.jpg"
        },
        {
            "id": 4,
            "status": "notFlipped",
            "display": "display",
            "image_url": "https://i.pinimg.com/236x/14/be/8b/14be8be512acc1d83eb7be46972eddb7.jpg"
        },
        {
            "id": 5,
            "status": "notFlipped",
            "display": "display",
            "image_url": "https://www.shihoriobata.com/wp-content/uploads/2022/03/frog-doodle-drawing.jpg"
        },
        {
            "id": 6,
            "status": "notFlipped",
            "display": "display",
            "image_url": "https://www.shihoriobata.com/wp-content/uploads/2022/03/frog-line-drawing-easy.jpg"
        },
        {
            "id": 7,
            "status": "notFlipped",
            "display": "display",
            "image_url": "https://i.pinimg.com/736x/47/9b/89/479b890385a36a1de96d396bc09ba209.jpg"
        },
        {
            "id": 8,
            "status": "notFlipped",
            "display": "display",
            "image_url": "https://www.shihoriobata.com/wp-content/uploads/2022/03/simple-frog-drawing-doodle.jpg"
        },
        {
            "id": 9,
            "status": "notFlipped",
            "display": "display",
            "image_url": "https://wallpapers-clan.com/wp-content/uploads/2022/11/cute-frog-pfp-23.jpg"
        },
        {
            "id": 10,
            "status": "notFlipped",
            "display": "display",
            "image_url": "https://ih1.redbubble.net/image.2389751648.4409/mo,small,flatlay,product_square,600x600.jpg"
        },

        
    ];

    // Duplicar los datos para tener un total de 20 elementos
    const duplicatedData = data.concat(data);

    // Desordenar los datos usando el algoritmo de Fisher-Yates
    for (let i = duplicatedData.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [duplicatedData[i], duplicatedData[j]] = [duplicatedData[j], duplicatedData[i]];
    }


    const flippedCards = [];
    let matchedPairs = 0;

    // Function to update the score displayed to the user
    function updateScore() {
        scoreElement.textContent = `Matched Pairs: ${matchedPairs}`;
    }


    // Add click event listener to each card
    duplicatedData.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("gallery-item");
        card.dataset.id = item.id;
        card.dataset.status = item.status;
        card.dataset.display = item.display;

        const image = document.createElement("img");
        if (item.status === "Flipped" || item.status === "NotDisplay") {
            image.src = item.image_url;
        } else {
            image.src = "cardCover.jpg";
        }
        image.classList.add("front-image");

        card.appendChild(image);
        gallery.appendChild(card);

        card.addEventListener("click", function () {
            if (flippedCards.length >= 2) {
                return;
            }

            if (card.dataset.status === "Flipped") {
                return;
            }

            card.dataset.status = "Flipped";
            image.src = item.image_url;

            flippedCards.push(card);

            if (flippedCards.length === 2) {
                const card1 = flippedCards[0];
                const card2 = flippedCards[1];

                if (card1.dataset.id === card2.dataset.id) {
                    card1.dataset.display = "display";
                    card2.dataset.display = "display";
                    matchedPairs++;
                    updateScore();

                    if (matchedPairs === 10) {
                        alert("You won! All pairs have been matched!");
                        resetButton.style.display = "block";
                    }
                } else {
                    setTimeout(() => {
                        card1.dataset.status = "notFlipped";
                        card2.dataset.status = "notFlipped";
                        card1.querySelector(".front-image").src = "cardCover.jpg";
                        card2.querySelector(".front-image").src = "cardCover.jpg";
                    }, 1000);
                }

                flippedCards.length = 0;
            }
        });
    });
});