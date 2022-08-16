// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const area = req.body.area;
    // controller.createNaturalWorld(area, {x: 3600, y: 1800});
    res.status(201).json({ name: 'created' })
    return;
  }
  res.status(200).json({ name: 'John Doe' })
}
