import axios from "axios";
import URL_BASE from "./xhr";

async function uploadProfileImage(data: any, userId: any)
{
    const response = await axios.post(
        `${URL_BASE}/user/upload-profile-image/${userId}`,
        { profileImage: data.profileImage[0] },
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    );
}

export default { uploadProfileImage }
