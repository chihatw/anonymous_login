import { dbAdmin } from "@/firebase/admin";
import { DocumentData } from "firebase-admin/firestore";

const COLLECTION = "todos";
export const getTodosAdmin = async () => {
  const snapshot = await dbAdmin.collection(COLLECTION).get();
  const todos: Todo[] = [];
  snapshot.forEach((doc) => {
    const todo = buildTodo(doc);
    todos.push(todo);
  });
  return todos;
};

export const addTodo = async (todo: Todo) => {
  await dbAdmin.collection(COLLECTION).doc(todo.id).set(todo);
};

export const removeTodo = async (id: string) => {
  await dbAdmin.collection(COLLECTION).doc(id).delete();
};

const buildTodo = (doc: DocumentData) => {
  const { title, uid } = doc.data();
  const todo: Todo = { id: doc.id, title, uid };
  return todo;
};
