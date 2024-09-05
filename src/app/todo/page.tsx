'use client';

import { AddTodoModal } from '@/components/add-todo-modal';
import FilePenIcon from '@/components/icons/file-pen-icon';
import PlusIcon from '@/components/icons/plus-icon';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { db } from '@/Lib/firebase-config';
import { Todo } from '@/types/todo';
import { onSnapshot, collection } from 'firebase/firestore';
import { useState, useEffect } from 'react';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  useEffect(() => {
    const loadTodos = async () => {
      onSnapshot(collection(db, 'todo'), (snapshot) => {
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
      });
    };
    loadTodos();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Tarefas</h1>
        <AddTodoModal />
        {/* <Button size="sm">
          <PlusIcon className="mr-2 h-4 w-4" />
          Adicionar Tarefa
        </Button> */}
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {todos.map((todo) => (
              <TableRow key={todo.id}>
                <TableCell className="font-medium">{todo.title}</TableCell>
                <TableCell>{todo.description}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    data-finished={todo.finished}
                    className="data-[finished=true]:bg-green-100 bg-red-100  data-[finished=true]:text-green-800 text-red-400"
                  >
                    {todo.finished ? 'Finalizado' : 'Pendente'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="icon">
                    <FilePenIcon className="h-4 w-4" />
                    <span className="sr-only">Editar</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
