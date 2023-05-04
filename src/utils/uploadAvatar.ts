import type { SetStateAction } from "react";

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
	pathToAvatarPhoto: string,
	avatar: File | undefined
) => {
	const body = new FormData();
	if (avatar) {
		body.append('file', avatar);
		body.append('filepath', pathToAvatarPhoto);
		await fetch('/api/upload-image', {
			method: 'POST',
			body,
		});
	} else {
		console.log('Avatar file was not provided');
	}
};
