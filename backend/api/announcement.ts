import { Elysia } from "elysia";
import { PrismaClient } from "@prisma/client";
import Announcement from "../interface/interface"
const prisma = new PrismaClient({
    log: ['info', 'warn', 'error']
  })

  
export const announcements = new Elysia().decorate("req", prisma)
.get("/announcements", async ({req})=>{
    const query = await req.announcements.findMany();

    return Response.json({success: true, message: "Announcements retrieved successfully",data: query })
})
.get("/announcement/:id", async ({req, params}: {req: any, params: any})=>{
    const query = await req.announcements.findUnique({
        where: ({id: Number(params.id)})
    
    })
    return Response.json({success: true, message: "Annoucement retrieved successfully", data :query})
}).post("/announcement/create", async({req, body}: {req: any, body: any})=>{
    await req.announcement.create({
        data: body as Announcement
    })

    return Response.json({success: true, message: "Announcement created successfully"})


}).put("/announcement/update/:id", async ({req, body, params}: {req: any, body: any, params: any})=>{
    await req.announcement.update({
        where: ({id: Number(params.id)}),
        data: body as Announcement
    })

    return Response.json({success: true, message: "Announcement updated Successfully"});
}).delete("/announcement/delete/:id", async ({req, params}: {req: any, params:any})=>{
    await req.announcement.delete({
        where: ({id: Number(params.id)})
    })

    return Response.json({success: true, message: "Announcement deleted Successfully"})
})