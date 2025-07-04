"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export default function Home() {

  const {data: session , isPending} = authClient.useSession() 

  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")

   const onsubmit = ()=>{
    authClient.signUp.email({
      email,
      name,
      password
    }, {
      onError : ()=>{
        alert("error")
      },
      onSuccess : ()=>{
        alert("Success")
      }
    })
   }

   const onLogin = ()=>{
    authClient.signIn.email({
      email,
      password
    },
    {
      onError : ()=>{
        alert("error")
      },
      onSuccess : ()=>{
        alert("Success")
      }
    }
  )
   }

   const signOut = async()=>{
    await authClient.signOut({})
   }

   if(isPending){
    return <div>loading...</div>
   }else if (session){
    return (<>
      <div>you are logged in</div>
      <Button onClick={signOut} >Signout</Button>
    </>
    )
   }

  return (
    <div className="">
      <div className="flex flex-col gap-4 p-4">
        <Input
        type={"text"}
        name="name"
        value={name}
        placeholder="name"
        className="border-gray-600"
        onChange={(e)=>setName(e.target.value)}
        />
        <Input
          type={"email"}
          name="email"
          value={email}
          placeholder="email"
          className="border-gray-600"
          onChange={(e)=>setEmail(e.target.value)}
        />
        <Input
          type={"password"}
          name="password"
          value={password}
          placeholder="password"
          className="border-gray-600"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <Button onClick={onsubmit} >submit</Button>
      </div>

      <div className="flex flex-col gap-4 p-4">
        
        <Input
          type={"email"}
          name="email"
          value={email}
          placeholder="email"
          className="border-gray-600"
          onChange={(e)=>setEmail(e.target.value)}
        />
        <Input
          type={"password"}
          name="password"
          value={password}
          placeholder="password"
          className="border-gray-600"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <Button onClick={onLogin} >submit</Button>
      </div>
    </div>
  )
}
