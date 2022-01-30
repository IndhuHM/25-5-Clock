class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakValue: 5,
      sessionValue: 25,
      time: 1500,
      active: false,
      mode: 'session' };

  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.time === 0 && prevState.mode === 'session') {
      this.setState({
        time: this.state.breakValue * 60,
        mode: 'break' });

      this.audio.play();
    }

    if (prevState.time === 0 && prevState.mode === 'break') {
      this.setState({
        time: this.state.sessionValue * 60,
        mode: 'session' });

      this.audio.play();
    }
  }


  clockify() {
    let minutes = Math.floor(this.state.time / 60);
    let seconds = this.state.time - minutes * 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return minutes + ':' + seconds;
  }

  brkIncrement() {
    var value = this.state.breakValue;
    if (value === 60) {return;}
    this.setState({
      breakValue: value + 1 });
  }

  brkDecrement() {
    var value = this.state.breakValue;
    if (value === 1) {return;}
    this.setState({
      breakValue: value - 1 });
  }

  sesIncrement() {
    var value = this.state.sessionValue + 1;
    if (this.state.sessionValue === 60) {return;}
    this.setState({
      sessionValue: value,
      time: value * 60 });

  }

  sesDecrement() {
    var value = this.state.sessionValue - 1;
    if (this.state.sessionValue === 1) {return;}
    this.setState({
      sessionValue: value,
      time: value * 60 });

  }

  handlePlayPause() {
    if (this.state.active) {
      this.setState({
        active: false },
      () => clearInterval(this.pomodoro));
    } else
    {
      if (!this.state.touched) {
        this.setState({
          time: this.state.sessionValue * 60,
          active: true,
          touched: true },
        () => this.pomodoro = setInterval(() => this.setState({ time: this.state.time - 1 }), 1000));
      } else
      {
        this.setState({
          active: true,
          touched: true },
        () => this.pomodoro = setInterval(() => this.setState({ time: this.state.time - 1 }), 1000));
      }
    }
  }

  reset() {
    this.setState({
      breakValue: 5,
      sessionValue: 25,
      time: 1500,
      mode: 'session',
      active: false,
      touched: false });

    this.audio.pause();
    this.audio.currentTime = 0;
    clearInterval(this.pomodoro);
  }



  render() {
    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("div", { id: "break-label" }, " Break Length:", /*#__PURE__*/

      React.createElement("h2", { id: "break-length" }, " ", this.state.breakValue), /*#__PURE__*/
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("button", { id: "break-decrement", onClick: this.brkDecrement.bind(this) }, "-"), /*#__PURE__*/
      React.createElement("button", { id: "break-increment", onClick: this.brkIncrement.bind(this) }, "+"))), /*#__PURE__*/




      React.createElement("div", { id: "session-label" }, "Session Length:", /*#__PURE__*/
      React.createElement("h2", { id: "session-length" }, " ", this.state.sessionValue), /*#__PURE__*/
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("button", { id: "session-decrement", onClick: this.sesDecrement.bind(this) }, "-"), /*#__PURE__*/
      React.createElement("button", { id: "session-increment", onClick: this.sesIncrement.bind(this) }, "+"))), /*#__PURE__*/



      React.createElement("div", { id: "timer-label" }, this.state.mode === 'session' ? 'Session ' : 'Break '), /*#__PURE__*/
      React.createElement("div", { id: "time-left" }, this.clockify()), /*#__PURE__*/


      React.createElement("button", { id: "start_stop", active: this.state.active, onClick: this.handlePlayPause.bind(this) }, this.state.active ? /*#__PURE__*/React.createElement("span", null, "\u275A\u275A") : /*#__PURE__*/React.createElement("span", null, "\u25BA"), /*#__PURE__*/

      React.createElement("audio", { id: "beep", src: "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav",
        ref: ref => this.audio = ref })), /*#__PURE__*/


      React.createElement("button", { id: "reset", active: this.state.active, onClick: this.reset.bind(this) }, "\u21BB")));



  }}




ReactDOM.render( /*#__PURE__*/React.createElement(Clock, null), document.getElementById("root"));