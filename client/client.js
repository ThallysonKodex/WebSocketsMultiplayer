
const socket = new WebSocket("ws://localhost:8080")

const sk = (object) => {
    return JSON.stringify(object)
}

const canva = document.querySelector(".canvas")
canva.style.width = "500px"
canva.style.height = "300px"


let id;

socket.addEventListener("open", (event) => {

    id = Math.floor(Math.random() * 2000)

    socket.send(sk({
        "type": "register",
        "body": {
            "name": connectionName,
            "id": `${id}`,
            "color": "red"
        }
    }))

    socket.send(sk(
        {
            "type": "broadcast",
            "body": {
                "message": `I ${connectionName} am here.`
            }
        }
    ))

})

socket.addEventListener("message", (msg) => {
    const data = JSON.parse(msg.data)

    switch(data.type){
        case "log":
            console.log(data.body.message)
            break
        case "move":
            switch(data.body.direction){
                case "left":
                    var select = document.getElementById(data.body.id)
                    var canvaWidth = parseInt(canva.style.width)
                    const currentLeft = parseInt(select.style.left) || 0;
                    if(currentLeft > 10){

                        const newLeft = currentLeft - 50;
                        select.style.left = `${newLeft}px`
                    } else {
                        break
                    }
                    
                    break
                case "right":
                    var select = document.getElementById(data.body.id)
                    var canvaWidth = parseInt(canva.style.width)

                    const currentRight = parseInt(select.style.left) || 0;
                    if(currentRight < canvaWidth - 40){
                        const newRight = currentRight + 50;
                        select.style.left = `${newRight}px`
                    } else {
                        break
                    }


                    break
                case "up":
                    var select = document.getElementById(data.body.id)
                    var canvaWidth = parseInt(canva.style.width)

                    var currentTop = parseInt(select.style.top) || 0;
                    
                    if(currentTop > 10){

                        const newBottom = currentTop - 50;
                        select.style.top = `${newBottom}px`
                    } else {
                        break
                    }
                    
                    break
                case "down":
                    var select = document.getElementById(data.body.id)
                    var canvaHeight = parseInt(canva.style.height)

                    var currentTop = parseInt(select.style.top) || 0;
                    
                    if(currentTop < canvaHeight - 60){

                        const newTop = currentTop + 50;
                        select.style.top = `${newTop}px`
                    } else {
                        break
                    }
                    
                    break
                
            }
            break
        case "createFriend":
            JSON.parse(data.body.clients).forEach((e) => {
                if(e.created === false){
                    const friend = document.createElement("div")
                    const tagName = document.createElement("p")

                    friend.style.top = "10px"
                    friend.style.left = "10px"

                    friend.style.backgroundColor = e.color
                    friend.classList.add("player")
                    
                    tagName.innerHTML = `${e.name}<br>#${e.id}`
                    
                    tagName.style.fontWeight = "900"
                    tagName.style.fontFamily = "Arial, Helvetica, Sans-Serif"
                    tagName.style.textAlign = "center"
                    canva.appendChild(friend)
                    friend.appendChild(tagName)
                    friend.id = e.id
                    for(let child = 0; child < canvasChildren.length; child++){
                        for(let child2 = 0; child < canvasChildren.length; child++){
                            if(canvasChildren[child] !== canvasChildren[child2]){
                                if(canvasChildren[child].id === canvasChildren[child2].id){
                                    canvas.removeChild(canvasChildren[child2])
                                }

                            }
                        }
                    }
                }
            })

            break
    
        case "clearFriend":
            var child = document.getElementById(`${data.body.id}`) 
            canva.removeChild(child)
            break
        case "broadcastLeave":
            console.log(data)
            const ch = document.getElementById(data.body.id)
            
            canva.removeChild(ch)


            break
    }

})


