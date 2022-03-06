import React, { useEffect, useRef, useState } from 'react'
import mazeData from "./MazeArrayData"
import MazeCreateer from './CreateMaze'
import Player from './PlayerClass'
import CollisionHandler from './CollisionsHandler'
import FinishPoint from "./FinishPoint"
import "./App.css"

export default function CanvasBasedMaze(props) {
  const serverMazeData = JSON.parse(props.MazeData)
  const isSecond = props.secondCanvas
  const [sceneWidth, setSceneWidth] = useState(0)
  const [sceneHeight, setSceneHeight] = useState(0)
  const [player, setPlayer] = useState(null)
  const [endPoint, setEndPoint] = useState(null)
  const [myMaze, setMyMaze] = useState(null)
  const [collisionHandler, setCollisionHandler] = useState(null)
  var playerSpeed = 4;
  var keyPressed = []
  const scene = useRef()

  useEffect(() => {
    const cw = document.body.clientWidth / 2
    const ch = document.body.clientHeight
    setSceneWidth(cw)
    setSceneHeight(ch)
    gameLoop(cw, ch)

    return () => {
      //Close any running proccesses
    };
  }, [])

  window.onkeydown = function(e) {
    keyPressed[e.key] = true;

    if (keyPressed['a'] || keyPressed['A']) {
      player.movePlayerX(playerSpeed, -1)
      collisionMazeReset()
    }
    if (keyPressed['d'] || keyPressed['D']) {
      player.movePlayerX(playerSpeed, 1)
      collisionMazeReset()
    }
    if (keyPressed['w'] || keyPressed['W']) {
      player.movePlayerY(playerSpeed, -1)
      collisionMazeReset()
    }
    if (keyPressed['s'] || keyPressed['S']) {
      player.movePlayerY(playerSpeed, 1)
      collisionMazeReset()
    }
  }

  window.onkeyup = function(e) {
    delete keyPressed[e.key];
  }

  const collisionMazeReset = () => {
    if (myMaze != null) {
      if (collisionHandler != null && player != null) {
        handleCollision(collisionHandler.checkForCollision(player.playerX(), player.playerY(), player.playerWidth(), player.playerHeight()))
      }
      myMaze.createMaze(sceneWidth, sceneHeight)
      endPoint.drawFinishPoint()
      console.log(endPoint.checkForCompletion(player))
    }
  }

  const handleCollision = (theCollision) => {
    const reboundMulti = 1.25
    if(theCollision.length > 0 && player != null) {
      if(collisionHandler.handleNodeCollisionCalculation(theCollision, player)) {
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

  const gameLoop = (cw, ch) => {
    const sceneContext = scene.current.getContext("2d")
    const newCW = Math.ceil(Math.min(cw, ch) / 60)
    const maze = new MazeCreateer(sceneContext, serverMazeData, cw, ch, isSecond)
    setMyMaze(maze)
    var playerCoords = maze.createMaze() 
    var finishCoords = maze.createMaze()
    setPlayer(new Player(playerCoords[0] + newCW / 4, playerCoords[1] + newCW / 4, newCW / 2, newCW / 2, sceneContext, "#00ff00"))
    setEndPoint(new FinishPoint(finishCoords[0] + newCW / 4, finishCoords[1] + newCW / 4, newCW / 2, newCW / 2, "#00ffff", sceneContext))
    setCollisionHandler(new CollisionHandler(maze.addAllMazeNodes()))
  }

  return (<div className="divOfCanvas" style={{ height: "100vh" }}>
    <canvas ref={scene} width={sceneWidth * 2} height={sceneHeight} className="canvasDiv" />
  </div>)
}


