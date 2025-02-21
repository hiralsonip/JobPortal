import React from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'

const JobDescripton = () => {
    const isApplied = true;

    return (
        <div className='max-w-4xl mx-auto my-10'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='font-bold text-xl'>Full Stack Developer</h1>
                    <div className='flex items-center gap-2 mt-4'>
                        <Badge className="text-blue-700 font-bold" variant="ghost"> 12 Position </Badge>
                        <Badge className="text-[#F83002] font-bold" variant="ghost"> Part Time </Badge>
                        <Badge className="text-[#720927] font-bold" variant="ghost"> 25 LPA </Badge>
                    </div>
                </div>
                <Button
                    disbled={isApplied}
                    variant="outline"
                    className={`rounded-lg text-white ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}>
                    {isApplied ? "Applied" : "Apply Now"}
                </Button>
            </div>
            <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
            <div className='my-4'>
                <h1 className='font-bold my-1'>Role : <span className='pl-4 font-normal text-gray-800'>Full Stack Developer</span></h1>
                <h1 className='font-bold my-1'>Location : <span className='pl-4 font-normal text-gray-800'>Toronto, ON, Canada</span></h1>
                <h1 className='font-bold my-1'>Description : <span className='pl-4 font-normal text-gray-800'>Ipsum eu aliqua eu fugiat non culpa minim elit laborum sit do cillum ipsum.</span></h1>
                <h1 className='font-bold my-1'>Experience : <span className='pl-4 font-normal text-gray-800'>3 years</span></h1>
                <h1 className='font-bold my-1'>Salary : <span className='pl-4 font-normal text-gray-800'>150k per anum</span></h1>
                <h1 className='font-bold my-1'>Total Applicants : <span className='pl-4 font-normal text-gray-800'>7</span></h1>
                <h1 className='font-bold my-1'>Posted Date : <span className='pl-4 font-normal text-gray-800'>02/19/2025</span></h1>
            </div>
        </div>
    )
}

export default JobDescripton