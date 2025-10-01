import { Button } from '@/components/Button'
import React from 'react'

export default function Dashboard() {
    return (
        <div className='flex h-screen w-full'>
            <FormField />
            <Slides />
        </div>
    )
}

function FormField() {
    return (
        <div className='w-1/3  h-full flex flex-col items-center justify-center p-5'>
            <p>Form Field</p>
            <Button btnName='singInWithGoogle'>Sign in with Google</Button>
        </div>
    )
}
function Slides() {
    return (
        <div className='w-2/3 h-full flex flex-col items-center justify-center p-5 bg-gray-200'>
            <p>Form Field</p>
        </div>
    )
}