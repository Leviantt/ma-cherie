import type { TRPCClientErrorBase } from '@trpc/client';
import type { DefaultErrorShape } from '@trpc/server';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { useTranslation } from 'next-i18next';
import { api } from '~/utils/api';

export const useDeleteEmployee = () => {
	const router = useRouter();
	const { t } = useTranslation('employees');
	return api.employee.delete.useMutation({
		onSuccess: () => {
			toast.success(t('delete-success'));
			void router.push('/employees');
		},
		onError: (error: TRPCClientErrorBase<DefaultErrorShape>) => {
			console.log(error);
			toast.error(t('delete-error'));
		},
	});
};
