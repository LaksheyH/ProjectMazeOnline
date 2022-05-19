import React, { useState, useEffect } from 'react';
import SockJS from "sockjs-client"
import Stomp from "stomp-websocket"
import data from "./MazeArrayData"

export function useServerConnection(username) {
  const [stompClient, setStompClient] = useState(null);
  var myID = null;
  var oppID = null;
  const [oID, setOID] = useState(null)
  const [cID, setCID] = useState(null)
  const [oppUsername, setOppUsername] = useState(null)
  const [playerValues, setPlayerValues] = useState(null)
  const [finishValues, setFinishValues] = useState(null)
  const [mazeData, setMazeData] = useState(null);
  const [positionSub, setPositionSub] = useState(null);
  const [winnerText, setWinnerText] = useState(null);
  const [endPoints, setEndPoints] = useState(null);
  var sub1 = null;
  var sub2 = null;
  var sub3 = null;
  
  useEffect(() => {
    //setMazeData(data);
    var socket = new SockJS('/websocket');
    setStompClient(Stomp.over(socket));
  }, []);

  useEffect(() => {
    console.log(stompClient)
    if(stompClient) {
      stompClient.connect({}, onConnected, onError)
    }
  }, [stompClient])
  
  const onError = (err) => {
    console.log(err)
  }
  
  const onConnected = () => {
    var clientID = clientJoined()
    myID = clientID
    console.log(clientID)
    sub1 = stompClient.subscribe('/waitingroom/public', onPotentialOppRecieved) 
    sub2 = stompClient.subscribe('/user/'+clientID+'/private', onOppSentMsg);
  }

  const onOppSentMsg = (payload) => {
    let payLoadData = JSON.parse(payload.body)
    oppID = payLoadData.name
    setOppUsername(payLoadData.message)
    var id = subscribeToMaze();
    let obj = {
        recieverName: id + "",
        status: "maze"
    }
    stompClient.send('/app/private-message',{},JSON.stringify(obj))
  }
  
  const onPotentialOppRecieved = (payload) => {
    let payLoadData = JSON.parse(payload.body)
    if(payLoadData.id != myID) {
      oppID = payLoadData.id
      setOppUsername(payLoadData.username)
      let obj = {
        recieverName: payLoadData.id + "",
        name: myID + "",
        message: username + "",
        status: "start"
      }
      stompClient.send('/app/private-message',{},JSON.stringify(obj))
      subscribeToMaze();
    }
  }
  
  const clientJoined = () => {
    var clientID = Math.floor(Math.random() * 10000000);
    console.log(clientID)
    let userData = {
      id:clientID + "",
      username:username + ""
    }
    stompClient.send('/app/message',{},JSON.stringify(userData))
    return clientID;
  }

  const subscribeToMaze = () => {
    let locID = parseInt(myID);
    let remoteID = parseInt(oppID);
    let mazeID = locID + remoteID;
    sub3 = stompClient.subscribe('/user/'+mazeID+'/private', onMazeSentMsg);
    return mazeID;
  }

  const onMazeSentMsg = (payload) => {
    console.log("maze recieved")
    let payLoadData = JSON.parse(payload.body)
    if(payLoadData.status == "mazeData") {
      setMazeData(payLoadData.message);
      console.log(stompClient)
      if(sub1) { sub1.unsubscribe() };
      if(sub2) { sub2.unsubscribe() };
      if(sub3) { sub3.unsubscribe() };
      setOID(oppID)
      setCID(myID)
      gameBegins()
    }
  }

  const gameBegins = () => {
    console.log(oppUsername)
 var sub = stompClient.subscribe('/user/'+myID+'/position', positionRecieved);
    setPositionSub(sub);
  }

  const positionRecieved = (payload) => {
    let payLoadData = JSON.parse(payload.body)
    console.log(payLoadData)
    if(payLoadData.status == "pos") {
      setPlayerValues([payLoadData.x, payLoadData.y])
    } else if(payLoadData.status == "finishPoint") {
      setFinishValues([payLoadData.x, payLoadData.y])
    } else if(payLoadData.status == "won") {
      setWinnerText(payLoadData.message);
    } else if(payLoadData.status == "endPoint") {
      var tempX = payLoadData.x
      var tempY = payLoadData.y
      setEndPoints([tempX, tempY])
    }
  } 

  const sendMove = (x, y) => {
    let obj = {
      recieverName: oID+"",
      name: cID+"",
      x: x,
      y: y,
      status: "pos"
    }
    stompClient.send('/app/private-message',{},JSON.stringify(obj))
  }

  const sendFinish = (x, y) => {
    let obj = {
      recieverName: oID+"",
      name: cID+"",
      x: x,
      y: y,
      status: "finishPoint"
    }
    stompClient.send('/app/private-message',{},JSON.stringify(obj))
  }

  const sendWon = () => {
    setWinnerText(username + " won")
    let obj = {
      recieverName: oID+"",
      name: cID+"",
      message: username + " won",
      status: "won"
    }
    stompClient.send('/app/private-message',{},JSON.stringify(obj))
  }

  const resetNetValues = () => {
    myID = null;
    oppID = null;
    setOID(null)
    setCID(null)
    setOppUsername(null)
    setPlayerValues(null)
    setFinishValues(null)
    setMazeData(null);
    setPositionSub(null);
    setWinnerText(null);
    sub1 = null;
    sub2 = null;
    sub3 = null;
    onConnected()
  }

  const resetUserName = () => {
    setStompClient(null)
    myID = null;
    oppID = null;
    setOID(null)
    setCID(null)
    setOppUsername(null)
    setPlayerValues(null)
    setFinishValues(null)
    setMazeData(null);
    setPositionSub(null);
    setWinnerText(null);
    sub1 = null;
    sub2 = null;
    sub3 = null;
  }

  const getMyEndPoint = (x, y) => {
    console.log(cID)
    let obj = {
      recieverName: cID+"",
      name: cID+"",
      message: mazeData,
      x: x,
      y: y,
      status: "getEnd"
    }
    console.log("calling get end when it should'nt throw error in future")
    //stompClient.send('/app/private-message',{},JSON.stringify(obj))
  }
  
  return [mazeData, oID, cID, sendMove, playerValues, sendFinish, finishValues, positionSub, oppUsername, sendWon, winnerText, resetNetValues, getMyEndPoint, endPoints, resetUserName];
}