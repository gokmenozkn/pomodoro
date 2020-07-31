import React from 'react';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      minutes: 25,
      seconds: 0,
      isStart: false,
      isClosed: true,
      isDisabled: false
    }
  }

  handleStart = () => {
    this.setState({
      isStart: true
    });

    this.timer = setInterval(() => {
      if (this.state.seconds > 0) {
        this.setState({ seconds: this.state.seconds - 1 });
      } else if (this.state.seconds === 0) {
        this.setState({
          minutes: this.state.minutes - 1,
          seconds: 59,
        });
      } 
      
      if (this.state.minutes === 0 && this.state.seconds === 0) {
        this.setState({
          isClosed: !this.state.isClosed,
          isDisabled: !this.state.isDisabled
        })
        clearInterval(this.timer);
      }
    }, 1000);
  }

  handleStop = () => {
    this.setState({ isStart: !this.state.isStart });
    clearInterval(this.timer);
  }

  handleClear = () => {
    this.setState({
      seconds: 0,
      minutes: 25,
      isStart: false,
      isDisabled: false
    });
    clearInterval(this.timer);
  }

  closeNotif = () => {
    this.setState({
      isClosed: !this.state.isClosed
    })
  }

  decreaseMin = () => {
    this.state.minutes > 0 && 
        this.setState({ 
          minutes: this.state.minutes - 1,
          seconds: 0,
          isStart: false
        });
    
    clearInterval(this.timer);
  }

  increaseMin = () => {
    this.setState({
      minutes: this.state.minutes + 1 ,
      seconds: 0,
      isStart: false
    });
    clearInterval(this.timer);
  }

  render() {
    const Start = (
      <i className="btn material-icons" 
        style={{ pointerEvents: this.state.isDisabled ? "none" : 'auto' }}
        onClick={this.handleStart}>
        play_arrow
      </i>
    )

    const Stop = (
      <i className="btn material-icons"
        style={{ pointerEvents: this.state.isDisabled ? "none" : 'auto' }}
        onClick={this.handleStop}>
        pause
      </i>
    )

    const noneStyle = this.state.isClosed ? 'close-notification': '';

    return (
      <>
        <div className="container">
          <div className="change-minute">
            <i className="btn1 material-icons" onClick={this.decreaseMin}>remove</i>
            <span>{this.state.minutes} min</span>
            <i className="btn1 material-icons" onClick={this.increaseMin}>add</i>
          </div>
          <div className="timer">
            <span className="minutes">{this.state.minutes}:</span>
            <span className="seconds">
              { this.state.seconds > 9 ? this.state.seconds : "0" + this.state.seconds}
            </span>
          </div>
          <div className="buttons">
            {this.state.isStart ? Stop : Start}
            <i className="btn material-icons" onClick={this.handleClear}>replay</i>
          </div>
        </div>
        <div className={["darken", noneStyle].join(' ')}></div>
        <div className={["box-container", noneStyle].join(' ')}>
          <div className="box">
            <h1>Your time is done</h1>
            <i className="close-btn material-icons" onClick={this.closeNotif}>
              close
            </i>
          </div>
        </div>
      </>
    );
  }
}

export default App;
