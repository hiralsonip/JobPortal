import React from 'react'
import { Badge } from './ui/badge'

const LatestJobCards = ({ job, onClickProp }) => {
    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer hover:shadow-2xl transition-all' onClick={onClickProp}>
            <div className='mb-3'>
                <h1 className='font-medium text-lg sm:text-xl'>{job?.company?.name}</h1>
                <p className='text-sm text-gray-500 sm:text-base'>{job?.location}</p>
            </div>
            <div className='mb-4'>
                <h1 className='font-bold text-lg my-2 sm:text-xl'>{job?.title}</h1>
                <p className='text-sm text-gray-600 sm:text-base'>{job?.description}</p>
            </div>
            <div className='flex flex-wrap items-center gap-2 mt-4'>
                <Badge className="text-blue-700 font-bold" variant="ghost">{job?.position} Position </Badge>
                <Badge className="text-[#F83002] font-bold" variant="ghost">{job?.jobType}</Badge>
                <Badge className="text-[#720927] font-bold" variant="ghost"> {job?.salary} </Badge>
            </div>
        </div>
    )
}

export default LatestJobCards