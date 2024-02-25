import { useState } from "react"
import Datepicker from "tailwind-datepicker-react"
import { IOptions } from "tailwind-datepicker-react/types/Options"

type Props = {
    birthDateHandler: (e: Date) => void
}

export default function MyDatepicker({ birthDateHandler }: Props)
{
    const options: IOptions = {
        title: "Data de Nascimento",
        autoHide: true,
        todayBtn: false,
        clearBtn: true,
        clearBtnText: "Clear",
        maxDate: new Date("2030-01-01"),
        minDate: new Date("1950-01-01"),
        theme: {
            background: "bg-gray dark:bg-black",
            todayBtn: "text-white",
            clearBtn: "text-white bg-orange",
            icons: "text-darkGray bg-gray",
            text: "text-black",
            disabledText: "text-darkGray",
            input: "border-none",
            inputIcon: "",
            selected: "text-orange",
        },
        icons: {
            // () => ReactElement | JSX.Element
            prev: () => <span>{"<"}</span>,
            next: () => <span>{">"}</span>,
        },
        datepickerClassNames: "top-12",
        language: "pt-br",
        disabledDates: [],
        weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
        inputNameProp: "date",
        inputIdProp: "date",
        inputPlaceholderProp: "Selecione uma data",
        inputDateFormatProp: {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    }
    
    
    const [show, setShow] = useState<boolean>(false)
  
    const handleClose = (state: boolean) => {
        setShow(state)
    }

    return (
        <div className="w-3/4">
            <Datepicker options={options} onChange={birthDateHandler} show={show} setShow={handleClose} />
        </div>
    )
    
}