import React, { useState, useEffect, useMemo, useCallback } from "react";
import Button from "../../components/button/Button";
import Textarea from "../../components/textarea/Textarea";
import axios from "axios";
import "./Comments.css";
import Spinner from "../../components/spinner/Spinner";
import Input from "../../components/input/Input";

interface Comment {
  id: number;
  name: string;
}

function Comments() {
  const [allComments, setAllComments] = useState<Comment[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await axios.get("http://localhost:3001/comments");
        const commentData = response.data;
        setAllComments(commentData);
        setComments(commentData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setIsLoading(false);
      }
    }

    fetchComments();
  }, []);

  const handleAddComment = useCallback(async () => {
    if (commentText.trim() !== "") {
      try {
        const response = await axios.post("http://localhost:3001/comments", {
          name: commentText,
        });

        const newComment = response.data;
        const updatedComments = [...comments, newComment];
        setAllComments(updatedComments);
        setComments(updatedComments);
        setCommentText("");
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  }, [commentText, comments]);

  const handleDeleteComment = async (index: number) => {
    const commentIdToDelete = allComments[index].id;

    try {
      await axios.delete(`http://localhost:3001/comments/${commentIdToDelete}`);
      const updatedAllComments = allComments.filter((_, i) => i !== index);
      setAllComments(updatedAllComments);

      const filtered = updatedAllComments.filter((comment) =>
        comment.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setComments(filtered);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleSearch = (searchValue: string) => {
    setSearchTerm(searchValue);
  };

  const filteredComments = useMemo(() => {
    if (searchTerm.trim() === "") {
      return comments;
    }

    return comments.filter((comment) => {
      return comment.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [comments, searchTerm]);

  return (
    <div className="comments-container">
      <h1 className="comments-title">User Comments</h1>
      <Textarea
        label="Add a Comment:"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Type your comment here..."
        className="custom-textarea"
      />
      <Button onClick={handleAddComment} className="custom-button">
        Add Comment
      </Button>
      <div className="search-container">
        <Input
          type="text"
          placeholder="Search comments..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="custom-input"
        />
      </div>
      {isLoading ? (
        <div className="loading-indicator">
          <Spinner />
        </div>
      ) : (
        <div className="comments-list-container">
          <ul className="comments-list">
            {filteredComments.map((comment, index) => (
              <li key={index} className="comment-item">
                {comment.name}
                <Button
                  onClick={() => handleDeleteComment(index)}
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

export default Comments;
