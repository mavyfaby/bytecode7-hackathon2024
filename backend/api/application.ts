import { Elysia } from "elysia";
import { PrismaClient } from "@prisma/client";
import Application from '../interface/interface'
import User from "../interface/interface";

const prisma = new PrismaClient()
export const application = new Elysia().decorate("req", prisma)
.get("/application/:id/:jobId", async ({req, params}: {req: any, params: any})=>{

    const name = await req.user.first_name
    const query = await req.application.findUnique({
        where: {id: Number(params.id),
            job_listingId: Number(params.jobId)
        }
    })

    return Response.json({success: true, message: `Successfully retrieved application of user ${name}`, data: query})
}).get("/application/:id", async ({req, params} : {req: any, params: any})=>{

    const queryInitial = await req.application.findUnique({
        where:{id:Number(params.id)
        
        }
    })
   return Response.json({success: true, message: 'Successfully retrieved', data: queryInitial})
}).delete("/applicaiton/:id", async({req, params}: {req: any, params: any}) => {

     await req.application.delete({
        where: {id: Number(params.id)}
    })

    return Response.json({success: true, message: "Successfully deleted application"})
}).post("/application/apply", async({req, body}: {req:any, body: any}) =>{

    const test = await req.application.create({
        data: body as Application
    })
    console.log(test)
    return Response.json({success: true, message: "Applied successfully", data: test })
}).get("/applications/", async({req})=>{
    const query = req.application.findMany()

    
    return Response.json({success: true, message: "retrieved all applications", data: query})
})
