import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

import { GiftCardCategoryData } from '@/src/lib/server/GiftCategories'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GiftCardCategoryData>
) {
  const url = `https://giftcards.reloadly.com/product-categories`
  const token = process.env.GIFT_CARD_TOKEN

  if (req.method === 'GET') {
    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      const d = {
        "accountAssociation": {
          "header": "process.env.FARCASTER_HEADER",
          "payload": "process.env.FARCASTER_PAYLOAD",
          "signature": "process.env.FARCASTER_SIGNATURE"
        },
        "baseBuilder": {
          "allowedAddresses": ["0x323591710D7Aa601aEAF33D0B91D348c2F66b5cc"]
        },
        "frame": {
          " version": "1",
          " name": "process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME",
          " subtitle": "process.env.NEXT_PUBLIC_APP_SUBTITLE",
          " description": "process.env.NEXT_PUBLIC_APP_DESCRIPTION",
          " screenshotUrls": [
            "https://app.mobarter.com/screenshot.png"
          ],
          "iconUrl": "process.env.NEXT_PUBLIC_APP_ICON",
          "splashImageUrl": "process.env.NEXT_PUBLIC_APP_SPLASH_IMAGE",
          "splashBackgroundColor": "process.env.NEXT_PUBLIC_SPLASH_BACKGROUND_COLOR",
          "homeUrl": "URL",
          "webhookUrl": "`${URL}/api/webhook`",
          "primaryCategory": "process.env.NEXT_PUBLIC_APP_PRIMARY_CATEGORY",
          "tags": "[]",
          "heroImageUrl": "process.env.NEXT_PUBLIC_APP_HERO_IMAGE",
          "tagline": "process.env.NEXT_PUBLIC_APP_TAGLINE",
          "ogTitle": "process.env.NEXT_PUBLIC_APP_OG_TITLE",
          "ogDescription": "process.env.NEXT_PUBLIC_APP_OG_DESCRIPTION",
          "ogImageUrl": "process.env.NEXT_PUBLIC_APP_OG_IMAGE"
        }
      };

      res.status(200).json(d);


    } catch (error: any) {
      res.status(404)
    }
  } else {
    res.status(404)
  }
}



