import React, { useState } from 'react';
import { TileDocument } from '@ceramicnetwork/stream-tile';

// KEEP IN MIND: this can be filling out a kleros contract instead
function JobForms(props) {
  const ceramic = props.ceramic;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState([]);
  const [otherSkills, setOtherSkills] = useState("");
  const [payments, setPayments] = useState([]);
  const [price, setPrice] = useState(0);

  const handleInputChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    switch (name) {
      case 'title':
        setTitle(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'price':
        setPrice(value);
        break;
      case 'otherSkills':
        setOtherSkills(value);
        break;
    }
  }

  const handleCheckbox = (e) => {
		let array; // array for holding checkbox state

		// check if the checkbox belongs to checkbox-list of "skills" or "payments"
		const checkboxGroup = e.target.parentElement.parentElement.classList[1];
    // set the array to a copy of state array
		if (checkboxGroup === "skills") {
			array = skills.slice();
		} else if (checkboxGroup === "paymentForms") {
			array = payments.slice();
		}

		const value = e.target.nextSibling.innerText;
		// if element not in array, it must be checked so push it to
		// the array; otherwise, unchecked, so remove from array
		if (!array.find(elem => elem === value)) {
			array.push(value);
		} else {
			let index = array.indexOf(value);
			array.splice(index, 1);
		}

		// set state to new array
    if (checkboxGroup === "skills") {
      setSkills(array);
    } else {
      setPayments(array);
    }
  }

  const	handleValidation = (e) => {
		e.preventDefault();

		let errors = 0;
		if (title === "") {
			document.querySelector("#title-error").classList.remove('d-none');
			errors = 1;
		} else {
			document.querySelector("#title-error").classList.add('d-none');
		}
		
		if (description === "") {
			document.querySelector("#desc-error").classList.remove('d-none');
			errors = 1;
		} else {
			document.querySelector("#desc-error").classList.add('d-none');
		}

		// submit form if no errors
		if (!errors) {
			handleSubmit();
			// update UI with success/failure msg
			document.querySelector('.notification').classList.remove('d-none');
			document.querySelector('.error-msg').classList.add('d-none');
		} else {
			document.querySelector('.error-msg').classList.remove('d-none');
		}
	}

  const handleSubmit = async () => {
    // ceramic passed in from props, content from form, metadata is JOB schema and family is JOB
    const content = { title, description, skills, otherSkills, payments, price };

    const metadata = {
      family: "jobs",
      schema: 'schemaDoc.commitId'
    };

    const doc = await TileDocument.create(ceramic, content, metadata);

    // probably save this streamID somewhere to reference it later
    const streamID = doc.id.toString();
  }
  // TODO
  // 1. deploy schemas and figure out there commits, and how to import them
  // 2. test submission of jobs and docs are submitted to ceramic streams

  return (
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
              value={title}
              onChange={handleInputChange}
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
              placeholder="Describe your project briefly, including what you would like done"
              name="description"
              value={description}
              onChange={handleInputChange}
            />
            <p id="desc-error" className="small-text font-italic d-none">Please enter a description</p>
          </div>
          <div className="form-group">
            <label htmlFor="file">Input any files relating to your project here, such as images, descriptions,etc.</label>
            <input type="file" className="form-control-file"></input>
          </div>
          <div className="form-group skills">
            <label>Mark any skills related to your job:</label>
            <Checkbox label="Programming" onChange={handleCheckbox} />
            <Checkbox label="Design" onChange={handleCheckbox} />
            <Checkbox label="Marketing" onChange={handleCheckbox} />
            <Checkbox label="Photography" onChange={handleCheckbox} />
            <Checkbox label="Writing" onChange={handleCheckbox} />
            <input 
              style={{width: "150px"}} 
              type="text" 
              className="form-control"
              name="otherSkills"
              placeholder="Other..."
              value={otherSkills}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group paymentForms">
            <label>What forms of payment are you willing to pay? <span>*</span></label>
            <Checkbox label="Flat fee" onChange={handleCheckbox} />
            <Checkbox label="Pay what I want" onChange={handleCheckbox} />
            <Checkbox label="Endorsement" onChange={handleCheckbox} />
            <Checkbox label="Open to discussion" onChange={handleCheckbox} />
          </div>
          <div className="form-group">
            <label>What price range are you willing to pay?</label>
            <input type="text" className="form-control" name="price" onChange={handleInputChange} />
            <p id="price-error" className="small-text font-italic d-none">Please enter a price that is a number</p>
          </div>
          <button onClick={handleValidation} className="btn btn-primary mb-5">Submit</button>
        </form>
        <p className="d-none notification">Job successfully posted!</p>
        <p className="d-none error-msg">There were errors in submitting this form</p>
      </div>
    </section>
  );
}

const Checkbox = (props) => {
  return (
    <div className="form-check">
      <input 
        type="checkbox" 
        className="form-check-input"
        onChange={props.onChange}
      />
      <label className="form-check-label">{props.label}</label>
    </div>
  )
}

export default JobForms;
