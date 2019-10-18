
// const redButton = document.querySelector('#redButton');
const chunks = [];

function record() {
  chunks.length = 0;
  const stream = document.querySelector('canvas').captureStream(30);
  const recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (e) => {
    if (e.data.size) {
      chunks.push(e.data);
    }
  };
  recorder.onstop = exportVideo;
  // btn.onclick = (e) => {
  //   recorder.stop();
  //   btn.textContent = 'start recording';
  //   btn.onclick = record;
  // };
  recorder.start();
  setTimeout(() => {
    recorder.stop();
  }, 10000);
}

function exportVideo(e) {
  const blob = new Blob(chunks);
  let link = document.createElement('a');
  link.download = 'hello.mp4';
  link.href = URL.createObjectURL(blob);
  link.click();
  URL.revokeObjectURL(link.href);
}



//

let style;
let video;
let audio;
let audioCtx;
let isTransferring = false;
let resultImg;
let filters;
let input;
let models;

function setup() {
  filters = [];
  models = ['kandinsky', 'la_muse', 'mathura', 'rain_princess', 'scream', 'udnie', 'wave', 'wreck']
  createCanvas(window.innerWidth, window.innerHeight).parent('canvasContainer');
  
  video = createCapture(VIDEO);
  video.hide();

  // The results image from the style transfer
  resultImg = createImg('');
  resultImg.hide();

  audio = false
  // input audio
  input = new p5.AudioIn();
  input.start()
  // audioCtx = getAudioContext()
  const model = selectModel()
  // The button to start and stop the transfer process
  // select('#blueButton').mousePressed(startStop);
  // select('#greenButton').mousePressed(changeFilter)
  // select('#audioButton').mousePressed(toggleAudio)
  // const img = `images/${model.split('/')[1]}.jpg`
  // document.querySelector('#modelImage').setAttribute('src', img)
  select('h2').html(model.split('/')[1])
  // Create a new Style Transfer method with a defined style.
  // We give the video as the second argument
  style = ml5.styleTransfer(model, video, modelLoaded);
}

function draw() {
  
  // audio level treshlod
  let threshold = 0.1;
  // get current audio level
  let volume = input.getLevel();
  getAudioContext().resume()
  
  // audio dependant change logic
  if (volume > threshold) { 
    changeFilter() 
  }
  
  // Switch between showing the raw camera or the style
  if (isTransferring) {
    image(resultImg, 0, 0, window.innerWidth, window.innerHeight);
    if (filters) {
      try {
        filter(filters[0]);
      } catch (err) { return }
    } 
  } else {
    image(video, 0, 0, window.innerWidth, window.innerHeight);
    if (filters) {
      try {
        filter(filters[0]);
      } catch (err) { return }
    } 
  }
}

// A function to call when the model has been loaded.
function modelLoaded() {
  select('#status').html('Model Loaded');
}

function selectModel(){
  const index = Math.floor(Math.random() * models.length)
  return `models/${models[index]}`
}
// Start and stop the transfer process
function startStop() {
  // style = ml5.styleTransfer(selectModel(), video, modelLoaded);
  style.transfer(gotResult);
  isTransferring = !isTransferring;
}

//
function toggleAudio(){
  if (audio) {
    audio = false
    return
  } else {
    audio = true
  }
}
//
function toggleAudioReaction() {
  if (audio) { 
    return getAudioContext().close()
  }
  else {
    return getAudioContext().resume()
  }
}
// filter function
function changeFilter() {
  if (filters.length < 1) {
    // console.log(123132312)
    filters = [GRAY, THRESHOLD, INVERT]
    return
  } else {
    filters.shift()
    return console.log(filters)
  }
}

// When we get the results, update the result image src
function gotResult(err, img) {
  resultImg.attribute('src', img.src);
  if (isTransferring) {
    style.transfer(gotResult);
  }
}
document.querySelector('#redButton').onclick = record;
document.querySelector('#greenButton').onclick = changeFilter;
document.querySelector('#blueButton').onclick = startStop
// redButton.onclick = record;