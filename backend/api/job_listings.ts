import { PrismaClient } from '@prisma/client'
import {Elysia} from 'elysia'
import Job_listing from  '../interface/interface'


const prisma = new PrismaClient({
    log: ['info', 'warn', 'error']
})

export const job_listings = new Elysia().decorate('req', prisma)

//get all 
.get("/jobs", async ({req, body} : {req:any , body: any}) =>{

 
    const query = await req.job_listing.findMany()


    const output = query !== null ? Response.json({success: true, message: 'Retrieved Job Listings successfully!', data: query}): 
                                    Response.json({success: false, message: 'No Jobs Listed', data:[]})
    return output
})
.get("/jobs/search", async ({req, body}: {req:any, body: any}) =>{
    const searchQuery = body.search

    const query = await req.job_listing.findMany({
        where:{
            OR:[
                {title: {contains: searchQuery  }},
            ]
        }
    })
    if (query.length > 0) {
        return Response.json({ success: true, message: 'Retrieved Job Listings successfully!', data: query });
    } else {
        return Response.json({ success: false, message: 'No Jobs Listed', data: [] });
    }


})
//get specific by ID

.get("/job/:id", async ({req, params}) =>{

    const query = await req.job_listing.findUnique({
        where: {id: Number(params.id)}
    })

    const output = query !== null ? Response.json({success: true, message: `Retrieve ${query.job_title} details successfully`, data: query}): 
                                    Response.json({success: false, message: 'Job not found', data:[]})

    return output
})

//create a new job_listing
.post("/job/create", async ({req, body}: {req: any, body:any}) =>{
    await req.job_listing.create({
        data: body as Job_listing
    })

    return Response.json({success: true, message: 'Job Created Successfully!'})

})

//update a job listing

.put("/job/update/:id", async ({req, body, params} : {req:any, body: any, params: any}) =>{
    await req.job_listing.update({
        where: {id: Number(params.id)},
        data: body as Job_listing
    })

    return Response.json({success: true, message: 'Job Updated Successfully!'})
})

//delete a job listing
.delete("/job/delete/:id", async ({req, params } : {req: any, params: any}) =>{
    await req.job_listing.delete({
        where: {id: Number(params.id)}
    })

    return Response.json({success: true, message: 'Job Delete Successfully'})
})

