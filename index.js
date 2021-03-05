var Discord=require("discord.js")
var client= new Discord.Client()
var ytdl=require("ytdl-core")
var fetch=require("node-fetch")
require("dotenv").config()


var badWords=["heck","crud","darn"]



client.on("ready",function(){
    console.log("Bot is ready")
})


client.on("message",function(message){

   /*  if(message.member.displayName!="ts-bot"){
        message.channel.send("You said something")
    } */
    

    

    for(var i=0;i<badWords.length;i++){
    if(message.content.toLowerCase().includes(badWords[i])){
        message.channel.send("You said a bad word")
                                                    
        var role=message.guild.roles.cache.find(function(role){return role.name=="muted"})
        message.member.roles.add(role)
    }
}




if(message.content.startsWith("-play")){
    var query=message.content.slice(5)
    console.log(query)

    

    

    fetch(`https://www.googleapis.com/youtube/v3/search/?key=AIzaSyCgTQoRSusgoeUMbLxIU8IC0byyHrMSU8U&part=snippet&q=${query}`)
    .then(function(response){
        return response.json()
    })
    .then(function(parsedResponse){
        console.log(parsedResponse.items[0].id.videoId)
        client.channels.cache.find(function(channel){
            return channel.type=="voice" && channel.name=="General"
        }).join().then(
            function(connection){
                message.channel.send("Someone added to the voice channel")
                connection.play(ytdl(`https://www.youtube.com/watch?v=${parsedResponse.items[0].id.videoId}`,{filter:"audioonly"}))
            }
        )

        
    })



   
    
}







    
})






client.login(process.env.DISCORD_TOKEN)



