import type { TRPCClientErrorBase } from '@trpc/client';
import type { DefaultErrorShape } from '@trpc/server';
import toast from 'react-hot-toast';
import { api } from '~/utils/api';

export const useCreateDessert = (refetch: () => void, resetInputs: () => void) => {
  return api.dessert.create.useMutation({
		onSuccess: () => {
			toast.success('Десерт успешно добавлен.');
			resetInputs();
			refetch();
		},
		onError: (error: TRPCClientErrorBase<DefaultErrorShape>) => {
			console.log(error);
			toast.error('Ошибка. Не удалось добавить десерт.');
		},
	});
}