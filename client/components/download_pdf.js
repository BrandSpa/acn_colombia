import React from 'react';
import request from 'axios';
import getCountries from '../lib/getCountries';
const endpoint = '/wp-admin/admin-ajax.php';

const DownloadPdf = React.createClass({
	getDefaultProps() {
		return {
			btn: {
				text: '',
				background: ''
			},
			texts: {},
			countries: getCountries
		}
	},

	getInitialState() {
		return {
			email: ''
		}
	},

	handlepdf(e) {
		e.preventDefault();
		const data = this.state;

		request
		.post(endpoint, data)
		.then(res => console.log(data));

	},

	handleChange(field, e) {
		this.setState({...this.state, [field]: e.target.value});
	},

	render() {
		const { countries, btn, texts } = this.props;

		let btnStyle = {
			background: btn.background
		};

		return (
			<form onSubmit={this.handlepdf}>
				<input 
					type="text" 
					placeholder={texts.email} 
					onChange={this.handleChange.bind(null, 'email')} 
					value={this.state.email}
				/>

				<select 
					onChange={this.handleChange.bind(null, 'country')}
					value={this.state.country || this.props.country}
				>
					{countries.map(country => <option value={country}>{country}</option>)}
				</select>
				<button 
					onClick={this.handlepdf} 
					style={btnStyle}>{btn.text}</button>
			</form>
		)
	}
})

export default DownloadPdf;