import React from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'

// Filter type - location, salary, industry

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi", "Pune", "Surat", "Banglore", "Ahmedabad"]
    },

    {
        filterType: "Industry",
        array: ["IT", "Network", "Cyber Security"]
    },

    {
        filterType: "Salary",
        array: ["Delhi", "Pune", "Surat", "Banglore", "Ahmedabad"]
    },

    {
        filterType: "Job Posting Time",
        array: ["Today", "3 days", "1 week"]
    }
]

const FilterCard = () => {
    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='font-bold text-lg'> Filter Job </h1>
            <hr className='mt-3' />

            <RadioGroup>
                {
                    filterData.map((data, index) => (
                        <div>
                            <h1 className='font-bold text-lg'>{data.filterType}</h1>
                            {
                                data.array.map((item, index) => {
                                    return (
                                        <div className='flex items-center space-x-2 my-2'>
                                            <RadioGroupItem value={item} />
                                            <Label>{item}</Label>
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