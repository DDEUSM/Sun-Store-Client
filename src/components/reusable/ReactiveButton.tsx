import { useEffect } from "react";

type TProps = {
    textcolor: string,    
    backgrounColor: string,    
    text: string,   
    type: "submit",
    able: boolean
}

export default function ReactiveButton( props: TProps )
{
    
    function dynamicProperties(state)
    {
        if (state)
        {
            const classProperties = [            
                "text-"+props.textcolor+" hover:brightness-90",
                "bg-"+props.backgrounColor+" hover:brightness-95",                  
            ]
            return classProperties.toString()
            .replace(",", " ");
        }
        const classProperties = [            
            "text-"+props.textcolor+" brightness-90",
            "bg-"+props.backgrounColor+" brightness-90",                  
        ]
        return classProperties.toString()
        .replace(",", " ");
    }

    return (
        props.able? (
            <button className={dynamicProperties(true)+
                " h-fit py-2 px-4 rounded-md ease-in-out duration-100 shadow-md"}        
                type={props.type}
                >
                    { props.text }
            </button>
        ): (
            <button className={dynamicProperties(false)+
                " h-fit py-2 px-4 rounded-md ease-in-out duration-100 shadow-md"}        
                type={props.type}
                disabled
                >
                    { props.text }
            </button>
        )
    )
}