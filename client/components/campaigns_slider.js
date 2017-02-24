import React from 'react';
import sectionVideo from 'section_video';

const CampaignsSlider = React.createClass({
	getInitialState() {
    return {
      currentSlide: 0,
      left: '0'
    }
  },

	componentDidMount() {
    this.interval = setInterval(() => {
      this.nextSlide(false);
    }, 2000);
  },

	nextSlide(clear = true) {
    if(clear) clearInterval(this.interval);
 	  let total = this.props.slides.length - 1;
    let left = this.state.currentSlide < total ? this.state.currentSlide + 1 : 0;
    this.setState({left: '-' + (left * 100) + '%', currentSlide: left});
 },

  prevSlide() {
    clearInterval(this.interval);
    let total = this.props.slides.length - 1;
    let left = this.state.currentSlide > 0 ? this.state.currentSlide - 1 : 0;
    this.setState({left: '-' + (left * 100) + '%', currentSlide: left});
  },

	render() {
		let viewportWidth = `${100 * slides.length}%`;
    let slideWidth = `${(100 / slides.length)}%`;
		let viewportStyle = {
      width: viewportWidth, 
      left: this.state.left, 
		};

		return (
			<div className="campaigns-slider">
			 	<div
          className="campaigns-slider__viewport" 
          style={viewportStyle}
				>

				</div>
			</div>
		)
	}
});