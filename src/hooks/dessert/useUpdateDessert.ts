import type { TRPCClientErrorBase } from "@trpc/client";
import type { DefaultErrorShape } from "@trpc/server";
import toast from "react-hot-toast";
import { api } from "~/utils/api";

export const useUpdateDessert = (refetch: () => void) => {
  return api.dessert.update.useMutation({
		onSuccess: () => {
			toast.success('Данные десерта успешно обновлены.');
			refetch();
		},
		onError: (error: TRPCClientErrorBase<DefaultErrorShape>) => {
			console.log(error);
			toast.error('Ошибка. Не удалось обновить данные десерта.');
		},
	});
}