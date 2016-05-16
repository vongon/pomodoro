var React = require("react");
var Dial = require("./Dial.react");
var Clock = require("./Clock.react");
var $ = require("jquery");

var Application = React.createClass({
	getInitialState: function(){
		return ({
			running: false,
			phase:"session",
			counter:1500,
			sessionLength: 1500,
			breakLength: 300,
			intervalID: undefined,
			animateState: 1
		});	
	},
	incrementTimer: function(){
		console.log('[pomodoro] incrementTimer()');
		var newCounter = this.state.counter - 1;
		
		this.setState({counter: newCounter});
		
		if(newCounter%2 === 0){
			$('.border').css('box-shadow',"0px 10px 10px #DDD");
		} else {
			$('.border').css('box-shadow',"0px 10px 100px #DDD");
		}
		
		if(newCounter <= 0){
			this.flipPhase();
		}

		
	},
	startTimer: function(){
		console.log('[pomodoro] startTimer()');
		var incrementTimer = this.incrementTimer;
		this.state.intervalID = window.setInterval(incrementTimer, 1000);
		this.setState({running: true});
		if(this.state.phase === "session"){
			$('body').css('background-color','#C3FFDD');
		} else {
			$('body').css('background-color','#FF4D4D');
		}
	},
	stopTimer: function(){
		console.log('[pomodoro] stopTimer()');
		window.clearInterval(this.state.intervalID);
		var counter = this.state.sessionLength;
		this.setState({running: false,
						phase: "session",
						counter: counter
						});
		$('body').css('background-color','#FFF');
	},
	flipPhase: function(){
		console.log('[pomodoro] flipPhase()');
		var counter;
		if(this.state.phase === "session"){
			//switch to break
			counter = this.state.breakLength;
			this.setState({phase:"break",
							counter: counter
						});
			$('body').css('background-color','#FFC8C8');
			
		} else {
			//switch to session
			counter = this.state.sessionLength;
			this.setState({phase:"session",
							counter: counter
						});
			$('body').css('background-color','#C3FFDD');
		}
	},
	increaseLength: function(type){
		console.log('[pomodoro] increaseLength()');	
		var attr,length;
		if(type === "break"){
			attr="breakLength";
			length = this.state[attr];
			this.setState({breakLength: length+60});
		}
		else {
			attr="sessionLength";
			length = this.state[attr];
			
			if(this.state.running){
				this.setState({sessionLength: length+60});	
			} else {
				this.setState({sessionLength: length+60,
								counter: length+60
							});
			}
		}
	},
	decreaseLength: function(type){
		console.log('[pomodoro] decreaseLength()');
		var attr,length;
		if(type === "break"){
			attr="breakLength";
			length = this.state[attr]-60;
			if(length > 0){
				this.setState({breakLength: length});
			}
		}
		else {
			attr="sessionLength";
			length = this.state[attr]-60;
			if(length > 0){
				if(this.state.running){
					this.setState({sessionLength: length});	
				} else {
					this.setState({sessionLength: length,
									counter: length
								});
				}
			}
		}
		
	},
	humanizeTime: function(seconds){
		var sec = seconds % 60;
		var min = (seconds-sec)/60;
		if(sec < 10){
			sec = "0"+sec;
		}
		return min+":"+sec;
	},
	render: function(){
		return (
		<div className="container" style={{textAlign:'center'}}>
		<div className="border">
			<h1 style={{textAlign:'center'}}>Pomodoro Clock</h1>
			<div className="row">
				<div className="col-xs-6">
					<Dial type="break" 
						interval={this.state.breakLength}
						increaseLength={this.increaseLength}
						decreaseLength={this.decreaseLength}
						humanizeTime={this.humanizeTime}/>
				</div>
				<div className="col-xs-6">
					<Dial 
						type="session" 
						interval={this.state.sessionLength}
						increaseLength={this.increaseLength}
						decreaseLength={this.decreaseLength}
						humanizeTime={this.humanizeTime}/>
				</div>
			</div>
			<div className="row">
				<div className="col-xs-12">
					<Clock 
						phase={this.state.phase}
						counter={this.state.counter}
						running={this.state.running}
						startTimer={this.startTimer}
						stopTimer={this.stopTimer}
						humanizeTime={this.humanizeTime}/>
				</div>
			</div>
		</div>
		</div>
		);
	}
});

module.exports = Application;

