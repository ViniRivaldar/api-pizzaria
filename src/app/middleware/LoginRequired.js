import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()

export default function LoginRequired(req,res,next){
    const authorization = req.headers.authorization;

    if(!authorization){
        return res.status(401).json({error:'Ação não permitida, faça o login'})
    }

    const [, token] = authorization.split(' ');

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET)

        req.userId = decoded._id;
        req.userName = decoded.name;
        req.userEmail = decoded.email;

        return next()

    } catch (err) {
        console.log(err)
        return res.status(400).json({error:err.errors})
    }
}