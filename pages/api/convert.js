import { IncomingForm } from 'formidable';
import sharp from 'sharp';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const form = new IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to upload image' });
      }

      const file = files.image[0];

      try {
        const buffer = await sharp(file.filepath)
          .jpeg()
          .toBuffer();

        const base64Image = buffer.toString('base64');
        const dataUrl = `data:image/jpeg;base64,${base64Image}`;

        res.status(200).json({ url: dataUrl });
      } catch (error) {
        res.status(500).json({ error: 'Failed to convert image' });
      }
    });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
