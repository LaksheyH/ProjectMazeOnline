package com.example.messagingstompwebsocket;
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

  public int[] CalculateFinishPoint(int length) {
    int finishX = -1;
    int finishY = -1;
    ArrayList<ArrayList<Integer[]>> paths = new ArrayList<ArrayList<Integer[]>>();
    //Create all spawn paths
    paths = PathsAroundStartingPoint(paths);
    System.out.println(paths);
    paths = AddPathAroundPoint(paths);
    boolean finished = false;
    while(!finished) {
      paths = AddPathAroundPoint(paths);
      for(int i = 0; i < paths.size(); i++) {
        if(paths.get(i).size() >= length) {
          finishX = paths.get(i).get(paths.get(i).size() - 1)[0];
          finishY = paths.get(i).get(paths.get(i).size() - 1)[1];
          finished = true;
        }
      }
    }

    return new int[] {finishX, finishY};
  }

  public ArrayList<ArrayList<Integer[]>> AddPathAroundPoint(ArrayList<ArrayList<Integer[]>> paths) {
    ArrayList<ArrayList<Integer[]>> currentPaths = paths;
    for(int i = 0; i < paths.size(); i++) {
      ArrayList<Integer[]> possiblePathsAdditions = new ArrayList<Integer[]>();
      Integer[] lastCoords = paths.get(i).get(paths.get(i).size() - 1);
      boolean hasFrontier = false;
      if(paths.get(i).size() >= 2) {
        hasFrontier = true;
      }
      for(int x = 1; x <= 4; x++) {
        switch(x) {
          case 1:
            //check if he has left
            if(hasFrontier) {
              Integer[] frontierCoords = paths.get(i).get(paths.get(i).size() - 2);
              if(lastCoords[0] - 1 != frontierCoords[0] && lastCoords[1] != frontierCoords[1]) {
                if(mazeData[lastCoords[1]][lastCoords[0] - 1] == 1) {
                  Integer[] newCoords = new Integer[] {lastCoords[0] - 1, lastCoords[1]};
                  possiblePathsAdditions.add(newCoords);
                }
              }
            } else {
              if(mazeData[lastCoords[1]][lastCoords[0] - 1] == 1) {
                //System.out.println(lastCoords[0]);
                //System.out.println(lastCoords[1]);
                Integer[] newCoords = new Integer[] {lastCoords[0] - 1, lastCoords[1]};
                possiblePathsAdditions.add(newCoords);
              }
            }
            break;
          case 2:
            //check if he has up
            if(hasFrontier) {
              Integer[] frontierCoords = paths.get(i).get(paths.get(i).size() - 2);
              if(lastCoords[0] != frontierCoords[0] && lastCoords[1] + 1 != frontierCoords[1]) {
                if(mazeData[lastCoords[1] + 1][lastCoords[0]] == 1) {
                  Integer[] newCoords = new Integer[] {lastCoords[0], lastCoords[1] + 1};
                  possiblePathsAdditions.add(newCoords);
                }
              }
            } else {
              if(mazeData[lastCoords[1] + 1][lastCoords[0]] == 1) {
                Integer[] newCoords = new Integer[] {lastCoords[0], lastCoords[1] + 1};
                possiblePathsAdditions.add(newCoords);
              }
            }
            break;
          case 3:
            //check if he has right
            if(hasFrontier) {
              Integer[] frontierCoords = paths.get(i).get(paths.get(i).size() - 2);
              if(lastCoords[0] + 1 != frontierCoords[0] && lastCoords[1] != frontierCoords[1]) {
                if(mazeData[lastCoords[1]][lastCoords[0] + 1] == 1) {
                  Integer[] newCoords = new Integer[] {lastCoords[0] + 1, lastCoords[1]};
                  possiblePathsAdditions.add(newCoords);
                }
              }
            } else {
              if(mazeData[lastCoords[1]][lastCoords[0] + 1] == 1) {
                Integer[] newCoords = new Integer[] {lastCoords[0] + 1, lastCoords[1]};
                possiblePathsAdditions.add(newCoords);
              }
            }
            break;
          case 4:
            //check if he has below
            if(hasFrontier) {
              Integer[] frontierCoords = paths.get(i).get(paths.get(i).size() - 2);
              if(lastCoords[0] != frontierCoords[0] && lastCoords[1] - 1 != frontierCoords[1]) {
                if(mazeData[lastCoords[1] - 1][lastCoords[0]] == 1) {
                  Integer[] newCoords = new Integer[] {lastCoords[0], lastCoords[1] - 1};
                  possiblePathsAdditions.add(newCoords);
                }
              }
            } else {
              if(mazeData[lastCoords[1] - 1][lastCoords[0]] == 1) {
                Integer[] newCoords = new Integer[] {lastCoords[0], lastCoords[1] - 1};
                possiblePathsAdditions.add(newCoords);
              }
            }
            break;
        }
      }
      if(possiblePathsAdditions.size() > 0) {
        if(possiblePathsAdditions.size() == 1) {
          //only one possible pos
          currentPaths.get(i).add(possiblePathsAdditions.get(0));
        } else {
          //multiple
          currentPaths.get(i).add(possiblePathsAdditions.get(0));
          for(int z = 1; z < possiblePathsAdditions.size(); z++) {
            ArrayList<Integer[]> newPathFromPathsAdded = new ArrayList<Integer[]>();
            newPathFromPathsAdded.add(possiblePathsAdditions.get(0));
            currentPaths.add(newPathFromPathsAdded);
          }
        }
      }
      
    }

    return currentPaths;
  }
  
  private ArrayList<ArrayList<Integer[]>> PathsAroundStartingPoint(ArrayList<ArrayList<Integer[]>> paths) {
    for(int i = 1; i <= 4; i++) {
      switch(i) {
        case 1:
          if(mazeData[startingY + 1][startingX] == 1)
          {
            //open square above
            System.out.println("square above");
            Integer[] coordinates = new Integer[] {Integer.valueOf(startingX), Integer.valueOf(startingY + 1)};
            ArrayList<Integer[]> newPath = new ArrayList<Integer[]>();
            newPath.add(coordinates);
            paths.add(newPath);
          }
          //check top
          break;
        case 2:
          if(mazeData[startingY][startingX + 1] == 1)
          {
            //open square right
            System.out.println("square right");
            Integer[] coordinates = new Integer[] {Integer.valueOf(startingX + 1), Integer.valueOf(startingY)};
            ArrayList<Integer[]> newPath = new ArrayList<Integer[]>();
            newPath.add(coordinates);
            paths.add(newPath);
          }
          //check right
          break;
        case 3:
          if(mazeData[startingY - 1][startingX] == 1)
          {
            //open square below
            System.out.println("square below");
            Integer[] coordinates = new Integer[] {Integer.valueOf(startingX), Integer.valueOf(startingY - 1)};
            ArrayList<Integer[]> newPath = new ArrayList<Integer[]>();
            newPath.add(coordinates);
            paths.add(newPath);
          }
          //check bottom
          break;
        case 4:
          if(mazeData[startingY][startingX - 1] == 1)
          {
            //open square left
            System.out.println("square left");
            Integer[] coordinates = new Integer[] {Integer.valueOf(startingX - 1), Integer.valueOf(startingY)};
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