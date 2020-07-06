const p5Grm = {
    "S": ["#setup#"],
    "setup": ["function setup() { #canvas# #background# #fill# #stroke# #weight# #shape# }"],
    "canvas": ["createCanvas(255, 255);"],
    "weight": ["strokeWeight(3);"],
    "background": [`background(${getRand()}, ${getRand()}, ${getRand()});`],
    "fill": [`fill(${getRand()}, ${getRand()}, ${getRand()});`],
    "stroke": [`stroke(${getRand()}, ${getRand()}, ${getRand()});`],
    "color": [`${getRand()}, ${getRand()}, ${getRand()}`],
    "shape": [
        `rect(${getRand()}, ${getRand()}, ${getRand()}, ${getRand()});`,
        `ellipse(${getRand()}, ${getRand()}, ${getRand()}, ${getRand()});`]
}

function getRand() {
    num = Math.floor(Math.random() * 255);
    return num.toString();
}

function expandGrm(grammar, parentDiv) {
    const grm = tracery.createGrammar(grammar);
    const grmOut = grm.flatten("#S#");
    const grmDiv = document.createElement('div');
    document.getElementById(parentDiv).appendChild(grmDiv);
    grmDiv.textContent = grmOut;
}

function main() {
    expandGrm(p5Grm, "output");
}

setTimeout(main, 10);