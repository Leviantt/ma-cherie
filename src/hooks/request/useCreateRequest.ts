import toast from 'react-hot-toast';
import { useTranslation } from 'next-i18next';

import type { TRPCClientErrorBase } from '@trpc/client';
import type { DefaultErrorShape } from '@trpc/server';
import { api } from '~/utils/api';

export const useCreateRequest = (
	resetInputs: () => void,
	refetchRequests: () => void,
	refetchDesserts: () => void
) => {
	const { t } = useTranslation('requests');
	return api.request.create.useMutation({
		onSuccess: () => {
			toast.success(t('add-success'));
			resetInputs();
			refetchRequests();
			refetchDesserts();
		},
		onError: (error: TRPCClientErrorBase<DefaultErrorShape>) => {
			console.log(error);
			toast.error(t('add-error'));
		},
	});
};
