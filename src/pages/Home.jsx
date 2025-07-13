import React, { useContext, useState } from 'react'
import Nav from '../components/Nav'
import Category from './Category'
import Card from '../components/Card'
import { food_items } from '../food'
import { dataContext } from '../context/UserContext'
import { RxCross2 } from "react-icons/rx";
import CatCard from '../components/CatCard'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

function Home() {
    let { cat, setCat, input, showCart, setShowCart } = useContext(dataContext)

    function filter(Category) {
        if (Category === 'All') {
            setCat(food_items)
        } else {
            let newList = food_items.filter((item) => (
                item.food_category === Category
            ))
            setCat(newList)
        }
    }

    let items = useSelector(state => state.cart)

    let subtotal = items.reduce((total, item) => total + item.qty * item.price, 0)
    let deliveryFee = 20;
    let taxes = subtotal * 0.5 / 100;
    let total = Math.floor(subtotal + deliveryFee + taxes);


    return (
        <div className='w-full min-h-screen bg-slate-200'>
            <Nav />
            {!input ?
                <div className='flex flex-wrap justify-center items-center gap-5 w-[100%]'>
                    {Category.map((item) => {
                        return <div key={item.id} className='w-[140px] h-[150px] bg-white flex flex-col items-start gap-5 p-5 justify-start text-[20px] font-semibold text-gray-600 rounded-lg shadow-xl hover:bg-green-200 cursor-pointer transition-all duration-200' onClick={() => filter(item.name)}>
                            {item.icon}
                            {item.name}
                        </div>
                    })}
                </div> : null}

            <div className='flex flex-wrap gap-5 w-full px-5 justify-center items-center pt-8 pb-8'>
                {cat.length > 1 ?
                    
                        cat.map((item) => (
                            <Card key={item.id} name={item.food_name} image={item.food_image} price={item.price} id={item.id} type={item.food_type} />
                        ))
                    
                    : <div className='text-center text-2xl text-green-400 font-semibold pt-5'>No dish found</div>
                }
            </div>
            <div className={`w-full md:w-[40vw] h-full fixed top-0 right-0 flex flex-col items-center overflow-auto bg-white shadow-xl p-6 transition-all duration-500 ${showCart ? 'translate-0' : 'translate-x-full'}`} >
                <header className='w-full flex justify-between items-center'>
                    <span className='text-green-400 text-[18px] font-semibold'>Order Items</span>
                    <RxCross2 className='cursor-pointer hover:text-gray-600 w-[20px] h-[20px] text-[18px] font-semibold text-green-400' onClick={() => setShowCart(false)} />
                </header>
                {items.length > 0 ?
                    <>
                        <div className='w-full mt-9 flex flex-col gap-5'>
                            {items.map((item) => (
                                <CatCard name={item.name} price={item.price} image={item.image} id={item.id} qty={item.qty} />
                            ))}
                        </div>
                        <div className='w-full border-gray-400 mt-7 border-t-2 border-b-2 flex flex-col p-8 gap-2 text-lg'>
                            <div className='w-full flex justify-between items-center'>
                                <span className='text-lg text-gray-600 font-semibold'>Sub Total</span>
                                <span className='text-green-400 font-semibold text-lg'>Rs {subtotal} /-</span>
                            </div>
                            <div className='w-full flex justify-between items-center'>
                                <span className='text-lg text-gray-600 font-semibold'>Delivery Fee</span>
                                <span className='text-green-400 font-semibold text-lg'>Rs {deliveryFee} /-</span>
                            </div>
                            <div className='w-full flex justify-between items-center'>
                                <span className='text-lg text-gray-600 font-semibold'>Taxes</span>
                                <span className='text-green-400 font-semibold text-lg'>Rs {taxes} /-</span>
                            </div>
                        </div>
                        <div className='w-full flex p-6 text-2xl justify-between items-center'>
                            <span className='text-gray-600 font-semibold'>Total</span>
                            <span className='text-green-400 font-semibold'>Rs {total} /-</span>
                        </div>
                        <button className='w-[80%] p-4 bg-green-500 hover:bg-green-400 transition-all rounded-lg text-white cursor-pointer' onClick={()=>{toast.success("Order Successfully")}}>Place Order</button>
                    </>
                    :
                    <div className='text-center text-2xl text-green-400 font-semibold pt-5'>Empty Cart</div>
                }

            </div>
        </div>
    )
}

export default Home