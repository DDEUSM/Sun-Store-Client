import { ErrorType } from "./types";

export class ErrorManagement implements ErrorType
{
    errorMessage: string;
    errorStatus: boolean;

    public static get initialErrorState()
    {
        return {
            errorStatus: false,
            errorMessage: ""
        } as ErrorType
    }
}