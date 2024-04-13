import { Elysia } from "elysia";
import { applicants } from "../api/applicant";
import { job_listings } from "../api/job_listings";
import { auth } from "../api/auth";
import { announcements } from "../api/announcement";
import { application } from "../api/application";
import { admin } from "../api/admin";


const app = new Elysia()




app.onBeforeHandle((context: any) => {
  context.set.headers["access-control-allow-origin"] = "*";
  context.set.headers["access-control-allow-methods"] = "GET, POST, PUT, DELETE, OPTIONS";
  context.set.headers["access-control-allow-headers"] = "Origin, Content-Type";


  console.log(context.request)
  

  if (context.request.method ===  'OPTIONS') {
    // Simply return empty response for options requests
    context.set.status = 200;
    return;
  }
});

const sockets = new Map();

// const handleConnection = (ws: WebSocket) => {
//   console.log('Client connected');



//   ws.on('message', (message) => {
//     console.log(`Received message: ${message}`);
//     ws.send(`You said: ${message}`);
//   });

//   ws.on('close', () => {
//     console.log('Client disconnected');
//   });
// };
// app.get('/ws', handleConnection);

// Create namespace
app.ws(`/ws`, {
  open(socket) {
    console.log("New connection: "+ socket.id);
  },
  close(socket) {
    // Log connection closed
    console.log(`❌ [Tatakform] – Connection closed #${socket.id}`);
  },
  message(socket, message: any) {
    // Log message
    // Log.i(`📡 [Tatakform] [${college.acronym}] – Message from #${  socket.id}: ${message}`);
    // Don't do anything yet
      console.log(typeof message)

    // If ny mo connect applicant
    if (typeof message === "number") {

      console.log("An applicant  is connecting" + message);
      sockets.set(message, socket);
      return;
    }

    // if ang admin mo connect
    if (message === "*") {
      sockets.set('admin', socket);
      return;
    }

    // *- = Applicant Chatting to Admin
    if (message.indexOf("*-")=== 0) {
        console.log(sockets)
      sockets.get("admin").send(message.substring(2, message.length));
      return;
    }

    // --aid = Admin Chatting to An Applicant
    if (message.indexOf("--")===0) {
      console.log(message)
      console.log(sockets)
      let aid = Number(message.charAt(2).toString());
      console.log(aid)
      sockets.get(aid).send(message.substring(3, message.length));
      return;
    }
  }
});

app.use(applicants)
app.use(job_listings)
app.use(auth)
app.use(announcements)
app.use(application)
app.use(admin)

app.listen(process.env.API_PORT || 3000, () =>{
  console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
})