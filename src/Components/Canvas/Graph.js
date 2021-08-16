import {MAKE_GRID} from "./Draw/Grid"
import {SHOW_PLANE} from "./Draw/Plane"

//Canas variable
let AnimationID = undefined
let CTX = undefined
let CANVAS = undefined

//position
let SCREEN_ORIGIN_POSITION = undefined
let WHEN_MOUSE_DOWN_SCREEN_POSITION = undefined

//mouse vairable
let MOUSE_DOWN = undefined;

//GRAPH varible
let GRAPH_DATA = {
    minor_space: 10,
    major_space: 100, 
    scale: 1,
    mini_graph_scale: 0.2, 
    label_font_size: 15,
}
//This function will run after the Graph React component is rendered;
export const setContextAndCanvas = (ctx, canvas) => {
    CTX = ctx
    CANVAS = canvas

}

export const initializeVariables = () => {

    setOrigin();
}

const setOrigin = (Origin) => {
    if (!Origin){
        SCREEN_ORIGIN_POSITION = {x: 0, y: 0}
    }else{
        SCREEN_ORIGIN_POSITION = getStandardCord(Origin)
    }
}

const getStandardCord = (position) => {
    let newStandardOrigin = {   
        x: position.x,
        y: -position.y,
    }
    return newStandardOrigin;
}

const invertStandardCord = (position) => {
    let newStandardOrigin = {   
        x: position.x,
        y: -position.y,
    }
    return newStandardOrigin;
}

export const initializeAllEventListener = () => {
    CANVAS.addEventListener("click", clickHandler)
    CANVAS.addEventListener("mousemove", mouseMoveHandler)
    CANVAS.addEventListener("mousedown", mouseDownHandler)
    CANVAS.addEventListener("mouseup", mouseUpHandler)
    CANVAS.addEventListener("mouseleave", mouseUpHandler)

    // passing second argument as event (to set event.preventDefault (as first argument is no more (((event)))  )) and third argument true (to recognise when it is touched)
    CANVAS.addEventListener("touchstart", (e) => mouseDownHandler({x:e.changedTouches[0].clientX, y:e.changedTouches[0].clientY}, e, true))
    CANVAS.addEventListener("touchmove", (e) => mouseMoveHandler({x:e.changedTouches[0].clientX, y:e.changedTouches[0].clientY}, e, true))
    CANVAS.addEventListener("touchend", (e) => mouseUpHandler({x:e.changedTouches[0].clientX, y:e.changedTouches[0].clientY}, e, true))
    CANVAS.addEventListener("touchcancel", (e) => mouseUpHandler({ x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY }, e, true))

    // Added scale handler using wheel
    CANVAS.addEventListener("wheel", (e)=> handleScaling(e))
}

export const renderGraph =() => {
    AnimationID = requestAnimationFrame(renderGraph);

    //clear rect
    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height)

    //setting grid
    // console.log(WHEN_MOUSE_DOWN_SCREEN_POSITION)

    if(WHEN_MOUSE_DOWN_SCREEN_POSITION){
        MAKE_GRID(CTX, CANVAS, GRAPH_DATA, WHEN_MOUSE_DOWN_SCREEN_POSITION);
        SHOW_PLANE(CTX, CANVAS, GRAPH_DATA, SCREEN_ORIGIN_POSITION);
    }
    else{    
        MAKE_GRID(CTX, CANVAS, GRAPH_DATA, SCREEN_ORIGIN_POSITION);
        SHOW_PLANE(CTX, CANVAS, GRAPH_DATA, SCREEN_ORIGIN_POSITION);
    }

}

// Handle Scaling
const handleScaling = (e) => {
    let factor = e.deltaY * -0.01;
    if (factor > 0) GRAPH_DATA.major_space += 10;
    else if (factor < 0) GRAPH_DATA.major_space -= 10;
    GRAPH_DATA.minor_space = GRAPH_DATA.major_space / 10;
    if (GRAPH_DATA.major_space < 70) {
        GRAPH_DATA.major_space = 100;
        GRAPH_DATA.minor_space = 10;
        GRAPH_DATA.scale *= 2;
    }
    else if (GRAPH_DATA.major_space > 130) {
        GRAPH_DATA.major_space = 100;
        GRAPH_DATA.minor_space = 10;
        GRAPH_DATA.scale /= 2;
    }
}

const clickHandler = (e) => {
}

const mouseMoveHandler = (e, event, isTouched) => {
    if(isTouched){
        event.preventDefault();
    }
    if(MOUSE_DOWN !== undefined){
        let delta = ({
            x: MOUSE_DOWN.x - e.x,
            y: e.y - MOUSE_DOWN.y ,
        })
        let SCREEN_POSITION = invertStandardCord(SCREEN_ORIGIN_POSITION)

        let NEW_SCREEN_POSITION = {
            x: delta.x + SCREEN_POSITION.x,
            y: delta.y + SCREEN_POSITION.y
        }
        // console.log(SCREEN_POSITION)
        WHEN_MOUSE_DOWN_SCREEN_POSITION = getStandardCord(NEW_SCREEN_POSITION)

    }
}
const mouseDownHandler = (e, event, isTouched) => {
    if(isTouched){
        event.preventDefault();
    }
    MOUSE_DOWN = {
        x: e.x,
        y: e.y,
    }
}
const mouseUpHandler = (e, event, isTouched) => {
    if(isTouched){
        event.preventDefault();
    }
    // console.log(SCREEN_ORIGIN_POSITION)
    
    if(MOUSE_DOWN !== undefined){
        let delta = ({
            x: MOUSE_DOWN.x - e.x,
            y: e.y - MOUSE_DOWN.y ,
        })
        let SCREEN_POSITION = invertStandardCord(SCREEN_ORIGIN_POSITION)
        
        let NEW_SCREEN_POSITION = {
            x: delta.x + SCREEN_POSITION.x,
            y: delta.y + SCREEN_POSITION.y
        }
        setOrigin(NEW_SCREEN_POSITION)
    }

    MOUSE_DOWN = undefined;
    WHEN_MOUSE_DOWN_SCREEN_POSITION = undefined
}


export const cleanUpFunction = () => {

    console.log("Clean Up function executed successfully")
    console.log("All eventListener Removed")
    //deleting clearing Animation Request
    cancelAnimationFrame(AnimationID);
}