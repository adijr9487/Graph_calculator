export const MAKE_GRID = (ctx, canvas, GRAPH_DATA, screenOrigin) => {
  //setting background

  // console.log(screenOrigin)
  ctx.fillStyle = "#393939";
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fill();
  DRAW_GRID(ctx, canvas, screenOrigin, GRAPH_DATA);
  // MAKE_LINE(ctx, canvas)
};

//we have assume that graph exist somewhere and we are projecting a cross-section of that graph on our screen
const DRAW_GRID = (ctx, canvas, screenOrigin, GRAPH_DATA) => {
  //if axis lie outside the screen

  let initialX = Math.floor(screenOrigin.x - canvas.width / 2);
  let initialY = Math.floor(screenOrigin.y - canvas.height / 2);

  //scanning the graph before printing it on the screen
  let scanning = {
    x: initialX,
    y: initialY,
  };

  // origin (0, 0) of graph with respect to screen initial point
  let center = {
    x: -initialX,
    y: -initialY,
  };

  //printing coordinate after scanning it from mathematical graph plane
  let printing = {
    x: 0,
    y: 0,
  };

  //draw verticle grid line (scanning)
  while (scanning.x < screenOrigin.x + canvas.width / 2) {
    if (scanning.x % GRAPH_DATA.minor_space === 0) {
      //if this point is a grid line
      let from = {
        x: printing.x,
        y: printing.y,
      };
      let to = {
        x: printing.x,
        y: printing.y + canvas.height,
      };
      // here major and axis is verticle line
      let isAxis = scanning.x === 0;
      let gridType = "minor";
      if (scanning.x === 0) {
        gridType = "axis";
      } else if (scanning.x % GRAPH_DATA.major_space === 0) {
        gridType = "major";
      }

      if (gridType === "axis" || gridType === "major") {
        //here major and axis is verticle line
        let value = (printing.x - center.x) / GRAPH_DATA.major_space;
        let showZero = true

        let positionY = center.y + 20
        if(center.y < 0){
          positionY = 20
          showZero = false
        }
        else if(center.y > (canvas.height - (10 + GRAPH_DATA.label_font_size))){
          positionY = canvas.height - 10
          showZero = false
        }

        if(!(showZero == false && value == 0))
        SHOW_TEXT(
          ctx,
          value,
          GRAPH_DATA.label_font_size,
          printing.x + 5,
          positionY
        );
      }

      MAKE_LINE(ctx, canvas, from, to, gridType);
    } else if (initialX % GRAPH_DATA.minor_space !== 0) {
      //if this point is not a grid line
    }
    printing.x++;
    scanning.x++;
  }

  //checking if the verticle axis is inside the screen
  // if (Math.abs(screenOrigin.x) > canvas.width / 2) {
  //   if (screenOrigin.x < 0) printing.x = printing.x;
  //   else if (screenOrigin.x > 0) printing.x = 10;
  //   //here(inside if) y axis is outside the screen

  //   //using while loop for horizontal grid line (to lable point on the line outside the screen)

  //   while (scanning.y < screenOrigin.y + canvas.height / 2) {
  //     if (scanning.y % GRAPH_DATA.major_space === 0) {
  //       let value = (center.y - printing.y) / GRAPH_DATA.major_space; //center is the center of screen // printing is the position with respect to the screen
  //       if (value != 0) {
  //         let newPositionY = printing.x;
  //         if (screenOrigin.x < 0) {
  //           // this is used to adjust the right margin(part) of screen to display label/
  //           newPositionY =
  //             newPositionY -
  //             GRAPH_DATA.label_font_size * (value + "").length +
  //             (value + "").length;
  //         }
  //         SHOW_TEXT(
  //           ctx,
  //           value,
  //           GRAPH_DATA.label_font_size,
  //           newPositionY,
  //           printing.y - 5
  //         );
  //       }

  //       // this is use so that we dont have to iterate for each point just to lable the number line
  //       //after finding first label we will just with space of major_space
  //       printing.y += GRAPH_DATA.major_space;
  //       scanning.y += GRAPH_DATA.major_space;
  //     } else {
  //       printing.y++;
  //       scanning.y++;
  //     }
  //   }
  // }

  scanning.x = initialX;
  scanning.y = initialY;

  // reseting value of printing to intial
  printing = {
    x: 0,
    y: 0,
  };
  //draw horizontal grid line
  while (scanning.y < screenOrigin.y + canvas.height / 2) {
    if (scanning.y % GRAPH_DATA.minor_space === 0) {
      //if this point is a grid line
      let from = {
        x: printing.x,
        y: printing.y,
      };
      let to = {
        x: printing.x + canvas.width,
        y: printing.y,
      };
      let gridType = "minor";
      if (scanning.y === 0) {
        //if the grid line is axis
        gridType = "axis";
      } else if (scanning.y % GRAPH_DATA.major_space === 0) {
        // if the grid line is a major line(second most thick line)
        gridType = "major";
      }
      // console.log("Hello")
      MAKE_LINE(ctx, canvas, from, to, gridType);


      if (gridType === "axis" || gridType === "major") {
        let value = (center.y - printing.y) / GRAPH_DATA.major_space; //center is the center of screen // printing is the position with respect to the screen
        let textWidth = CALCULATE_WIDTH_TEXT(ctx, value, GRAPH_DATA.label_font_size)

        let positionX = center.x + 5
        if(center.x < 0){
          positionX = 5
        }
        else if(center.x + 5 + textWidth > canvas.width - 5){
          positionX = canvas.width - (5 + textWidth)
        }

        if (value != 0)
          SHOW_TEXT(
            ctx,
            value,
            GRAPH_DATA.label_font_size,
            positionX,
            printing.y + 20
          );
      }
    } else if (initialY % GRAPH_DATA.minor_space !== 0) {
      //if this point is not a grid line
    }
    printing.y++;
    scanning.y++;
  }

  //checking if the horizontal axis is inside the screen
  // if (Math.abs(screenOrigin.y) > canvas.height / 2) {
  //   if (screenOrigin.y < 0) printing.y = printing.y - 10;
  //   else if (screenOrigin.y > 0) printing.y = 20;
  //   // console.log("Outside")
  //   //here(inside if) x axis is outside the screen

  //   //using while loop for horizontal grid line
  //   while (scanning.x < screenOrigin.x + canvas.width / 2) {
  //     if (scanning.x % GRAPH_DATA.major_space === 0) {
  //       //if this point is a grid line
  //       let value = (printing.x - center.x) / GRAPH_DATA.major_space;
  //       if (value != 0)
  //         SHOW_TEXT(
  //           ctx,
  //           value,
  //           GRAPH_DATA.label_font_size,
  //           printing.x + 5,
  //           printing.y
  //         );

  //       printing.x += GRAPH_DATA.major_space;
  //       scanning.x += GRAPH_DATA.major_space;
  //     } else {
  //       printing.x++;
  //       scanning.x++;
  //     }
  //   }
  // }
};

const CALCULATE_WIDTH_TEXT = (ctx, text, font) => {
  ctx.font = font + "px Arial"
  return ctx.measureText(text).width
}

const SHOW_TEXT = (ctx, text, fontSize, x, y) => {
  ctx.font = fontSize + "px Arial";
  ctx.fillStyle = "#ffffff";
  ctx.fillText(text, x, y);
};

const MAKE_LINE = (ctx, canvas, from, to, gridType) => {
  ctx.beginPath();
  // console.log(from, to)
  ctx.strokeStyle = "#989898";

  if (gridType === "axis") ctx.lineWidth = 3;
  else if (gridType === "major") ctx.lineWidth = 1;
  else if (gridType === "minor") ctx.lineWidth = 0.1;

  ctx.moveTo(from.x, from.y);
  ctx.lineTo(to.x, to.y);

  ctx.stroke();
  ctx.fill();

  ctx.closePath();
};
