import React from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Routes,
} from "react-router-dom";
import "./App.css";
import Albums from "./views/albums/Albums";
import Comments from "./views/comments/Comments";
import Photos from "./views/photos/Photos";
import Posts from "./views/posts/Posts";
import Todos from "./views/todos/Todos";

function App() {
  return (
    <div className="app">
      <Router>
        <nav className="navbar">
          <ul className="nav-list">
            <li className="nav-item">
              <NavLink to="/posts" className="active">
                Posts
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/comments" className="active">
                Comments
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/albums" className="active">
                Albums
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/photos" className="active">
                Photos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/todos" className="active">
                Todos
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="content">
          <Routes>
            <Route path="/posts" element={<Posts />} />
            <Route path="/comments" element={<Comments />} />
            <Route path="/albums" element={<Albums />} />
            <Route path="/photos" element={<Photos />} />
            <Route path="/todos" element={<Todos />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
