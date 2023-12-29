import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import Textarea from "../../components/textarea/Textarea";
import Spinner from "../../components/spinner/Spinner";
import "./Posts.css";

interface Post {
  id: number;
  title: string;
  body: string;
}

function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostBody, setNewPostBody] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [displayLimit, setDisplayLimit] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3001/posts");
        const data = await response.json();
        setPosts(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [posts, searchTerm]);

  const handleAddPost = useCallback(() => {
    if (newPostTitle.trim() !== "" && newPostBody.trim() !== "") {
      const newPost = {
        id: posts.length + 1,
        title: newPostTitle,
        body: newPostBody,
      };
      setPosts([...posts, newPost]);
      setNewPostTitle("");
      setNewPostBody("");
    }
  }, [newPostTitle, newPostBody, posts]);

  return (
    <div className="posts-container">
      <h1 className="posts-title">Posts</h1>
      <div className="add-post-container">
        <Input
          type="text"
          placeholder="Enter post title..."
          value={newPostTitle}
          onChange={(e) => setNewPostTitle(e.target.value)}
          className="custom-input"
        />
        <Textarea
          label="Post Body:"
          value={newPostBody}
          onChange={(e) => setNewPostBody(e.target.value)}
          placeholder="Enter post body..."
          className="custom-textarea"
        />
        <Button onClick={handleAddPost} className="custom-button">
          Add Post
        </Button>
      </div>
      <div className="search-container">
        <Input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="custom-input"
        />
      </div>
      <div className="posts-list-container" ref={containerRef}>
        {isLoading ? (
          <Spinner />
        ) : (
          <ul className="posts-list">
            {filteredPosts.slice(0, displayLimit).map((post) => (
              <li key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Posts;
