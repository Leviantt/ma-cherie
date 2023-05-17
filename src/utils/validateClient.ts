import { z } from 'zod';
import type { ClientData } from '~/types/ClientData';

const trimFields = (clientData: ClientData) => {
	const trimmed = { ...clientData };
	trimmed.fullName = trimmed.fullName.trim();
	trimmed.phone = trimmed.phone.trim();
	trimmed.source = trimmed.source.trim();
	return trimmed;
};

export const validateClient = (clientData: ClientData) => {
	const validated = z
		.object({
			fullName: z.string().min(2),
			birthdate: z.date(),
			phone: z
				.string()
				.regex(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/),
			source: z.string().min(2),
		})
		.parse(trimFields(clientData));
	return validated;
};
