const express = require("express")
const app = express()
const server = require("http").Server(app)
app.set("view engine", "ejs")
app.use(express.static("public"))
const {v4: uuidv4} = require("uuid")
const io = require("socket.io")(server, {cors: {origin:"*"}})
const {ExpressPeerServer} = require("peer")
const peerServer = ExpressPeerServer(server)
app.use("/peerjs", peerServer)
app.get("/", (request,response)=>{
    response.redirect(`/${uuidv4()}`)
})
app.get("/:room", (request,response)=>{
    response.render("index", {roomid : request.params.room})
})
io.on("connection", (socket)=>{
    socket.on("login", (roomid, userid, user)=>{
        socket.join(roomid)
        socket.on("message", (message)=>{
            io.to(roomid).emit("createMessage", message, user, userid)
        })
    })
})  
server.listen(5000)




/*…or create a new repository on the command line
echo "# videoChatApp" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/Simon5155Q/videoChatApp.git
git push -u origin main
…or push an existing repository from the command line
git remote add origin https://github.com/Simon5155Q/videoChatApp.git
git branch -M main
git push -u origin main

token: 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
*/


