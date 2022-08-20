// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { checkSlugFunc } from '../../../utils/checkSlugFunc';
import { checkUrlFunc } from '../../../utils/checkUrlFunc';

import { prisma } from "../../../db/prisma";

const setURL = async (req: NextApiRequest, res: NextApiResponse) => {
    const { url, slug } = req.body;

    try {
        const urlResult = await checkUrlFunc(res, url)
        const slugResult = await checkSlugFunc(res, slug)

        if (urlResult && slugResult) {
            const setLink = await prisma.shortLink.create({
                data: {
                    url: url,
                    slug: slug
                }
            })

            if(setLink){
                res.send(JSON.stringify({ message: "success" }));
            }
        }

    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "Couldn't shorten the link!" })
    }
}

export default setURL;