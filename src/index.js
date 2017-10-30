// src/index.js

import React from 'react';
import BookStore from './BookStore';

var InputElement = React.createClass({
	
	getInitialState() {
		return ({ name: '-'});
	},

	handleChange(e) {
		console.log('New value for state: ' + e.target.value);
		this.setState({name: e.target.value});
	},

	render() {
		return (
			<input type='text' 
				   value={this.state.name} 
				   onChange={this.handleChange} />
			);
	}
});

React.render(<BookStore />, document.getElementById('root'));