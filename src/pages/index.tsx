import { Button } from '@/components/Button'
import React, { useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { BsGoogle } from 'react-icons/bs'


export default function Page() {
  return (
    <div className='flex h-screen w-full p-0 m-0 ' >
      <Slides />
      <FormField />
    </div>
  )
}

function FormField() {
  return (
    <div className='w-1/3  h-full flex flex-col items-center justify-center p-5'>
      <div className='w-[75%] flex flex-col items-center justify-center space-y-5'>
        <div className='mb-10 text-center space-y-5'>
          <p className='text-[35px] font-bold text-gray-800'>
            Buy and sell crypto.
            Seamlessly.
            In seconds.
            With no-to-low fees.
          </p>

          <p className='text-[20px]'>Smooth and easy</p>
        </div>


        <Button btnName='singInWithGoogle'
          className='space-x-2 py-3'
          onClick={() => {
            window.location.href = '/dashboard'
          }}
        >
          <BsGoogle />
          <span className='pl-2'>Sign in with Google</span>
        </Button>

        <div>
          <p className='text-[14px] text-gray-500 mt-5'>By signing in you agree to our
            <span className='underline'>Terms of Service</span> and
            <span className='underline'>Privacy Policy</span>
          </p>
        </div>

      </div>
    </div>
  )
}

type ISlide = { title: string; subtitle: string; img: string }
function Slides() {
  // slides with prev and next button
  const slides: ISlide[] = [
    { title: 'Slide 1', subtitle: 'This is slide 1', img: '/login/trend1.jpg' },
    { title: 'Slide 2', subtitle: 'This is slide 2', img: '/login/trend2.jpg' },
    { title: 'Slide 3', subtitle: 'This is slide 3', img: '/login/trend3.jpg' },
  ]
  return (
    <div className='w-2/3 h-full flex  p-0 m-0'>
      <EmblaCarousel slides={slides} />
    </div>
  )
}


export function EmblaCarousel(props: { slides: ISlide[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, "duration": 250, }, [Autoplay()])

  useEffect(() => {
    if (emblaApi) {
      console.log(emblaApi.slideNodes()) // Access API
    }
  }, [emblaApi])

  return (
    <div className="h-full w-full" ref={emblaRef} style={{ width: '100%', overflow: 'hidden' }}>
      <div className="h-full" style={{ display: 'flex' }}>
        {props.slides?.map((slide, index) => (
          <div
            className="h-full" key={index}
            style={{ minWidth: '100%', boxSizing: 'border-box', flex: '0 0 100%' }}>
            <img src={slide.img} alt={slide.title} className='absolute w-full h-full object-cover' />
            <h3>{slide.title}</h3>
            <p>{slide.subtitle}</p>   </div>
        ))}
      </div>
    </div>
  )
}