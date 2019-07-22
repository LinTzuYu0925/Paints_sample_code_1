var canvas = document.createElement("CANVAS");
//canvas.style = "border:10px groove #8c42f4";
//canvas.style.backgroundColor = "white";
var ctx = canvas.getContext('2d');
var thickness = 2;
ctx.lineWidth = thickness;
var cX = 0; //X coordinate
var cY = 0; //Y coordinate
var isDrawing = false;
var condition = document.createElement('p');
var coor = document.createElement('p');
var start_x;
var start_y;
var end_x;
var end_y;
var drawcircle = false;
var flag = false;
var drawline = false;
var straight = false;
var drawsquare = false;
var drawtriangle = false;
var fill = false;
var eraser = false;
var eraserSize = 7;
var inputtext = false;
var addimage = false;
var cPushArray = [];
var cStep = -1;
var color_pick = document.createElement('input');
color_pick.type = 'color';
color_pick.name = 'favcolor';
color_pick.value = '#000000';
color_pick.setAttribute('class', 'color')
//ctx.strokeStyle = color_pick.value;
var submit = document.createElement('input');
submit.type = 'submit';
submit.setAttribute('class', 'color1')
var cPushArray = new Array();
var cStep = -1;

function InitPainter(div) {
    var script = document.createElement('script')
    //var script1 = document.createElement('script')
    script.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"
    //script1.src = 'https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js'
    script.type = 'text/javascript'
    //script1.type = 'text/javascript'
    var link = document.createElement('link')
    link.href = 'tt.css'
    link.rel = 'stylesheet'
    canvas.width = 800;
    canvas.height = 480;
    var font = document.createElement('link')
    font.href = "https://fonts.googleapis.com/css?family=Permanent+Marker"
    font.rel = "stylesheet"
    var font1 = document.createElement('link')
    font1.href = "https://fonts.googleapis.com/css?family=Gloria+Hallelujah|Permanent+Marker"
    font1.rel = "stylesheet"
    document.getElementsByTagName('head')[0].appendChild(script)
    //document.getElementsByTagName('head')[0].appendChild(script1)
    document.getElementsByTagName('head')[0].appendChild(link)
    document.getElementsByTagName('head')[0].appendChild(font)
    document.getElementsByTagName('head')[0].appendChild(font1)
    canvas_style();
    buttons();
    //Toolbar_style();
    document.body.appendChild(color_pick);
    document.body.appendChild(submit);

    canvas.addEventListener("mousemove", getCoor);
    canvas.addEventListener("mousemove", drawLine_do);
    canvas.addEventListener("mousedown", start_drawing);
    canvas.addEventListener("mouseup", stop_drawing);
    canvas.addEventListener("mouseout", stop_drawing);

    function getCoor() {
        cX = event.offsetX;
        cY = event.offsetY;
        coor.innerText = "Coordinates: " + cX + "," + cY;
    }

    function start_drawing() {
        isDrawing = 1;
        if ((drawcircle == true || drawsquare == true || drawtriangle == true || inputtext == true || drawline == true || straight == true) && flag == true) {
            start_x = cX;
            start_y = cY;
            flag = false;
        }
        ctx.beginPath();
        ctx.moveTo(event.offsetX, event.offsetY);

        ctx.strokeStyle = color_pick.value;
        cPush();
    }

    function stop_drawing() { // stop_drawing
        // circle
        if (drawcircle == true && isDrawing == true) {
            end_x = cX;
            end_y = cY;
            ctx.beginPath();
            ctx.arc(start_x, start_y, (Math.sqrt((start_x - end_x) * (start_x - end_x) + (start_y - end_y) * (start_y - end_y))), 0, 2 * Math.PI);
            console.log(ctx.fillStyle)
            if (fill == true) {
                ctx.fillStyle = color_pick.value;
                ctx.fill();
            }
            ctx.strokeStyle = color_pick.value;
            ctx.stroke();
            flag = true;
        }

        //draw square
        if (drawsquare == true && isDrawing == true) {
            end_x = cX;
            end_y = cY;
            // ctx.beginPath();
            ctx.rect(start_x, start_y, Math.abs(end_x - start_x), Math.abs(end_y - start_y));
            if (fill == true) {
                ctx.fillStyle = color_pick.value;
                ctx.fill();
            }
            ctx.strokeStyle = color_pick.value;
            ctx.stroke();
            flag = true;
        }
        //draw a triangle
        if (drawtriangle == true && isDrawing == true) {
            end_x = cX;
            end_y = cY;
            ctx.moveTo(start_x, start_y);
            ctx.lineTo(end_x, end_y);
            ctx.lineTo(end_x - 2 * (end_x - start_x), end_y);
            ctx.lineTo(start_x, start_y);
            ctx.lineTo(end_x, end_y);
            if (fill == true) {
                ctx.fillStyle = color_pick.value;
                ctx.fill();
            }
            ctx.strokeStyle = color_pick.value;
            ctx.stroke();
            flag = true;
        }

        //input image
        if (addimage == true && isDrawing == true) {

            var img = new Image(1, 1);
            var img_val = $('#img_input').val();

            img.src = img_val
            console.log(img_val);
            //img.src = 'https://www.tutorialspoint.com/images/seaborn-4.jpg?v=2';
            //---------------------------------------------------------------------
            end_x = cX;
            end_y = cY;
            ctx.drawImage(img, end_x, end_y);
            flag = true;
        }
        //input text
        if (inputtext == true && isDrawing == true) {
            end_x = cX;
            end_y = cY;
            var text_val = $('#text_input').val();
            var size_val = $('#size_input').val();
            var style_val = $('#style_input').val();
            var new_size = size_val + 'px';
            ctx.font = new_size + ' ' + style_val;
            ctx.fillText(text_val, cX, cY);
            flag = true;
        }
        if (isDrawing == true && straight == true) {
            end_x = cX;
            end_y = cY;
            ctx.moveTo(start_x, start_y);
            ctx.lineTo(end_x, end_y);
            ctx.stroke();
            flag = true;
        }
        isDrawing = 0;

    }

    function drawLine_do() { // drawing_do
        ctx.strokeStyle = color_pick.value;
        if (drawline == true || eraser == true) {
            //window.alert("drawLine");
            canvas.addEventListener("mousemove", drawLine_do);
        }
        //line
        if (isDrawing == true && drawline == true) {
            ctx.lineTo(event.offsetX, event.offsetY);
            ctx.stroke();
        }

        if (eraser == true && isDrawing == true) {
            ctx.strokeStyle = "white";
            //ctx.clearRect(event.offsetX, event.offsetY, eraserSize, eraserSize);
            ctx.lineTo(event.offsetX, event.offsetY);
            ctx.stroke();
        }

    }

    function buttons() {


        var triangle = document.createElement("BUTTON");
        triangle.innerHTML = "TRIANGLE";
        triangle.setAttribute('class', 'btn');
        //triangle.setAttribute('class', 'Toolbar');
        document.body.appendChild(triangle);
        triangle.addEventListener("click", drawTringle);

        var square = document.createElement("BUTTON");
        square.innerHTML = "SQUARE";
        square.setAttribute('class', 'btn');
        //square.setAttribute('class', 'btn1');
        document.body.appendChild(square);
        square.addEventListener("click", drawSquare);

        var circle = document.createElement("BUTTON");
        circle.innerHTML = "CIRCLE";
        circle.setAttribute('class', 'btn');
        document.body.appendChild(circle);
        circle.addEventListener("click", drawCircle);

        var line = document.createElement("BUTTON");
        line.innerHTML = "LINE";
        line.setAttribute('class', 'btn');
        document.body.appendChild(line);
        line.addEventListener("click", draw_st_Line);

        var clear = document.createElement("BUTTON");
        clear.innerHTML = "CLEAR";
        clear.setAttribute('class', 'btn');
        document.body.appendChild(clear);
        clear.addEventListener("click", clearCanvas);

        var eraser = document.createElement("BUTTON");
        eraser.innerHTML = "ERASER";
        eraser.setAttribute('class', 'btn');
        document.body.appendChild(eraser);
        eraser.addEventListener("click", Eraser);

        var pencil = document.createElement("BUTTON");
        pencil.innerHTML = "PENCIL";
        pencil.setAttribute('class', 'btn');
        document.body.appendChild(pencil);
        pencil.addEventListener("click", drawLine);

        var ink = document.createElement("BUTTON");
        ink.innerHTML = "INK";
        ink.setAttribute('class', 'btn');
        document.body.appendChild(ink);
        ink.addEventListener("click", fillColor);

        var re_do = document.createElement("BUTTON");
        re_do.innerHTML = "REDO";
        re_do.setAttribute('class', 'btn1');
        document.body.appendChild(re_do);
        re_do.addEventListener("click", cRedo);

        var un_do = document.createElement("BUTTON");
        un_do.innerHTML = "UNDO";
        un_do.setAttribute('class', 'btn2');
        document.body.appendChild(un_do);
        un_do.addEventListener("click", cUndo);

        var text = document.createElement("BUTTON");
        text.innerHTML = "TEXT";
        text.setAttribute('class', 'btn');
        text.setAttribute('id', 'text');
        document.body.appendChild(text);
        text.addEventListener("click", inputText);

        var text_input = document.createElement('input');
        text_input.setAttribute('id', 'text_input');
        document.body.appendChild(text_input);

        var font_size = document.createElement('input');
        font_size.size = '5';
        font_size.setAttribute('id', 'size_input');
        document.body.appendChild(font_size);

        var font_size = document.createElement('button');
        font_size.innerHTML = "SIZE";
        font_size.setAttribute('id', 'font_btn');
        font_size.addEventListener("click", inputText);
        document.body.appendChild(font_size);

        var font_style = document.createElement('input');
        font_style.size = '5';
        font_style.setAttribute('id', 'style_input');
        document.body.appendChild(font_style);

        var font_style = document.createElement('button');
        font_style.innerHTML = "STYLE";
        font_style.setAttribute('id', 'style_btn');
        font_style.addEventListener("click", inputText);
        document.body.appendChild(font_style);

        var round = document.createElement("BUTTON");
        round.innerHTML = "ROUND";
        round.setAttribute('class', 'btn3');
        document.body.appendChild(round);
        round.addEventListener("click", Round);

        var butt = document.createElement("BUTTON");
        butt.innerHTML = "BUTT";
        butt.setAttribute('class', 'btn3');
        document.body.appendChild(butt);
        butt.addEventListener("click", Butt);

        var square = document.createElement("BUTTON");
        square.innerHTML = "SQUARE";
        square.setAttribute('class', 'btn3');
        document.body.appendChild(square);
        square.addEventListener("click", Square);

        var Image = document.createElement("BUTTON");
        Image.innerHTML = "IMAGE";
        Image.setAttribute('class', 'btn');
        Image.setAttribute('id', 'Image');
        document.body.appendChild(Image);
        Image.addEventListener("click", addImage);

        var img_input = document.createElement('input');
        img_input.setAttribute('id', 'img_input');
        document.body.appendChild(img_input);

    }

    var linkk = document.createElement('a');
    linkk.innerHTML = 'download image';
    linkk.addEventListener('click', function () {
        linkk.href = canvas.toDataURL();
        linkk.download = "masterpiece.png";
    }, false);
    linkk.setAttribute('id', 'down');
    document.body.appendChild(linkk);

    var changethick = document.createElement("input");
    changethick.type = "range"
    changethick.name = "thicknesss"
    changethick.min = "1"
    changethick.max = '15'
    changethick.value = '1'
    //changethick.oninput = "sliderChange(this.value)"
    changethick.addEventListener('change', function () {
        ctx.lineWidth = changethick.value
    }, false);
    document.body.appendChild(changethick);
    changethick.setAttribute('class', 'thick');

}

function cPush() {
    cStep++;
    if (cStep < cPushArray.length) {
        cPushArray.length = cStep;
    }
    cPushArray.push(canvas.toDataURL());
}

function cUndo() {
    if (cStep > 0) {
        cStep--;
        var canvasPic = new Image();
        canvasPic.onload = function () {
            ctx.clearRect(0, 0, canvas.width, canvas.height); //clear canvas
            ctx.drawImage(canvasPic, 0, 0);
        };
        canvasPic.src = cPushArray[cStep];
        console.log('undo')
    }
}

function cRedo() {
    if (cStep < cPushArray.length - 1) {
        cStep++;
        var canvasPic = new Image();
        canvasPic.onload = function () {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(canvasPic, 0, 0);
        }
        canvasPic.src = cPushArray[cStep];
        console.log('redo')
    }
}

function Butt() {
    ctx.lineCap = "butt";
}

function Round() {
    ctx.lineCap = "round";
}

function Square() {
    ctx.lineCap = "square";
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function canvas_style() {
    document.body.style.backgroundImage = "url(https://images.unsplash.com/photo-1550638565-e658cf328e4a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80)";
    //document.createElement("myH2").style.color = "#ff0000";
    var title = document.createElement('p');
    title.innerText = "My Canvas";
    title.style.fontSize = "3.5rem";
    title.setAttribute('class', 'title');
    document.body.appendChild(title);
    document.body.appendChild(canvas);
}

function inputText() {
    canvas.style.cursor = "url('text.PNG'), auto";
    inputtext = true;
    flag = true;
    straight = false;
    eraser = false;
    drawtriangle = false;
    drawline = false;
    drawcircle = false;
    drawsquare = false;
    addimage = false;
    fill = false;
}

/*eraser*/
function Eraser() {
    canvas.style.cursor = "url('eraser.PNG'), auto";
    eraser = true;
    inputtext = false;
    drawtriangle = false;
    flag = false;
    straight = false;
    drawline = false;
    drawcircle = false;
    drawsquare = false;
    addimage = false;
    // drawLine_do();
    fill = false;
    //var e = document.getElementById("eraser").value;
    //eraserSize = e;
}

/*Draw a circle*/
function drawCircle() {
    canvas.style.cursor = "url('circle.PNG'), auto";
    drawtriangle = false;
    flag = true;
    straight = false;
    inputtext = false;
    drawline = false;
    drawcircle = true;
    eraser = false;
    drawsquare = false;
    addimage = false;
    fill = false;
}

/*Draw a Line*/
function drawLine() {

    drawtriangle = false;
    drawline = true;
    straight = false;
    inputtext = false;
    drawsquare = false;
    drawcircle = false;
    flag = false;
    eraser = false;
    addimage = false;
    fill = false;
}

function draw_st_Line() {
    canvas.style.cursor = "url('line.PNG'), auto";
    drawtriangle = false;
    drawline = false;
    straight = true;
    inputtext = false;
    drawsquare = false;
    drawcircle = false;
    flag = false;
    eraser = false;
    addimage = false;
    fill = false;
}

/*Draw a square*/
function drawSquare() {
    canvas.style.cursor = "url('square.PNG'), auto";
    drawtriangle = false;
    drawline = false;
    inputtext = false;
    straight = false;
    flag = true;
    eraser = false;
    drawcircle = false;
    drawsquare = true;
    addimage = false;
    fill = false;
}

/*Draw a triangle*/
function drawTringle() {
    canvas.style.cursor = "url('triangle.PNG'), auto";
    drawtriangle = true;
    drawline = false;
    inputtext = false;
    straight = false;
    drawsquare = false;
    drawcircle = false;
    eraser = false;
    addimage = false;
    flag = true;
    fill = false;
}

function addImage() {
    drawtriangle = false;
    drawline = false;
    straight = false;
    inputtext = false;
    drawsquare = false;
    drawcircle = false;
    eraser = false;
    addimage = true;
    flag = true;
    fill = false;
}

function fillColor() {
    fill = true;
}