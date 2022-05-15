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
    } else if (msg.getStatus().equals("getEnd")) {
      String mazeData = msg.getMessage();
      int x = (int)msg.getX();
      int y = (int)msg.getY();
      //Convertfrom string to 2d array
      String s = mazeData;
      s = s.replace("[","");//replacing all [ to ""
      s = s.substring(0,s.length()-2);//ignoring last two ]]
      String s1[] = s.split("],");//separating all by "],"

      int my_matrics[][] = new int[s1.length][s1.length];//declaring two dimensional matrix for input

      for(int i = 0; i < s1.length; i++){
        s1[i] = s1[i].trim();//ignoring all extra space if the string s1[i] has
        String single_int[] = s1[i].split(", ");//separating integers by ", "

        for(int j = 0; j < single_int.length; j++){
          my_matrics[i][j] = Integer.parseInt(single_int[j]);//adding single values
        }
      }
      
      FinishPointAlgo finishPoint = new FinishPointAlgo(x, y, my_matrics);

      int[] finishes = finishPoint.CalculateFinishPoint(10);
      if(finishes[0] == -1) {
        System.out.println("we have a problem shit");
      }
      HelloMessage newMsg = new HelloMessage();
      newMsg.setStatus("endPoint");
      newMsg.setX(finishes[0]);
      newMsg.setY(finishes[1]);
      //System.out.println(newMsg.getMessage());
      theMsg = newMsg;
      simpMessagingTemplate.convertAndSendToUser(msg.getRecieverName(), "/position", newMsg);
      
    } else {
      simpMessagingTemplate.convertAndSendToUser(msg.getRecieverName(), "/private", msg); // /user/david/private
      theMsg = msg;
    }
    return theMsg;
  }
}