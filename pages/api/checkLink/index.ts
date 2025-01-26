import type { NextApiRequest, NextApiResponse } from 'next'
import { checkUrlFunc } from '../../../utils/checkUrlFunc';
import { google } from 'googleapis';
import { env } from 'process';

const client = google.safebrowsing({
  version: 'v4',
  auth: process.env.GOOGLE_API_KEY
});

const checkLink = async (req: NextApiRequest, res: NextApiResponse) => {
  const { url } = req.body;

  try {

    if (!url) {
      res.statusCode = 500;
      res.send(JSON.stringify({ message: "Please provide a link!" }));
      return;
    }

    const result = await checkUrlFunc(res, url);

    if (result) {

      const response = await client.threatMatches.find({
        requestBody: {
          client: {
            clientId: 'tidyURL',
            clientVersion: '1.0.0'
          },
          threatInfo: {
            threatTypes: ['MALWARE', 'SOCIAL_ENGINEERING', 'UNWANTED_SOFTWARE', 'POTENTIALLY_HARMFUL_APPLICATION'],
            platformTypes: ['ANY_PLATFORM'],
            threatEntryTypes: ['URL'],
            threatEntries: [{ url }]
          }
        }
      });

      if (response.data.matches) {
        res.status(200).json({ safe: false });
      } else {
        res.status(200).json({ safe: true });
      }


    }


  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while checking the URL' });
  }

}

export default checkLink;
