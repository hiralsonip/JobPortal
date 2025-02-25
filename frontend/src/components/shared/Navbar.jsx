import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_END_POINT } from '@/util/constant'
import { setUser } from '@/redux/authSlice'

const Navbar = () => {

    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);

            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }
    }

    return (
        <>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                {/* Header */}
                <div>
                    <h1 className='text-2xl font-bold'>Job <span className='text-[#F83002]'>Portal</span></h1>
                </div>

                {/* Menu */}
                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5'>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/jobs">Jobs</Link> </li>
                        <li><Link to="/browse">Browse</Link> </li>
                    </ul>

                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to='/login'>
                                    <Button variant='outline'>
                                        Login
                                    </Button>
                                </Link>

                                <Link to='/signup'>
                                    <Button className='bg-[#6A38C2] hover:bg-[#551eb3]'>
                                        Signup
                                    </Button>
                                </Link>

                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className='cursor-pointer'>
                                        <AvatarImage src={user.profile.profilePhoto} alt="@shadcn" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className='w-80'>
                                    <div className='flex gap-4 space-y-2'>
                                        <Avatar className='cursor-pointer'>
                                            <AvatarImage src={user.profile.profilePhoto} alt="@shadcn" />
                                        </Avatar>
                                        <div>
                                            <h4 className='font-medium'>{user.fullname}</h4>
                                            <p className='text-sm text-muted-foreground'>This is the introduction</p>
                                        </div>
                                    </div>

                                    <div className='flex flex-col text-gray-600'>
                                        <div className='flex w-fit'>
                                            <User2 />
                                            <Button variant="link"><Link to="/profile">Profile</Link></Button>
                                        </div>
                                        <div className='flex w-fit'>
                                            <LogOut />
                                            <Button variant="link" onClick={logoutHandler}>Logout</Button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }


                </div>

            </div>
        </>
    )
}

export default Navbar