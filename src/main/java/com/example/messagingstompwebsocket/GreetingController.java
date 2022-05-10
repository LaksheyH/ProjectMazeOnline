package com.example.messagingstompwebsocket;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;
import java.util.*;

@Controller
public class GreetingController {

  @Autowired
  private SimpMessagingTemplate simpMessagingTemplate;
  List<ClientPlayers> connectedPlayers = new ArrayList<ClientPlayers>();

  // @MessageMapping("/hello")
  // @SendTo("/topic/greetings")
  // public Greeting greeting(HelloMessage message) throws Exception {
  // Thread.sleep(1000); // simulated delay
  // return new Greeting(HtmlUtils.htmlEscape(message.getName()));
  // }

  // @MessageMapping("/getMaze")
  // @SendTo("/topic/maze")
  // public Greeting greeting() throws Exception {
  // Thread.sleep(10); // simulated delay
  // MazeHandler maze = new MazeHandler();
  // return new Greeting(HtmlUtils.htmlEscape(maze.getMazeData()));
  // }

  // // @SubscribeMapping("/start/user/driver/{userID}")
  // // public Greeting simple(@DestinationVariable String userID) {
  // // return new Greeting(userID);
  // // }

  // @MessageMapping("/room/greeting/{room}")
  // @SendTo("/room/greeting/{room}")
  // public Greeting greet(@DestinationVariable String room, HelloMessage message)
  // throws Exception {
  // //Greeting greeting = new Greeting("Hello, " + message.getName() + "!");
  // System.out.println(room);
  // System.out.println(message);
  // return new Greeting(HtmlUtils.htmlEscape(room));
  // }

  @MessageMapping("/message") // /app/message
  @SendTo("/waitingroom/public")
  private ClientPlayers recievePubMessage(@Payload ClientPlayers msg) {
    //connectedPlayers.add(msg);
    System.out.println(msg.getID());
    return msg;
  }

  @MessageMapping("/private-message")
  private HelloMessage recievePrivateMessage(@Payload HelloMessage msg) {
    HelloMessage theMsg;
    if (msg.getStatus().equals("maze")) {
      MazeHandler maze = new MazeHandler();
      HelloMessage newMsg = new HelloMessage();
      newMsg.setStatus("mazeData");
      newMsg.setMessage(maze.getMazeData());
      //System.out.println(newMsg.getMessage());
      theMsg = newMsg;
      simpMessagingTemplate.convertAndSendToUser(msg.getRecieverName(), "/private", newMsg);
    } else if (msg.getStatus().equals("pos")) {
      simpMessagingTemplate.convertAndSendToUser(msg.getRecieverName(), "/position", msg);
      theMsg = msg;
    } else if (msg.getStatus().equals("finishPoint")) {
      simpMessagingTemplate.convertAndSendToUser(msg.getRecieverName(), "/position", msg);
      theMsg = msg;
    } else if (msg.getStatus().equals("won")) {
      simpMessagingTemplate.convertAndSendToUser(msg.getRecieverName(), "/position", msg);
      theMsg = msg;
    } else {
      simpMessagingTemplate.convertAndSendToUser(msg.getRecieverName(), "/private", msg); // /user/david/private
      theMsg = msg;
    }
    return theMsg;
  }
}