import React from 'react';
import Projects from './projects';
import PostsAbout from './postsAbout';
const colors = {
  1: '#b91325',
  2: '#00355f',
  3: '#6e5785',
  4: '#95a0ad',
  5: '#156734',
  6: '#689038',
  7: '#7a2d04',
  8: '#b27009',
  9: '#E4A70F'
};

const ProjectsAbout = React.createClass({
	getInitialState() {
		return {
			section: 0
		}
	},

	handleSection(i) {
		let section = (i - 1);
		this.setState({section});
	},

	componentWillUpdate(nextProps, nextState) {
	
	},

	render() {
		const { section } = this.state;

		return (
			<div>
				<Projects 
					contents={this.props.projects.map(project => {
						project['text'] = project.content;
						return project;
					})} 
					donate={this.props.donate} 
					changeSection={this.handleSection} 
				/>
				<div className="projects-about-num">
					<div
						className="projects-about-num__num" 
						style={{
							width: '50%', 
							textAlign: 'right',
							paddingTop: '13px',
							float: 'left', 
							height: '100px', 
							background: '#fff',
							color: colors[this.state.section + 1]
						}}
					>
						<h2>{this.props.projects[section] ? this.props.projects[section].number : ''}</h2>
					</div>

					<div
						className="projects-about-num__text" 
						style={{ 
							textAlign: 'left',
							width: '50%', 
							float: 'left', 
							height: '100px', 
							padding: '33px', 
							textAlign: 'center', 
							fontSize: '1.5em',
							color: '#A0A0A0',
						}}
					>
						{this.props.projects[section] ? this.props.projects[section].number_text : ''}
					</div>
				</div>

				<div style={{background: '#F8F6F8', padding: '80px 0', float: 'left', width: '100%'}}>
					<div className="l-wrap">
						<h3 style={{
							color: '#324049', 
							textTransform: 'uppercase', 
							marginBottom: '20px',
							marginLeft: '15px',
							fontWeight: 'normal'
						}}
						>{this.props.texts.stories}</h3>

						<PostsAbout 
							category={this.props.projects[section] ? this.props.projects[section].post_category : ''} 
						/>
					</div>
				</div>

			</div>
		)
	}
});

export default ProjectsAbout;