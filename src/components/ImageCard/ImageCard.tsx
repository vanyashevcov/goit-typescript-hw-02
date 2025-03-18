import React from "react";
import s from "./ImageCard.module.css";

interface Image {
  urls: {
    small: string,
    regular: string,
  };
  alt_description: string;
  description: string;
}

interface ImageCardProps {
  image: Image;
  openModal: (src: string, alt: string, description: string) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({
  image: {
    urls: { small, regular },
    alt_description,
    description,
  },
  openModal,
}) => {
  return (
    <div>
      <img
        className={s.img}
        src={small}
        alt={alt_description}
        onClick={() => openModal(regular, alt_description, description)}
      />
    </div>
  );
};

export default ImageCard;
