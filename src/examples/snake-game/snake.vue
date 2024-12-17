<!-- Snake.vue -->
<template>
  <div class="snake-game-container">
    <div class="game-header">
      <div class="game-info">
        <span>得分: {{ score }}</span>
        <span>最高分: {{ highScore }}</span>
        <span>当前速度: {{ currentSpeed }}ms</span>
      </div>
      <div class="game-controls">
        <button v-if="!isGameStarted" @click="startGame" class="btn start-btn">
          开始游戏
        </button>
        <div v-else class="speed-controls">
          <button @click="decreaseSpeed" :disabled="currentSpeed >= 500" class="btn speed-btn">
            减速 (-50ms)
          </button>
          <button @click="increaseSpeed" :disabled="currentSpeed <= 50" class="btn speed-btn">
            加速 (+50ms)
          </button>
        </div>
      </div>
    </div>

    <div class="game-content">
      <div ref="gameBoard" class="game-board" :class="{ 'game-over-overlay': gameOver }" tabindex="0"
        @keydown="handleKeydown">
        <div v-for="(row, rowIndex) in board" :key="rowIndex" class="game-row">
          <div v-for="(cell, colIndex) in row" :key="colIndex" :class="[
            'game-cell',
            { 'snake-head': cell === 2 },
            { 'snake-body': cell === 1 },
            { 'food': cell === 3 }
          ]"></div>
        </div>
      </div>

      <div v-if="gameOver" class="game-over-banner">
        <div class="game-over-content">
          <p>游戏结束</p>
          <p>得分: {{ score }}</p>
          <button @click="restartGame" class="btn restart-btn">重新开始</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue'

  // 定义类型
  interface Position {
    x: number;
    y: number;
  }

  interface Direction {
    x: number;
    y: number;
  }

  // 游戏配置
  const BOARD_SIZE = 20
  const INITIAL_SPEED = 200
  const SPEED_STEP = 50
  const MIN_SPEED = 50
  const MAX_SPEED = 500

  // 方向常量
  const DIRECTIONS: Record<string, Direction> = {
    UP: { x: -1, y: 0 },
    DOWN: { x: 1, y: 0 },
    LEFT: { x: 0, y: -1 },
    RIGHT: { x: 0, y: 1 }
  }

  // 游戏状态
  const board = ref<number[][]>(
    Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(0))
  )
  const snake = ref<Position[]>([{ x: 10, y: 10 }])
  const food = ref<Position | null>(null)
  const direction = ref<Direction>(DIRECTIONS.RIGHT)
  const score = ref<number>(0)
  const highScore = ref<number>(
    Number(localStorage.getItem('snakeHighScore') || 0)
  )
  const gameOver = ref<boolean>(false)
  const gameInterval = ref<number | null>(null)
  const isGameStarted = ref<boolean>(false)
  const currentSpeed = ref<number>(INITIAL_SPEED)

  // 初始化食物
  function generateFood(): void {
    let newFood: Position
    do {
      newFood = {
        x: Math.floor(Math.random() * BOARD_SIZE),
        y: Math.floor(Math.random() * BOARD_SIZE)
      }
    } while (snake.value.some(seg => seg.x === newFood.x && seg.y === newFood.y))

    food.value = newFood
    board.value[newFood.x][newFood.y] = 3
  }

  // 移动蛇
  function moveSnake(): void {
    if (!isGameStarted.value) return

    const head: Position = {
      x: snake.value[0].x + direction.value.x,
      y: snake.value[0].y + direction.value.y
    }

    // 检查碰撞
    if (
      head.x < 0 || head.x >= BOARD_SIZE ||
      head.y < 0 || head.y >= BOARD_SIZE ||
      snake.value.some(seg => seg.x === head.x && seg.y === head.y)
    ) {
      endGame()
      return
    }

    // 吃食物
    const ateFood = food.value
      ? head.x === food.value.x && head.y === food.value.y
      : false

    // 更新蛇的位置
    snake.value.unshift(head)
    board.value[head.x][head.y] = 2

    // 清除之前的蛇身
    snake.value.forEach((seg, index) => {
      if (index > 0) board.value[seg.x][seg.y] = 1
    })

    if (ateFood) {
      score.value++
      generateFood()
    } else {
      // 移除蛇尾
      const tail = snake.value.pop()
      if (tail) board.value[tail.x][tail.y] = 0
    }
  }

  // 处理按键事件
  function handleKeydown(e: KeyboardEvent): void {
    switch (e.key) {
      case 'ArrowUp':
        if (direction.value !== DIRECTIONS.DOWN) direction.value = DIRECTIONS.UP
        break
      case 'ArrowDown':
        if (direction.value !== DIRECTIONS.UP) direction.value = DIRECTIONS.DOWN
        break
      case 'ArrowLeft':
        if (direction.value !== DIRECTIONS.RIGHT) direction.value = DIRECTIONS.LEFT
        break
      case 'ArrowRight':
        if (direction.value !== DIRECTIONS.LEFT) direction.value = DIRECTIONS.RIGHT
        break
    }
  }

  // 手动改变方向的方法
  function changeDirection(newDirection: Direction): void {
    // 防止180度反向
    const isOppositeDirection = (
      (newDirection.x === -direction.value.x && newDirection.y === -direction.value.y)
    )

    if (!isOppositeDirection) {
      direction.value = newDirection
    }
  }

  // 结束游戏
  function endGame(): void {
    if (gameInterval.value) {
      clearInterval(gameInterval.value)
    }
    gameOver.value = true
    isGameStarted.value = false

    // 更新最高分
    if (score.value > highScore.value) {
      highScore.value = score.value
      localStorage.setItem('snakeHighScore', score.value.toString())
    }
  }

  // 重新开始游戏
  function restartGame(): void {
    snake.value = [{ x: 10, y: 10 }]
    direction.value = DIRECTIONS.RIGHT
    score.value = 0
    gameOver.value = false
    currentSpeed.value = INITIAL_SPEED
    board.value = Array.from({ length: BOARD_SIZE }, () =>
      Array(BOARD_SIZE).fill(0)
    )

    startGame()
  }

  // 开始游戏
  function startGame(): void {
    if (isGameStarted.value) return

    resetBoard()
    generateFood()
    isGameStarted.value = true
    gameOver.value = false

    // 启动游戏循环
    gameInterval.value = setInterval(moveSnake, currentSpeed.value) as unknown as number
  }

  // 重置游戏板
  function resetBoard(): void {
    board.value = Array.from({ length: BOARD_SIZE }, () =>
      Array(BOARD_SIZE).fill(0)
    )
    snake.value = [{ x: 10, y: 10 }]
  }

  // 增加游戏速度
  function increaseSpeed(): void {
    if (currentSpeed.value > MIN_SPEED) {
      updateGameSpeed(-SPEED_STEP)
    }
  }

  // 减少游戏速度
  function decreaseSpeed(): void {
    if (currentSpeed.value < MAX_SPEED) {
      updateGameSpeed(SPEED_STEP)
    }
  }

  // 更新游戏速度
  function updateGameSpeed(change: number): void {
    if (!isGameStarted.value) return

    currentSpeed.value += change

    // 重置定时器
    if (gameInterval.value) {
      clearInterval(gameInterval.value)
      gameInterval.value = setInterval(moveSnake, currentSpeed.value) as unknown as number
    }
  }

  // 组件挂载时
  onMounted(() => {
    // 添加全局键盘事件监听
    window.addEventListener('keydown', handleKeydown)
  })

  // 组件卸载时清理定时器
  onUnmounted(() => {
    if (gameInterval.value) {
      clearInterval(gameInterval.value)
    }
    // 移除全局键盘事件监听
    window.removeEventListener('keydown', handleKeydown)
  })
</script>

<style scoped>
  .snake-game-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: Arial, sans-serif;
    max-width: 600px;
    margin: 0 auto;
  }

  .game-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-bottom: 15px;
  }

  .game-info {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 10px;
  }

  .game-controls {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .speed-controls {
    display: flex;
    gap: 10px;
  }

  .btn {
    padding: 8px 15px;
    margin: 0 5px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .btn:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }

  .btn:hover:not(:disabled) {
    background-color: #45a049;
  }

  .game-content {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .game-board {
    display: grid;
    grid-template-rows: repeat(20, 20px);
    outline: none;
    border: 2px solid #333;
    position: relative;
    z-index: 1;
    transition: filter 0.3s ease;
  }

  .game-board.game-over-overlay {
    filter: brightness(0.7);
  }

  .game-row {
    display: grid;
    grid-template-columns: repeat(20, 20px);
  }

  .game-cell {
    border: 1px solid #eee;
    background-color: #f0f0f0;
  }

  .snake-head {
    background-color: green;
  }

  .snake-body {
    background-color: lime;
  }

  .food {
    background-color: red;
  }

  .game-over-banner {
    position: absolute;
    z-index: 2;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
  }

  .game-over-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .game-over-banner p {
    margin: 5px 0;
    font-weight: bold;
  }

  .restart-btn {
    margin-top: 10px;
    background-color: #4CAF50;
  }
</style>