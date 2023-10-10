import axios from "axios";
import URL_BASE from "./xhr";

export type LikeAdsType = {
    userId : string,
    adId : string
}

async function likeAds({ userId, adId } : LikeAdsType)
{
    console.log('Dando Like.... ')
    console.log(userId, adId);
    let anyError : any;
    let newTokens : any;
    try 
    {
        await axios.post(`${URL_BASE}/user/favorite-or-desfavorite-ad`, {
            userId,
            adId
        }, {
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Authorization' : `Bearer ${localStorage.getItem("token")}`
            }
        });
        console.log("Funcionou!");
        return;
    } 
    catch (error : any) 
    {       
        anyError = error.response; 
    }
    if(anyError.status === 401)
    {
        const refreshTk = localStorage.getItem("refresh_token");
        try 
        {
            newTokens = await axios.post(`${URL_BASE}/refresh-token`, {
                refresh_token : refreshTk
            },{
                headers : {
                    'Content-Type' : 'application/x-www-form-urlencoded'
                }
            }); 
            console.log("newTokens:");
            console.log(newTokens);
            if(newTokens.data.refresh_token.length !== 24) 
            {
                console.log("tokens: ");
                console.log(newTokens);
                console.log("Ocorreu algum problema na geração do novo token")
                return;
            }
            const { new_token, refresh_token } = newTokens.data;            
            localStorage.setItem("token", new_token);
            localStorage.setItem("refresh_token", refresh_token);
            return likeAds({userId: userId, adId: adId});           
        } 
        catch (error : any) 
        {
            console.log("error no refresh_token");
            console.log(error.response);
            return;
        }                        
    }
    console.log(anyError.data);
};

async function visualizeAds({ userId, adId } : LikeAdsType)
{
    console.log("Visualização:");
    console.log(userId, adId);
    try
    {
        await axios.post(`${URL_BASE}/user/visualize-ad`, {
            userId, 
            adId
        }, {
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'
            }
        }); 
    }
    catch (error : any)
    {
        console.log(error.response);
    }
}

async function deslikeAds({ userId, adId }: LikeAdsType)
{
    console.log('request: ');
    console.log(userId, adId);
    try {
        await axios.post(`${URL_BASE}/user/deslike-ads`, {
            user_id: userId,
            ads_id: adId,
        },{
            headers : {
                "Content-Type" : "application/x-www-form-urlencoded"
            }
        });
    } catch (error) {
        
    }
}

export default { likeAds, deslikeAds, visualizeAds };