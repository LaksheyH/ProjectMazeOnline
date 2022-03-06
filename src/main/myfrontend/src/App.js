import react, {useEffect, useState} from "react"
import logo from './logo.svg';
import SockJS from "sockjs-client"
import Stomp from "stomp-websocket"
import CanvasBaseMaze from "./CanvasBasedMaze"
import './App.css';

function App() {

  var stompClient = null; 
  const [mazeData, setMazeData] = useState(null)
  
  useEffect(() => {
  
    var socket = new SockJS('/websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
      console.log("woah I actually connected")
      console.log('Connected: ' + frame);
      stompClient.subscribe('/topic/maze', function (greeting) {
        console.log("This greeting bs stuff: " + greeting)
        console.log(JSON.parse(greeting.body).content);
        setMazeData(JSON.parse(greeting.body).content);
      });
      stompClient.send("/app/getMaze",{},JSON.stringify({}));
    })
  }, [])
  
  return (
    <div>
    {mazeData != null ?  <div> 
     <CanvasBaseMaze MazeData={mazeData} secondCanvas={false}/>
     <CanvasBaseMaze MazeData={mazeData} secondCanvas={true}/>
     </div>
       :
     <div /> }
    </div>
  );
}

export default App;
