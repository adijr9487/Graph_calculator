export const SHOW_PLANE = (ctx, canvas, GRAPH_DATA, screenOrigin) => {

    let miniScale = GRAPH_DATA.space*GRAPH_DATA.mini_graph_scale;

    MAKE_PLANE(ctx, canvas)

} 

const MAKE_PLANE = (ctx, canvas) => {

    let margin = 20
    let height = canvas.height*0.20 * 2
    let width = canvas.width*0.20

    makeRect(ctx, canvas, margin, height, width);
    drawGrid(ctx, canvas, margin, height, width);
}

const makeRect = (ctx, canvas, margin, height, width) => {
    
    let rect_TOP_LEFT = {
        x: canvas.width - margin - width,
        y: canvas.height - margin - height,
    }

    ctx.beginPath();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
    ctx.shadowBlur = 30;
    ctx.lineWidth = 1;
    ctx.fillStyle = "#393939";
    ctx.strokeStyle = "#727272";
    ctx.rect(rect_TOP_LEFT.x, rect_TOP_LEFT.y, width, height)
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

}

const drawGrid = (ctx, canvas, margin, height, width) => {
    
    let rect_TOP_LEFT = {
        x: canvas.width - margin - width,
        y: canvas.height - margin - height,
    }

    // while(scanning.x < screenOrigin.x + canvas.width/2){

    //     if(scanning.x % space === 0){
    //         //if this point is a grid line
    //         let from = {
    //             x: printing.x,
    //             y: printing.y
    //         }
    //         let to = {
    //             x: printing.x,
    //             y: printing.y+canvas.height
    //         }
    //         let isAxis = (scanning.x === 0);
    //         MAKE_LINE(ctx, canvas, from, to, isAxis)
    //     }
    //     else if(initialX % space !== 0){
    //         //if this point is not a grid line
    //     }
    //     printing.x++;
    //     scanning.x++;
    // }

    // scanning.x = initialX
    // scanning.y = initialY

    // printing = {
    //     x: 0,
    //     y: 0,
    // }
    // //draw horizontal grid line
    // while(scanning.y < screenOrigin.y + canvas.height/2){

    //     if(scanning.y % space === 0){
    //         //if this point is a grid line
    //         let from = {
    //             x: printing.x,
    //             y: printing.y
    //         }
    //         let to = {
    //             x: printing.x+canvas.width,
    //             y: printing.y
    //         }
    //         let isAxis = (scanning.y === 0);
    //         MAKE_LINE(ctx, canvas, from, to , isAxis)
            
    //     } else if(initialY % space !== 0){
    //         //if this point is not a grid line
    //     }
    //     printing.y++;
    //     scanning.y++;
    // }

}

const makeLine = (ctx, canvas, from, to) => {
    ctx.beginPath();

    ctx.strokeStyle = "#727272";
    ctx.lineWidth = 2;

    ctx.moveTo(from.x, from.y)
    ctx.lineTo(to.x, to.y)

    ctx.stroke();
    ctx.fill();
    ctx.closePath();
}