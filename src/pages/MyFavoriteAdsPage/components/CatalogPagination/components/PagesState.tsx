import { PaginationType } from "../../../OutletSearchResults/types"

type Props = {
    pagination: PaginationType;
}

export default function({ pagination }: Props)
{   
    return(
        <div className="flex justify-center items-center gap-1 ">
            <p className="flex justify-center items-center bg-gray text-darkGray h-8 w-8 font-bold rounded dark:text-white dark:bg-darkGray">
                { pagination.actual_page }
            </p>
            <p className='dark:text-darkGray'>
                de
            </p>
            <p className="flex justify-center items-center bg-gray text-darkGray h-8 w-8 font-bold rounded dark:text-white dark:bg-darkGray">
                { pagination.tot_pages }
            </p>
        </div>       
    )
}