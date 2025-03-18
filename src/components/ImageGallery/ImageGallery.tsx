import React from "react";
import ImageCard from "../ImageCard/ImageCard";
import s from "./ImageGallery.module.css";

interface Image {
  id: string;
  urls: {
    small: string,
    regular: string,
  };
  alt_description: string;
  description: string;
}

interface ImageGalleryProps {
  images: Image[];
  openModal: (src: string, alt: string, description: string) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, openModal }) => {
  return (
    <ul className={s.list}>
      {images.map((item) => (
        <li key={item.id}>
          <ImageCard image={item} openModal={openModal} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
