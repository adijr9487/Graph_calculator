import React, {useRef, useEffect, useState} from 'react'

//component

//classes
import classes from "./Graph.css"

//functions
import {setContextAndCanvas, renderGraph, cleanUpFunction, initializeAllEventListener, initializeVariables} from "./Components/Canvas/Graph"

const Graph = (props) => {

    const CanvasRef = useRef(null);
    const ContextRef = useRef(null);
    //useState
    const [Dimension, setDimension] = useState(null)

                
    useEffect(()=>{
        ContextRef.current = CanvasRef.current.getContext('2d');
        
        CanvasRef.current.height = CanvasRef.current.offsetHeight;
        CanvasRef.current.width = CanvasRef.current.offsetWidth;

        window.addEventListener("resize", resizeHandler)
        setContextAndCanvas(ContextRef.current, CanvasRef.current)
        initializeAllEventListener();
        initializeVariables();

        renderGraph();
        
        return()=>{
            //packing up function ,, clearing eventListeners ,, 
            cleanUpFunction();
        }

    }, [])

    // useEffect for refresh each frames

    const resizeHandler = (e) => {
        CanvasRef.current.height = CanvasRef.current.offsetHeight;
        CanvasRef.current.width = CanvasRef.current.offsetWidth;

    }

    return (
        <div className={classes.baseDIV}>
            <canvas className={classes.Canvas} ref={CanvasRef} />
        </div>
    )
}

export default Graph
