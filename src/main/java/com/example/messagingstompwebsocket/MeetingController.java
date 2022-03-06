package com.example.messagingstompwebsocket;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

@Controller
public class MeetingController {


  @MessageMapping("/jello")
  @SendTo("/topic/meetings")
  public Game greeting(HelloMessage message) throws Exception {
    Thread.sleep(10); // simulated delay
    return new Game("Jellowwwww, " + HtmlUtils.htmlEscape(message.getName()) + "!");
  }

}