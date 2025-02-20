import React from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'

const skills = ["HTML", "CSS", "JavaScript", "PHP", "React.js", "Node.js"];

const Profile = () => {

    const isResume = true;

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>

                {/* Top box - Profile image - bio - edit icon */}
                <div className='flex justify-between'>
                    <div className='flex items-center'>
                        <Avatar className="h-24 w-24">
                            <AvatarImage src="https://st5.depositphotos.com/23188010/77609/i/450/depositphotos_776090452-stock-photo-letter-logo-vector-icon-illustration.jpg" alt="Profile" />
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl'>Full Name</h1>
                            <p>Add your bio here Officia eu ad aliquip pariatur.</p>
                        </div>
                    </div>
                    <Button className="text-right" variant="outline"><Pen /></Button>
                </div>

                {/* mail - phone no. */}
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail /><span>hiral@gmail.com</span>
                    </div>

                    <div className='flex items-center gap-3 my-2'>
                        <Contact /><span>1234567890</span>
                    </div>
                </div>

                {/* Skills */}
                <div className='my-5'>
                    <h1>Skills</h1>
                    <div className='flex items-center gap-1'>
                        {
                            (skills && skills.length > 0) ? skills.map((item, index) => <Badge key={index} variant="outline">{item}</Badge>) : <p>No Skills Found</p>
                        }
                    </div>
                </div>

                {/* Resume */}
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <Label className="text-md font-bold">Resume</Label>{
                        isResume ? <a target='blank' href='https://hiralsoni.work/' className='text-blue-500 w-full hover:underline cursor-pointer'>Hiral Soni Resume</a> : <span>Resume Not Found</span>
                    }
                </div>
            </div>

            {/* Applied job displayed in table */}
            <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
                <h1 className='font-bold text-lg my-5'>Applied Job</h1>
                <AppliedJobTable />
            </div>

        </div>
    )
}

export default Profile