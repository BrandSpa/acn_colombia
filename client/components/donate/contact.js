import React from 'react';
import validator from 'validator';

const Contact = React.createClass({
	validate(field, val) {
		let valid = !validator.isEmpty(val);
		if(field == 'email') valid = validator.isEmail(val);
		let contact = {...this.props.errors.contact, [field]: valid};
		return {...this.props.errors, contact};
	},

	handleChange(field, e) {
		let val = e.currentTarget.value;
		let errors = this.validate(field, val);

		this.props.onChange({
			contact: {...this.props.contact, [field]: val},
			errors
		});
	},

	showErr(field) {
		return this.props.errors.contact[field] == false ? 'form-group__error' : 'hidden';
	},

	inputErrStyle(field) {
		return this.props.errors.contact[field] == false ? 'form-group--error' : '';
	},

	validateAll() {
		let {contact} = this.props;
		let name = this.validate('name', contact.name);
		let email = this.validate('email', contact.email);
		let country = this.validate('country', contact.country);
		let errors = {...this.props.errors, contact: {...name.contact, ...email.contact, ...country.contact}};
		this.props.onChange({errors});
	},

	render() {
		const {texts, contact} = this.props;

		return (
			<div style={{width: '33.3%', float: 'left'}}>

					<div className="form-group col-12-l">
						<input 
							type="text" 
							className={`form-control ${this.inputErrStyle('name')}`} 
							placeholder={texts.placeholder_name}
							onChange={this.handleChange.bind(null, 'name')}
							value={contact.name}
						/>
						<span className={this.showErr('name')}>
							{texts.validation_card}
						</span>
					</div>

					<div className="form-group col-12-l">
						<input 
							type="text" 
							className={`form-control ${this.inputErrStyle('email')}`} 
							placeholder={texts.placeholder_email}
							onChange={this.handleChange.bind(null, 'email')} 
							value={contact.email}
						/>
						<span className={this.showErr('email')}>
							{texts.validation_card}
						</span>
					</div>

					<div className="form-group col-12-l">
						<select
							type="text" 
							className="form-control" 
							placeholder={texts.placeholder_country}
							onChange={this.handleChange.bind(null, 'country')} 
							value={contact.country || texts.country}
						>
						{this.props.countries.map((country, i) => {
							return <option key={i} value={country}>{country}</option>
						})}
						</select>
					</div>

			</div>
		)
	}
});

export default Contact;