## Summary
Draw over NASA's Astronomy Picture of the Day ("ASOP") in your web browser.

## Demo
Screen recording: https://annagarbier.github.io/work/courses/2018/fall/creativity_and_computation/p5/cc_lab_javascript_api/demo/index.html

Note that a CORS Chrome extension is enabled. Disabling it violates CORS policy...will need to solve this another day.

## Details
* Uses p5.js to `GET` the Image of the Day from NASA's API (https://api.nasa.gov/index.html).
* Displays the Picture of the Day in an HTML div, scaled to the screen width.
* `mousePressed()` allows user to draw over the image.
* `refreshSketch()` function allows user to refresh the sketch without re-loading everything.
* TODO: solve CORS issues.

## Code
* index.html, style.css, and sketch.js all found in this directory.
