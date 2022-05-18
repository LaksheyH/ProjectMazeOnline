import react, {useEffect, useState} from "react"
import logo from './logo.svg';
import CanvasBaseMaze from "./CanvasBasedMaze"
import './App.css';

function App() {
  const [username, setUsername] = useState("");
  const [switchToMaze, setSwitchToMaze] = useState(false);

  const findMatchBtnClicked = (e) => {
    if(username != "") {
      setSwitchToMaze(true)
    }
  }

  const restartGameLoop = () => {
    setSwitchToMaze(false)
  }
  
  return (
    <div className="mainDiv">
      {switchToMaze? 
        <CanvasBaseMaze username={username} resetUsername={restartGameLoop}/>
        :
      <div className="inputContainer">
        <div className="inputDiv">
          <input className="usernamInput" type="username" placeholder="username" value={username} 
            onChange={(username) => setUsername(username.target.value)}             />
        </div>
        <button className="findMatchButton" onClick={findMatchBtnClicked}>
          Find Match
        </button>
      </div>
      }   
    </div>
  );
}

export default App;
