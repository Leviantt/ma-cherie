import type { TRPCClientErrorBase } from '@trpc/client';
import type { DefaultErrorShape } from '@trpc/server';
import type { Employee } from '@prisma/client';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

import { api } from '~/utils/api';

export const useCreateEmployee = () => {
	const router = useRouter();
	return api.employee.create.useMutation({
		onSuccess: (emp: Employee) => {
			toast.success('Сотрудник успешно добавлен.');
			void router.push(`/employees/${emp.id}`);
		},
		onError: (error: TRPCClientErrorBase<DefaultErrorShape>) => {
			console.log(error);
			toast.error('Ошибка. Не удалось добавить сотрудника.');
		},
	});
};
