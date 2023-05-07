import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Storage = () => {
    const [data,setData] = useState([])
    useEffect(()=>{
       
        fetch('http://localhost:5000/users')
        .then(res => res.json())
        .then(data => {
            setData(data)
        })
    },[data])

    const handelOnclick = id =>{
        console.log(id)
    }

    const deleteData = id =>{
        fetch(`http://localhost:5000/users/${id}`,{
            method:'DELETE',
        })
        .then(res => res.json())
        .then(data => {
            toast.success('data Deletted successfull!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        })
    }
    
    return (
        <div className='container mx-auto mt-10'>
            <div className="overflow-x-auto">
                <table className="table w-full mt-5">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Number</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        data.map((singleData,index) => <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{singleData.name}</td>
                            <td>{singleData.email}</td>
                            <td>{singleData.phoneNumber}</td>
                            <td onClick={()=>handelOnclick(singleData._id)}><Link to={`/data/${singleData._id}`}>Edit</Link></td>
                            <td onClick={()=>deleteData(singleData._id)}>Delete</td>
                        </tr>)
                    }
                    </tbody>
                </table>
                </div>
            
        </div>
    );
};

export default Storage;