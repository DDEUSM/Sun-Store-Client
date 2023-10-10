type Props = {
    title: string;
    countItems: number;
}

export default function({ title, countItems }: Props){
    return(
        <div className='flex justify-center items-center lg:text-2xl text-darkGray h-[44px] w-full'>
            <p className='dark:dark:text-white'> 
                <span className='text-[14px] font-light'>
                    { title } 
                </span> 
                {countItems} 
                {countItems > 1? (
                    ' anúncios'
                    ) : (
                        ' anúncio'
                    )
                }
            </p>
        </div>
    )
}