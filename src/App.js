import React, { useState } from 'react';
import './App.css';
import stoneImg from './stone.gif';
import scissorImg from './scissors.gif';
import paperImg from './paper.gif';
import winImg from './congo.gif';
import loseImg from './lose.gif';
import drawImg from './draw.gif';
import userImg from './user.jpg'
import compImg from './computer.jpg'
import jdpic from './jd.jpg'

const STONE = 'STONE'
const SCIRROR = 'SCISSOR'
const PAPER = 'PAPER'
const RESULT_DRAW = 'DRAW'
const USER_WIN = 'USER_WIN'
const COMPUETR_WIN = 'COMPUTER_WIN'


const App = () => {

  const [computerChoice, setComputerChoice] = useState();
  const [userChoice, setUserChoice] = useState();
  const [loading, setLoading] = useState(false);
  const [gameResult, setGameResult] = useState();
  const [userImage, setUserImage] = useState();
  const [compImage, setCompImage] = useState();
  const [UWinCouter, setUWinerCounter] = useState(0)
  const [CWinCouter, setCWinerounter] = useState(0)




  function callComputer() {

    return new Promise((resolve, reject) => {

      setTimeout(() => {
        let computerSelection;
        const computerRoll = Math.random();

        if (computerRoll < 0.5) {
          console.log("comp: " + computerRoll);
          computerSelection = PAPER;
        } else if (computerRoll < 0.7) {
          console.log("comp: " + computerRoll);
          computerSelection = SCIRROR;
        } else {
          console.log("comp: " + computerRoll);
          computerSelection = STONE;
        }
        setComputerChoice(computerSelection)
        if (computerSelection === STONE) {
          setCompImage(stoneImg);
        } else if (computerSelection === SCIRROR) {
          setCompImage(scissorImg);
        } else {
          setCompImage(paperImg);
        }
        computerSelection ? resolve(computerSelection) : reject('Nope 😠');
      }, 2000);
    });


  }

  const callUser = (userSelection) => {
    setUserChoice(userSelection)
    if (userSelection === STONE) {
      setUserImage(stoneImg);
    } else if (userSelection === SCIRROR) {
      setUserImage(scissorImg);
    } else {
      setUserImage(paperImg);
    }

    return userSelection
  }


  const getWinner = (userSelection, computerSelection) => {

    if (userSelection === computerSelection) {
      setGameResult(RESULT_DRAW)
      return RESULT_DRAW;
    } else if (
      (userSelection === STONE && computerSelection === PAPER) ||
      (userSelection === STONE && computerSelection === SCIRROR) ||
      (userSelection === SCIRROR && computerSelection === PAPER)
    ) {
      setGameResult(USER_WIN)
      setUWinerCounter(UWinCouter => UWinCouter + 1)
      return USER_WIN;
    } else {
      setGameResult(COMPUETR_WIN)
      setCWinerounter(CWinCouter => CWinCouter + 1)
      return COMPUETR_WIN
    }
  }



  const startGame = async (userSelection) => {
    setLoading(true)
    let getUserSelection = callUser(userSelection);
    console.log("User selection " + getUserSelection);

    let getComputerSelection = await callComputer();
    console.log("Computer Selection" + getComputerSelection);

    setLoading(false)
    let finalResult = await getWinner(getUserSelection, getComputerSelection);


    console.log("Final Result" + finalResult);
  }

  const resetGame = () => {
    setGameResult();
    setComputerChoice();
    setUserChoice();
  }

  return (
    <div>
      <div className="users_container">
        <div>
          <div>
            <h1 className="txt_yellow" style={{margin: "0px", marginBottom: "10px"}}>Awesome Game !</h1>
          </div>
          <div className="mobile">
         
              <div>
                <div style={{ textAlign: "center" }}>
                  <div>
                    <img src={userImg} height="60px" width="60px" style={{ borderRadius: "50%" }} />
                    <h3 style={{ color: "gray" }}>{UWinCouter}</h3>
                  </div>
                </div >
                <div className="Choice">
                  {!!userChoice ?
                    <img src={userImage} height="100%" width="100%" style={{ borderRadius: "20px" }} /> :
                    <img src={userImg} height="100%" width="100%" style={{ borderRadius: "20px" }} />}
                </div>


                <div style={{ display: "flex", position: "relative" }}>
                  {!!loading ? <div className="overlay"></div> : null}
                  <div className="user_btn">
                    <img src={stoneImg} onClick={() => startGame(STONE)} />
                  </div>
                  <div className="user_btn">
                    <img src={scissorImg} onClick={() => startGame(SCIRROR)} />
                  </div>
                  <div className="user_btn">
                    <img src={paperImg} onClick={() => startGame(PAPER)} />
                  </div>
                </div>
            </div>
            <div className="mobile">
              <div>
                <div style={{ textAlign: "center" }}>
                  <div>
                    <div><img src={compImg} height="60px" width="60px" style={{ borderRadius: "50%" }} /></div>
                    <h3 style={{ color: "gray" }}>{CWinCouter}</h3>
                  </div>
                </div>
                <div className="Choice">
                  {loading ?
                    <div >
                      <h1 className="txt_yellow" >Loading...</h1>
                       </div>
                    : !!computerChoice ?
                      <img src={compImage} height="100%" width="100%" style={{ borderRadius: "20px" }} /> :
                      <img src={compImg} height="100%" width="100%" style={{ borderRadius: "20px" }} />
                  }
                </div>
              </div>
            </div>

            <div style={{ backgroundColor: "black" }}>

              {!!gameResult ?
                <div className="result">
                  <div style={{ textAlign: "center" }}>

                    {!!gameResult && gameResult === USER_WIN ?
                      <div>
                        <img src={winImg} />
                        <h2>You won !</h2>
                      </div>
                      : null}

                    {!!gameResult && gameResult === COMPUETR_WIN ?
                      <div>
                        <img src={loseImg} />
                        <h2>Computer Won !</h2>
                      </div>
                      : null}

                    {!!gameResult && gameResult === RESULT_DRAW ?
                      <div>
                        <img src={drawImg} />
                        <h2>Match Draw</h2>
                      </div>
                      : null}
                    <button className="new_game_btn" onClick={resetGame}>New Game</button>
                  </div>
                </div>
                : null}

            </div>

          </div>
          <div className="mobile">
              <h3 className="txt_yellow">Created By:</h3>
              <img src={jdpic} height="50px" width="50px" style={{ marginLeft: "20px", borderRadius: "50%" }} />
            </div>
        </div>
      </div>
    </div>

  );
};

export default App;
