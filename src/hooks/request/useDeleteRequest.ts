import toast from 'react-hot-toast';
import { useTranslation } from 'next-i18next';

import type { TRPCClientErrorBase } from '@trpc/client';
import type { DefaultErrorShape } from '@trpc/server';
import { api } from '~/utils/api';

export const useDeleteRequest = (
	refetchRequests: () => void,
	refetchDesserts: () => void
) => {
	const { t } = useTranslation('requests');
	return api.request.delete.useMutation({
		onSuccess: () => {
			void refetchRequests();
			void refetchDesserts();
			toast.success(t('delete-success'));
		},
		onError: (error: TRPCClientErrorBase<DefaultErrorShape>) => {
			console.log(error);
			toast.error(t('delete-error'));
		},
	});
};
