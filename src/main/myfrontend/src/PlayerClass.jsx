//Player class meant to create a moveable actor into our scene
export default class Player {
  //Initiate player with its position, size, color and current canvas for drawing
  //@params x player spawn point x position
  //@params y player spawn point y position
  //@params width player width
  //@params height player height
  //@params canvas that player is drawn onto
  //@params player color (default green #00ff00)
  constructor(x, y, width, height, canvas, color="#00ff00")
  {
    this.x = x
    this.width = width
    this.height = height
    this.y = y
    this.color = color
    this.canvas = canvas
    this.drawPlayer()
  }

  //Returns players current X position
  playerX() {
    return this.x
  }

  //Returns players current Y position
  playerY() {
    return this.y
  }

  //Returns players width
  playerWidth() {
    return this.width
  }

  //Returns players height
  playerHeight() {
    return this.height
  }

  //set player x position
  //@params val x value to set player as
  setPlayerX(val) {
    this.x = val
  }

  //set player y position
  //@params val y value to set player as
  setPlayerY(val) {
    this.y = val
  }

  //Draw player onto canvas with player color, sizes and positions
  drawPlayer() {
    this.canvas.fillStyle = this.color
    this.canvas.fillRect(this.x, this.y, this.width, this.height)
  }

  //Moves player along the X axis given speed and direction (-1 or 1)
  //@params speed player speed moves player speed number of pixels
  //@params direction multiplies speed by -1 or 1 for left or right
  movePlayerX(speed, direction) {
    this.canvas.clearRect(this.x-2, this.y-2, this.width+3, this.height+3);
    this.x += speed * direction
    this.drawPlayer();
  }

  //Moves player along the Y axis given speed and direction (-1 or 1)
  //@params speed player speed moves player speed number of pixels
  //@params direction multiplies speed by -1 or 1 for up or down
  movePlayerY(speed, direction) {
    this.canvas.clearRect(this.x-2, this.y-2, this.width + 3, this.height + 3);
    this.y += speed * direction
    this.drawPlayer()
  }

}