/*
    Defining global constants
 */

const diameter = 20;

// The provers
let p1;
let p2;
let p3;

// The verifiers
let v1;
let v2;
let v3;

let entitySelectedIndex = -1;
let provers;
let verifiers;

// The graph cells
let selected = [];
let selectID = [];
let rand;

let myp5 = new p5(sketch => {
    sketch.setup = () => {

        let canv = sketch.createCanvas(500, 500);
        canv.position(600, 200)
        resetSketch();
        var reset = sketch.createButton("reset");
        reset.position(600,150)
        reset.mousePressed(resetSketch);
    }

    let checkIfTouching = () => {
        for (var i = 0; i < verifiers.length; ++i) {
            if (verifiers[i].rings.length == 0) continue;
            let ring = verifiers[i].rings[0]
            for (var j = 0; j < verifiers.length; ++j) {
                if (i == j) continue;
                let d = sketch.dist(verifiers[i].x, verifiers[i].y, verifiers[j].x, verifiers[j].y) - verifiers[j].diameter / 2
                if (ring.diameter / 2 >= d) {
                    sketch.noLoop()
                    return;
                }
            }
        }
    }

    let resetSketch = () => {
        p1 = new Prover(sketch.width /2, sketch.height/6);
        p2 = new Prover(sketch.width / 10, sketch.height -100 );
        p3 = new Prover(sketch.width - 100, sketch.height - 100);

        v1 = new Verifier(sketch.width / 2, sketch.height/6+50);
        v2 = new Verifier(sketch.width /10 + 50, sketch.height - 100);
        v3 = new Verifier(sketch.width-150 , sketch.height - 100);

        provers = [p1, p2, p3];
        verifiers = [v1, v2, v3];
        // sketch.createSlider();
    }

    sketch.draw = () => {
        sketch.background(220);

        provers.forEach((e) => {
            e.update(sketch)
        });
        provers.forEach((e) => {
            e.render(sketch)
        });
        Verifier.updateAll(sketch, verifiers, entitySelectedIndex);

        verifiers.forEach((e) => {
            e.render(sketch)
        });

        checkIfTouching()
    };

    sketch.mousePressed = () => {
        verifiers.forEach((e, i) => {
            if (sketch.dist(sketch.mouseX, sketch.mouseY, e.x, e.y) < e.diameter) {
                entitySelectedIndex = i;
            }
        });
    };

    sketch.mouseReleased = () => {
        entitySelectedIndex = -1;
    }
}, "entity-canvas");

let myp5User = new p5(sketch1 => {
    let rand1;
    let rand2;

    sketch1.setup = () => {
        let canvUser = sketch1.createCanvas(500, 100);
        canvUser.position(10,20);

        rand1 = sketch1.createButton('1');
        rand2 = sketch1.createButton('2');
        bgCol1 = sketch1.color(200,255,255);
        bgCol2 = sketch1.color(200,255,255);

        rand1.position(20,70);
        rand1.style('font-size', '30px');
        rand1.style('background-color', sketch1.color(255));
        rand1.style('color: black');
        rand1.mouseClicked(changeColor);


        rand2.position(60,70);
        rand2.style('font-size', '30px');
        rand2.style('background-color', sketch1.color(255));
        rand2.style('color: black');
        rand2.mouseClicked(changeColor);

        let commit = sketch1.createButton('commit');
        commit.position(rand2.x + rand2.width+30, rand2.y);
        commit.style('font-size', '30px');
        commit.style('background-color', sketch1.color(255));
        commit.style('color: black');
        // commit.mousePressed();

        let instruction = sketch1.createElement('h3', "Please choose one of the two following randomness.")
        instruction.position(rand1.x, 10);

        // sketch1.textAlign(CENTER);
        sketch1.textSize(100);
    };

    let changeColor = () => {
        if (sketch1.dist(sketch1.mouseX, sketch1.mouseY, rand1.x, rand1.y) < 30){
            rand1.style('background-color', sketch1.color(255,200,200));
            rand = 1;
            console.log(rand);
        }
        else if (sketch1.dist(sketch1.mouseX, sketch1.mouseY, rand2.x, rand2.y) < 30){
            rand2.style('background-color', sketch1.color(255,200,200));
            rand = 2;
            console.log(rand);
        }
    };

    sketch1.draw = () => {
        sketch1.background(255);

    }

}, "user-canvas");
/*
    Canvas to ask user to pick an edge
 */
let myp5UserG = new p5(sketch3 => {
    sketch3.setup = () => {
        let canvUser = sketch3.createCanvas(500, 70);
        canvUser.position(10,140)

        // let input = sketch1.createInput();
        // input.position(20, 70);

        // let commit = sketch1.createButton('commit');
        // commit.position(rand2.x + rand2.width, rand2.y);
        // // commit.mousePressed();

        let instruction = sketch3.createElement('h3', "Please choose two nodes that form an edge in the following graph.")
        instruction.position(10, 140);

        // sketch1.textAlign(CENTER);
        sketch3.textSize(100);
    }

    sketch3.draw = () => {
        sketch3.background(255);

    }

}, "userG-canvas");
/*
    Canvas that displays the graph
 */
let myp5Graph = new p5(sketch2 => {
    let cells = [];
    let connections = [];
    sketch2.setup = () => {
        let canv = sketch2.createCanvas(500, 500);
        canv.position(10,200);

        // Defining the coordinate system for displaying the graph
        let origin_x = 86.6;
        let origin_y = 250;
        let x = 86.6;
        let y = 50;

        // Create cells
        const cell_1 = new Cell(1, origin_x, origin_y);
        const cell_2 = new Cell(2, origin_x + x, origin_y - 3*y);
        const cell_3 = new Cell(3, origin_x + 3*x, origin_y - 3*y);
        const cell_4 = new Cell(4, origin_x + 4*x, origin_y);
        const cell_5 = new Cell(5, origin_x + 3*x, origin_y + 3*y);
        const cell_6 = new Cell(6, origin_x + x, origin_y + 3*y);
        const cell_7 = new Cell(7, origin_x + x, origin_y + y);
        const cell_8 = new Cell(8, origin_x + x, origin_y - y);
        const cell_9 = new Cell(9, origin_x + 2*x, origin_y - 2*y);
        const cell_10 = new Cell(10, origin_x + 3*x, origin_y - y);
        const cell_11 = new Cell(11, origin_x + 3*x, origin_y + y);
        const cell_12 = new Cell(12, origin_x + 2*x, origin_y + 2*y);

        // Add cells to cells list
        cells.push(cell_1);
        cells.push(cell_2);
        cells.push(cell_3);
        cells.push(cell_4);
        cells.push(cell_5);
        cells.push(cell_6);
        cells.push(cell_7);
        cells.push(cell_8);
        cells.push(cell_9);
        cells.push(cell_10);
        cells.push(cell_11);
        cells.push(cell_12);

        // Create connections between cells
        const c1 = new Connection(cell_1, cell_7);
        const c2 = new Connection(cell_1, cell_8);
        const c3 = new Connection(cell_8, cell_7);
        const c4 = new Connection(cell_8, cell_2);
        const c5 = new Connection(cell_8, cell_9);
        const c6 = new Connection(cell_2, cell_9);
        const c7 = new Connection(cell_2, cell_5);
        const c8 = new Connection(cell_9, cell_3);
        const c9 = new Connection(cell_9, cell_10);
        const c10 = new Connection(cell_3, cell_10);
        const c11 = new Connection(cell_3, cell_6);
        const c12 = new Connection(cell_10, cell_11);
        const c13 = new Connection(cell_10, cell_4);
        const c14 = new Connection(cell_4, cell_11);
        const c15 = new Connection(cell_11, cell_12);
        const c16 = new Connection(cell_11, cell_5);
        const c17 = new Connection(cell_5, cell_12);
        const c18 = new Connection(cell_12, cell_6);
        const c19 = new Connection(cell_12, cell_7);
        const c20 = new Connection(cell_6, cell_7);

        // Add connections to connections list
        connections.push(c1);
        connections.push(c2);
        connections.push(c3);
        connections.push(c4);
        connections.push(c5);
        connections.push(c6);
        connections.push(c7);
        connections.push(c8);
        connections.push(c9);
        connections.push(c10);
        connections.push(c11);
        connections.push(c12);
        connections.push(c13);
        connections.push(c14);
        connections.push(c15);
        connections.push(c16);
        connections.push(c17);
        connections.push(c18);
        connections.push(c19);
        connections.push(c20);
    }

    sketch2.draw = () => {
        sketch2.background(220);
        connections.forEach(conn => {
            conn.render(sketch2);
        })

        cells.forEach (cell => {
            if (cell.isInside(sketch2.mouseX, sketch2.mouseY, sketch2)) cell.flags.hover = true;
            else cell.flags.hover = false;

            cell.render(sketch2);
        });
    };

    sketch2.mouseClicked = () => {
        cells.forEach(cell => {
            if (cell.isInside(sketch2.mouseX, sketch2.mouseY, sketch2)){
                // cell.flags.clicked = true;
                selected.push(cell);
                selectID.push(cell.id);
                console.log(selectID);
                cell.changeCol(selected);
                if (selected.length >= 2){
                    selected = [];
                    selectID =[]
                }
            }
            else cell.flags.clicked = false;
        });
    };

}, "graph-canvas");