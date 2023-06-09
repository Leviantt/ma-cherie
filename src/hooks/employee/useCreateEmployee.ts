import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { useTranslation } from 'next-i18next';

import { api } from '~/utils/api';
import type { TRPCClientErrorBase } from '@trpc/client';
import type { DefaultErrorShape } from '@trpc/server';
import type { Employee } from '@prisma/client';

export const useCreateEmployee = () => {
	const router = useRouter();
	const { t } = useTranslation('employees');
	return api.employee.create.useMutation({
		onSuccess: (emp: Employee) => {
			toast.success(t('add-success'));
			void router.push(`/employees/${emp.id}`);
		},
		onError: (error: TRPCClientErrorBase<DefaultErrorShape>) => {
			console.log(error);
			toast.error(t('add-error'));
		},
	});
};
