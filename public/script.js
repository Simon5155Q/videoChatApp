const socket = io("/")
var peer = new Peer(undefined, {
    path:"/peerjs",
    host:"/",
    port:"443"
})
const user = prompt("enter your name")
$(function(){
    $("#showChat").click(function(){
        $(".left-window").css("display","none")
        $(".right-window").css("display","block")
        $(".headerBack").css("display", "block")
    })
    $(".headerBack").click(function(){
        $(".left-window").css("display","block")
        $(".right-window").css("display","none")
        $(".headerBack").css("display","none")
    })
    $("#send").click(function(){
        if($("#chat_message").val().length != 0){
            socket.emit("message", $("#chat_message").val())
            $("#chat_message").val("") 
        }
    })
    $("#chat_message").keydown((enter)=>{
        if($("#chat_message").val().length != 0 && enter.key == "Enter"){
            socket.emit("message", $("#chat_message").val())
            $("#chat_message").val("") 
        }
    })
})
peer.on("open",(id)=>{
    socket.emit("open", roomid, id, user)
})
socket.on("createMessage", (message, user)=>{
    $(".messages").append(`<div class="message"><b>${user == user? "me" : user}</b><span>${message}</span></div>`)
})



