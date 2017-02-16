import React from 'react';
import VideoModal from './video_modal';

const headerSlide = React.createClass({
	handleLink(e) {
		e.preventDefault();
		if(this.props.isVideo) return this.refs.modal.show();
		window.url = this.props.url;
	},

	render() {
		const {imgUrl, title, subtitle, url, width, height} = this.props;
		let bg = `url(${imgUrl})`;
		let style = {'backgroundImage': bg, backgroundSize: 'cover','cursor': 'pointer', width, height};

		return (
			<div>
				{this.props.isVideo ? <VideoModal ref="modal" url={this.props.url} /> : ''}			
			<div className="slider__slide" style={style} onClick={this.handleLink}>
					<h2>{title}</h2>
					<h3>{subtitle}</h3>
			</div>
		</div>
		)
	}
});

export default headerSlide;