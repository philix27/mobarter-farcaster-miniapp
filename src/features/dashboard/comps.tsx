import React from 'react'

export default function SectionHeading(props: { title: string }) {
    return (
        <div className='bg-card'>
            <h4 className='text-muted font-semibold text-[14px]'>{props.title}</h4>
        </div>
    )
}
