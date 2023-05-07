import React, { useState } from 'react';


const Home = () => {
    const [update,setUpdate] = useState({})

    const handelOnchenge = e =>{
        const field = e.target.name;
        const value = e.target.value;
        const newValue = {...update}
        newValue[field] = value;
        setUpdate(newValue)
    }

  
    const formSubmit = (e)=>{
        console.log(update)
        e.preventDefault();
        fetch('http://localhost:5000/users',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(update)
        })
        .then(res => res.json())
        .then(data => {
            if(data.insertedId){
                e.target.reset()
            }
        })
    }

    


    return (
        <div className='container md:mx-auto border-white'>
            <div style={{maxWidth:'600px',textAlign:'center',margin:'0 auto'}}>
            <form className='my-10 p-4 m-4 shadow-2xl' onSubmit={formSubmit}>
                <h4 className='text-center text-2xl'>Input Your Value</h4>
                <input name='name' onChange={handelOnchenge} placeholder='Enter Your Name' type="text" className='w-full shadow form-control p-2 rounded my-5 ' />   <br /> 

                <input name='email' onChange={handelOnchenge} placeholder='Enter Your Email' type="email" className='w-full shadow form-control p-2 rounded my-5 ' />   <br /> 

                <input name='phoneNumber' onChange={handelOnchenge} placeholder='Enter Your Number' type="number" className='w-full shadow form-control p-2 rounded my-5 ' />   <br /> 

                

                <button type='submit' className='btn px-6 py-2'>Submit</button>
            </form> 
            </div> 
        </div>
    );
};

export default Home;