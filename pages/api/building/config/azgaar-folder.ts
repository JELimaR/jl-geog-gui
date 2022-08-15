// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import MapController from '../../../../Logic/MapController';

type Data = 
| {
  folderOptions: string[];
  areaOptions: number[];
}
| {}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const mc = MapController.instance;
  switch (req.method) {
    case 'GET':
      res.status(200).json({
        folderOptions: mc.getAzgaarWOptions(),
        areaOptions: [12100, 8100, 4100, 2100, 810]
      })
      break;
    case 'POST':
      console.log('req body', req.body);
      // const body = JSON.parse(req.body);
      mc.selectAzgaarW(req.body.folderSelected);
      res.status(201).json({})
      break;
    default:
      break;
  }
}