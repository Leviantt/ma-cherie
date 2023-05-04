import type { TRPCClientErrorBase } from '@trpc/client';
import type { DefaultErrorShape } from '@trpc/server';
import toast from 'react-hot-toast';
import { api } from '~/utils/api';

export const useDeleteDessert = (refetch: () => void) => {
	return api.dessert.delete.useMutation({
		onSuccess: () => {
			toast.success('Десерт успешно удален.');
			refetch();
		},
		onError: (error: TRPCClientErrorBase<DefaultErrorShape>) => {
			console.log(error);
			toast.error('Ошибка. Не удалось удалить десерт.');
		},
	});
};
