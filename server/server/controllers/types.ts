export interface User {
  name: string;
  password: string;
  profession: string;
  id: number;
}

export interface UserList {
  users: User[];
}

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export interface Post {
  id: number;
  title: string;
  body: string;
}

export interface Comment {
  id: number;
  name: string;
}