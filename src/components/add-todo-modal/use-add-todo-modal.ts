import { db } from '@/Lib/firebase-config';
import { AddTodoFormData, Todo } from '@/types/todo';
import { addTodoSchema } from '@/validations/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export const useAddTodoModal = () => {
  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm<AddTodoFormData>({
    resolver: zodResolver(addTodoSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const [isAddTodoModalOpen, setIsAddTodoModalOpen] = useState(false);

  const handleAddTodoClick = () => {
    setIsAddTodoModalOpen(true);
  };

  const handleCloseTodoModal = () => {
    setIsAddTodoModalOpen(false);
    reset();
  };

  const handleAddTodoFormSubmit = handleSubmit(
    async ({ title, description }) => {
      handleCloseTodoModal();

      await addDoc(collection(db, 'todo'), {
        title,
        description,
        finished: false,
        userId: 'owrz3oLIPMecVysyu0A5kM27L7q2',
      })
        .then(() => {
          alert('Cadastro realizado com sucesso!');
        })
        .catch((error) => {
          alert(error);
          console.log(error);
        });
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
