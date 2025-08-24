'use client'
import { useRouter } from 'next/navigation';
import React, { ReactNode } from 'react'
import { BiArrowBack } from 'react-icons/bi';
import { styles } from '../app/styles/style';

export default function AppLayout(props: { children: ReactNode; title: string; subtitle?: string; hideBack?: boolean }) {
    return (
        <div className="flex flex-col min-h-screen w-screen"
            style={{ backgroundColor: styles.bgColor }}>
            <div className=''>
                <Navbar title={props.title} hideBack={props.hideBack} />
                <div style={{ padding: "0 14px" }}>
                    {props.children}
                </div>
            </div>
        </div>
    )
}


export function Navbar(props: { title: string; hideBack?: boolean }) {
    const router = useRouter();
    return (
        <div className='w-full h-[40px] flex items-center px-4 border-b'
            onClick={() => {
                console.log("Closer")
            }}>
            {props.hideBack || <BiArrowBack
                color={styles.color}
                size={20}
                onClick={() => {
                    console.log("Closer")
                    router.back()
                }}
                className='mr-5' />}
            <div className='w-full flex items-center justify-center'>
                <p style={{ marginLeft: 20, color: styles.color }} className='font-bold'>{props.title} </p>
            </div>
        </div>
    )
}
export function Footer() {
    return (
        <div>

        </div>
    )
}
