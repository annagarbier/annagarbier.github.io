/* Update dynamic text content */
let index = 0;
let chapter = chapters[index];

let content = new Vue({
  el: '#chapter',
  data: {
    id: chapter.id,
    corpus: chapter.corpus,
    steps: chapter.steps,
    vulnerability: chapter.text.vulnerability,
    desire: chapter.text.desire,
    deeper_desire: chapter.text.deeper_desire,
    bridge: chapter.text.bridge,
    bridge_continue: chapter.text.bridge_continue,
    common: chapter.text.common,
  },
});

function updateData(index) {
  const chapter = chapters[index];
  content.id = chapter.id;
  content.corpus = chapter.corpus;
  content.steps = chapter.steps;
  content.vulnerability = chapter.text.vulnerability;
  content.desire = chapter.text.desire;
  content.deeper_desire = chapter.text.deeper_desire;
  content.bridge = chapter.text.bridge;
  content.bridge_continue = chapter.text.bridge_continue;
  content.common = chapter.text.common;
}

/* Hide/show dynamic content */
// TODO: css jitter (https://stackoverflow.com/questions/42096201/jitter-in-hover-transformation-css)
$('#dynamic-text').mouseover(function () {
  document.querySelectorAll('.hideshow').forEach((item) => {
    item.style.animation = 'appeartext 1.25s ease-out forwards';
  });
  document.querySelectorAll('.prompt-keep').forEach((item) => {
    item.style.backgroundColor = 'rgb(212, 39, 39, 1)';
  });
});

$('#dynamic-text').mouseout(function () {
  document.querySelectorAll('.hideshow').forEach((item) => {
    item.style.animation = 'disappeartext 1.25s ease-out backwards';
  });
  document.querySelectorAll('.prompt-keep').forEach((item) => {
    item.style.backgroundColor = 'rgba(212, 39, 39, 0)';
  });
});

$('#dynamic-text').bind('mouseenter', function () {
  $('#info').stop(true).fadeIn(1000);
});

$('#dynamic-text').bind('mouseleave', function () {
  $('#info').stop(true).fadeOut(1000);
});

/* Advance bookmark */
function updateBookmark(index) {
  document.querySelectorAll('.tab').forEach((item) => {
    item.style.backgroundColor = 'white';
  });
  const current_tab = `#tab-${index}`;
  console.log(index);
  $(current_tab).css('backgroundColor', 'black');
}

/* Navigate */
updateBookmark(0); // Initialize bookmark
updateArrows(0); // Initialze arrows

function updateArrows(index) {
  $('#previous').css('display', 'block');
  $('#next').css('display', 'inline-block');
  if (index === 0) {
    $('#previous').css('display', 'none');
  }
  if (index === chapters.length - 1) {
    $('#next').css('display', 'none');
  }
}

// TODO: reset hide text when buttons are pressed
$('#previous').click(function () {
  index = Math.abs((index - 1) % chapters.length);
  updateData(index);
  updateArrows(index);
  updateBookmark(index);
});

$('#next').click(function () {
  index = Math.abs((index + 1) % chapters.length);
  updateData(index);
  updateArrows(index);
  updateBookmark(index);
});

// DEV
// $('#chapter').click(function () {
//   index = Math.abs((index + 1) % chapters.length);
//   updateData(index);
//   updateArrows(index);
//   updateBookmark(index);
// });
