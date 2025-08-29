import React, { useEffect, useState } from 'react'
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
import useDocumentTitle from '@/hooks/useDocumentTitle'
import { parsePhoneNumberFromString, AsYouType } from 'libphonenumber-js'

function Signup() {

    useDocumentTitle("Signup");

    const phoneNumberFormatter = new AsYouType('CA');
    const [isValidPhone, setIsValidPhone] = useState(true);
    const [errorText, setErrorText] = useState("");
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });

    const navigate = useNavigate();
    const { loading, user } = useSelector(store => store.auth);
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {

        if (e.target.name === "phoneNumber") {
            const formattedNumber = phoneNumberFormatter.input(e.target.value)
            setInput({ ...input, [e.target.name]: formattedNumber })
        } else {
            setInput({ ...input, [e.target.name]: e.target.value });
        }
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

    const checkPhoneHandler = (e) => {
        const phone = e.target.value.trim();

        if (phone.length && !phone.startsWith("+")) {
            setIsValidPhone(false);
            setErrorText("Please include country code (e.g., +1)")
            return;
        }

        // check valid phone using library
        const phoneLib = parsePhoneNumberFromString(phone);

        if (!phoneLib) {
            setIsValidPhone(false);
            setErrorText("Invalid number format. Check your digits and country code.")
            return
        }

        if (!phoneLib.isPossible()) {
            setIsValidPhone(false);
            setErrorText("This number doesn't seem possible. Check the length and digits.")
            return
        }

        if (!phoneLib.isValid()) {
            setIsValidPhone(false);
            setErrorText("This number is not valid. Make sure you typed it correctly.");
            return;
        }

        setIsValidPhone(true);
        setErrorText("");
    }

    useEffect(() => {
        if (user) {
            navigate("/")
        }
    }, []);

    return (
        <>
            <Navbar />

            <div className='flex items-center justify-center mx-auto'>
                <form onSubmit={submitHandler} className='max-w-5xl w-full md:w-1/2 lg:w-1/3 sm:w-full mx-5 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Sign Up</h1>

                    <div className='my-2'>
                        <Label>Full Name<span className='text-red-700'>*</span></Label>
                        <Input
                            type="text"
                            placeholder="John Doe"
                            value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className='my-2'>
                        <Label>Email<span className='text-red-700'>*</span></Label>
                        <Input
                            type="email"
                            placeholder="john@gmail.com"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            required />
                    </div>

                    {/* Phone number */}
                    <div className='my-2'>
                        <Label>Phone Number<span className='text-red-700'>*</span></Label>
                        <Input
                            type="text"
                            placeholder="+1 123 456 7890"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                            onBlur={checkPhoneHandler}
                            className={isValidPhone ? "" : "border-b-red-700"}
                            required />
                        {isValidPhone ? "" : <span className='text-sm text-red-700'>{errorText}</span>}
                    </div>

                    {/* Password */}
                    <div className='my-2'>
                        <Label>Password</Label><span className='text-red-700'>*</span>
                        <Input
                            type="password"
                            placeholder="Password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            required
                        />
                    </div>

                    {/* Confirm password */}
                    <div className='my-2'>
                        <Label>Confirm Password</Label><span className='text-red-700'>*</span>
                        <Input type="password" placeholder="Confirm Password" />
                    </div>

                    <div className='flex items-center justify-between'>
                        <RadioGroup className="flex flex-col sm:flex-row items-center gap-4 my-5">
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