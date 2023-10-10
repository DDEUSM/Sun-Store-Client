import axios from "axios";
import URL_BASE from "./xhr";

async function getAllCategories(){
    const allCategories = await axios.get(URL_BASE+"/all-categories");
    return allCategories.data;
}

export default { getAllCategories };