import { setLoading } from '@/redux/authSlice'
import { setAllJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/util/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchQuery, loading } = useSelector(store => store.job);
    useEffect(() => {

        const fetchAllJobs = async () => {
            dispatch(setLoading(true))
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchQuery || ""}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs))
                }

            } catch (error) {
                console.log(error);
            } finally {
                dispatch(setLoading(false))
            }
        }
        fetchAllJobs();
    }, [searchQuery, dispatch]);
}

export default useGetAllJobs