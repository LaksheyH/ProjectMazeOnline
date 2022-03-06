package com.example.messagingstompwebsocket;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

@Controller
public class GreetingController {


  @MessageMapping("/hello")
  @SendTo("/topic/greetings")
  public Greeting greeting(HelloMessage message) throws Exception {
    Thread.sleep(1000); // simulated delay
    return new Greeting(HtmlUtils.htmlEscape(message.getName()));
  }

  @MessageMapping("/getMaze")
  @SendTo("/topic/maze")
  public Greeting greeting() throws Exception {
    Thread.sleep(10); // simulated delay
    MazeHandler maze = new MazeHandler();
    return new Greeting(HtmlUtils.htmlEscape(maze.getMazeData()));
  }
  
}