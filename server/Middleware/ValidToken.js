const { verify } =require( "jsonwebtoken");
const { secreatKey }=require( "../Const");

const validtoken=async(req,res,next)=>{
    const {accessToken}=req.headers;
    if(accessToken)
    {
        const verifydata=verify(accessToken,secreatKey);
        if(verifydata)
        {
            console.log("data",verifydata);
            req.user=verifydata;
            return next();
        }
        else{
            return res.json({err:"Invalid user!"})
        }

    }
}
module.exports= {validtoken};