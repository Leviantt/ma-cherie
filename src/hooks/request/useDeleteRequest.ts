import type { TRPCClientErrorBase } from '@trpc/client';
import type { DefaultErrorShape } from '@trpc/server';
import toast from 'react-hot-toast';
import { api } from '~/utils/api';

export const useDeleteRequest = (
	refetchRequests: () => void,
	refetchDesserts: () => void
) => {
	return api.request.delete.useMutation({
		onSuccess: () => {
			void refetchRequests();
			void refetchDesserts();
			toast.success('Заявки для десерта удалены, т.к. все столбцы равны 0');
		},
		onError: (error: TRPCClientErrorBase<DefaultErrorShape>) => {
			console.log(error);
			toast.error('Ошибка. Не удалось удалить заявки для десерта.');
		},
	});
};
