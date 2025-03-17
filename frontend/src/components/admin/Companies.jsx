import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByName } from '@/redux/companySlice'
import useDocumentTitle from '@/hooks/useDocumentTitle'

const Companies = () => {

    useDocumentTitle("Companies")
    useGetAllCompanies();
    const [input, setInput] = useState("")
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchCompanyByName(input));
    }, [input])

    return (
        <>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10'>
                <div className='max-w-7xl mx-auto'>
                    <h1 className='font-bold text-xl my-5'>Companies</h1>
                </div>
                <div className='flex items-center justify-between my-5'>
                    <Input className="w-fit" placeholder="Filter By Name" onChange={(e) => setInput(e.target.value)} />
                    <Button variant="outline" className="" onClick={() => navigate("/admin/companies/create")}>New Company</Button>
                </div>
                <CompaniesTable />
            </div>
        </>
    )
}

export default Companies