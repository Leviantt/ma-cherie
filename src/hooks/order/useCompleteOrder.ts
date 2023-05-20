import toast from 'react-hot-toast';
import { useTranslation } from 'next-i18next';

import type { TRPCClientErrorBase } from '@trpc/client';
import type { DefaultErrorShape } from '@trpc/server';
import { api } from '~/utils/api';

export const useCompleteOrder = (refetch: () => void) => {
	const { t } = useTranslation('orders');
	return api.order.complete.useMutation({
		onSuccess: () => {
			toast.success(t('update-success'));
			refetch();
		},
		onError: (error: TRPCClientErrorBase<DefaultErrorShape>) => {
			console.log(error);
			toast.error(t('update-error'));
		},
	});
};
