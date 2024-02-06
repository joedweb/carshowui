import React, { useState } from "react";

type User ={
    id:number;
    name:string;
    email:string;
    password:string;
}



export const Info = () => {

    const[user, setUser] = useState<User>({} as User)         //same as {id:0, name:'', email:'', password:''}

  return (
    <div>info</div>
  )
}

export default Info
