const body = document.body

const successions = body.querySelector(".canvas").children


document.addEventListener("keydown", (event) => {
    if(event.defaultPrevented){
        return
    }
    const plOBJ = document.getElementById(id)
    switch(event.key){
        case "d":
            socket.send(sk({
                "type": "move",
                "body": {
                    "direction": "right",
                    "id": id
                }
            }))
            
            break
        case "a":
            socket.send(sk({
                "type": "move",
                "body": {
                    "direction": "left",
                    "id": id
                }
            }))
            break
        case "s":
            socket.send(sk({
                "type": "move",
                "body": {
                    "direction": "down",
                    "id": id
                }
            }))
            break
        case "w":
            socket.send(sk({
                "type": "move",
                "body": {
                    "direction": "up",
                    "id": id
                }
            }))
            break
    }

    event.preventDefault();
    
}, true)


