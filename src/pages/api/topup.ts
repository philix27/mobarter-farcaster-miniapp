import type { NextApiRequest, NextApiResponse } from 'next'

import { UtilitiesService } from '@/src/features/topup/api/utilities.service'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const utils = new UtilitiesService()
        const input = req.body;
        const result = await utils.purchaseAirtime(input)
        res.status(200).json(result)
    } else {
        res.status(404)
    }
}
