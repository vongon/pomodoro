var React = require("react");

var Dial = React.createClass({
	render: function(){
		var self=this;
		var displayValue = this.props.humanizeTime(this.props.interval);
		return (
		<div className="dial-container">
		<div className="dial-border">
		<div className="type-container">
			<h4>{this.props.type}</h4>
		</div>
		<div className="controls-container">
			<div className="span-container"><span className="glyphicon glyphicon-minus-sign"
					onClick={function(){self.props.decreaseLength(self.props.type)}}/></div>
			<p>{displayValue}</p>
			<div className="span-container"><span className="glyphicon glyphicon-plus-sign"
					onClick={function(){self.props.increaseLength(self.props.type)}}/></div>
		</div>
		</div>
		</div>
		);
	}
});

module.exports = Dial;

