/* IE 8 Compatability */
require('es5-shim');
require('es5-shim/es5-sham');
require('console-polyfill');

var React = require('react');
var ReactDOM = require('react-dom');
var Application = require('./components/Application.react');


console.log('[pomodoro] app.js loaded');
ReactDOM.render(<Application />, document.getElementById('react-application'));