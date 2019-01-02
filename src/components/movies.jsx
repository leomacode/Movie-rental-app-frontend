import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services /movieService";
import Pagination from "./common/pagination";
import { Link } from "react-router-dom";
import { paginate } from "../utils/paginate";
import { toast } from "react-toastify";
import { getGenres } from "../services /genreService";
import GroupList from "./common/groupList";
import MovieTable from "./movieTable";
import SearchBar from "./searchBar";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentGenre: null,
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: "title", order: "asc" },
    searchValue: ""
  };

  async componentDidMount() {
    const { data: genres } = await getGenres();
    const { data: movies } = await getMovies();
    this.setState({ movies, genres });
  }

  handleDelete = async movieId => {
    const originalMovies = this.state.movies;

    this.setState({
      movies: originalMovies.filter(movie => movie._id !== movieId)
    });

    try {
      await deleteMovie(movieId);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This movie has been deleted");
      this.setState({ movies: originalMovies });
    }
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handeleSelectedGenre = genre => {
    this.setState({
      currentGenre: genre.name,
      currentPage: 1,
      searchValue: ""
    });
  };

  handleAllGenres = () => {
    this.setState({ currentGenre: "all", searchValue: "" });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn: sortColumn });
  };

  handleSearchChange = query => {
    this.setState({ currentGenre: null, searchValue: query, currentPage: 1 });
  };

  handleSearchValue = (searchValue, allMovies) => {
    return searchValue
      ? allMovies.filter(movie => {
          let movieTitle = movie.title.toLowerCase();
          let value = searchValue.toLowerCase();
          return movieTitle.includes(value);
        })
      : allMovies;
  };
  getPageData = () => {
    const {
      currentPage,
      pageSize,
      movies: allMovies,
      currentGenre,
      sortColumn,
      searchValue
    } = this.state;

    let filtered =
      currentGenre === "all"
        ? allMovies
        : allMovies.filter(movie => movie.genre.name === currentGenre);

    if (!currentGenre)
      filtered = this.handleSearchValue(searchValue, allMovies);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { data: movies, totalCount: filtered.length };
  };

  handleNewMovies = () => {
    this.props.history.push("/movies/new");
  };

  displayMovies = () => {
    const { length: count } = this.state.movies;
    const { currentPage, pageSize } = this.state;

    const { data: movies, totalCount } = this.getPageData();
    const { user } = this.props;
    if (count > 0)
      return (
        <div>
          <div className="row">
            <div className="col-3">
              <GroupList
                currentGenre={this.state.currentGenre}
                onAllGenres={this.handleAllGenres}
                onSelectedGenre={this.handeleSelectedGenre}
                genres={this.state.genres}
              />
            </div>
            <div className="col">
              {user && (
                <Link
                  to="/movies/new"
                  onClick={this.handleNewMovies}
                  className="btn btn-primary mb-3"
                >
                  New Movie
                </Link>
              )}
              <p>Showing {totalCount} movies in the database</p>
              <SearchBar
                onChange={this.handleSearchChange}
                inputValue={this.state.searchValue}
              />
              <MovieTable
                movies={movies}
                onLike={this.handleLike}
                onDelete={this.handleDelete}
                onSort={this.handleSort}
                sortColumn={this.state.sortColumn}
              />
              <Pagination
                pageSize={pageSize}
                itemsCount={totalCount}
                onPageChange={this.handlePageChange}
                currentPage={currentPage}
              />
            </div>
          </div>
        </div>
      );

    return <p>There are no movies in the database</p>;
  };

  render() {
    return <React.Fragment>{this.displayMovies()}</React.Fragment>;
  }
}

export default Movies;
