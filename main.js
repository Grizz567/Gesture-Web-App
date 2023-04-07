prediction_1 = "";

Webcam.set({
    width : 350,
    height : 300,
    image_format : 'png',
    png_quality : 90
});
camera = document.getElementById("camera");
Webcam.attach('#camera');

function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id = "captured_image" src = "' + data_uri + '"/>';
    });
}

console.log('ml5 version: ' + ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/IhFB552gR/model.json', modelLoaded);

function modelLoaded() {
    console.log("Model Loaded!");
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "As a prediction, your hand's gesture shows a: " + prediction_1;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
}
function check() {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;

        prediction_1 = results[0].label;
        speak();

        if (results[0].label == "Thumbs Up") {
            document.getElementById("update_hand_gesture").innerHTML = "&#128077;";
        }
        if (results[0].label == "Nice Symbol") {
            document.getElementById("update_hand_gesture").innerHTML = "&#128076;";
        }
        if (results[0].label == "Victory Symbol") {
            document.getElementById("update_hand_gesture").innerHTML = "&#9996;";
        }
        if (results[0].label == "Thumbs Down") {
            document.getElementById("update_hand_gesture").innerHTML = "&#128078;";
        }

        }
    }
