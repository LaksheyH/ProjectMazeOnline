package com.example.messagingstompwebsocket;

import java.util.Random;
import java.util.ArrayList;

public class Maze {
  int width;
  int height;
  public int xStart;
  public int yStart;
  public MazeNode[][] maze;
  Random rand;

  public Maze(int width, int height) {
    this.width = width;
    this.height = height;
    maze = new MazeNode[width][height];
    rand = new Random();
  }

  public void GenerateMaze() {
    GenerateEmptyMaze();
    FillNodeNeighbors();
    GenerateMazePrimsAlgo();
  }

  protected void GenerateMazePrimsAlgo() {
    xStart = rand.nextInt(width);
    while(xStart % 2 != 0)
    {
      xStart = rand.nextInt(width);
    }
    yStart = rand.nextInt(height);
    while(yStart % 2 != 0)
    {
      yStart = rand.nextInt(height);
    }
    MazeNode previousNode = maze[yStart][xStart];
    previousNode.setIsWall(false);
    previousNode.setCanBeFrontier(false);
    previousNode.connected = true;
    ArrayList<MazeNode> frontierList = new ArrayList<MazeNode>();

    for (MazeNode frontier : previousNode.potentialFrontierNeighbors) {
      if (frontier.getCanBeFrontier()) {
        frontierList.add(frontier);
        frontier.setCanBeFrontier(false);
      }
    }
    while (frontierList.size() > 0) {
      // Getting a random node in frontier list to connect to and setting it to a path
      int nextFrontierIndex = rand.nextInt(frontierList.size());
      MazeNode nextNode = frontierList.get(nextFrontierIndex);
      nextNode.isWall = false;
      nextNode.connected = true;
      frontierList.remove(nextNode);
      // Potential nodes a frontier node can connect to
      if(frontierList.size() <= 0) {break; }
      ArrayList<MazeNode> connectedFrontierSet = new ArrayList<MazeNode>();
      for (MazeNode connectedPotential : nextNode.potentialFrontierNeighbors) {
        if (connectedPotential.connected) {
          // If it is already a path node it can be added
          connectedFrontierSet.add(connectedPotential);
        }
      }
      // Selecting a random connected node
      if(connectedFrontierSet.size() > 0) {
        int connectionIndex = rand.nextInt(connectedFrontierSet.size());
        MazeNode connectingNode = connectedFrontierSet.get(connectionIndex);
        // Setting path between 2 frontier nodes
        int pathNodeX = (connectingNode.x + nextNode.x) / 2;
        int pathNodeY = (connectingNode.y + nextNode.y) / 2;
        MazeNode path = maze[pathNodeY][pathNodeX];
        path.connected = true;
        path.setIsWall(false);
      }
      // Add new frontier cells from next node
      for (MazeNode frontier : nextNode.potentialFrontierNeighbors) {
        try {
          if (frontier.getCanBeFrontier()) {
            frontierList.add(frontier);
            frontier.setCanBeFrontier(false);
          }
        } catch (NullPointerException e) {
          System.out.println(e);
        }
      }
    }
  }

  protected void FillNodeNeighbors() {
    for (int y = 0; y < height - 1; y++) {
      for (int x = 0; x < width - 1; x++) {
        MazeNode node = maze[y][x];
        AddDirectAndFrontiers(node, x, y);
      }
    }
  }

  protected void AddDirectAndFrontiers(MazeNode node, int x, int y) {
    // check/add left direct and frontier
    if (x - 2 >= 0) {
      node.addNeighbor(maze[y][x - 1]);
      node.addFrontier(maze[y][x - 2]);
    } else if (x - 1 >= 0) {
      node.addNeighbor(maze[y][x - 1]);
    }
    // check/add right direct and frontier
    if (x + 2 <= width - 1) {
      node.addNeighbor(maze[y][x + 1]);
      node.addFrontier(maze[y][x + 2]);
    } else if (x + 1 <= width - 1) {
      node.addNeighbor(maze[y][x + 1]);
    }
    // check/add above direct and frontier
    if (y + 2 <= height - 1) {
      node.addNeighbor(maze[y + 1][x]);
      node.addFrontier(maze[y + 2][x]);
    } else if (y + 1 <= height - 1) {
      node.addNeighbor(maze[y + 1][x]);
    }
    // check/add under direct and frontier
    if (y - 2 >= 0) {
      node.addNeighbor(maze[y - 1][x]);
      node.addFrontier(maze[y - 2][x]);
    } else if (y - 1 >= 0) {
      node.addNeighbor(maze[y - 1][x]);
    }
  }

  protected void GenerateEmptyMaze() {
    for (int y = 0; y < height; y++) {
      for (int x = 0; x < width; x++) {
        maze[y][x] = new MazeNode(x, y);
        // System.out.println(maze[y][x]);
      }
    }
    // System.out.println(maze);
  }
}