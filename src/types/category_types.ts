export type CategoryType = {
    "_id" : ""
    name : string;
    sub_category? : CategoryType[];
    color? : string;
    category_icon? : JSX.Element;
    filters? : string;
}



export type CategoryStateType = {
    all_categories : CategoryType[];
}
