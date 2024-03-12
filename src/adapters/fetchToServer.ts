import { ErrorType } from "../errors/types"

export async function fetchToServer(fetchAction: Function, data: any): Promise<FetchResponse>
{   
    let response: any
    try 
    {
        response = await fetchAction(...data)        
    } 
    catch (error) 
    {        
        return { 
            ok: false, 
            error: {
                errorStatus: true,
                errorMessage: error?.message? 
                error.message 
                : 
                "Ocorreu algum erro inesperado!"
            },
            data: null 
        }
    }
    return { ok: true, error: null, data: response }
}

type FetchResponse = {
    ok: boolean,
    error: ErrorType | null,
    data: any
}