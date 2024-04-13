import Elysia, { Cookie } from "elysia";
import { PrismaClient } from "@prisma/client";
import { createSessionToken } from "../utils/validation";



const prisma = new PrismaClient({
    log: ['info', 'warn', 'error']
})

export const auth = new Elysia().decorate("req", prisma)

.post("/login", async ({ body, req} : {body: any, req: any}) => {
    
      const user = await req.user.findUnique({
        where: {
          email: body.email, // Or username, depending on your login approach
        },
      });
  
      if (!user || !await Bun.password.verify(body.password, user.password)) {
        return Response.json({ success: false, message: "Invalid credentials" });
      }
  
      return Response.json({success: true, message: "Login me daddy", data: user})
    
     
    
  }).post("/logout", async ({req}) => {

    return Response.json({success: true, message: 'logout me daddy'})
  })