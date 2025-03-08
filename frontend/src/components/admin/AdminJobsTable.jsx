import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => {

    const { allAdminJobs, searchJobByName } = useSelector(store => store.job);
    const [filterJob, setFilterJob] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredJob = allAdminJobs.length >= 0 && allAdminJobs.filter((job) => {
            if (!searchJobByName) {
                return true;
            }
            return job?.title?.toLowerCase().includes(searchJobByName.toLowerCase());
        });
        setFilterJob(filteredJob)
    }, [allAdminJobs, searchJobByName])

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent posted Jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterJob?.length <= 0
                            ? <span>No Jobs Found</span>
                            : (filterJob?.map((job) =>
                            (<tr key={job._id}>
                                <TableCell>{job?.company?.name}</TableCell>
                                <TableCell>{job?.title}</TableCell>
                                <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            <div className='flex items-center gap-2 w-fit cursor-pointer' onClick={() => navigate(`/admin/companies/${job._id}`)}>
                                                <Edit2 className='w-4' />
                                                <span>Edit</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </tr>)
                            ))
                    }
                </TableBody>
            </Table>
        </div >
    )
}

export default AdminJobsTable