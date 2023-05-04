import type { TRPCClientErrorBase } from '@trpc/client';
import type { DefaultErrorShape } from '@trpc/server';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { api } from '~/utils/api';

export const useDeleteEmployee = () => {
	const router = useRouter();

	return api.employee.delete.useMutation({
		onSuccess: () => {
			toast.success('Сотрудник успешно удален.');
			void router.push('/employees');
		},
		onError: (error: TRPCClientErrorBase<DefaultErrorShape>) => {
			console.log(error);
			toast.error('Ошибка. Не удалось удалить сотрудника.');
		},
	});
};
