const WebSocket = require("ws")

const server = new WebSocket.Server({port: 8080})

/*
    OBJECT MESSAGE FORMAT:
    "type": "message /..etc",
    "body": {
        "message": "MSG..."
    }

*/

const sk = (object) => {
    return JSON.stringify(object)
}

const helperFunctions = (ws) => {
    ws.log = (msg) => {
        ws.send(sk({
            "type": "log",
            "body": {
                "message": `${msg}`
            }
        }))
    }
}

const clients = []

server.on("connection", (ws) => {
    helperFunctions(ws)    
    ws.log("You are connected to server!")

    ws.on("message", (msg) => {
        const data = JSON.parse(msg)
        switch(data.type){
            case "register":
                var name = data.body.name
                var id = data.body.id
               
                console.log
                (`Registering the ${clients.length + 1}${clients.length + 1 === 1 ? "st" : (clients.length + 1 === 2 ? "nd" : (clients.length + 1 === 3 ? "rd" : "th"))} user ${name} with ID ${id} to the Server.`)
                
                clients.push({
                    
                        name: name,
                        id: id,
                        order: clients.length + 1,
                        client: ws,
                        created: false,
                        color: data.body.color
                    
                })
                const sclients = sk(clients) 
                clients.forEach((e) => {
                    e.client.send(sk({
                        "type": "createFriend",
                        "body": {
                            "id": id,
                            "clients": sclients
                        }
                    }))
                })

                break
            case "broadcast":
                clients.forEach((e) => {
                    e.client.send(
                        sk({
                            "type": "log",
                            "body": {
                                "message": data.body.message
                            }
                        })
                    )
                })
                break
            case "move":
                
                clients.forEach((e) => {
                    e.client.send(
                        sk({
                            "type": "move",
                            "body": {
                                "direction": data.body.direction,
                                "id": data.body.id
                            }
                        })
                    )
                })
        }


    })

    ws.on("close", (data) => {
        let exiting;
        let ID;
        clients.forEach((e) => {
            if(e.client === ws){
                console.log(e.name + "#" + e.id + " left the server.")
                exiting = ws
                ID = e.id
                clients.forEach((cle) => {
                    cle.client.send(sk({
                        "type": "broadcastLeave",
                        "body": {
                            "id": ID
                            
                        }
                    }))
                })
            }
            

            console.log(ID)
            if(e.client === ws){
                                
                e.created = true
            }

            

        })
        
    })

})
