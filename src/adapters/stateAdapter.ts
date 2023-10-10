import axios from "axios";
import URL_BASE from "./xhr";

async function getAllStates(){

    const result_req = await axios.get(`${URL_BASE}/all-states`);    
    return result_req.data;

}

export default { getAllStates };