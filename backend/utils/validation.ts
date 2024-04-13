// import { SignJWT } from "jose/dist/types/jwt/sign";

import { SignJWT } from "jose";

export default function validateUser(body: any){
    const requiredFields = ['first_name', 'last_name', 'email', 'password', 'birthdate'];
    const errors: String[] = []


    const missingFields = requiredFields.filter((field) => !body[field]);
    if (missingFields.length > 0) {
      (`Missing required fields: ${missingFields.join(', ')}`);
    }

  return errors
}

/**
 * Create a session token
 * @param isRefreshToken Whether the token is a refresh token
 * @param data Data to be stored in the token
 * @param exp Expiry time
 */
export async function createSessionToken( data: any, exp: string) {
  const jwt = new SignJWT({...data });

  jwt.setProtectedHeader({ alg: "HS256" })
  jwt.setExpirationTime(exp);

  return await jwt.sign(new TextEncoder().encode(process.env.SECRET_KEY));
}
