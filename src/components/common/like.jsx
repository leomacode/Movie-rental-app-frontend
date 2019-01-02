import React, { Component } from "react";
class Like extends Component {
  getIcon() {
    let classes = "fa fa-heart";
    classes += this.props.movie.liked === true ? "" : "-o";
    return classes;
  }

  render() {
    return (
      <i
        onClick={() => this.props.onLike(this.props.movie)}
        style={{ cursor: "pointer" }}
        className={this.getIcon()}
        aria-hidden="true"
      />
    );
  }
}

export default Like;
