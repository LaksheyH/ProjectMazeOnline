
//Class made to handle collisions between the maze and player
export default class CollisionHandler {

  //Set up maze nodes hash table to handle collision look up
  //@params mazeNodes given from maze generations, gives array of mazeNodes
  //@params nodeWidth the width of each node
  //@params nodeHeight the height of each node
  constructor(mazeNodes) {
    this.mazeNodeHash = []
    this.mazeNodes = mazeNodes
    this.setUpHashTable()
  }

  setUpHashTableAllNodes() {
    this.mazeNodes.forEach(node => {
      var topLeftX = Math.floor(node[0])
      var topLeftY = Math.floor(node[1])
      var width = Math.ceil(node[2])
      var height = Math.ceil(node[3])
      for (let i = 0; i < height; i++) {
        for (let x = 0; x < width; x++) {
          var firstIndex = topLeftX + width;
          var secondIndex = topLeftY + height;
          this.mazeNodeHash["" + firstIndex + secondIndex] = node
        }
      }
    })
  }

  setUpHashTable() {
    this.mazeNodes.forEach(node => {
      var x = Math.ceil(node[0])
      var y = Math.ceil(node[1])
      this.mazeNodeHash["" + x + y] = node
    })
    //console.log(this.mazeNodeHash)
  }

  checkForCollision(x, y, width, height) {
    var nearbyNodes = []
    var wholeWidth = Math.ceil(width) * 8
    var wholeHeight = Math.ceil(height) * 8
    var wholeX = Math.ceil(x) - wholeWidth / 2
    var wholeY = Math.ceil(y) - wholeHeight / 2
    for (let i = 0; i < wholeWidth; i++) {
      for (let x = 0; x < wholeHeight; x++) {
        var locX = wholeX + i;
        var locY = wholeY + x;
        if (this.mazeNodeHash["" + locX + locY]) {
          nearbyNodes.push(this.mazeNodeHash["" + locX + locY])
        }
      }
    }
    return nearbyNodes
  }

  handleNodeCollisionCalculation(nearbyNodes, player) {
    //canvas temp
    var nodes = this._deleteDuplicates(nearbyNodes)
    var playerX = player.playerX()
    var playerY = player.playerY()
    var playerWidth = player.playerWidth()
    var playerHeight = player.playerHeight()
    var playerXYPairs = [
      [playerX, playerY],
      [playerX + playerWidth, playerY],
      [playerX,playerY + playerHeight],
      [playerX + playerWidth,playerY + playerHeight]]
    
    for (let i = 0; i < nodes.length; i++) {
      var nodeX = nodes[i][0]
      var nodeY = nodes[i][1]
      var nodeWidth = nodes[i][2]
      var nodeHeight = nodes[i][3]
      for (let z = 0; z < playerXYPairs.length; z++) {
        //check if xy pair is inside node box
        if(playerXYPairs[z][0] >= nodeX && playerXYPairs[z][0] <= nodeX + nodeWidth) {
          //within x constraints
          if(playerXYPairs[z][1] >= nodeY && playerXYPairs[z][1] <= nodeY + nodeHeight) {
            //within y constraints
            return true
          }
        }
      }
    }
    return false
  }

  _deleteDuplicates(array) {
    var newArray = array.filter((c, index) => {
      return array.indexOf(c) === index;
    });
    return newArray
  }

}