import React from "react";
import { shallow, mount } from "enzyme";
import sinon from 'sinon';
import HeaderSlider from "../../components/header_slider";

describe("header slider component", () => {
	it('should render as expected', () => {
		let wrapper = shallow(<HeaderSlider />);
		expect(wrapper.getNodes()).toMatchSnapshot();
	})

	it('should change slide to next', () => {
		let wrapper = shallow(<HeaderSlider slides={[{title: 'acn pope'}, {title: 'acn pope'}, {title: 'acn pope'}]} />);
		wrapper.instance().nextSlide();
		wrapper.instance().nextSlide();
		expect(wrapper.state()).toEqual({currentSlide: 2, left: '-200%'});
	})

	it('should change slide to prev', () => {
		let wrapper = shallow(<HeaderSlider slides={[{title: 'acn pope'}, {title: 'acn pope'}, {title: 'acn pope'}]} />);
		wrapper.instance().nextSlide();
		wrapper.instance().nextSlide();
		wrapper.instance().prevSlide();
		expect(wrapper.state()).toEqual({currentSlide: 1, left: '-100%'});
	})

	it('should show video modal', () => {
			let wrapper = mount(<HeaderSlider slides={[{title: 'acn pope', 'isvideo': true}]} />);
			wrapper.find('.slider__slide').simulate('click');
			expect( wrapper.find('.modal--show').length).toEqual(1);
	})

});
