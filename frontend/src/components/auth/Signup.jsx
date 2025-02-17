import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/util/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

function Signup() {

    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });

    const navigate = useNavigate();
    const { loading } = useSelector(store => store.auth);
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("password", input.password);
        formData.append("role", input.role);
        formData.append("phonenumber", input.phoneNumber);

        if (input.file) {
            formData.append("file", input.file);
        }

        for (let pair of formData.entries()) {
            console.log(pair[0] + ": " + pair[1]);
        }


        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData,
                { withCredentials: true }
            );
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    }

    return (
        <>
            <Navbar />

            <div className='flex items-center justify-center mx-auto'>
                <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Sign Up</h1>

                    <div className='my-2'>
                        <Label>Full Name</Label>
                        <Input
                            type="text"
                            placeholder="Hiral Soni"
                            value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                        />
                    </div>

                    {/* Email */}
                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            placeholder="hiral@gmail.com"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler} />
                    </div>

                    <div className='my-2'>
                        <Label>Phone Number</Label>
                        <Input
                            type="text"
                            placeholder="(123) 456-7890"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler} />
                    </div>

                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            placeholder="Password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                        />
                    </div>

                    <div className='my-2'>
                        <Label>Confirm Password</Label>
                        <Input type="password" placeholder="Confirm Password" />
                    </div>

                    <div className='flex items-center justify-between'>
                        <RadioGroup className="flex items-center gap-4 my-5">
                            <div className="flex items-center space-x-2">
                                {/* <RadioGroupItem value="default" id="r1" /> */}
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    className="cursor-pointer"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                {/* <RadioGroupItem value="comfortable" id="r2" /> */}
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    className="cursor-pointer"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler} />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <div className='flex items-center gap-2'>
                        <Label>Profile</Label>
                        <Input
                            accept="image/"
                            type="file"
                            className="cursor-pointer"
                            name="file"
                            onChange={changeFileHandler}
                        />
                    </div>

                    {
                        loading ?
                            <Button className="w-full"><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please Wait</Button>
                            : <Button type="submit" className="w-full my-4 bg-slate-800 text-white" variant="outline" >Sign Up</Button>
                    }

                    <span className='text-sm'>Already have an account? <Link to='/login' className='text-blue-700'>Login</Link></span>
                </form>
            </div>

        </>
    )
}

export default Signup