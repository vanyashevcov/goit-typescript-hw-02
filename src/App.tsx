import "./App.css";
import { useState, useEffect } from "react";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import SearchBar from "./components/SearchBar/SearchBar";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadModeBtn/LoadModeBtn";
import { ImageModal } from "./components/ImageModal/ImageModal";
import * as imagesService from "./services/api";

interface ApiImage {
  id: string;
  alt_description: string;
  urls: {
    regular: string;
    small?: string;
  };
  description: string | null;
}

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

interface FetchImagesResponse {
  results: ApiImage[];
  total_pages: number;
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
        const { results, total_pages }: FetchImagesResponse =
          await imagesService.fetchImages(query, page);

        if (!results.length) {
          setIsEmpty(true);
          return;
        }

        const mappedImages: Image[] = results.map((img) => ({
          id: img.id,
          alt_description: img.alt_description,
          urls: {
            small: img.urls.small || img.urls.regular,
            regular: img.urls.regular,
          },
          description: img.description,
        }));

        setImages((prev) => [...prev, ...mappedImages]);
        setIsVisible(page < total_pages);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError({ message: error.message });
        } else {
          setError({ message: "An unknown error occurred" });
        }
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [query, page]);

  const handleSetQuery = (newQuery: string): void => {
    setQuery(newQuery);
    setImages([]);
    setIsEmpty(false);
    setIsVisible(false);
    setPage(1);
    setError(null);
  };

  const onLoadMore = (): void => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (
    src: string,
    alt: string,
    description: string | null
  ): void => {
    setModalIsOpen(true);
    setModalSrc(src);
    setModalAlt(alt);
    setModalDescription(description || "");
  };

  const closeModal = (): void => {
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
          <ImageGallery
            images={images.map((img) => ({
              ...img,
              description: img.description || "",
            }))}
            openModal={openModal}
          />
        )}
        {isLoading && <Loader>Loading ...</Loader>}
        {isVisible && (
          <LoadMoreBtn onClick={onLoadMore} disabled={isLoading}>
            {isLoading ? "Loading..." : "Load more"}
          </LoadMoreBtn>
        )}
        {error && <ErrorMessage>Error - {error.message}</ErrorMessage>}
        {isEmpty && <ErrorMessage>No images found...</ErrorMessage>}
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
