import React from 'react'
import LatestJobCards from './LatestJobCards'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

const LatestJobs = () => {

    const { allJobs } = useSelector(store => store.job);
    const navigate = useNavigate();

    return (
        <>
            <div className='max-w-7xl mx-auto my-20'>
                <h1 className='text-4xl font-bold'><span className='text-[#6A38C2]'>Latest & Top</span> Job Opening</h1>

                {/* Cards */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-5'>
                    {
                        allJobs.length <= 0 ? <span className='col-span-full text-center text-xl text-gray-600'>Job not available</span>
                            : allJobs.slice(0, 6).map((job) => (<LatestJobCards key={job._id} job={job} onClickProp={() => navigate(`/description/${job._id}`)} />))
                    }
                </div>


                <div>
                    <Button variant="outline" onClick={() => navigate("/jobs")}> See All Jobs</Button>
                </div>
            </div>
        </>
    )
}

export default LatestJobs