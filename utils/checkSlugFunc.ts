import { prisma } from "../db/prisma";
import { array2String } from "./array2String";
import type { NextApiResponse } from 'next'

export const checkSlugFunc = async (res: NextApiResponse, slug: string | string[]) => {
    const finalSlug = array2String(slug)

    if(finalSlug.length === 0) {
      res.statusCode = 500;
      res.send(JSON.stringify({message: "Please provide a slug!"}));
      return false;
    }

    if(finalSlug.length < 4) {
        res.statusCode = 500;
        res.send(JSON.stringify({message: "Slug can't be less than 4 letters!"}));
        return false;
    }

    const regex = /^[A-Za-z0-9]*$/i

    if(!regex.test(finalSlug)) {
        res.statusCode = 500;
        res.send(JSON.stringify({message: "Only letters and numbers"}));
        return false;
    }
  
    const data = await prisma.shortLink.findFirst({
      where: {
          slug: {
              equals: finalSlug
          }
      }
    })
  
    if(data) {
      res.statusCode = 500;
      res.send(JSON.stringify({message: "This slug is already in use!"}));
      return false;
    } else {
        return true
    }
}