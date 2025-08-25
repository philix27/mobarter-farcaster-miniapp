import React from 'react'
import { styles } from '../styles/style'

export default function ProfileCard() {
    return (
        <div className="w-full h-20 bg-red-500 bg-card"
        >
            <p style={{ color: styles.textColor }}>name</p>
            <p>@userName</p>
            <p>Avatar</p>
            <p>Select country</p>
        </div>
    )
}
