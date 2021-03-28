export const MAKE_GRID = (ctx, canvas, GRAPH_DATA, screenOrigin) => {

    //setting background

    // console.log(screenOrigin)
    ctx.fillStyle = "#393939"
    ctx.rect(0, 0, canvas.width, canvas.height)
    ctx.fill()
    DRAW_GRID(ctx, canvas, screenOrigin, GRAPH_DATA)
    // MAKE_LINE(ctx, canvas)

}

const DRAW_GRID = (ctx, canvas, screenOrigin, GRAPH_DATA) => {

    //if axis lie outside the screen
    
    let initialX = Math.floor(screenOrigin.x - canvas.width/2)
    let initialY = Math.floor(screenOrigin.y - canvas.height/2)

    let scanning = {
        x: initialX,
        y: initialY,
    }

    let printing = {
        x: 0,
        y: 0,
    }
    //draw verticle grid line
    while(scanning.x < screenOrigin.x + canvas.width/2){

        if(scanning.x % GRAPH_DATA.minor_space === 0){
            //if this point is a grid line
            let from = {
                x: printing.x,
                y: printing.y
            }
            let to = {
                x: printing.x,
                y: printing.y+canvas.height
            }
            let isAxis = (scanning.x === 0);
            let gridType = "minor"
            if(scanning.x === 0){
                gridType = "axis"
            }else if(scanning.x % GRAPH_DATA.major_space === 0){
                gridType = "major"
            }

            MAKE_LINE(ctx, canvas, from, to, gridType)
        }
        else if(initialX % GRAPH_DATA.minor_space !== 0){
            //if this point is not a grid line
        }
        printing.x++;
        scanning.x++;
    }

    scanning.x = initialX
    scanning.y = initialY

    printing = {
        x: 0,
        y: 0,
    }
    //draw horizontal grid line
    while(scanning.y < screenOrigin.y + canvas.height/2){

        if(scanning.y % GRAPH_DATA.minor_space === 0){
            //if this point is a grid line
            let from = {
                x: printing.x,
                y: printing.y
            }
            let to = {
                x: printing.x+canvas.width,
                y: printing.y
            }
            let gridType = "minor"
            if(scanning.y === 0){
                gridType = "axis"
            }else if(scanning.y % GRAPH_DATA.major_space === 0){
                gridType = "major"
            }

            // console.log("Hello")
            MAKE_LINE(ctx, canvas, from, to , gridType)
            
        } else if(initialY % GRAPH_DATA.minor_space !== 0){
            //if this point is not a grid line
        }
        printing.y++;
        scanning.y++;
    }
}

const MAKE_LINE = (ctx, canvas, from, to, gridType) => {

    ctx.beginPath()
    // console.log(from, to)
    ctx.strokeStyle = "#989898"

    if(gridType === "axis")
        ctx.lineWidth = 3;
    else if(gridType === "major")
        ctx.lineWidth = 1
    else if(gridType === "minor")
        ctx.lineWidth = 0.1;

    ctx.moveTo(from.x, from.y)
    ctx.lineTo(to.x, to.y)

    ctx.stroke()
    ctx.fill()

    ctx.closePath()

}