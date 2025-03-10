import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';

const shortListingStatus = ["Accepted", "Rejected"];
const ApplicantsTable = () => {

    const { allApplicants } = useSelector(store => store.application);
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
                            <tr>
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
                                                        <div key={index} className='flex w-fit items-center my-2 cursor-pointer'> <span>{status}</span> </div>
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