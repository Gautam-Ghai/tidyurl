import type { NextApiRequest, NextApiResponse } from 'next'
import { checkSlugFunc } from '../../../utils/checkSlugFunc';


const checkSlug = async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query;

  if (!slug) {
    res.statusCode = 500;
    res.send(JSON.stringify({ message: "Please provide an acceptable slug" }));
    return;
  }

  const result = await checkSlugFunc(res, slug);

 
  if (result) res.send(JSON.stringify({ message: "success" }))
}

export default checkSlug