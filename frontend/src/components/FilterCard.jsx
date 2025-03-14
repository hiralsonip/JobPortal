import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '@/redux/jobSlice'
import { Button } from './ui/button'

// Filter type - location, salary, industry

const filterData = [
    {
        filterType: "Location",
        array: ["Toronto", "Brampton", "North York", "Kitchener", "London"]
    },

    {
        filterType: "Industry",
        array: ["IT", "Network", "Cyber Security"]
    },

    {
        filterType: "Job Type",
        array: ["Full Time", "Part Time", "Temporary", "Contract"]
    }
]

const FilterCard = () => {

    const [selectedValue, setSelectedValue] = useState("");
    const dispatch = useDispatch();
    const changeHandler = (value) => {
        setSelectedValue(value)
    }

    useEffect(() => {
        dispatch(setSearchQuery(selectedValue));
    }, [selectedValue]);

    const removeFilter = () => {
        setSelectedValue("");
    }

    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='font-bold text-lg'> Filter Job </h1>
            <hr className='mt-3' />

            <RadioGroup value={selectedValue} onValueChange={changeHandler} className="flex flex-row justify-evenly w-screen md:flex-col lg:flex-col ">
                {
                    filterData.map((data, index) => (
                        <div key={index}>
                            <h1 className='font-bold text-lg'>{data.filterType}</h1>
                            {
                                data.array.map((item, innerIndex) => {
                                    const itemID = `r${index}-${innerIndex}`;
                                    return (
                                        <div className='flex items-center space-x-2 my-2' key={itemID}>
                                            <RadioGroupItem value={item} id={itemID} />
                                            <Label htmlFor={itemID}>{item}</Label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup >

            <Button variant="outline" onClick={removeFilter} className="mt-4">Remove Filter</Button>
        </div >
    )
}

export default FilterCard