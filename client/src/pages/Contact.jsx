import { Card } from 'flowbite-react'
import React from 'react'
import Form from '../components/form'
// import { useState } from 'react'
const Contact = () => {
    const [initialValues, setInitialValues] = React.useState({
        firstname:"", 
        lastname:"", 
        email:"", 
        description:"",
    }) 
    const fields =[ { 
        name:"firstname",
        label:"First Name"
    }, 
    {
        name:"lastname", 
        label:"Last Name"
    }, { 
        name:"description", 
        lable:"how we can help you", 
        inputType: "area", 
        placeholder:"how we can help you",
    }
]; 
function handleSubmit () {
    console.log("handlesubmit"); 
}
const handleChange = (value, fieldName) =>{ 
    setInitialValues({ ...initialValues, [fieldName]: value });
   }
  return (
    <div className='w-full flex flex-col justify-center items-center mt-10 lg:scale-[1.5] scale-100  origin-top'>
     <h1 className='text-3xl font-bold'>
        Contact us 
     </h1>
     <Form  shadow={false} fields={fields} initialValues={initialValues} onSubmit={handleSubmit} handleChange={handleChange}  msg='SEND MESSAGE'/>

   
     </div>
  )
}

export default Contact