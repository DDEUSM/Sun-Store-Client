import { useState } from "react";
import Menu from "../../components/Menu";

import ShortcutBar from "../../components/ShortcutBar";
import AddressGroup from "./components/AddressGroup";
import CategoryGroup from "./components/CategoryGroup";
import DragAndDropImage from "./components/DragAndDropImage";
import OfferGroup from "./components/OfferGroup";
import PreviewButton from "./components/PreviewButton";
import PublishButton from "./components/PublishButton";
import TextGroup from "./components/TextGroup";

export default function(){
    const [ windowStatus, openMenu ] = useState(false);

    function openWindowMenu(){
        openMenu(!windowStatus)
    }
    return(
        <div className="flex justify-center w-full mb-10 gap-2 lg:mt-5">
                        
            <ShortcutBar.ShadowBackground 
                windowStatus={windowStatus}
                closeWindow={openWindowMenu}                
            />   

            <div className="flex flex-col gap-3 w-full lg:grid lg:grid-cols-2">
                
                <TextGroup.Container className="flex flex-col w-full border-2 border-darkGray rounded-lg p-2 mt-1 lg:col-span-2">
                    <TextGroup.InputTitle />
                    <TextGroup.InputDescription />
                </TextGroup.Container>  

                <DragAndDropImage />

                <CategoryGroup.Container>
                    <CategoryGroup.CategorySelectBox />
                    <CategoryGroup.SubCategorySelectBox />
                </CategoryGroup.Container>

                <OfferGroup.Container>
                    <OfferGroup.InputPrice />
                    <OfferGroup.SelectNegotiableStatus />
                </OfferGroup.Container>

                <AddressGroup.Container>                
                    <AddressGroup.InputStreet />
                    <AddressGroup.InputHouseNumber />
                    <AddressGroup.InputNeighborhood />
                    <AddressGroup.InputCity />
                    <AddressGroup.InputState />
                </AddressGroup.Container>
                
                <div className="flex gap-2">
                    <PublishButton />
                    <PreviewButton />
                </div>            

                <ShortcutBar.Container >                               
                    <ShortcutBar.Button 
                        type="openMenu" 
                        isActivated={windowStatus}  
                        openWindow={openWindowMenu}
                    />                
                </ShortcutBar.Container>
            </div>
        </div>
    )
}