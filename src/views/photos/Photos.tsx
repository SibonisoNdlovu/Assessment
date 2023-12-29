/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Photos.css";
import axios from "axios";
import Spinner from "../../components/spinner/Spinner";
import Button from "../../components/button/Button";

function Photos() {
  const [photos, setPhotos] = useState<any[]>([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPhotos() {
      try {
        const response = await axios.get("http://localhost:3001/photos");
        setPhotos(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching photos:", error);
        setIsLoading(false);
      }
    }

    fetchPhotos();
  }, []);

  return (
    <div className="photos-container">
      <h1 className="photos-title">Photos</h1>
      {isLoading ? (
        <div className="loading-indicator">
          <Spinner />
        </div>
      ) : (
        <div className="carousel-container">
          <Carousel
            showArrows={false}
            showThumbs={false}
            selectedItem={currentPhotoIndex}
          >
            {photos.map((photo, index) => (
              <div key={photo.id} className="carousel-item">
                <img
                  src={photo.url}
                  className="carousel-image"
                  alt={photo.title}
                />
                <p className="carousel-caption">{photo.title}</p>
              </div>
            ))}
          </Carousel>
          <Button
            style={{ marginRight: "10px" }}
            onClick={() =>
              setCurrentPhotoIndex(
                currentPhotoIndex === 0
                  ? photos.length - 1
                  : currentPhotoIndex - 1
              )
            }
          >
            Previous
          </Button>
          <Button
            onClick={() =>
              setCurrentPhotoIndex(
                currentPhotoIndex === photos.length - 1
                  ? 0
                  : currentPhotoIndex + 1
              )
            }
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}

export default Photos;
