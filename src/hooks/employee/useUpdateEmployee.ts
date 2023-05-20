import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { useTranslation } from 'next-i18next';

import type { Employee } from '@prisma/client';
import type { TRPCClientErrorBase } from '@trpc/client';
import type { DefaultErrorShape } from '@trpc/server';
import { api } from '~/utils/api';

export const useUpdateEmployee = () => {
	const router = useRouter();
	const { t } = useTranslation('employees');
	return api.employee.update.useMutation({
		onSuccess: (emp: Employee) => {
			toast.success(t('update-success'));
			void router.push(`/employees/${emp.id}`);
		},
		onError: (error: TRPCClientErrorBase<DefaultErrorShape>) => {
			console.log(error);
			toast.error(t('update-error'));
		},
	});
};
