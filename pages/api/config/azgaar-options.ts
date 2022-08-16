// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = 
| {
  folderOptions: string[];
  areaOptions: number[];
}
| {}
| string[]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const azgOptions = [
    'Betia40', 'Mones10', 'Toia100', 'Vilesland40', 'Zia20'
  ];
  switch (req.method) {
    case 'GET':
      res.status(200).json(azgOptions)
        // areaOptions: [12100, 8100, 4100, 2100, 810]
      // })
      break;
    case 'POST':
      console.log('req body', req.body);
      if (azgOptions.includes(req.body.selected)) {
        res.status(201).json({})
      } else {
        res.status(500);
      }
      break;
    default:
      break;
  }
}