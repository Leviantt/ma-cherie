import type { TRPCClientErrorBase } from '@trpc/client';
import type { DefaultErrorShape } from '@trpc/server';
import toast from 'react-hot-toast';
import { useTranslation } from 'next-i18next';
import { api } from '~/utils/api';
import { useRouter } from 'next/router';

export const useCreateOrder = () => {
	const { t } = useTranslation('orders');
	const router = useRouter();
	return api.order.create.useMutation({
		onSuccess: () => {
			toast.success(t('add-success'));
			void router.push('/orders');
		},
		onError: (error: TRPCClientErrorBase<DefaultErrorShape>) => {
			console.log(error);
			toast.error(t('add-error'));
		},
	});
};
