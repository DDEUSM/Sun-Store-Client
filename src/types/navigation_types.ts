export type HistoryType = {
    id : number
    url : string;
    name : string;
    active : boolean;
};

export type HistoryReducerType = {
    url_history : HistoryType[]
};

export type UrlParamsStructureType = {
    type? : string;
    value? : string;
};