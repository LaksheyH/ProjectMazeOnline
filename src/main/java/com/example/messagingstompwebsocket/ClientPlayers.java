package com.example.messagingstompwebsocket;

public class ClientPlayers {

  private String username;
  private String id;
  private boolean isPlaying;

  public ClientPlayers() {}
  
  public ClientPlayers(String username, String id) {
    this.username = username;
    this.id = id;
    this.isPlaying = false;
  }

  public void setIsPlaying(boolean playing) {
    this.isPlaying = playing;
  }

  public boolean getIsPlaying() {
    return isPlaying;
  }
  
  public String getUsername() {
    return this.username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public void setID(String ID) {
    this.id = ID;
  }
  
  public String getID() {
    return this.id;
  }
  
}