import React from 'react';
import Cards from './cards';

const CedritCard = React.createClass({
	getDefaultProps() {
		return {
			texts: {}, 
			stripe: {}, 
			errors: {}
		}
	},

	validateCard(card) {
			let number = typeof Stripe !== 'undefined' ? Stripe.card.validateCardNumber(card) : false;
			return this.updateErrors({number});
	},

	validateExpiry(month, year) {
		if (typeof Stripe !== 'undefined') {
			let valid = Stripe.card.validateExpiry(month, year);
			return this.updateErrors({exp_month: valid, exp_year: valid});
		}
	},

	validateCvc(cvc) {
		if (typeof Stripe !== 'undefined') {
			cvc = Stripe.card.validateCVC(cvc);
			return this.updateErrors({cvc});
		}
	},

	getCardType(number) {
		if (typeof Stripe !== 'undefined') {
			return Stripe.card.cardType(number).replace(' ', '');
		}

		return '';
	},

	updateErrors(field) {
		return {...this.props.errors, stripe: field};
	},

	handleCard(e) {
		const {onlyNum, maxLength} = this.props;
		let val =  e.currentTarget.value;
		let number = onlyNum(val);
		number = maxLength(number, 16);
		let errors = this.validateCard(number);
		let card_type = this.getCardType(number);
		let stripe = {...this.props.stripe, number, card_type};
		this.props.onChange({stripe, errors});
	},
	
	handleExpiry(type, e) {
		let {stripe, onlyNum, maxLength} = this.props;
		let val = onlyNum(e.currentTarget.value);
		val =  maxLength(val, 2);
		let exp_month = stripe.exp_month;
		let exp_year = stripe.exp_year;
		if(type == 'exp_month') exp_month = val;
		if(type == 'exp_year') exp_year = val;
		let errors = this.validateExpiry(exp_month, exp_year);
		stripe = {...stripe, exp_month, exp_year};

		this.props.onChange({stripe, errors});
	},

	handleCvc(e) {
		let {stripe, onlyNum, maxLength} = this.props;
		let cvc = onlyNum(e.currentTarget.value);
		cvc = maxLength(cvc, 4);
		stripe = {...stripe, cvc};
		let errors = this.validateCvc(cvc);
		this.props.onChange({stripe, errors});
	},

	showErr(field) {
		if(this.props.errors.stripe) {
			return this.props.errors.stripe[field] == false ? 'form-group__error' : 'hidden';
		}

		return '';
	},

	inputErrStyle(field) {
		if(this.props.errors.stripe) {
			return this.props.errors.stripe[field] == false ? 'form-group--error' : '';
		}
		return '';
	},

	allValidations(e) {
		e.preventDefault();
		const {stripe} = this.props;
		let number = this.validateCard(stripe.number);
		let exp_month = this.validateExpiry(stripe.exp_month, stripe.exp_year);
		let cvc = this.validateCvc(stripe.cvc);
		let errors = {...this.props.errors, stripe:{ ...number.stripe, ...exp_month.stripe, ...cvc.stripe}};
		this.props.onChange({errors});
	},

	render() {
		const {texts, stripe, errors} = this.props;

		return (
			<div style={{width: '33.3%', float: 'left'}}>
				<Cards {...this.props} />

			<div className="form-group">
				<input
					type="text"
					placeholder={texts.placeholder_credit_card} 
					className={`form-control ${this.inputErrStyle('number')}`}
					onChange={this.handleCard}
					value={stripe.number}
				/>

				<span className={this.showErr('number')}>
					{texts.validation_card}
        </span>
			</div>
		<div className="row">
			<div className="form-group col-4-l">
				<input 
					type="text" 
					placeholder={texts.placeholder_month} 
					className="form-control" 
					onChange={this.handleExpiry.bind(null, 'exp_month')}
					value={stripe.exp_month}
				/>
				<span className={this.showErr('exp_month')}>
					{texts.validation_month}
        </span>
			</div>
			
				<div className="form-group col-4-l">
					<input 
						type="text" 
						placeholder={texts.placeholder_year} 
						className="form-control" 
						onChange={this.handleExpiry.bind(null, 'exp_year')}
						value={stripe.exp_year}
					/>
					<span className={this.showErr('exp_year')}>
						{texts.validation_year}
					</span>
				</div>
				<div className="form-group col-4-l">
					<input
						type="text" 
						placeholder={texts.placeholder_cvc} 
						className="form-control" 
						onChange={this.handleCvc}
						value={stripe.cvc}
					/>
		
					<span className={this.showErr('cvc')}>
						{texts.validation_cvc}
					</span>
				</div>
			</div>
		</div>
		)
	}
});

export default CedritCard;