import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchQuery } from '@/redux/jobSlice'

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "Full Stack Developer",
]

const CategoryCarousel = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchQuery(query));
        navigate("/browse");
    }

    return (
        <>
            {/* <Carousel className="w-full sm:w-full md:max-w-xl mx-auto my-20"> */}
            {/* <Carousel className="my-20 mx-auto w-40"> */}
            <Carousel className="my-20 mx-auto w-40 sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4">
                <CarouselContent>

                    {
                        category.map((cat, index) => (
                            <CarouselItem className="w-full sm:w-1/2 md:basis-1/2 lg-basis-1/3" key={index}>
                                <Button variant="outline" className="rounded-full" onClick={() => searchJobHandler(cat)}>
                                    {cat}
                                </Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel >
        </>
    )
}

export default CategoryCarousel