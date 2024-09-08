'use client';

import { UpsertTodoModal } from '@/components/upsert-todo-modal';
import FilePenIcon from '@/components/icons/file-pen-icon';
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
import { useTodos } from './use-todos';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Skeleton } from '@/components/ui/skeleton';

export default function Todos() {
  const todos = useTodos();

  return (
    <div className="mx-16 my-8 max-xl:mx-8 max-lg:mx-4 max-md:mx-2 max-lg:my-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Tarefas</h1>
        <UpsertTodoModal
          currentTodoUpdate={todos.currentTodoUpdate}
          onCloseTodoModal={todos.handleCloseTodoModal}
        />
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
            {todos.todos.map((todo) => (
              <TableRow key={todo.id} className="group group-hover:bg-muted/50">
                <TableCell className="font-medium">
                  <strong>{todo.title}</strong>
                </TableCell>
                <TableCell>{todo.description}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    data-finished={todo.finished}
                    className="data-[finished=true]:bg-green-100 bg-red-100 data-[finished=true]:text-green-800 text-red-400"
                  >
                    {todo.finished ? 'Finalizado' : 'Pendente'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right w-10">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => todos.handleEditTodo(todo)}
                  >
                    <FilePenIcon className="h-4 w-4" />
                    <span className="sr-only">Editar</span>
                  </Button>
                </TableCell>
                <TableCell className="text-right w-10">
                  <Button
                    onClick={() =>
                      todos.handleToggleTodoStatus(todo.id, todo.finished)
                    }
                  >
                    {todo.finished ? 'Retomar' : 'Concluir'}
                  </Button>
                </TableCell>
                <TableCell className="text-right w-10">
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <Button
                        variant="outline"
                        className="border-red-500 hover:bg-red-500 hover:text-zinc-100 transition-all ease-linear duration-200"
                      >
                        Excluir
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader className="mb-4">
                        <AlertDialogTitle>
                          Tem certeza que deseja excluir essa tarefa?
                        </AlertDialogTitle>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="w-24">
                          Cancelar
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => todos.handleDeleteTodo(todo.id)}
                          className="w-24 bg-transparent text-zinc-800 border border-red-500 hover:bg-red-500 hover:text-zinc-100 transition-all ease-linear duration-200"
                        >
                          Excluir
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {todos.todos.length <= 0 && !todos.isTodoLoading && (
          <p className="mt-4 text-center">Nenhuma tarefa encontrada.</p>
        )}
        {todos.isTodoLoading && (
          <>
            <Skeleton className="h-16 mt-4" />
            <Skeleton className="h-16 mt-4" />
            <Skeleton className="h-16 mt-4" />
          </>
        )}
      </div>
    </div>
  );
}
