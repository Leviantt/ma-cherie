import type { SetStateAction } from 'react';
import { v4 } from 'uuid';
import { supabase } from '~/server/supabaseClient';

export const uploadToClient = (
	event: React.ChangeEvent<HTMLInputElement>,
	setAvatar: (value: SetStateAction<File | undefined>) => void,
	setAvatarURL: (value: SetStateAction<string | null>) => void
) => {
	if (event.currentTarget.files && event.currentTarget.files[0]) {
		if (!event.target.files) return;

		const file = event.target.files[0];

		setAvatar(file);
		setAvatarURL(URL.createObjectURL(file as Blob));
	}
};

export const uploadToServer = async (
	avatar: File,
	previousAvatarPath?: string
): Promise<string> => {
	const fileName = `${v4()}.jpg`;
	const { error } = await supabase.storage
		.from('avatars')
		.upload(fileName, avatar, { upsert: true });

	if (error) {
		throw error;
	}

	if (previousAvatarPath && previousAvatarPath !== '/images/default.jpg') {
		const previousAvatarName = previousAvatarPath.split('/').pop();
		void supabase.storage.from('avatars').remove([previousAvatarName ?? '']);
	}

	const { data } = supabase.storage.from('avatars').getPublicUrl(fileName);
	return data.publicUrl;
};
