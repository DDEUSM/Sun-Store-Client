import { Dispatch, SetStateAction } from "react";
import { PaginationType } from "../../../OutletSearchResults/types";

type Props = {
    pagination: PaginationType;
    setPaginationInfos: Dispatch<SetStateAction<PaginationType>>;
    buttonType: "previous" | "next";
}

export default function({ pagination, setPaginationInfos, buttonType }: Props)
{
    function toPreviousPage()
    {
        if(pagination.actual_page > 1){
            setPaginationInfos({...pagination, actual_page : pagination.actual_page - 1});
        }
    }

    function toNextPage()
    {
        if(pagination.actual_page < 3){
            setPaginationInfos({...pagination, actual_page : pagination.actual_page + 1});
        }
    }

    function definesButtonStyle()
    {
        if(buttonType == "next"){
            return `${pagination.actual_page < pagination.tot_pages?(
                ``
            ):(
                `invisible`
            )} hover:text-orange ease-in-out duration-100 dark:text-gray`
        }
        return `${pagination.actual_page > 1?(
            ``
        ):(
            `invisible`
        )} hover:text-orange ease-in-out duration-100 dark:text-darkGray`
    }

    return(
        <button onClick={buttonType === "next"?
            (
                toNextPage
            ):(
                toPreviousPage
            )}>
            <p className={definesButtonStyle()}>
                {buttonType === "next"?
                (
                    "Próxima >"
                ):(
                    "< Anterior"
                )}
            </p>
        </button>
    )
}