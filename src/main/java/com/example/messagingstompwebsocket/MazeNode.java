package com.example.messagingstompwebsocket;

import java.util.ArrayList;

class MazeNode{
  public int x;
  public int y;
  public boolean connected;
  boolean isWall;
  boolean canBeFrontier;
  public ArrayList<MazeNode> directNeighbors;
  public ArrayList<MazeNode> potentialFrontierNeighbors;

  public MazeNode(int x, int y)
  {
    this.x = x;
    this.y = y;
    this.isWall = true;
    this.canBeFrontier = true;
    this.directNeighbors = new ArrayList<MazeNode>();
    this.potentialFrontierNeighbors = new ArrayList<MazeNode>();
    this.connected = false;
  }

  public boolean getCanBeFrontier()
  {
    return canBeFrontier;
  }

  public void setCanBeFrontier(boolean canBeFrontier)
  {
    this.canBeFrontier = canBeFrontier;
  }

  public boolean getIsWall()
  {
    return isWall;
  }

  public void setIsWall(boolean isWall)
  {
    this.isWall = isWall;
  }

  public void addNeighbor(MazeNode neighbor)
  {
    directNeighbors.add(neighbor);
  }

  public void addFrontier(MazeNode neighbor)
  {
    potentialFrontierNeighbors.add(neighbor);
  }
}