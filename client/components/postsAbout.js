import React from "react";
import request from "axios";
import qs from "qs";
const endpoint = "/wp-admin/admin-ajax.php";
const cleanEmpty = arrArg => 
  arrArg.filter(item => item.length > 0);

class PostsAbout extends React.Component {
  state = {
    posts: [],
    loading: false
  };

  componentWillReceiveProps(props) {
    this.fetchPosts(props);
  }

  componentDidMount() {
    this.fetchPosts(this.props);
  }

  fetchPosts = props => {
    let data = qs.stringify({
      action: "get_posts",
      post_perpage: 4,
      post_category: props.category
    });
    this.setState({ loading: true });

    request
      .post(endpoint, data)
      .then(res => {
        this.setState({ loading: false, posts: res.data ? res.data : [] });
      })
      .catch(err => console.error(err));
  };

  render() {
    const { posts } = this.state;
    return (
      <div
        style={
          this.state.loading
            ? { transition: "300 ms", height: 0 }
            : { transition: "300 ms", height: 'auto' }
        }
      >
        {posts.map((post, i) => {
          return (
            <div key={i} className="col-12 col-3-l">
              <a href={post.post_permalink} style={{ background: "#fff" }}>
                <img src={cleanEmpty(post.post_image)} alt="" style={{ width: "100%" }} />
              </a>
              <div
                className="post-about__title"
                style={{
                  background: "#fff",
                  padding: "20px",
                  marginBottom: "20px"
                }}
              >
                <h5>
                  <a style={{ color: "#324049" }} href={post.post_permalink}>
                    {post.post_title}
                  </a>
                </h5>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default PostsAbout;
