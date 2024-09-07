import { useAuth } from '@/hooks/useAuth';
import { db } from '@/Lib/firebase-config';
import { Todo } from '@/types/todo';
import {
  query,
  collection,
  where,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { title } from 'process';
import { useState, useCallback, useEffect } from 'react';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentTodoUpdate, setCurrentTodoUpdate] = useState<Todo | null>(null);
  const [isTodoLoading, setIsTodoLoading] = useState(false);

  const { currentUser } = useAuth();

  const handleEditTodo = (todo: Todo) => {
    setCurrentTodoUpdate(todo);
  };

  const handleCloseTodoModal = useCallback(() => {
    setCurrentTodoUpdate(null);
  }, []);

  useEffect(() => {
    const loadTodos = async () => {
      setIsTodoLoading(true);
      if (currentUser) {
        const todosQuery = query(
          collection(db, 'todo'),
          where('userId', '==', currentUser.uid),
        );

        onSnapshot(todosQuery, (snapshot) => {
          const todosArray: Todo[] = [];
          snapshot.forEach((doc) => {
            todosArray.push({
              id: doc.id,
              title: doc.data().title,
              description: doc.data().description,
              finished: doc.data().finished,
              userId: doc.data().userId,
            });
          });
          setTodos(todosArray);
          setIsTodoLoading(false);
        });
      }
    };
    loadTodos();
  }, [currentUser]);

  const handleToggleTodoStatus = async (
    todoId: string,
    isTodoFinished: boolean,
  ) => {
    const updatedPost = doc(db, 'todo', todoId);

    await updateDoc(updatedPost, { finished: !isTodoFinished })
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteTodo = async (id: string) => {
    const deletedPost = doc(db, 'todo', id);
    await deleteDoc(deletedPost)
      .then(() => {})
      .catch((error) => {});
  };

  return {
    todos,
    currentTodoUpdate,
    isTodoLoading,
    handleToggleTodoStatus,
    handleDeleteTodo,
    handleEditTodo,
    handleCloseTodoModal,
  };
};
