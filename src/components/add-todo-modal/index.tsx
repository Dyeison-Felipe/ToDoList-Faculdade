'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PlusIcon from '../icons/plus-icon';
import { useAddTodoModal } from './use-add-todo-modal';
import { Todo } from '@/types/todo';

type AddTodoModalProps = {
  currentTodoUpdate: Todo | null;
  onCloseTodoModal: () => void;
};

export function AddTodoModal({
  currentTodoUpdate,
  onCloseTodoModal,
}: AddTodoModalProps) {
  const addTodoModal = useAddTodoModal(currentTodoUpdate, onCloseTodoModal);

  return (
    <Dialog open={addTodoModal.isAddTodoModalOpen}>
      <DialogTrigger asChild onClick={addTodoModal.handleAddTodoClick}>
        <Button>
          <PlusIcon className="mr-2 size-4 " />
          Adicionar Tarefa
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        onClose={addTodoModal.handleCloseTodoModal}
      >
        <form onSubmit={addTodoModal.handleAddTodoFormSubmit}>
          <DialogHeader className="mb-4">
            <DialogTitle>Adicionar nova tarefa</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Título
              </Label>
              <Input
                id="title"
                {...addTodoModal.register('title')}
                className="col-span-3"
              />
              <span className="text-xs text-red-600 col-start-2 col-span-3 -mt-3">
                {addTodoModal.errors.title?.message}
              </span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Descrição
              </Label>
              <Input
                id="description"
                className="col-span-3"
                {...addTodoModal.register('description')}
              />
              <span className="text-xs text-red-600 col-start-2 col-span-3 -mt-3">
                {addTodoModal.errors.description?.message}
              </span>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">
              {currentTodoUpdate ? 'Editar' : 'Adicionar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
