/*Encriptar contraseña*/
import pkg from "bcryptjs";

const { compare, hash } = pkg;

const encrypt = async (password) => {
    try {
        const passwordEncrypt = await hash(password, 8);
        return passwordEncrypt;
    } catch (error) {
        console.error("Error encriptando la contraseña:", error);
        throw error;
    }
};

const compareEncript = async (password, hashedPassword) => {
    try {
        const result = await compare(password, hashedPassword);
        return result;
    } catch (error) {
        console.error("Error comparando contraseñas:", error);
        throw error;
    }
};

export { encrypt, compareEncript };