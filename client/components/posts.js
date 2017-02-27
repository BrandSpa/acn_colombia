import React from 'react';
import qs from 'qs';
import request from 'axios';
import Minigrid from 'minigrid';

const Posts = React.createClass({
	getInitialState() {
		return {
			posts: [],
			paged: 1,
			seeMore: true
		}
	},

	componentWillMount() {
		let data = qs.stringify({ action: "get_posts"});
		
    request
		.post("/wp-admin/admin-ajax.php", data)
    .then(res => {
      this.setState({ posts: res.data });
    })
    .catch(err => console.error(err));
	},

	componentDidUpdate: function() {
		if(this.state.posts && this.state.posts.length > 0){
    	this.initGrid();
    }
  },

	componentDidMount() {
		document.window.addEventListener('resize', (e) => {
			console.log('resize');
		});

		if(this.state.posts && this.state.posts.length > 0){
    	this.initGrid();
    }
	},

	initGrid() {
		let container = this.grid;
		var grid = new Minigrid({
			container,
			item: '.grid-item'
		});

		grid.mount();
	},

	// handleImageLoaded() {
	// 	if(this.iso) {
	// 		this.iso.layout();
	// 	}
	// },

	goToPosts() {
		window.location = this.props.url;
	},

	render() {
		const { posts } = this.state;
		let seeMoreStyle = {
			display: 'block', 
			margin: '30px auto', 
			background: 'transparent', 
			color: '#3C515F',
			borderColor: '#3C515F'
		};

		return (
			<div>
				<div ref={grid => this.grid = grid}>

					{posts.map((post, i) => {
						return (
							<div key={i} className="grid-item">
								<div className="grid-item__content">
									{post.post_image ? <img src={post.post_image} onLoad={this.handleImageLoaded} /> : ''}

									<div className="grid-item__content__texts">
										<h5><a href={post.post_permalink}>{post.post_title}</a></h5>
										<p>{ `${post.post_short}...` }</p>
									</div>
									
								</div>
							</div>
						)
					})}
				</div>
				
				<button 
					onClick={this.goToPosts} 
					style={this.state.seeMore ? seeMoreStyle : {display: 'none'} }
				>
					See more
				</button>
			</div>
		)
	}
});

export default Posts;