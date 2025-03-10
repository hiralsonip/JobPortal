import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/util/constant';
import { toast } from 'sonner';

const shortListingStatus = ["Accepted", "Rejected"];
const ApplicantsTable = () => {

    const { allApplicants } = useSelector(store => store.application);

    const statusHandler = async (id, status) => {
        try {
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status }, { withCredentials: true });
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    return (
        <div>
            <Table>
                <TableCaption className="text-gray-400">A list of Applicants</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone Number</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allApplicants && allApplicants?.map((item) => (
                            <tr key={item?._id}>
                                <TableCell>{item?.applicant?.fullname}</TableCell>
                                <TableCell>{item?.applicant?.email}</TableCell>
                                <TableCell>{item?.applicant?.phonenumber}</TableCell>
                                <TableCell>
                                    {
                                        item?.applicant?.profile?.resume
                                            ? <a href={item?.applicant?.profile?.resume} target='blank' className="text-blue-600 cursor-pointer"> {item?.applicant?.profile?.resumeOriginalName}</a>
                                            : <span>NA</span>
                                    }

                                </TableCell>
                                <TableCell>{item?.applicant?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="float-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className="w-32 float-right cursor-pointer bg-white">
                                            {
                                                shortListingStatus.map((status, index) => {
                                                    return (
                                                        <div key={index} className='flex w-fit items-center my-2 cursor-pointer' onClick={() => statusHandler(item?._id, status)}>
                                                            <span>{status}</span>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </tr>
                        ))
                    }
                </TableBody>
            </Table>
        </div >
    )
}

export default ApplicantsTable