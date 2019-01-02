import React from "react";

const GroupList = ({
  onSelectedGenre,
  onAllGenres,
  currentGenre,
  genres,
  valueProperty,
  textProperty
}) => {
  return (
    <ul className="list-group">
      <li
        onClick={onAllGenres}
        className={
          currentGenre === "all" ? "list-group-item active" : "list-group-item"
        }
      >
        All Genres
      </li>
      {genres.map(genre => (
        <li
          onClick={() => onSelectedGenre(genre)}
          key={genre[valueProperty]}
          className={
            genre[textProperty] === currentGenre
              ? "list-group-item active"
              : "list-group-item"
          }
        >
          {genre[textProperty]}
        </li>
      ))}
    </ul>
  );
};

GroupList.defaultProps = {
  valueProperty: "_id",
  textProperty: "name"
};
export default GroupList;
