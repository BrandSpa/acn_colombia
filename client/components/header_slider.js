import React from "react";
import Slide from './header_slide';

const headerSlider = React.createClass({
  getInitialState() {
    return {
      currentSlide: 0,
      left: '0'
    }
  },

  getDefaultProps() {
    return {
      slides: []
    }
  },

  componentDidMount() {
    setInterval(() => {
      this.nextSlide();
    }, 2000);
  },

  nextSlide() {
 	  let total = this.props.slides.length - 1;
    let left = this.state.currentSlide < total ? this.state.currentSlide + 1 : 0;
    this.setState({left: '-' + (left * 100) + '%', currentSlide: left});
 },

  render() {
    const { slides } = this.props;
    let viewportWidth = `${100 * slides.length}%`;
    let slideWidth = `${(100 / slides.length)}%`;
    let sliderHeight = '820px'; 
    
    return (
      <div className="slider">
        <div className="slider__viewport" style={{width: viewportWidth, left: this.state.left, height: sliderHeight}}>
          {slides.map((slide, i) => {
            slide = {...slide, width: slideWidth, height: sliderHeight};
            return <Slide key={i} {...slide} />  
          })}
        </div>
      </div>
    );
  }
});

export default headerSlider;
