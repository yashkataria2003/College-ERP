import React from 'react'

const Card_R = ({image, title, description}) => {
    return (
        <div div className="flex justify-between items-center px-[8vw] py-[2vh] bg-[#fff] rounded-md gap-x-[2vw]" >
            <div className="flex flex-col justify-center items-start px-[3vw] bg-[#fff] rounded-md py-[1vh]">
                <h2 className="text-[2rem]">{title}</h2>
                <p className="">
                    {description} 
                </p>
            </div>
            <img src={image} alt="Reload" className='h-[50vh] rounded-md' />
        </div >
    )
}

export default Card_R