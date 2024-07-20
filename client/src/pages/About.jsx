import { Quote } from 'lucide-react'
import React from 'react'
import {Card} from "@material-tailwind/react"
const About = () => {
  return (
    <div className='w-full flex flex-col justify-center items-center mt-32 lg:scale-[1.5] scale-100  origin-top gap-20'>
     <h1 className='text-3xl font-bold'>
        About us 
     </h1>
     <div className='flex flex-row gap-5'>
     <Card className='flex items-center w-[18em] p-5'>
        <img src="../../public/person.png" alt="person" className='w-20' />
        <span className='font-bold'> Said Ibenariba</span>
        <span className='text-xs'>computer science student</span>
       <p className='italic text-xs'> <Quote className='w-2'/>
       said this is my vision can I build anything from sctarch through technologies.
       </p>
     </Card>
     <Card className='flex items-center w-[18em] p-5'>
     <img src="../../public/person.png" alt="person" className='w-20'/>
        <span className='font-bold'> Iliass Wakkar</span>
        <span className='text-xs'>computer science student</span>
       <p className='italic text-xs'> <Quote className='w-2'/>
       said this is my vision can I build anything from sctarch through technologies.
       </p>
     </Card>
     </div>
     </div>
  )
}

export default About 