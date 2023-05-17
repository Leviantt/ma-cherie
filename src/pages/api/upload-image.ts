/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import mv from 'mv';
import formidable from 'formidable';

export const config = {
	api: {
		bodyParser: false,
	},
};
export default function handleUploadImage(
	req: NextApiRequest,
	res: NextApiResponse
) {

	return uploadImage(req)
		.then((message) => {
			res.json({ message });
		})
		.catch((error) => {
			res.json({ error });
		});
}

async function uploadImage(req: NextApiRequest) {
	const form = new formidable.IncomingForm();

	return new Promise((resolve, reject) => {
		form.parse(req, (err, fields, files) => {
			if (err) return reject('Error occurred parsing request body');

			if (typeof fields.filepath !== 'string')
				return reject('File was not provided');

			const file: any = files.file;
			const filepath = file.filepath;
			const newFilePath = './public' + fields.filepath;
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			mv(filepath, newFilePath, () => {
				resolve('Successfully uploaded file');
			});
		});
	});
}
