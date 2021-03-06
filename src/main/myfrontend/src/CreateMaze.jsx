//class to create the maze and all the nodes associated with the maze
export default class MazeCreater {
  //Creates maze given a 2d array of 0,1 (TODO get from java server API)
  //@params scene the canvas in which the maze is drawn onto
  //@params mazeData the data used to create the maze
  constructor(scene, mazeData, cw, ch, isSecond) {
    this.scene = scene;
    this.mazeNodes = [];
    this.mazeData = mazeData
    this.cw = cw
    this.ch = ch
    this.isSecond = isSecond
  }

  //fills the mazeNodes array with all the solid maze nodes
  //returns all maze nodes
  addAllMazeNodes() {
    const Scale = 35;
    const LeftMargin = this.isSecond ? Math.floor(this.cw / 2) + 15 : 15;
    var widthRatio = Math.min(this.cw / 2, this.ch);
    var currentColumn = 0;
    var width = Math.ceil(widthRatio / Scale);
    var height = Math.ceil(widthRatio / Scale);
    this.mazeData.forEach(row => {
      currentColumn++;
      var currentRow = 0;
      row.forEach(node => {
        currentRow++;;
        var x = (width) * currentColumn + Math.ceil(widthRatio / (Scale / 4.9)) + LeftMargin;
        var y = (height) * currentRow + Math.ceil(widthRatio / (Scale / 4.9));

        if (node == 0) {
          this.mazeNodes.push([x, y, width, height])
        }
      })
    })
    return this.mazeNodes;
  }

  //Draws maze onto canvas
  //(TODO allow customization of colors as param)
  createMaze() {
    var randomColumn = Math.floor(Math.random() * 5) + 2;
    var randomRow = Math.floor(Math.random() * 5) + 1;
    var finishRandomColumn = Math.floor(Math.random() * 5) + 14;
    var finishRandomRow = Math.floor(Math.random() * 5) + 14;
    var spawnPoint = []
    var finishPoint = []
    const Scale = 35;
    const LeftMargin = this.isSecond ? Math.floor(this.cw / 2) + 15: 15;
    var widthRatio = Math.min(this.cw / 2, this.ch);
    var currentColumn = 0;
    this.scene.fillStyle = "#001111"
    var width = Math.ceil(widthRatio / Scale);
    var height = Math.ceil(widthRatio / Scale);
    this.mazeData.forEach(row => {
      currentColumn++;
      var currentRow = 0;
      row.forEach(node => {
        currentRow++;;
        var x = (width) * currentColumn + Math.ceil(widthRatio / (Scale / 4.9)) + LeftMargin;
        var y = (height) * currentRow + Math.ceil(widthRatio / (Scale / 4.9));
        if(spawnPoint.length == 0 && currentColumn == randomColumn && currentRow > randomRow) {
          randomRow++
        }
        if(finishPoint.length == 0 && currentColumn == finishRandomColumn && currentRow > finishRandomRow) {
          finishRandomRow++
        }
        if (node == 0) {
          this.scene.fillRect(x, y, width, height)
        } else {
          if(currentColumn == randomColumn && currentRow == randomRow) {
            spawnPoint = [x,y]
          }
          if(currentColumn == finishRandomColumn && currentRow == finishRandomRow) {
            finishPoint = [x,y]
          }
        }
      })
    })
    return [spawnPoint[0], spawnPoint[1], finishPoint[0], finishPoint[1]]
  }
}