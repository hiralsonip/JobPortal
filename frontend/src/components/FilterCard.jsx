import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '@/redux/jobSlice'

// Filter type - location, salary, industry

const filterData = [
    {
        filterType: "Location",
        array: ["Toronto", "Brampton", "North York", "Kitchner", "London"]
    },

    {
        filterType: "Industry",
        array: ["IT", "Network", "Cyber Security"]
    },

    {
        filterType: "Job Posting Time",
        array: ["Today", "3 days", "1 week"]
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
    }, [selectedValue])

    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='font-bold text-lg'> Filter Job </h1>
            <hr className='mt-3' />

            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
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
        </div >
    )
}

export default FilterCard