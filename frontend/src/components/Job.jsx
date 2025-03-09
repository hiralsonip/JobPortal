import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({ job }) => {

    const navigate = useNavigate();
    const daysAgo = (mongoDBTime) => {
        const createdAt = new Date(mongoDBTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (24 * 60 * 60 * 1000))
    }

    return (
        <div className='p-5 rounded-md shadow-xl bg-white border-gray-300'>
            <div className='flex items-center justify-between'>
                <p className='text-gray-600 text-sm'> {daysAgo(job?.createdAt) === 0 ? "Today" : `${daysAgo(job?.createdAt)} days ago`}  </p>
                <Button variant="outline" className="rounded-full" size="icon"><Bookmark /></Button>
            </div>

            <div className='flex items-center gap-2 my-2'>
                <Button className="p-6" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg'> {job?.company?.name} </h1>
                    <p className='text-sm text-gray-600'>{job?.location}</p>
                </div>
            </div>

            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>

            <div className='flex items-center gap-2 mt-4'>
                <Badge className="text-blue-700 font-bold" variant="ghost"> {job?.position}  Position </Badge>
                <Badge className="text-[#F83002] font-bold" variant="ghost"> {job?.jobType} </Badge>
                <Badge className="text-[#720927] font-bold" variant="ghost"> {job?.salary} </Badge>
            </div>

            <div className='flex items-center gap-4 mt-4'>
                <Button variant="outline" onClick={() => navigate(`/description/${job._id}`)}>Details</Button>
                <Button variant="outline" className="bg-[#7209b7] text-white">Save for later</Button>
            </div>

        </div>
    )
}

export default Job