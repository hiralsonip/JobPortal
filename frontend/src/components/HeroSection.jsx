import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchQuery } from '@/redux/jobSlice';

const HeroSection = () => {

    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchQuery(query));
        navigate("/browse");
    }

    return (
        <div className='text-center mt-10'>

            <div className='flex flex-col gap-5 my-18'>
                <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>No. 1 Job Hunt Website</span>

                <h1 className='text-5xl font-bold'>Search, Apply & <br /> Get Your  <span className='text-[#6A38C2]'>Dream Job</span></h1>


                <p>Your Path to the Perfect Job Starts Here</p>

                <div className='flex sm:w-full lg:w-[40%] shadow-lg border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto '>
                    <input
                        type='text'
                        placeholder='Find your dream job'
                        className='outline-none border-none w-full'
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <Button className="rounded-r-full bg-[#6A38C2]" onClick={searchJobHandler}>
                        <Search className='h-5 w-5 text-white' />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection