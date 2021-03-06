import React, { useEffect, useRef, useState } from 'react'
import mazeData from "./MazeArrayData"
import MazeCreateer from './CreateMaze'
import SockJS from "sockjs-client"
import Stomp from "stomp-websocket"
import Player from './PlayerClass'
import CollisionHandler from './CollisionsHandler'
import CalculateFinishPoint from './calculateFinishPoint'
import FinishPoint from "./FinishPoint"
import "./App.css"
import { useServerConnection } from "./useServerConnection.jsx"


export default function CanvasBasedMaze(props) {

  const [mazeData, oppID, myID, sendMove, playerValues, sendFinishPoint, finishValues, posSub, oppUsername, winnerFunc, winnerText, resetServer, getEndPoints, newEndPoints, resetUserName] = useServerConnection(props.username)

  const [sceneWidth, setSceneWidth] = useState(0)
  const [sceneHeight, setSceneHeight] = useState(0)
  const [player, setPlayer] = useState(null)
  //const [spawnPointArray, setSpawnPointArray] = useState(null)
  const [opp, setOpp] = useState(null)
  const [oppGhost, setOppGhost] = useState(null)
  const [endPoint, setEndPoint] = useState(null)
  const [oppEndPoint, setOppEndPoint] = useState(null)
  const [myMaze, setMyMaze] = useState(null)
  const [oppMaze, setOppMaze] = useState(null)
  const [collisionHandler, setCollisionHandler] = useState(null)
  const [gameOver, setGameOver] = useState(false)
  var playerSpeed = 4;
  var keyPressed = []
  const scene = useRef()

  useEffect(() => {
    if (endPoint != null && posSub != null) {
      endPoint.drawFinishPoint()
      var screen = Math.min(sceneWidth / 2, sceneHeight);
      var finishX = Math.floor(endPoint.getX()) / screen;
      var finishY = Math.floor(endPoint.getY()) / screen;
      sendFinishPoint(finishX, finishY)
    }
  }, [endPoint, posSub])

  useEffect(() => {
    if (winnerText != null) {
      setGameOver(true)
      //game over display winner text
    }
  }, [winnerText])

  useEffect(() => {
    if (myMaze != null) {
      myMaze.createMaze()
    }
  }, [myMaze])

  // useEffect(() => {
  //   if (myID != null && spawnPointArray != null) {
  //     //in future use endpoint algo to create endpoints
  //     //getEndPoints(spawnPointArray[0], spawnPointArray[1])
  //   }
  // }, myID, spawnPointArray)

  useEffect(() => {
    if (oppMaze != null) {
      oppMaze.createMaze()
    }
  }, [oppMaze])

  useEffect(() => {
    if (endPoint != null) {
      endPoint.drawFinishPoint();
    }
  }, [endPoint])

  // useEffect(() => {
  //   if (newEndPoints != null) {
  //     const newCW = Math.ceil(Math.min(sceneWidth / 2, sceneHeight) / 35)
  //     const sceneContext = scene.current.getContext("2d")
  //     setEndPoint(new FinishPoint(newEndPoints[0] + newCW / 4, newEndPoints[1] + newCW / 4, newCW / 2, newCW / 2, "#00ffff", sceneContext))
  //   }
  // }, [newEndPoints, sceneWidth, sceneHeight])

  useEffect(() => {
    const cw = document.body.clientWidth
    const ch = document.body.clientHeight
    setSceneHeight(ch)
    setSceneWidth(cw)

    if (mazeData != null) {
      gameLoop(cw, ch)
    }
  }, [mazeData])

  useEffect(() => {
    if (playerValues != null) {
      setPlayPosition(playerValues[0], playerValues[1])
    }
  }, [playerValues])

  useEffect(() => {
    console.log(finishValues)
    if (finishValues != null) {
      setOppFinish(finishValues[0], finishValues[1])
    }
  }, [finishValues])

  const setOppFinish = (x, y) => {
    console.log(oppEndPoint)
    if (oppEndPoint != null) {
      var screen = Math.min(sceneWidth / 2, sceneHeight);
      var leftMargin = Math.floor(sceneWidth / 2);
      oppEndPoint.setX(Math.floor(x * screen) + leftMargin)
      oppEndPoint.setY(Math.floor(y * screen))
      oppEndPoint.drawFinishPoint()
    }
  }

  const setPlayPosition = (x, y) => {
    if (opp != null) {
      var screen = Math.min(sceneWidth / 2, sceneHeight);
      var leftMargin = Math.floor(sceneWidth / 2);
      opp.setPlayerX(Math.floor((x * screen) + leftMargin))
      opp.setPlayerY(Math.floor((y * screen)))
      oppGhost.setPlayerX(Math.floor((x * screen)))
      oppGhost.setPlayerY(Math.floor((y * screen)))
      oppGhost.clearPlayerSurroundings()
      player.clearPlayerSurroundings()
      opp.clearPlayerSurroundings()
      oppGhost.drawPlayer()
      opp.drawPlayer()
      player.drawPlayer()
      if (oppMaze != null) {
        oppMaze.createMaze()
      }
      if (myMaze != null) {
        myMaze.createMaze()
      }
    }
  }

  window.onkeydown = function (e) {
    if (gameOver) return;

    keyPressed[e.key] = true;

    if (keyPressed['a'] || keyPressed['A']) {
      if(oppGhost != null) {
        oppGhost.clearPlayerSurroundings()
        oppGhost.drawPlayer()
      }
      player.movePlayerX(playerSpeed, -1)
      collisionMazeReset()
    }
    if (keyPressed['d'] || keyPressed['D']) {
      if(oppGhost != null) {
        oppGhost.clearPlayerSurroundings()
        oppGhost.drawPlayer()
      }
      player.movePlayerX(playerSpeed, 1)
      collisionMazeReset()
    }
    if (keyPressed['w'] || keyPressed['W']) {
      if(oppGhost != null) {
        oppGhost.clearPlayerSurroundings()
        oppGhost.drawPlayer()
      }
      player.movePlayerY(playerSpeed, -1)
      collisionMazeReset()
    }
    if (keyPressed['s'] || keyPressed['S']) {
      if(oppGhost != null) {
        oppGhost.clearPlayerSurroundings()
        oppGhost.drawPlayer()
      }
      player.movePlayerY(playerSpeed, 1)
      collisionMazeReset()
    }
  }

  window.onkeyup = function (e) {
    if (gameOver) return;
    delete keyPressed[e.key];
  }

  const collisionMazeReset = () => {
    if (myMaze != null) {
      if (collisionHandler != null && player != null && endPoint != null) {
        handleCollision(collisionHandler.checkForCollision(player.playerX(), player.playerY(), player.playerWidth(), player.playerHeight()))
      }
      myMaze.createMaze()
      endPoint.drawFinishPoint()
      var screen = Math.min(sceneWidth / 2, sceneHeight);
      var xPos = Math.floor(player.playerX()) / screen;
      var yPos = Math.floor(player.playerY()) / screen;
      sendMove(xPos, yPos);
      if (endPoint.checkForCompletion(player)) {
        console.log("winner")
        winnerFunc()
      }
    }
    if (oppMaze != null) {
      oppMaze.createMaze()
      if (oppEndPoint != null) {
        oppEndPoint.drawFinishPoint()
      }
    }
  }

  const handleCollision = (theCollision) => {
    const reboundMulti = 1.25
    if (theCollision.length > 0 && player != null) {
      if (collisionHandler.handleNodeCollisionCalculation(theCollision, player)) {
        if (keyPressed['a'] || keyPressed['A']) {
          player.movePlayerX(Math.floor(playerSpeed * reboundMulti), 1)
        }
        if (keyPressed['d'] || keyPressed['D']) {
          player.movePlayerX(Math.floor(playerSpeed * reboundMulti), -1)
        }
        if (keyPressed['w'] || keyPressed['W']) {
          player.movePlayerY(Math.floor(playerSpeed * reboundMulti), 1)
        }
        if (keyPressed['s'] || keyPressed['S']) {
          player.movePlayerY(Math.floor(playerSpeed * reboundMulti), -1)
        }
      }
    }
  }

  const setClientPlayer = (cw, ch, sceneContext) => {
    const newCW = Math.ceil(Math.min(cw / 2, ch) / 35)
    const screen = Math.min(cw / 2, ch);
    const maze = new MazeCreateer(sceneContext, JSON.parse(mazeData), cw, ch, false)
    //const maze = new MazeCreateer(sceneContext, mazeData, cw, ch, false)
    setMyMaze(maze)
    var playerCoords = maze.createMaze()
    //var finishCalc = new CalculateFinishPoint(playerCoords[3], playerCoords[2], JSON.parse(mazeData))
    //setSpawnPointArray([playerCoords[2], playerCoords[3]])
    setEndPoint(new FinishPoint(playerCoords[2] + newCW / 4, playerCoords[3] + newCW / 4, newCW / 2, newCW / 2, "#FFD23F", sceneContext))
    console.log(playerCoords[0], playerCoords[1], playerCoords[2], playerCoords[3])
    setPlayer(new Player(playerCoords[0] + newCW / 4, playerCoords[1] + newCW / 4, newCW / 2, newCW / 2, sceneContext, "#EE4266"))
    setCollisionHandler(new CollisionHandler(maze.addAllMazeNodes()))
  }

  const setOppPlayer = (cw, ch, sceneContext) => {
    const newCW = Math.ceil(Math.min(cw / 2, ch) / 35)
    const maze = new MazeCreateer(sceneContext, JSON.parse(mazeData), cw, ch, true)
    //const maze = new MazeCreateer(sceneContext, mazeData, cw, ch, true)
    setOppMaze(maze)
    setOpp(new Player(-100, -100, newCW / 2, newCW / 2, sceneContext, "#00ff44"))
    setOppGhost(new Player(-100, -100, newCW / 2, newCW / 2, sceneContext, "#00ff4465"))
    setOppEndPoint(new FinishPoint(-100, -100, newCW / 2, newCW / 2, "#800000", sceneContext))
  }

  const gameLoop = (cw, ch) => {
    const sceneContext = scene.current.getContext("2d")
    setClientPlayer(cw, ch, sceneContext)
    setOppPlayer(cw, ch, sceneContext)
  }

  const restartGame = () => {
    setPlayer(null)
    setOpp(null)
    setEndPoint(null)
    setOppEndPoint(null)
    setMyMaze(null)
    setOppMaze(null)
    setCollisionHandler(null)
    setGameOver(false)
    resetServer()
  }

  const changeUsername = () => {
    setPlayer(null)
    setOpp(null)
    setEndPoint(null)
    setOppEndPoint(null)
    setMyMaze(null)
    setOppMaze(null)
    setCollisionHandler(null)
    setGameOver(false)
    resetUserName()
    props.resetUsername()
  }

  return (<div className="divOfCanvas" style={{ height: "100vh" }}>
    {
      mazeData != null ? <div>
        <div className='mazeGame'>
          <div>
            <h1 className="usernameLbl">{props.username}</h1>
            <h1 className="oppUsernameLbl">{oppUsername}</h1>
            { /*<h1 className="usernameLbl">Player 1</h1>
            <h1 className="oppUsernameLbl">Player 2</h1>*/ }
          </div>
          <div className='mainDivider' />
          <div>
          <canvas ref={scene} width={sceneWidth} height={sceneHeight} className="canvasDiv" />
          </div>
        </div>
        {
          gameOver &&
          <div className='gameOverDivContainer'>
            {/* <h1 className="winnerTxt">{winnerText}</h1> */}
            <div className='gameOverDiv'></div>
            <div className='gameResultsAndPlayAgain'>
              <button className="findNewMatchBtn" onClick={restartGame}>Find New Match</button>
              <button className="changeUserNameBtn" onClick={changeUsername}>Change Username</button>
              <h1 className="winnerTxt">{winnerText}</h1>
            </div>
          </div>
        }
      </div>
        :
        <div className='loadingStuff'>
          <h1 className='searchingText'>Searching For Opponent</h1>
          <div className="loading-container">
            <div className="loading">
            </div>
            <div id="loading-text">searching</div>
          </div>
        </div>
    }
  </div>)
}



