import React, { useState } from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/util/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const UpdateProfileDialog = ({ open, setOpen }) => {

    const [loading, setLoading] = useState(false)
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        fullname: user?.fullname,
        email: user?.email,
        phoneNumber: user?.phonenumber,
        bio: user?.profile?.bio,
        skills: user?.profile?.skills?.map(skill => skill),
        file: user?.profile?.resume
    });

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email)
        formData.append("phonenumber", input.phoneNumber)
        formData.append("bio", input.bio)
        formData.append("skills", input.skills)
        if (input.file) {
            formData.append("file", input.file)
        }
        try {
            setLoading(true)
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    "Content-Type": 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
                setOpen(false)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        } finally {
            setLoading(false);
        }

    }

    // const [fileName, setFileName] = useState(user?.profile?.resume || "");
    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file })
        // setFileName(file.name);
    }

    return (
        <div>
            <Dialog open={open}>
                <DialogContent className="sm:max-w-[425px] bg-white" onInteractOutside={() => setOpen(false)}>
                    <DialogHeader>
                        <DialogTitle>Update Profile</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submitHandler}>
                        <div className='grid gap-4 py-4'>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="name" className="text-right">Name</Label>
                                <Input
                                    className="col-span-3"
                                    id="name"
                                    name="fullname"
                                    onChange={changeEventHandler}
                                    value={input.fullname} />
                            </div>
                        </div>

                        <div className='grid gap-4 py-4'>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="email" className="text-right">Email</Label>
                                <Input
                                    className="col-span-3"
                                    id="email"
                                    value={input.email}
                                    onChange={changeEventHandler}
                                    name="email" />
                            </div>
                        </div>

                        <div className='grid gap-4 py-4'>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="number" className="text-right">Number</Label>
                                <Input
                                    className="col-span-3"
                                    onChange={changeEventHandler}
                                    id="number"
                                    value={input.phoneNumber}
                                    name="phoneNumber" />
                            </div>
                        </div>

                        <div className='grid gap-4 py-4'>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="bio" className="text-right">Bio</Label>
                                <Input
                                    className="col-span-3"
                                    value={input.bio}
                                    onChange={changeEventHandler}
                                    id="bio"
                                    name="bio" />
                            </div>
                        </div>

                        <div className='grid gap-4 py-4'>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="skills" className="text-right">Skills</Label>
                                <Input
                                    className="col-span-3"
                                    onChange={changeEventHandler}
                                    id="skills"
                                    value={input.skills}
                                    name="skills" />
                            </div>
                        </div>

                        <div className='grid gap-4 py-4'>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="file" className="text-right">Resume</Label>
                                <Input
                                    className="col-span-3"
                                    id="file"
                                    name="file"
                                    type="file"
                                    onChange={fileChangeHandler}
                                    // value={input.file.name}
                                    accept="application/pdf" />
                            </div>
                            {/* {fileName && <p className='text-sm text-gray-500 grid grid-cols-4 items-center gap-4'>Selected File: {fileName}</p>} */}
                        </div>
                        <DialogFooter>
                            {
                                loading ? <Button className="w-full"><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please Wait</Button> : <Button type="submit" className="w-full my-4 bg-slate-800 text-white" variant="outline" >Update</Button>
                            }
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default UpdateProfileDialog