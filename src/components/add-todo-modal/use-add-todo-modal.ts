import { useAuth } from '@/hooks/useAuth';
import { db } from '@/Lib/firebase-config';
import { AddTodoFormData, Todo } from '@/types/todo';
import { addTodoSchema } from '@/validations/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export const useAddTodoModal = (
  currentTodoUpdate: Todo | null,
  onCloseTodoModal: () => void,
) => {
  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
    setValue,
  } = useForm<AddTodoFormData>({
    resolver: zodResolver(addTodoSchema),
    defaultValues: {
      title: currentTodoUpdate?.title,
      description: currentTodoUpdate?.description,
    },
  });

  const [isAddTodoModalOpen, setIsAddTodoModalOpen] = useState(
    !!currentTodoUpdate?.id,
  );

  const { currentUser } = useAuth();

  useEffect(() => {
    setIsAddTodoModalOpen(!!currentTodoUpdate);
    if (currentTodoUpdate) {
      setValue('title', currentTodoUpdate?.title);
      setValue('description', currentTodoUpdate?.description);
    }
  }, [currentTodoUpdate, setValue]);

  const handleAddTodoClick = () => {
    setIsAddTodoModalOpen(true);
  };

  const handleCloseTodoModal = () => {
    setIsAddTodoModalOpen(false);
    onCloseTodoModal();
    reset();
  };

  const updateTodo = async (
    todoId: string,
    title: string,
    description: string,
  ) => {
    const updatedPost = doc(db, 'todo', todoId);

    await updateDoc(updatedPost, { title, description })
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };

  const addTodo = async (title: string, description: string) => {
    if (currentUser) {
      await addDoc(collection(db, 'todo'), {
        title,
        description,
        finished: false,
        userId: currentUser.uid,
      })
        .then(() => {})
        .catch((error) => {});
    }
  };

  const handleAddTodoFormSubmit = handleSubmit(
    async ({ title, description }) => {
      if (currentTodoUpdate) {
        await updateTodo(currentTodoUpdate.id, title, description);
        handleCloseTodoModal();
        return;
      }

      await addTodo(title, description);
      handleCloseTodoModal();
    },
  );

  return {
    errors,
    isAddTodoModalOpen,
    handleCloseTodoModal,
    handleAddTodoClick,
    handleAddTodoFormSubmit,
    register,
  };
};
