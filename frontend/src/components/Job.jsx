import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'

const Job = () => {
    return (
        <div className='p-5 rounded-md shadow-xl bg-white border-gray-300'>
            <div className='flex items-center justify-between'>
                <p className='text-gray-600 text-sm'> 2 days ago </p>
                <Button variant="outline" className="rounded-full" size="icon"><Bookmark /></Button>
            </div>

            <div className='flex items-center gap-2 my-2'>
                <Button className="p-6" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src="https://st5.depositphotos.com/23188010/77609/i/450/depositphotos_776090452-stock-photo-letter-logo-vector-icon-illustration.jpg" />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg'>
                        Company Name
                    </h1>
                    <p className='text-sm text-gray-600'>Canada</p>
                </div>
            </div>

            <div>
                <h1 className='font-bold text-lg my-2'>Title</h1>
                <p className='text-sm text-gray-600'>
                    Voluptate magna exercitation ut culpa aliqua esse laboris minim do occaecat. Quis eiusmod voluptate proident dolor qui ut tempor incididunt elit consequat eiusmod occaecat nisi id.
                </p>
            </div>

            <div className='flex items-center gap-2 mt-4'>
                <Badge className="text-blue-700 font-bold" variant="ghost">
                    12 Position
                </Badge>
                <Badge className="text-[#F83002] font-bold" variant="ghost">
                    Part Time
                </Badge>
                <Badge className="text-[#720927] font-bold" variant="ghost">
                    25 LPA
                </Badge>
            </div>

            <div className='flex items-center gap-4 mt-4'>
                <Button variant="outline">Details</Button>
                <Button variant="outline" className="bg-[#7209b7] text-white">Save for later</Button>
            </div>

        </div>
    )
}

export default Job