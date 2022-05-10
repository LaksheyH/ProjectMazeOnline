package com.example.messagingstompwebsocket;
import java.util.Arrays;

class MazeHandler {
  static final  int mazeSize = 20;

  public MazeHandler() {
    
  }
  
  public String getMazeData() {
    int[][] mazeValues = new int[mazeSize][mazeSize];
    int[][] mazeValuesFixed = new int[mazeSize + 1][mazeSize + 1];
    Maze maze = new Maze(mazeSize, mazeSize);
    maze.GenerateMaze();
    MazeNode[][] mazeNodes = maze.maze;
    for (int y = 0; y < mazeSize; y++) {
      for (int x = 0; x < mazeSize; x++) {
        if (mazeNodes[y][x].getIsWall()) {
          mazeValues[y][x] = 0;
        } else {
          mazeValues[y][x] = 1;
        }
      }
    }   

    for (int y = 0; y < mazeSize + 1; y++) {
       for (int x = 0; x < mazeSize + 1; x++) {
         if(x == 0 || y == 0) {
           mazeValuesFixed[y][x] = 0;
         } else {
           mazeValuesFixed[y][x] = mazeValues[y-1][x-1];
         }
       }
     }

    // for (int y = 0; y < mazeSize + 1; y++) {
    //    for (int x = 0; x < mazeSize + 1; x++) {
    //      if(mazeValuesFixed[y][x] == 0) {
    //       System.out.print("▉");
    //      } else {
    //       System.out.print(" ");
    //      }
    //    }
    //   System.out.println();
    // }
    
    return Arrays.deepToString(mazeValuesFixed);
  }
}