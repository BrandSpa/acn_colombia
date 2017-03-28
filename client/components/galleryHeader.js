import React from "react";
import Radium, { StyleRoot } from "radium";

const GalleryHeader = React.createClass({
  getInitialState() {
    return { 
			section: 0, 
			imageStyle: {
				maxWidth: "100%", 
				display: 'block', 
				margin: '0 auto'
			} 
		};
  },

  getDefaultProps() {
    return { images: [], excerpts: [] };
  },

  componentDidMount() {
		//side effect, but necessary
    let nav = document.querySelector(".nav");
    nav.style.background = "rgb(34, 34, 34)";
  },

  changeSection(type, e) {
    if (e) e.preventDefault();
    let section = this.state.section;
    if (type == "next")
      section = this.state.section < this.props.images.length - 1
        ? this.state.section + 1
        : 0;
    if (type == "prev")
      section = this.state.section > 0 ? this.state.section - 1 : 0;
    this.setState({ section });
  },

	getImage(e) {
		let imageStyle;
		if(e.target.height > e.target.width) {
			imageStyle = {...this.state.imageStyle, maxWidth: '45%'};
			this.setState({imageStyle});
		} else {
			imageStyle = {...this.state.imageStyle, maxWidth: '100%'};
			this.setState({imageStyle});
		}
	},

  render() {
    const { images, excerpts } = this.props;
    const h = window.innerHeight - 100;
    const w = window.innerHeight;

    const btnsStyle = {
      position: "absolute",
      bottom: "40px",
      right: "40px",
      "@media(max-width: 767px)": { bottom: "10px", right: "10px" },
    };

    const btnStyle = {
      border: "1px solid #fff",
      background: "transparent",
      width: "50px",
      height: "50px",
      borderRadius: "0",
      padding: "0",
    };

    const linkLeft = {
      position: "absolute",
      height: "100%",
      top: "0",
      bottom: "auto",
      left: 0,
      width: "50%",
    };

    const linkRight = { ...linkLeft, left: "auto", right: 0 };

    const mainStyle = {
      height: `${h}px`,
      background: "#222",
      position: "relative",
      overflow: "hidden",
      "@media(max-width: 767px)": { margin: "0 -20px" },
    };

    const viewportStyle = {
      height: `${h}px`,
    };

    const excerptStyle = {
      color: "#fff",
      marginTop: "20px",
      display: "block",
      textShadow: "2px 2px 2px #222",
    };

		const shareBtn = {
			color: '#fff',
			width: '30px',
			height: '30px',
			borderRadius: '30px',
			textAlign: 'center',
			display: 'block',
			border: '1px solid #fff',
			padding: '5px',
			':hover': {
				background: 'rgba(255, 255, 255, .2)'
			}
		};

    return (
      <StyleRoot>
        <div style={mainStyle} ref={gallery => this.gallery = gallery}>
          <div style={viewportStyle}>
            <div style={{ maxWidth: w, margin: '0 auto' }}>
              <h5 style={{ color: "#fff", marginBottom: "20px" }}>
                {this.props.texts.gallery} <i className="ion-camera" />
              </h5>
              <div
                className="gallery-header__item"
                style={{ position: "relative" }}
              >
                <img
									onLoad={this.getImage}
                  src={images[this.state.section]}
                  style={this.state.imageStyle}
                />
                <span style={excerptStyle}>{excerpts[this.state.section]}</span>
								<ul style={{listStyle: 'none', padding: '0'}}>
									<li style={{display: 'inline-block', marginLeft: '5px'}}><a style={shareBtn} href="#"><i className="ion-social-facebook"></i></a></li>
									<li style={{display: 'inline-block', marginLeft: '5px'}}><a style={shareBtn} href="#"><i className="ion-social-twitter"></i></a></li>
									<li style={{display: 'inline-block', marginLeft: '5px'}}><a style={shareBtn} href="#"><i className="ion-social-linkedin-outline"></i></a></li>
								</ul>
                {/*<a
                  href="#"
                  onClick={this.changeSection.bind(null, "prev")}
                  style={linkLeft}
                />
                <a
                  href="#"
                  onClick={this.changeSection.bind(null, "next")}
                  style={linkRight}
                />*/}
              </div>
            </div>
          </div>
          <div style={btnsStyle}>
            <span style={{ color: "#fff", paddingRight: "10px" }}>
              {images.length} {this.props.texts.of} {this.state.section + 1}
            </span>
            <button
              onClick={this.changeSection.bind(null, "prev")}
              style={btnStyle}
            >
              <i className="ion-chevron-left" />
            </button>
            <button
              onClick={this.changeSection.bind(null, "next")}
              style={btnStyle}
            >
              <i className="ion-chevron-right" />
            </button>
          </div>
        </div>
      </StyleRoot>
    );
  },
});

export default GalleryHeader;
