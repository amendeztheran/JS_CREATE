import jwt from "jsonwebtoken";

const jwtSignature="createShop"

const generateToken = (user,role) =>{
    const payload= {
        usuario: user,
        rol: role
    };
    const options={
        expiresIn: '1h'
    };
    
    const result=jwt.sign(payload,jwtSignature,options);
    return result;
}



export default generateToken;