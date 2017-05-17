import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
	//wires up this method to particular Field. field is passed in by component function call
	renderField(field) {
		const { meta: { touched, error } } = field;
		const className = `form-group ${touched && error ? 'has-danger' : ''}`;

		return (
		<div className={className}>
			<label> {field.label} </label>
			<input className="form-control"
				{...field.input}
			/>
			<div className="text-help">
			{touched ? error : ''}
			</div>
		</div>
		);
	}

	onSubmit(values){
		this.props.createPost(values, () => {
			this.props.history.push('/');
		});
	}
	
	render() {
		const { handleSubmit } = this.props;
		return (
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<Field
					name="title"
					component={this.renderField}
					label="Title"
				/>
				<Field
					name="categories"
					component={this.renderField}
					label="Categories"
				/>
					<Field
					name="content"
					component={this.renderField}
					label="Post Content"
				/>
				<button type="submit" className="btn btn-primary"> Submit </button>
				<Link to="/" className="btn btn-danger">Cancel</Link>
			</form>
		);
	}
}

function validate(values) {

	const errors = {};

	if (!values.title) {
		errors.title = 'Enter a title!';
	}

	if (!values.categories) {
		errors.categories = 'Enter a category!';
	}

	if (!values.content) {
		errors.content = 'Enter some content!';
	}

	// if errors is empty, the form is fine to submit.
	// if it has any properties, redux-form assumes the form is invalid.
	return errors;
}

//unique string here
export default reduxForm({
	validate, 
	form: 'PostsNewForm'
})(
connect(null, { createPost })(PostsNew)
);