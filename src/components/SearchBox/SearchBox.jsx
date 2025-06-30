import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "../../redux/filters/slice";
import { selectFilter } from "../../redux/contacts/selectors";
import s from "./SearchBox.module.css";

const SearchBox = () => {
  const value = useSelector(selectFilter);
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    dispatch(changeFilter(e.target.value));
  };

  return (
    <div className={s.searchContainer}>
      <h3 className={s.searchTitle}>Find contacts by name</h3>
      <input
        className={s.searchInput}
        value={value}
        onChange={handleSearch}
        placeholder="Enter contact name"
      />
    </div>
  );
};

export default SearchBox;
