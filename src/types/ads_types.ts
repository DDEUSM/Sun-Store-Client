import { CategoryType } from "./category_types";

export type AdsType = {
    "_id" : string;
    "address" : string; 
    "category" : CategoryType;
    "date_created" : string;
    "description" : string;
    "idUserCreator" : string;
    "likes" : number;
    "price" : number;
    "priceNegotiable" : boolean;
    "status" : boolean;
    "title" : string;
    "views" : number;
    "url_image" : [string];
};

export type AdsStateType = {
    all_ads : AdsType[]
}