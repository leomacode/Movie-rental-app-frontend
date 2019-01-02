import React, { Component } from "react";
import Like from "./common/like";
import Table from "./common/table";
import auth from "./../services /authService";
import { Link } from "react-router-dom";

class MovieTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "stock" },
    { path: "dailyRentalRate", label: "rate" },
    {
      key: "like",
      content: movie => <Like onLike={this.props.onLike} movie={movie} />
    }
  ];

  deleteColumn = {
    key: "delete",
    content: movie => (
      <button
        onClick={() => this.props.onDelete(movie._id)}
        className="btn btn-danger"
      >
        Delete
      </button>
    )
  };

  constructor() {
    super();
    if (auth.getAdmin()) this.columns.push(this.deleteColumn);
  }

  render() {
    const { movies, sortColumn, onSort } = this.props;
    return (
      <Table
        sortColumn={sortColumn}
        data={movies}
        onSort={onSort}
        columns={this.columns}
      />
    );
  }
}

export default MovieTable;
