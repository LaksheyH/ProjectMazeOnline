package com.example.messagingstompwebsocket;

public class HelloMessage {

  private String name;
  private String recieverName;
  private String message;
  private String status;
  private float x;
  private float y;
  
  public HelloMessage() {}

  public HelloMessage(String name) {
    this.name = name;
  }

  public void setX(float x) {
    this.x = x;
  }

  public float getX() {
    return x;
  }

  public void setY(float y) {
    this.y = y;
  }

  public float getY() {
    return y;
  }
  
  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }
  
  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public String getRecieverName() {
    return recieverName;
  }

  public void setRecieverName(String name) {
    this.recieverName = name;
  }
  
  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }
}