import React, { useState, useEffect } from "react";
import Button from "../../components/button/Button";
import TodoTextarea from "./components/todoTextarea/TodoTextarea";
import axios from "axios";
import "./Todos.css";
import Input from "../../components/input/Input";
import Spinner from "../../components/spinner/Spinner";
import { toast } from "sonner";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

function Todos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoText, setTodoText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedText, setEditedText] = useState("");

  useEffect(() => {
    async function fetchTodos() {
      try {
        const response = await axios.get("http://localhost:3001/todos");
        setTodos(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching todos:", error);
        setIsLoading(false);
      }
    }

    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    if (todoText.trim() !== "") {
      try {
        const response = await axios.post("http://localhost:3001/todos", {
          title: todoText,
          completed: false,
        });
        setTodos([...todos, response.data]);
        setTodoText("");
        toast.success("Successfully added todo");
      } catch (error) {
        toast.error("Error adding todo");
      }
    }
  };

  const handleEditTodo = (index: number) => {
    setEditIndex(index);
    setEditedText(todos[index].title);
  };

  const handleUpdateTodo = async () => {
    if (editedText.trim() !== "" && editIndex !== null) {
      try {
        const todoToUpdate = todos[editIndex];
        await axios.patch(`http://localhost:3001/todos/${todoToUpdate.id}`, {
          title: editedText,
        });
        const updatedTodos = todos.map((todo) =>
          todo.id === todoToUpdate.id ? { ...todo, title: editedText } : todo
        );
        setTodos(updatedTodos);
        setEditIndex(null);
        setEditedText("");
        toast.success("Todo updated successfully");
      } catch (error) {
        toast.error("Error updating Todo");
      }
    }
  };
  const handleDeleteTodo = async (index: number) => {
    try {
      const todoToDelete = todos[index];
      await axios.delete(`http://localhost:3001/todos/${todoToDelete.id}`);
      setTodos(todos.filter((_, idx) => idx !== index));
      toast.success("Successfully deleted Todo");
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleCompleteToggle = async (index: number) => {
    try {
      const todoToToggle = todos[index];
      await axios.patch(`http://localhost:3001/todos/${todoToToggle.id}`, {
        completed: !todoToToggle.completed,
      });

      const updatedTodos = todos.map((todo) =>
        todo.id === todoToToggle.id
          ? { ...todo, completed: !todo.completed }
          : todo
      );

      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error toggling completion:", error);
    }
  };

  return (
    <div className="todos-container">
      <h1 className="todos-title">Todos</h1>
      <TodoTextarea
        label="Add Todo:"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        placeholder="Enter a new todo..."
      />
      <Button onClick={handleAddTodo}>Add</Button>
      <div className="todos-list-container">
        <ul className="todos-list">
          {isLoading ? (
            <div className="loading-indicator">
              <Spinner />
            </div>
          ) : (
            todos.map((todo, index) => (
              <li
                key={todo.id}
                className={`todo-item ${todo.completed ? "completed" : ""}`}
              >
                {editIndex === index ? (
                  <div className="edit-todo-container">
                    <Input
                      type="text"
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                      className="edit-input"
                    />
                    <Button onClick={handleUpdateTodo}>Update</Button>
                  </div>
                ) : (
                  <div
                    className={`todo-content ${
                      todo.completed ? "completed" : ""
                    }`}
                  >
                    <span>{todo.title}</span>
                    <div className="todo-buttons">
                      <Button onClick={() => handleCompleteToggle(index)}>
                        {todo.completed ? "Uncomplete" : "Complete"}
                      </Button>
                      <Button onClick={() => handleEditTodo(index)}>
                        Edit
                      </Button>
                      <Button onClick={() => handleDeleteTodo(index)}>
                        Delete
                      </Button>
                    </div>
                  </div>
                )}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default Todos;
