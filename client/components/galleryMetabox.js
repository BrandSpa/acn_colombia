import React from 'react';

const GalleryMetabox = React.createClass({
	getInitialState(){
		return {
			images: [],
			excerpts: []
		}
	},

		getDefaultProps() {
		return {
			images: [],
			excerpts: []
		}
	},

	componentDidMount() {
		this.setState({...this.state, ...this.props});
	},

	handleChange(ind, type, e) {
		let {images, excerpts} = this.state;
		
		if(type == 'image') {
			images[ind] = e.currentTarget.value;
		}

		if(type == 'excerpt') {
			excerpts[ind] = e.currentTarget.value;
		}

		this.setState({images, excerpts});
	},

	handleAdd(e) {
		e.preventDefault();
		let images = this.state.images.concat(['']);
		let excerpts = this.state.excerpts.concat(['']);
		this.setState({images, excerpts});
	},

	renderInputs(i = 0) {
		return (
			<p>
			<input 
					type="text" 
					type="images[]" 
					onChange={this.handleChange.bind(null, i, 'image')} 
					value={ this.state.images[i] } 
				/>

				<input 
					type="text" 
					type="excerpts[]" 
					onChange={this.handleChange.bind(null, i, 'excerpt')} 
					value={this.state.excerpts[i]} 
				/>

				<button onClick={this.handleRemove.bind(null, i)}>Remove</button>
			</p>
		)
	},

	render() {
		return (
			<form>
			{ this.state.images.map((image, i) => this.renderInputs(i) ) }
			<button onClick={this.handleAdd} className="button">Add</button>
			</form>
		)
	}
});

export default GalleryMetabox;