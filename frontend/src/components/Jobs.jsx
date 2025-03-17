import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job'
import { useDispatch, useSelector } from 'react-redux'
import { setAllJobs, setSearchQuery } from '@/redux/jobSlice'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { motion } from 'framer-motion'
import useDocumentTitle from '@/hooks/useDocumentTitle'

const Jobs = () => {

    useDocumentTitle("Jobs");
    useGetAllJobs();
    const { allJobs, searchQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);
    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        if (searchQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    job.jobType.toLowerCase().includes(searchQuery.toLowerCase())
            });
            setFilterJobs(filteredJobs);
        } else {
            setFilterJobs(allJobs)
        }
    }, [allJobs, searchQuery]);

    useEffect(() => {
        return () => {
            dispatch(setSearchQuery(""));
        }
    }, [])

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex gap-5 flex-col md:flex-row'>
                    <div className='w-[20%]'>
                        <FilterCard />
                    </div>
                    {
                        filterJobs.length <= 0
                            ? <span> Job not found </span>
                            :
                            <div className='flex-1 h-[88vh] overflow-y-auto pb-5' >
                                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                                    {filterJobs.map((job) =>
                                    (<motion.div
                                        key={job._id}
                                        initial={{ opacity: 0, x: 100 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -1 }}
                                        transition={{ duration: 0.3 }}>
                                        <Job job={job} />
                                    </motion.div>))}
                                </div>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Jobs