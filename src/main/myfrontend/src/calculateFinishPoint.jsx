
// export default class CalculateFinishPoint {

//   constructor(startx, starty, mazedata) {
//     this.startx = startx
//     this.starty = starty
//     this.mazedata = mazedata
//   }

  
//   getfinishpoint(distance) {
//     var surroundingPnts = checkAroundPoint(this.startx, this.starty);
//     var path = [[starty, startx]]
//     if(surroundingPnts.length > 0) {
//       path.push(surroundingPnts[Math.floor(Math.random() * surroundingPnts.length)])
//     }
//     while(path.length < distance) {
//       var morePaths = checkAroundPoint(paths[paths.length - 1][1], paths[paths.length - 1][0])
//       morePaths.foreach(path => {
//         if(paths.size > 1) {
//           //has frontier paths
//           if(paths[paths.length - 2])[0] == path[0] && paths[paths.length - 2])[1] == path[1]) {
//             paths.remove(path);
//           }
//         }
//       });
      
//     }
//   }

//   checkAroundPoint(pointx, pointy) {
//     var nodes = []
//     if(this.mazedata[pointy][pointx + 1] == 1) {
//       nodes.push([pointy, pointx + 1])
//     }
//     if(this.mazedata[pointy][pointx - 1] == 1) {
//       nodes.push([pointy, pointx - 1])
//     } 
//     if(this.mazedata[pointy + 1][pointx] == 1) {
//       nodes.push([pointy + 1, pointx])
//     }
//     if(this.mazedata[pointy - 1][pointx] == 1) {
//       nodes.push([pointy - 1, pointx])
//     }
//     return nodes
//   }
// }