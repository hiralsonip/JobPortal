import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector(store => store.job);

    return (
        <div className='w-full'>
            <Table>
                <TableCaption>A list of applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allAppliedJobs.length <= 0
                            ? <span>You have not applied for any job</span>
                            : allAppliedJobs.map((item, index) =>
                            (<TableRow key={index}>
                                <TableCell>{item?.createdAt.split("T")[0]}</TableCell>
                                <TableCell>{item?.job?.title}</TableCell>
                                <TableCell>{item?.job?.company?.name}</TableCell>
                                <TableCell className="text-right">
                                    <Badge variant="outline" className={`${item?.status === "rejected" ? 'bg-red-400' : item?.status === "accepted" ? 'bg-green-400' : 'bg-gray-400'}`}>
                                        {item?.status.toUpperCase()}
                                    </Badge>
                                </TableCell>
                            </TableRow>))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable