import React, { Component } from "react";

class SearchBar extends Component {
  render() {
    return (
      <input
        type="text"
        value={this.props.inputValue}
        onChange={e => this.props.onChange(e.currentTarget.value)}
        className="form-control mb-3"
        placeholder="Search..."
      />
    );
  }
}

export default SearchBar;
