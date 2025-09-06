import { AdsRow, Label } from '@/components/comps'
import { useOpenUrl } from '@coinbase/onchainkit/minikit'
import React from 'react'

const links = [
    {
        title: 'Telegram Community',
        url: 'https://t.me/mobarter/1',
    },
    {
        title: 'Youtube',
        url: 'https://www.youtube.com/@mobarter',
    },
    {
        title: 'Twitter',
        url: 'https://x.com/mobarter_com',
    },
    {
        title: 'LinkedIn',
        url: 'https://www.linkedin.com/company/105072988/admin/dashboard/',
    },
    {
        title: 'Instagram',
        url: 'https://www.instagram.com/mobarter.co/',
    },
]

export default function LinksSection() {
    const openUrl = useOpenUrl()
    return (
        <div className="w-full p-2 border-b-1 border-muted mt-4  rounded-lg flex flex-col items-start justify-center bg-card">

            <Label>Links</Label>
            <hr className='border-1 border-muted w-full mb-1' />
            {links.map((items, i) => (<AdsRow
                key={i}
                text={items.title}
                text2={"visit"}
                text2options={{
                    onClick: () => {
                        openUrl(items.url)
                    }
                }}
            />))}

        </div>
    )
}
