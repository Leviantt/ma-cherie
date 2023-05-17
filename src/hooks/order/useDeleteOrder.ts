import type { TRPCClientErrorBase } from '@trpc/client';
import type { DefaultErrorShape } from '@trpc/server';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { useTranslation } from 'next-i18next';
import { api } from '~/utils/api';

export const useDeleteOrder = () => {
	const router = useRouter();
	const { t } = useTranslation('orders');
	return api.order.delete.useMutation({
		onSuccess: () => {
			toast.success(t('delete-success'));
			void router.push('/orders');
		},
		onError: (error: TRPCClientErrorBase<DefaultErrorShape>) => {
			console.log(error);
			toast.error(t('delete-error'));
		},
	});
};
