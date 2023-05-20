import toast from 'react-hot-toast';
import { useTranslation } from 'next-i18next';

import type { TRPCClientErrorBase } from '@trpc/client';
import type { DefaultErrorShape } from '@trpc/server';
import { api } from '~/utils/api';

export const useCreateDessert = (
	refetch: () => void,
	resetInputs: () => void
) => {
	const { t } = useTranslation('desserts');
	return api.dessert.create.useMutation({
		onSuccess: () => {
			toast.success(t('add-success'));
			resetInputs();
			refetch();
		},
		onError: (error: TRPCClientErrorBase<DefaultErrorShape>) => {
			console.log(error);
			toast.error(t('add-error'));
		},
	});
};
