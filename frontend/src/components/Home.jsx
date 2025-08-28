import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchQuery } from '@/redux/jobSlice'
import useDocumentTitle from '@/hooks/useDocumentTitle'

function Home() {

    useDocumentTitle("Home");

    const dispatch = useDispatch();
    const { searchQuery, loading } = useSelector(store => store.job)
    // useEffect(() => {
    //     dispatch(setSearchQuery(''))
    // }, [dispatch]);

    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.role === 'recruiter') {
            navigate("/admin/companies");
        }
    }, []);

    useGetAllJobs();

    if (loading) {
        return <div>Loading ...</div>
    }

    return (
        <div>
            <Navbar />
            <HeroSection />
            <CategoryCarousel />
            <LatestJobs />
            <Footer />
        </div>
    )
}

export default Home