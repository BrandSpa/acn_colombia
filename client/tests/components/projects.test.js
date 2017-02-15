import React from "react";
import { shallow, mount } from "enzyme";
import Projects from "../../components/projects";
import ProjectsIcons from "../../components/projects_icons";

describe('component projects', () => {
	it('should change num', () => {
		let mock = jest.fn();
		let wrapper = shallow(<ProjectsIcons onChange={mock} />);
		wrapper.find('a').at(0).simulate('click', {preventDefault: () => {}});
		expect(mock).toHaveBeenCalledWith(1);
	})

	it('should change background', () => {
		document.body.innerHTML = `<ul class="projects__icons"><li></li></ul> <div class="projects__arrow"></div>`;
		let wrapper = mount(<Projects />);
		
		wrapper.instance().changeContent(2);
		expect(wrapper.state()).toBe('#00355f');
	})

})
