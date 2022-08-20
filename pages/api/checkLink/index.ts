import type { NextApiRequest, NextApiResponse } from 'next'
import { checkUrlFunc } from '../../../utils/checkUrlFunc';

const checkLink = async (req: NextApiRequest, res: NextApiResponse) => {
  const { url } = req.body;

  if (!url) {
    res.statusCode = 500;
    res.send(JSON.stringify({ message: "Please provide a link!" }));
    return;
  }

  const result = await checkUrlFunc(res, url);

  if (result) res.send(JSON.stringify({ message: "success" }));

}

export default checkLink;
