import type { Employee } from '@prisma/client';
import type { TRPCClientErrorBase } from '@trpc/client';
import type { DefaultErrorShape } from '@trpc/server';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { api } from '~/utils/api';

export const useUpdateEmployee = () => {
	const router = useRouter();

	return api.employee.update.useMutation({
		onSuccess: (emp: Employee) => {
			toast.success('Данные сотрудника успешно обновлены.');
			void router.push(`/employees/${emp.id}`);
		},
		onError: (error: TRPCClientErrorBase<DefaultErrorShape>) => {
			console.log(error);
			toast.error('Ошибка. Не удалось обновить данные сотрудника.');
		},
	});
};
