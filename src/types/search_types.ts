import { CategoryType } from "./category_types";

export type SearchReducertype = {
    state : string;
    category_index? : number;
    sub_category_index? :number;
    title? : string;
    
};

export type SearchStateType = {
    params : SearchReducertype;
}