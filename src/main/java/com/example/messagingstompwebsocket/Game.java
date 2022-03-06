package com.example.messagingstompwebsocket;

public class Game {

  private String content;

  public Game() {
    System.out.println("?????????");
    System.out.println(this);
  }

  public Game(String content) {
    this.content = content;
    System.out.println(content);
    System.out.println("?????????");
    System.out.println(this);
  }

  public String getContent() {
    return content;
  }

  public String toString(){
    return "THE GAME";
  }

}