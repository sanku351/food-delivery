import React from 'react'
import image1 from '../assets/image1.avif'
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import { RemoveItem, IncreaseQty, DecreaseQty } from '../redux/cartSlice';

function CatCard({name,id,price,image,qty}) {
    let dispatch = useDispatch()
    return (
        <div className='w-full h-[120px] shadow-lg p-2 flex justify-between'>
            <div className='w-[60%] h-full flex gap-5'>
                <div className='w-[60%] h-full overflow-hidden rounded-lg'>
                    <img src={image} alt="" className='objecct-cover'/>
                </div>
                <div className='w-[40%] h-full flex flex-col gap-5'>
                    <div className='text-lg text-gray-600 font-semibold'>{name}</div>
                    <div className=' w-[100px] text-xl font-semibold border-2 border-green-400 h-[50px] bg-slate-400 flex rounded-lg overflow-hidden shadow-lg'>
                        <button onClick={() => dispatch(DecreaseQty(id))} className='cursor-pointer hover:bg-gray-200 w-[30%] h-full text-green-400 bg-white flex justify-center items-center'>-</button>
                        <span className='w-[40%] h-full bg-slate-200 flex justify-center items-center'>{qty}</span>
                        <button onClick={() => dispatch(IncreaseQty(id))} className='cursor-pointer hover:bg-gray-200 w-[30%] h-full text-green-400 bg-white flex justify-center items-center'>+</button>
                    </div>
                </div>
            </div>
            <div className='flex flex-col justify-start items-end gap-6'>
                <span className='text-green-400 text-xl font-semibold'>Rs {price} /-</span>
                <RiDeleteBin6Line className='w-[30px] h-[30px] text-red-400 cursor-pointer' onClick={()=>dispatch(RemoveItem(id))} />
            </div>
        </div>
    )
}

export default CatCard