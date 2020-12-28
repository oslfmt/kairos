import React, { Component } from 'react'
import Checkbox from '../Checkbox';
const axios = require('axios');

export default class JobForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: '',
			description: '',
			skills: [],
			otherSkills: '',
			price: 0
		};

		this.submitJob = this.submitJob.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleCheckbox = this.handleCheckbox.bind(this);
		this.handleValidation = this.handleValidation.bind(this);
	}

	handleValidation(e) {
		e.preventDefault();

		let errors = 0;
		if (this.state.title === "") {
			document.querySelector("#title-error").classList.remove('d-none');
			errors = 1;
		} else {
			document.querySelector("#title-error").classList.add('d-none');
		}
		
		if (this.state.description === "") {
			document.querySelector("#desc-error").classList.remove('d-none');
			errors = 1;
		} else {
			document.querySelector("#desc-error").classList.add('d-none');
		}
		
		if (this.state.price === 0 || !Number.isInteger(parseInt(this.state.price))) {
			document.querySelector("#price-error").classList.remove('d-none');
			errors = 1;
		} else {
			document.querySelector("#price-error").classList.add('d-none');
		}

		// submit form if no errors
		if (!errors) {
			this.submitJob();

			// update UI with success/failure msg
			document.querySelector('.notification').classList.remove('d-none');
			document.querySelector('.error-msg').classList.add('d-none');
		} else {
			document.querySelector('.error-msg').classList.remove('d-none');
		}
	}
	
	submitJob() {
		const Job = {
			title: this.state.title,
			description: this.state.description,
			skills: this.state.skills,
			otherSkills: this.state.otherSkills,
			price: this.state.price
		};

		// submit a post request (containing job data)
		axios.post('http://localhost:4000/postjob/', Job)
		.then(res => {
			console.log(res);
		})
		.catch(err => {
			console.log(err);
		});

		// reset state of form
		this.setState({
			title: '',
			description: '',
			skills: [],
			otherSkills: '',
			price: 0
		});
	}

	handleInputChange(e) {
		const target = e.target;
		const value = target.value;
		const name = target.name;
		
		this.setState({
			[name]: value
		});
	}

	handleCheckbox(e) {
		// create copy of array for immutability
		const skills = this.state.skills.slice();
		const target = e.target;
		const value = target.nextSibling.innerText;

		// if skill not in array, it must be checked so push it to
		// the array; otherwise, unchecked, so remove from array
		if (!skills.find(elem => elem === value)) {
			skills.push(value);
		} else {
			let index = skills.indexOf(value);
			skills.splice(index, 1);
		}

		// set state to new array
		this.setState({
			skills: skills
		});
	}

	render() {
		return (
			<div>
				<section id="postjob">
					<div className="container mt-5">
						<h3 className="display-5">Create a Job</h3>
						<form>
							<div className="form-group">
								<label htmlFor="project-title">Title <span>*</span></label>
								<input 
									id="project-title" 
									type="text"
									className="form-control"
									name="title"
									placeholder="Pick a title for your project..."
									value={this.state.title}
									onChange={this.handleInputChange}
								/>
								<p id="title-error" className="small-text font-italic d-none">Please enter a title</p>
							</div>
							<div className="form-group">
								<label htmlFor="description">Description <span>*</span></label>
								<textarea 
									className="form-control" 
									id="description" 
									cols="30" 
									rows="10" 
									placeholder="Describe your project briefly..."
									name="description"
									value={this.state.description}
									onChange={this.handleInputChange}
								/>
								<p id="desc-error" className="small-text font-italic d-none">Please enter a description</p>
							</div>
							<div className="form-group">
								<label htmlFor="file">Input any files relating to your project here, such as images, descriptions,etc.</label>
								<input type="file" className="form-control-file"></input>
							</div>
							<div className="form-group">
								<label>Mark any skills related to your job:</label>
								<Checkbox 
									label="Programming" 
									onChange={this.handleCheckbox}
								/>
								<Checkbox 
									label="Design" 
									onChange={this.handleCheckbox}
								/>
								<Checkbox 
									label="Marketing" 
									onChange={this.handleCheckbox}
								/>
								<Checkbox 
									label="Photography" 
									onChange={this.handleCheckbox}
								/>
								<Checkbox 
									label="Writing" 
									onChange={this.handleCheckbox}
								/>
								<input 
									style={{width: "150px"}} 
									type="text" 
									className="form-control"
									name="otherSkills"
									placeholder="Other..."
									value={this.state.otherSkills}
									onChange={this.handleInputChange}
								/>
							</div>
							<div className="form-group">
								<label>What price do you charge? <span>*</span></label>
								<input
									type="text" 
									className="form-control" 
									name="price"
									onChange={this.handleInputChange}
								/>
								<p id="price-error" className="small-text font-italic d-none">Please enter a price (that is a number)</p>
							</div>
							<button type='submit' onClick={this.handleValidation} className="btn btn-primary mb-5">Submit</button>
						</form>
						<p className="d-none notification">Job successfully posted!</p>
						<p className="d-none error-msg">There were errors in submitting this form</p>
					</div>
    		</section>
			</div>
		)
	}
}
