import { Button } from '@/components/Button'
import React from 'react'
import DesktopWrapper from '../features/desktop/Wrapper'

export default function Dashboard() {
    return (
        <DesktopWrapper>
            <FormField />
        </DesktopWrapper>
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
