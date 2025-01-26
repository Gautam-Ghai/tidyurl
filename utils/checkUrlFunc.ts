import { prisma } from "../db/prisma";
import { array2String } from "./array2String";
import type { NextApiResponse } from 'next'

export const checkUrlFunc = async (res: NextApiResponse, url: string | string[]) => {
  const finalLink = array2String(url)

  if (finalLink.length === 0) {
    res.statusCode = 500;
    res.send(JSON.stringify({ message: "Please provide an acceptable link!" }));
    return false
  }

  const regex = /^(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?$/i

  if (!regex.test(finalLink)) {
    res.statusCode = 500;
    res.send(JSON.stringify({ message: "Please provide a valid link!" }));
    return false
  }

  const data = await prisma.shortLink.findFirst({
    where: {
      url: {
        equals: finalLink
      }
    }
  })

  if (data) {
    res.statusCode = 500;
    res.send(JSON.stringify({ message: "Link already exists!", link: data.slug }));
    return false
  } else {
    return true
  }
}