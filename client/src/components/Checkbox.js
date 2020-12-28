import React, { Component } from 'react'

export default class Checkbox extends Component {
	render() {
		return (
			<div className="form-check">
				<input 
					type="checkbox" 
					className="form-check-input"
					onChange={this.props.onChange}
				/>
				<label className="form-check-label">{this.props.label}</label>
			</div>
		)
	}
}