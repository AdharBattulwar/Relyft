import bcrypt, { hash } from "bcrypt";

const Encrypt = async(password) => {
  const SaltRounds = 10;
    try {
        const salt = await bcrypt.genSalt(SaltRounds);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error) {
        console.log("Error in Creating the Hash ", error);
        return null;
    }
};

export { Encrypt };
