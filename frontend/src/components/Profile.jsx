import React from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'

const Profile = () => {
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
                <div className='flex items-center'>
                    <Avatar className="h-24 w-24">
                        <AvatarImage src="https://st5.depositphotos.com/23188010/77609/i/450/depositphotos_776090452-stock-photo-letter-logo-vector-icon-illustration.jpg" alt="Profile" />
                    </Avatar>
                    <div>
                        <h1 className='font-medium text-xl'>Full Name</h1>
                        <p>Add your bio here Officia eu ad aliquip pariatur.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile