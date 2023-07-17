function setup() {
    canvas = createCanvas(280, 280);
    canvas.center(); 
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth=speechSynthesis;
}
function preload() {
    classifier=ml5.imageClassifier('DoodleNet');
}

function draw() {
    strokeWeight(13);
    stroke(0);
    if(mouseIsPressed){
        line(pmouseX,pmouseY,mouseX,mouseY);
    }
}

function clearCanvas() {
    background("white");
}

function classifyCanvas() {
    classifier.classify(canvas,GotResults);
}

function GotResults(error,results) {
    if(error){
        console.error(error);
    }
        console.log(results);
        document.getElementById("label").innerHTML='label:'+results[0].label;
        document.getElementById("confidence").innerHTML='confidence:'+Math.round(results[0].confidence*100)+'%';
        utterThis=new SpeechSynthesisUtterance(results[0].label);
       speak.synth(utterThis);
    }
