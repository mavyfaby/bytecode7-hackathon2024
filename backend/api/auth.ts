import Elysia from "elysia";
import {cookie} from "@elysiajs/cookie"
import {jwt} from "@elysiajs/jwt"
import { PrismaClient } from "@prisma/client";



const prisma = new PrismaClient({
    log: ['info', 'warn', 'error']
})

export const auth = new Elysia().decorate("req", prisma)
.post("/login", async({req, body, set, jwt, setCookie} : {req:any, body: any, set:any, jwt:any, setCookie: any,}) => {


   const getEmail = await req.user.findUnique({
    where: {email: String(req.user.email)}
   })
   

})