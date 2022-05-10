export default class FinishPoint {
  constructor(x, y, width, height, color, canvas) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.color = color
    this.canvas = canvas
  } 

  getX() {
    return this.x
  }

  getY() {
    return this.y
  }
  
  setX(x) {
    this.x = x
  }

  setY(y) {
    this.y = y
  }
  
  drawFinishPoint() {
    this.canvas.fillStyle = this.color
    this.canvas.fillRect(this.x, this.y, this.width, this.height)
  }

  checkForCompletion(player) {
    var playerX = player.playerX()
    var playerY = player.playerY()
    var playerWidth = player.playerWidth()
    var playerHeight = player.playerHeight()
    var playerXYPairs = [
      [playerX, playerY],
      [playerX + playerWidth, playerY],
      [playerX,playerY + playerHeight],
      [playerX + playerWidth,playerY + playerHeight]]
    for(let i = 0; i < playerXYPairs.length; i++) {
      if(playerXYPairs[i][0] >= this.x && playerXYPairs[i][0] <= this.x + this.width) {
          //within x constraints
          if(playerXYPairs[i][1] >= this.y && playerXYPairs[i][1] <= this.y + this.height) {
            //within y constraints
            return true
          }
        }
    }
    return false
  }
}
