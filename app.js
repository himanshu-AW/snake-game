// Snake Movement:
      // The snake moves by updating its position on the grid. The movement can be controlled by an array that stores the coordinates of the snake's body segments.
      const gameBoard = document.getElementById("gameBoard");
      const scoreElement = document.getElementById("score");
      let snake = [{ x: 10, y: 10 }];
      let direction = { x: 0, y: 0 };
      let food = { x: 5, y: 5 };
      let score = 0;

      function update() {
        const head = {
          x: snake[0].x + direction.x,
          y: snake[0].y + direction.y,
        };
        snake.unshift(head);
        if (head.x === food.x && head.y === food.y) {
          score += 10;
          scoreElement.innerText = `Score: ${score}`;
          generateFood();
        } else {
          snake.pop();
        }
      }

      function render() {
        gameBoard.innerHTML = "";
        snake.forEach((segment) => {
          const snakeElement = document.createElement("div");
          snakeElement.style.gridColumnStart = segment.x;
          snakeElement.style.gridRowStart = segment.y;
          snakeElement.classList.add("snake");
          gameBoard.appendChild(snakeElement);
        });

        const foodElement = document.createElement("div");
        foodElement.style.gridColumnStart = food.x;
        foodElement.style.gridRowStart = food.y;
        foodElement.classList.add("food");
        gameBoard.appendChild(foodElement);
      }

      function generateFood() {
        food.x = Math.floor(Math.random() * 20) + 1;
        food.y = Math.floor(Math.random() * 20) + 1;
      }

      function gameLoop() {
        update();
        render();
      }

      setInterval(gameLoop, 300);

      // Handling User Input:
      // Listen for arrow key presses to change the direction of the snake.

      window.addEventListener("keydown", (e) => {
        switch (e.key) {
          case "ArrowUp":
            if (direction.y !== 0) break;
            direction = { x: 0, y: -1 };
            break;
          case "ArrowDown":
            if (direction.y !== 0) break;
            direction = { x: 0, y: 1 };
            break;
          case "ArrowLeft":
            if (direction.x !== 0) break;
            direction = { x: -1, y: 0 };
            break;
          case "ArrowRight":
            if (direction.x !== 0) break;
            direction = { x: 1, y: 0 };
            break;
        }
      });

      //   Collision Detection:
      // Implement logic to check if the snake collides with itself or the wall. If it does, end the game and offer a restart option.
      function checkCollision() {
        const head = snake[0];
        if (head.x < 1 || head.x > 20 || head.y < 1 || head.y > 20) {
          alert("Game Over!");
          resetGame();
        }
        for (let i = 1; i < snake.length; i++) {
          if (head.x === snake[i].x && head.y === snake[i].y) {
            alert("Game Over!");
            resetGame();
          }
        }
      }

      function resetGame() {
        snake = [{ x: 10, y: 10 }];
        direction = { x: 0, y: 0 };
        score = 0;
        scoreElement.innerText = `Score: ${score}`;
        generateFood();
      }

      // Game Loop:
      // Update the gameLoop function to include the checkCollision call
      function gameLoop() {
        update();
        render();
        checkCollision();
      }