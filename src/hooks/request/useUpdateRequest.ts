import type { TRPCClientErrorBase } from '@trpc/client';
import type { DefaultErrorShape } from '@trpc/server';
import toast from 'react-hot-toast';
import { api } from '~/utils/api';

export const useUpdateRequest = (
	refetchRequests: () => void,
	refetchDesserts: () => void
) => {
	return api.request.update.useMutation({
		onSuccess: () => {
			void refetchRequests();
			void refetchDesserts();
			toast.success('Заявки для десерта успешно обновлены');
		},
		onError: (error: TRPCClientErrorBase<DefaultErrorShape>) => {
			console.log(error);
			toast.error('Ошибка. Не удалось обновить заявки для десерта.');
		},
	});
};