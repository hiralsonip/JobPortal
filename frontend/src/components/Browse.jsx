import React from 'react'
import Navbar from './shared/Navbar'
import Job from './Job'

const jobs = [1, 2, 3, 1, 2, 3]

const Browse = () => {
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'>
                <h1 className='font-bold text-xl my-10'>Search Results ({jobs.length})</h1>
                <div className='grid grid-cols-3 gap-4'>
                    {
                        jobs.map((item, index) => {
                            return <Job />
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Browse