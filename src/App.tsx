import "./App.css";
import { useState, useEffect } from "react";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import SearchBar from "./components/SearchBar/SearchBar";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadModeBtn/LoadModeBtn";
import { ImageModal } from "./components/ImageModal/ImageModal";
import * as imagesService from "./services/api";

interface Image {
  id: string;
  alt_description: string;
  urls: {
    small: string;
    regular: string;
  };
  description: string | null;
}

interface Error {
  message: string;
}

function App() {
  const [images, setImages] = useState<Image[]>([]); 
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(false); 
  const [isVisible, setIsVisible] = useState<boolean>(false); 
  const [error, setError] = useState<Error | null>(null); 
  const [query, setQuery] = useState<string>(""); 
  const [page, setPage] = useState<number>(1); 
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false); 
  const [modalSrc, setModalSrc] = useState<string>(""); 
  const [modalAlt, setModalAlt] = useState<string>(""); 
  const [modalDescription, setModalDescription] = useState<string>(""); 

  useEffect(() => {
    if (!query) return;
    const getData = async () => {
      try {
        setIsLoading(true);
        const { results, total_pages } = await imagesService.fetchImages(query, page);

        if (!results.length) {
          return setIsEmpty(true);
        }

        setImages((prev) => [...prev, ...results]); // використовуємо results замість newImages
        setIsVisible(page < total_pages);
      } catch (error: any) {
        setError({ message: error.message });
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [query, page]);

  const handleSetQuery = (newQuery: string) => {
    setQuery(newQuery);
    setImages([]); // очищаємо попередні зображення
    setIsEmpty(false);
    setIsVisible(false);
    setPage(1); // скидаємо сторінку на 1
    setError(null);
  };

  const onLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (src: string, alt: string, description: string) => {
    setModalIsOpen(true);
    setModalSrc(src);
    setModalAlt(alt);
    setModalDescription(description);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalSrc("");
    setModalAlt("");
    setModalDescription("");
  };

  return (
    <>
      {!modalIsOpen && <SearchBar onSearch={handleSetQuery} />}
      <div className="container">
        {images.length > 0 && (
          <ImageGallery images={images} openModal={openModal} />
        )}
        {isLoading && <Loader>Loading ...</Loader>}
        {isVisible && (
          <LoadMoreBtn onClick={onLoadMore} disabled={isLoading}>
            {isLoading ? "Loading..." : "Loading more"}
          </LoadMoreBtn>
        )}
        {error && <ErrorMessage>Error - {error.message}</ErrorMessage>}
        {isEmpty && <ErrorMessage>No images ...</ErrorMessage>}
        <ImageModal
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          src={modalSrc}
          alt={modalAlt}
          description={modalDescription}
        />
      </div>
    </>
  );
}

export default App;
