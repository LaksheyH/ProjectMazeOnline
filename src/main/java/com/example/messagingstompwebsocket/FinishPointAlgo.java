package com.example.messagingstompwebsocket;

import java.util.Random;



import java.util.ArrayList;

public class FinishPointAlgo {

  int startingX;
  int startingY;
  int[][] mazeData;
  
  public FinishPointAlgo(int spawnX, int spawnY, int[][] mazeData) {
    this.startingX = spawnX;
    this.startingY  = spawnY;
    this.mazeData = mazeData;
  } 

  public void CalculateFinishPoint(int length) {
    int finishX;
    int finishY;
    ArrayList<ArrayList<Integer[]>> paths = new ArrayList<ArrayList<Integer[]>>();
    //Create all spawn paths
    paths = PathsAroundStartingPoint(paths);
    

    //return new int[] {2};
  }

  private void CalculatePaths(ArrayList<ArrayList<Integer[]>> paths, int length) {

    ArrayList<ArrayList<Integer[]>> newPaths = new ArrayList<ArrayList<Integer[]>>();
    for(int i = 0; i < paths.size(); i++) 
    {
      if(paths.get(i).size() >= length) {
        
      } else {
        //last path element in path
        Integer[] lastCoords = paths.get(i).get(paths.get(i).size() - 1);
        Integer[] frontierCoords = null;
        if(paths.get(i).size() >= 2) {
          frontierCoords = paths.get(i).get(paths.get(i).size() - 2);
        }
        ArrayList<Integer[]> newPoints = AppendToPath(lastCoords, frontierCoords);
        if(newPoints.size() > 1) {
          
        }
          
      }
    }

    
  }

  private ArrayList<Integer[]> AppendToPath(Integer[] lastCoords, Integer[] frontCoords) {

    ArrayList<Integer[]> newPoints = new ArrayList<Integer[]>();
    
    for(int i = 1; i <= 4; i++) {
      switch(i) {
        case 1:
          if(mazeData[lastCoords[0]][lastCoords[1] + 1] == 1)
          {
            if(frontCoords != null) {
              if(lastCoords[0] != frontCoords[0] && lastCoords[1] + 1 != frontCoords[1]) {
                Integer[] coordinates = new Integer[] {lastCoords[0], lastCoords[1] + 1};
                newPoints.add(coordinates);
              }
            } else {
              Integer[] coordinates = new Integer[] {lastCoords[0], lastCoords[1] + 1};
              newPoints.add(coordinates);
            }
            //open square above
            
          }
          break;
        case 2:
          if(mazeData[lastCoords[0] + 1][lastCoords[1]] == 1)
          {
            if(frontCoords != null) {
              if(lastCoords[0] + 1 != frontCoords[0] && lastCoords[1] != frontCoords[1]) {
                Integer[] coordinates = new Integer[] {lastCoords[0] + 1, lastCoords[1]};
                newPoints.add(coordinates);
              }
            } else {
              Integer[] coordinates = new Integer[] {lastCoords[0] + 1, lastCoords[1]};
              newPoints.add(coordinates);
            }
          }
          break;
        case 3:
          if(mazeData[lastCoords[0]][lastCoords[1] - 1] == 1)
          {
            //open square above
            if(frontCoords != null) {
              if(lastCoords[0] != frontCoords[0] && lastCoords[1] - 1 != frontCoords[1]) {
                Integer[] coordinates = new Integer[] {lastCoords[0], lastCoords[1] - 1};
                newPoints.add(coordinates);
              }
            } else {
              Integer[] coordinates = new Integer[] {lastCoords[0], lastCoords[1] - 1};
              newPoints.add(coordinates);
            }
          }
          //check bottom
          break;
        case 4:
          if(mazeData[lastCoords[0] - 1][lastCoords[1]] == 1)
          {
            //open square above
            if(frontCoords != null) {
              if(lastCoords[0] - 1 != frontCoords[0] && lastCoords[1] != frontCoords[1]) {
                Integer[] coordinates = new Integer[] {lastCoords[0] - 1, lastCoords[1]};
                newPoints.add(coordinates);
              }
            } else {
              Integer[] coordinates = new Integer[] {lastCoords[0] - 1, lastCoords[1]};
              newPoints.add(coordinates);
            }
          }
          //check left
          break;
      }
    }

    return newPoints;
  }
  
  private ArrayList<ArrayList<Integer[]>> PathsAroundStartingPoint(ArrayList<ArrayList<Integer[]>> paths) {
    for(int i = 1; i <= 4; i++) {
      switch(i) {
        case 1:
          if(mazeData[startingX][startingY + 1] == 1)
          {
            //open square above
            Integer[] coordinates = new Integer[] {Integer.valueOf(startingX), Integer.valueOf(startingY + 1)};
            ArrayList<Integer[]> newPath = new ArrayList<Integer[]>();
            newPath.add(coordinates);
            paths.add(newPath);
          }
          //check top
          break;
        case 2:
          if(mazeData[startingX + 1][startingY] == 1)
          {
            //open square right
            Integer[] coordinates = new Integer[] {Integer.valueOf(startingX + 1), Integer.valueOf(startingY)};
            ArrayList<Integer[]> newPath = new ArrayList<Integer[]>();
            newPath.add(coordinates);
            paths.add(newPath);
          }
          //check right
          break;
        case 3:
          if(mazeData[startingX][startingY - 1] == 1)
          {
            //open square below
            Integer[] coordinates = new Integer[] {Integer.valueOf(startingX), Integer.valueOf(startingY - 1)};
            ArrayList<Integer[]> newPath = new ArrayList<Integer[]>();
            newPath.add(coordinates);
            paths.add(newPath);
          }
          //check bottom
          break;
        case 4:
          if(mazeData[startingX - 1][startingY] == 1)
          {
            //open square left
            Integer[] coordinates = new Integer[] {Integer.valueOf(startingX - 1), Integer.valueOf(startingY )};
            ArrayList<Integer[]> newPath = new ArrayList<Integer[]>();
            newPath.add(coordinates);
            paths.add(newPath);
          }
          //check left
          break;
      }
    }
    return paths;
  }
  
}