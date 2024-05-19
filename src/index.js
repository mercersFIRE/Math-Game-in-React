import React from 'react';
import ReactDOM from 'react-dom'
function App() {
  let right=React.useState(0);
  let wrong=React.useState(0);
  let no1=React.useState(0);
  let no2=React.useState(0);
  let sign=React.useState('x');
  let visible=React.useState(false);
  let blur=React.useState(false);
  let userAnswer=React.useState('');
  let gotRight=React.useState(false);
  let gotWrong=React.useState(false);
  let msg=React.useState('');
  function updateProblem() {
    no1[1](Math.floor(Math.random() * 11));
    no2[1](Math.floor(Math.random() * 11));
    sign[1](['+', '-', 'x'][Math.floor(Math.random() * 3)]);
  }
  function checkAnswer(e) {
    e.preventDefault();
    let answer = (sign[0] == '+' ? no1[0] + no2[0] : (sign[0] == '-' ? no1[0] - no2[0] : no1[0] * no2[0]));
    (userAnswer[0] == answer ? rightAnswer : wrongAnswer)();
    userAnswer[1]('');
  }
  function rightAnswer() {
    gotRight[1](true);
    right[1](prev=>prev+1);
    setTimeout(() => {
        gotRight[1](false);
        if (right[0] == 9) popupWindow("Congrats! You have won")
        updateProblem();
    }, 1000);
  }
  function wrongAnswer() {
    gotWrong[1](true);
    wrong[1](prev=>prev+1);
    //ourField.focus();
    setTimeout(() => {
        gotWrong[1](false);
    }, 500);
    if (wrong[0] == 2) popupWindow("Sorry, You have lost");
}
  function popupWindow(ms) {
    visible[1](true);
    blur[1](true);
    msg[1](ms)
    //startAgain.focus();
  }
  function reset() {
    visible[1](false);
    blur[1](false);
    right[1](0);
    wrong[1](0);
    updateProblem();
  }
  React.useEffect(() => {
    updateProblem();
  }, []);
  return (
    <>
      <div className="head animate__animated animate__bounce">
        <h3>Math Game</h3>
      </div>
      <div className={"firstBlur "+(blur[0]?"toBlur":"")}>
        <div className="mainUi">
          <h3 className={"problemStatement animate__animated"+(gotRight[0]?" animate__zoomOut rightAnswer":"")+(gotWrong[0]?" animate__headShake wrongAnswer":"")}>{no1[0]} {sign[0]} {no2[0]}</h3>
          <form onSubmit={checkAnswer} action="" className="ourForm">
            <input value={userAnswer[0]} onChange={(e)=>userAnswer[1](e.target.value)} type="text" className="ourField" autoComplete="off" />
            <button type="submit" className="buttonSubmit">
              Submit
            </button>
          </form>
          <h3 className="scoreComment">{10 - right[0]} more points to win, and {2 - wrong[0]} mistakes remaining</h3>
        </div>
      </div>

      <div className={"popup "+(visible[0]?"visible":"hidden")}>
        <h2 className="popupText">{msg[0]}</h2>
        <button onClick={reset} type="submit" className="startAgain buttonSubmit">
          Start Again
        </button>
      </div>
    </>
  );
}
ReactDOM.render(<App />, document.getElementById("app"));
