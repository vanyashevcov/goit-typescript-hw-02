import React, { FormEvent } from "react";
import s from "./SearchBar.module.css";
import { CiSearch } from "react-icons/ci";
import toast from "react-hot-toast";

interface SearchBarProps {
  onSearch: (search: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const form = evt.target as HTMLFormElement;
    const search = (form.elements.namedItem('search') as HTMLInputElement).value;

    if (search.trim() === "") {
      toast.error("Enter text for finding images");
      return;
    }

    onSearch(search.trim());
    form.reset();
  };

  return (
    <header className={s.header}>
      <form onSubmit={handleSubmit} className={s.form}>
        <img
          className={s.logo}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Unsplash_wordmark_logo.svg/640px-Unsplash_wordmark_logo.svg.png"
          alt="Unsplash logo"
          width="200"
        />
        <input
          name="search"
          className={s.search_imput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button className={s.search_btn} type="submit">
          <CiSearch size={24} />
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
