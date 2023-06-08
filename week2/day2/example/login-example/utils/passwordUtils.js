import bcrypt from "bcrypt";

async function hashedPassword(password){
    const saltRounds = 10;
    const hashed = await bcrypt.hash(password, saltRounds);
    return hashed;
}

async function comparePasswords(password, hashedPassword) {
    const match = await bcrypt.compare(password, hashedPassword);
    return match
}

export {
    hashedPassword,
    comparePasswords
}