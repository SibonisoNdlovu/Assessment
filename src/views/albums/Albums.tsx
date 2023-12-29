import React, { useState, useEffect } from "react";
import Button from "../../components/button/Button";
import "./Albums.css";
import axios from "axios";
import Spinner from "../../components/spinner/Spinner";
import { toast } from "sonner";

function Albums() {
  const [albums, setAlbums] = useState<any[]>([]);
  const [albumTitle, setAlbumTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAlbums() {
      try {
        const response = await axios.get("http://localhost:3001/albums");
        setAlbums(response.data);
        setIsLoading(false);
        toast.success("Data fetched successfully");
      } catch (error) {
        console.error("Error fetching albums:", error);
        setIsLoading(false);
      }
    }

    fetchAlbums();
  }, []);

  const handleAddAlbum = async () => {
    if (albumTitle.trim() !== "") {
      try {
        const response = await axios.post("http://localhost:3001/albums", {
          title: albumTitle,
        });
        const newAlbum = response.data;
        setAlbums((prevAlbums) => [...prevAlbums, newAlbum]);
        setAlbumTitle("");
      } catch (error) {
        console.error("Error adding album:", error);
      }
    }
  };

  const handleDeleteAlbum = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3001/albums/${id}`);
      const updatedAlbums = albums.filter((album) => album.id !== id);
      setAlbums(updatedAlbums);
    } catch (error) {
      console.error("Error deleting album:", error);
    }
  };

  return (
    <div className="albums-container">
      <h1 className="albums-title">Albums</h1>
      <div className="input-button-container">
        <input
          type="text"
          className="custom-input"
          placeholder="Enter an album title..."
          value={albumTitle}
          onChange={(e) => setAlbumTitle(e.target.value)}
        />
        <Button onClick={handleAddAlbum} className="custom-button">
          Add
        </Button>
      </div>
      {isLoading ? (
        <div className="loading-indicator">
          <Spinner />
        </div>
      ) : (
        <div className="albums-list-container">
          <ul className="albums-list">
            {albums.map((album) => (
              <li key={album.id} className="album-item">
                <div className="album-title">{album.title}</div>
                <Button
                  onClick={() => handleDeleteAlbum(album.id)}
                  className="delete-button"
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Albums;
