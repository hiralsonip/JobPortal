import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByName } from '@/redux/jobSlice'
import useDocumentTitle from '@/hooks/useDocumentTitle'

const AdminJobs = () => {

    useDocumentTitle("Admin Jobs")
    useGetAllAdminJobs();
    const [input, setInput] = useState("")
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { allAdminJobs } = useSelector(store => store.job);

    useEffect(() => {
        dispatch(setSearchJobByName(input));
    }, [input])

    return (
        <>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10'>
                <div className='max-w-7xl mx-auto'>
                    <h1 className='font-bold text-xl my-5'>Jobs</h1>
                </div>
                <div className='flex items-center justify-between my-5'>
                    <Input className="w-fit" placeholder="Filter By Name" onChange={(e) => setInput(e.target.value)} />
                    <Button variant="outline" className="" onClick={() => navigate("/admin/job/create")}>New Jobs</Button>
                </div>
                <AdminJobsTable />
            </div>
        </>
    )
}

export default AdminJobs