import type { TRPCClientErrorBase } from "@trpc/client";
import type { DefaultErrorShape } from "@trpc/server";
import toast from "react-hot-toast";
import { useTranslation } from "next-i18next";
import { api } from "~/utils/api";

export const useUpdateDessert = (refetch: () => void) => {
	const { t } = useTranslation('desserts');
  return api.dessert.update.useMutation({
		onSuccess: () => {
			toast.success(t('update-success'));
			refetch();
		},
		onError: (error: TRPCClientErrorBase<DefaultErrorShape>) => {
			console.log(error);
			toast.error(t('update-error'));
		},
	});
}