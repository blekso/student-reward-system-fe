import axios from "axios";
import React from "react";
import { cookies } from 'next/headers'; // Import cookies
import jwt_decode from "jwt-decode";
import { LandingAuthPageInvisible } from "@/app/lib/protect-landing-page";


const getUser = async () => {

  const nextCookies = cookies();

  const token = nextCookies.get('accessToken')

  console.log(token)

  if(token) {
    return jwt_decode(token.value);
  }

  /* try {
    const response = await axios.get("/user", {
      headers: {
        // NOTE: If using NextJS < 13.4.0 use:
        // authorization: `bearer ${token}` // Use your cookie
        authorization: `bearer ${token.value}` // Use your cookie
      }
    })

    return response.data.user;

   } catch (err: any) {
     console.log(token);
     console.log(err.response.data);
     return null;
   } */
};

export default async function Login() {

  const user: any = await getUser();

  if (!user) return <div className="text-red-500">No user found</div>;

  return <div>Logged in User:{JSON.stringify(user.ime)}</div>;
}