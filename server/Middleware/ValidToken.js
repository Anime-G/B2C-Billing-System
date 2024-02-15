const { verify } =require( "jsonwebtoken");
const { secreatKey }=require( "../Const");

const validtoken=(req,res,next)=>{
    const accessToken=req.headers.accesstoken;
    

    try{
    if(!accessToken)
    {
        return next();
    }
    else
    {
        const verifydata=verify(accessToken,secreatKey);
        if(verifydata)
        {
            req.user=verifydata;
            // console.log("data =>",req.user);
            return next();
        }
        else{
            return res.json({err:"Invalid user!"})
        }

    }}
    catch(err)
    {
        return res.json({err:err.message});
    }
}
module.exports= {validtoken};