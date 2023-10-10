import icon from '../assets/components_svg/AllSvgs';

export type CategoryType = {
    category : string;
    categoryColor : string;
    url : string
};

export type CategoryDataType = CategoryType & {
    categoryIcon : any;
};

export type CategorySearchType = CategoryType & {
    subCategories? : SubCategorySearchType[]
};

export type SubCategorySearchType = Omit<CategorySearchType, "categoryColor"> & {};


export const category_data : CategorySearchType[] = [
    {
        category : "Moda",
        categoryColor : "bg-purple",
        url : "/search/Brasil?category=carros",
        subCategories : [
            {
                category : "Vestidos",                
                url : "/search/Brasil?category=carros"                
            },
            {
                category : "Calçados",                
                url : "/search/Brasil?category=carros",
                subCategories : [                    
                    {
                        category : "Sapatos",                
                        url : "/search/Brasil?category=carros"                
                    },
                    {
                        category : "Botas",                
                        url : "/search/Brasil?category=carros"                
                    }
                ]
            }
        ]
    }
];