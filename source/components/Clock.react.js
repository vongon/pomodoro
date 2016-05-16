var React = require("react");


var Clock = React.createClass({
	render: function(){
		var displayValue = this.props.humanizeTime(this.props.counter);
		var StartStopButton;
		if(this.props.running){
			StartStopButton = <span id="timerButton" className="glyphicon glyphicon-stop"
									onClick={this.props.stopTimer}/>;
		} else {
			StartStopButton = <span id="timerButton" className="glyphicon glyphicon-play"
									onClick={this.props.startTimer}/>;
		}
		return (
		<div className="clock-container">
		<div className="clock-border">
			<h3 style={{margin: 10}}>{this.props.phase}</h3>
			<h1 style={{margin: 10,
						fontSize: 72}}>
				{displayValue}
			</h1>
			{StartStopButton}
		</div>
		</div>
		);
	}
});
//glyphicon glyphicon-play
//glyphicon glyphicon-stop
module.exports = Clock;

