import React from "react";

const cleanEmpty = (arrArg) => {
  return arrArg.filter(item => {
    return item.length > 0;
  })
}

class Post extends React.Component {
  static defaultProps = {
    post: {
      post_title: ""
    }
  };

  handleImageLoaded = () => {
    this.props.onImageLoaded();
  };

  render() {
    const { post, type, read_more } = this.props;
    const imgUrl = cleanEmpty(post.post_image);
    const img = imgUrl.length > 0
      ? <img src={imgUrl} onLoad={this.handleImageLoaded} />
      : "";
    let title = post.post_title;
    if (window.innerWidth <= "767") {
      title = post.post_title.substring(0, 70) + "...";
    }

    return (
      <div
        className={type == "main" ? "grid-item grid-item--main" : "grid-item"}
      >
        <div
          className={
            type == "main"
              ? "grid-item__content grid-item--main__content"
              : "grid-item__content"
          }
        >
          <a href={post.post_permalink}>
            {img}
          </a>
          <div
            className={
              type == "main"
                ? "grid-item__content__texts grid-item--main__content__texts"
                : "grid-item__content__texts"
            }
            style={img == "" ? { width: "100%" } : {}}
          >
            <h5><a href={post.post_permalink}>{title}</a></h5>
            <p>{`${post.post_short}...`}</p>
            <a
              href={post.post_permalink}
              className="grid-item__content__texts__readmore"
            >
              {read_more}...
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Post;
