import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'

const CompaniesTable = () => {
    return (
        <div>
            <Table>
                <TableCaption>Your Registered Companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableCell>
                        <Avatar>
                            <Avatar>
                                <AvatarImage src="https://st5.depositphotos.com/23188010/77609/i/450/depositphotos_776090452-stock-photo-letter-logo-vector-icon-illustration.jpg" />
                            </Avatar>
                        </Avatar>
                    </TableCell>
                    <TableCell>Company Name</TableCell>
                    <TableCell>06-03-2025</TableCell>
                    <TableCell className="text-right cursor-pointer">
                        <Popover>
                            <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                            <PopoverContent className="w-32">
                                <div className='flex items-center gap-2 w-fit cursor-pointer'>
                                    <Edit2 className='w-4' />
                                    <span>Edit</span>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </TableCell>
                </TableBody>
            </Table>
        </div>
    )
}

export default CompaniesTable