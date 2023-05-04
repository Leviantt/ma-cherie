import type { TRPCClientErrorBase } from '@trpc/client';
import type { DefaultErrorShape } from '@trpc/server';
import toast from 'react-hot-toast';
import { api } from '~/utils/api';

export const useCreateRequest = (
	resetInputs: () => void,
	refetchRequests: () => void,
	refetchDesserts: () => void
) => {
	return api.request.create.useMutation({
		onSuccess: () => {
			toast.success('Заявки для десерта успешно добавлены');
			resetInputs();
			refetchRequests();
			refetchDesserts();
		},
		onError: (error: TRPCClientErrorBase<DefaultErrorShape>) => {
			console.log(error);
			toast.error('Ошибка. Не удалось добавить заявки для десерта.');
		},
	});
};
