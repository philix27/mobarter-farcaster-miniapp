import { deleteUserNotificationDetails, setUserNotificationDetails } from '@/src/farcaster/notification';
import { sendFrameNotification } from '@/src/farcaster/notification-client';
import { logger } from '@/src/lib/utils'
import type { NextApiRequest, NextApiResponse } from 'next'
import { createPublicClient, http } from 'viem';
import { optimism } from 'viem/chains';


const appName = process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME;

const KEY_REGISTRY_ADDRESS = "0x00000000Fc1237824fb747aBDE0FF18990E59b7e";

const KEY_REGISTRY_ABI = [
    {
        inputs: [
            { name: "fid", type: "uint256" },
            { name: "key", type: "bytes" },
        ],
        name: "keyDataOf",
        outputs: [
            {
                components: [
                    { name: "state", type: "uint8" },
                    { name: "keyType", type: "uint32" },
                ],
                name: "",
                type: "tuple",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
] as const;

async function verifyFidOwnership(fid: number, appKey: `0x${string}`) {
    const client = createPublicClient({
        chain: optimism,
        transport: http(),
    });

    try {
        const result = await client.readContract({
            address: KEY_REGISTRY_ADDRESS,
            abi: KEY_REGISTRY_ABI,
            functionName: "keyDataOf",
            args: [BigInt(fid), appKey],
        });

        return result.state === 1 && result.keyType === 1;
    } catch (error) {
        logger.error("Key Registry verification failed:", error);
        return false;
    }
}

function decode(encoded: string) {
    return JSON.parse(Buffer.from(encoded, "base64url").toString("utf-8"));
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== 'POST') {
        res.status(401).json({ "message": "Only POST requests are accepted" });
        return;
    }


    // const requestJson = await req.body;

    // const { header: encodedHeader, payload: encodedPayload } = requestJson;

    const encodedHeader = req.headers
    const encodedPayload = req.body
    const headerData = decode(encodedHeader['x-webhook-header'] as string);
    const event = decode(encodedPayload);

    const { fid, key } = headerData;

    const valid = await verifyFidOwnership(fid, key);


    if (!valid) {
        return Response.json(
            { success: false, error: "Invalid FID ownership" },
            { status: 401 },
        );

    }
    switch (event.event) {
        case "frame_added":
            logger.info(
                "frame_added",
                "event.notificationDetails",
                event.notificationDetails,
            );
            if (event.notificationDetails) {
                await setUserNotificationDetails(fid, event.notificationDetails);
                await sendFrameNotification({
                    fid,
                    title: `Welcome to ${appName}`,
                    body: `Thank you for adding ${appName}`,
                });
            } else {
                await deleteUserNotificationDetails(fid);
            }

            break;
        case "frame_removed": {
            logger.info("frame_removed");
            await deleteUserNotificationDetails(fid);
            break;
        }
        case "notifications_enabled": {
            logger.info("notifications_enabled", event.notificationDetails);
            await setUserNotificationDetails(fid, event.notificationDetails);
            await sendFrameNotification({
                fid,
                title: `Welcome to ${appName}`,
                body: `Thank you for enabling notifications for ${appName}`,
            });

            break;
        }
        case "notifications_disabled": {
            logger.info("notifications_disabled");
            await deleteUserNotificationDetails(fid);

            break;
        }

    }
    return Response.json({ success: true });
}
