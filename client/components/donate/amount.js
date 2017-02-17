import React from 'react';
import AmountBtns from './amount_btns';

const amount = React.createClass({
	getDefaultProps() {
		return {
			texts: {},
			amount: 30
		}
	},

	changeAmount(amount,e) {
		if(e) e.preventDefault();
		let el = this.amountInput;
		if(amount == 5) el.focus();
		this.props.onChange({amount});
	},

	handleAmount(e) {
		let el = e.currentTarget;
		let amount = this.props.onlyNum(el.value);
		this.props.onChange({amount});
	},

	changeType(donation_type, e) {
		if(e) e.preventDefault();
		this.props.onChange({donation_type});
	},

	render() {
		const {texts, donation_type, amount} = this.props;

		return (
			<div style={{width: '33.3%'}}>
				<AmountBtns texts={texts} changeAmount={this.changeAmount} />
				<div className="row">
					<div className="form-group col-7-l">
						<input 
							ref={amountInput => this.amountInput = amountInput} 
							className="form-control" 
							type="text"
							onChange={this.handleAmount} 
							value={amount} 
						/>
					</div>
					<div className="form-group col-5-l">
						<a
							href="#" 
							onClick={this.changeType.bind(null, 'monthly')}
							className={donation_type == 'monthly' ? 'donate_landing__type donate_landing__type--active' : 'donate_landing__type '}
						>
						{texts.monthly}
					</a>
					<a href="#" 
							onClick={this.changeType.bind(null, 'once')} 
							className={donation_type == 'once' ? 'donate_landing__type donate_landing__type--active' : 'donate_landing__type '}
						>
						{texts.once}
					</a>
					</div>
				</div>
			</div>
		)
	}
});

export default amount;