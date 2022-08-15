// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import MapController from '../../../../Logic/MapController';

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const mc = MapController.instance;
    const area = req.body.area;
    mc.createNaturalWorld(area, {x: 3600, y: 1800});
    res.status(200).json({ name: 'created' })
  }
  res.status(200).json({ name: 'John Doe' })
}
