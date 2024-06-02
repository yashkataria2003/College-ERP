import React from 'react'

const Card_L = ({image, title, description}) => {
    return (
        <div className="flex justify-between items-center px-[8vw] py-[2vh] bg-[#abd4f5] rounded-md gap-x-[2vw]">
            <img src={image} alt="Reload" className='h-[50vh] rounded-md'/>
            <div className="flex flex-col justify-center items-start px-[3vw] bg-[#fff] rounded-md py-[1vh]">
                <h2 className="text-[2rem]">{title}</h2>
                <p className="">
                    {description}
                </p>
            </div>
        </div>
    )
}

export default Card_L
