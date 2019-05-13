/* COOPER HEWITT COLORS ON DISPLAY
 *
 * Display  Cooper Hewitt collection data dynamically using
 * D3 library and raw JavaScript DOM manipulations.
 * Data is separately retrieved by get_data.js,
 * and read in here as data.csv.
 * 
 * Anna Garbier, 2018-05-07 */

// import * as d3 from "d3";

(function() {
    // DYNAMIC HTML CONTENT ///////////////////////////////////////////////////
    function togglePageInfo() {
        const show_page_info = document.getElementById("show-page-info");
        // TODO: initial "show" requires exactly two clicks. Not sure why.
        show_page_info.addEventListener("click", function() {
            const page_info = document.getElementById("page-info");
            if (page_info.style.display === "none") {
                page_info.style.display = "block";
                show_page_info.innerHTML = "<b id='hide'>hide</b> page info";
            } else {
                page_info.style.display = "none";
                show_page_info.innerHTML = "show page info";
            }
        });
    }


    // DYNAMIC CSV CONTENT ////////////////////////////////////////////////////
    function generateDynamicChart() {
        const width = document.getElementById("chart-div").offsetWidth;
        const height = window.innerHeight;
        const r = width / 59;
        const svg = createBlankChart(width, height, "#chart-div");
        const simulation = createSimulation(.06, r, width, height);

        // Read data and display when ready
        connectToDataset("./data/data.csv", ready);

        function ready(error, datapoints) {
            const circles = svg.selectAll(".clr")
                .data(datapoints)
                .enter().append("circle")
                .attr("class", "clr")
                .attr("r", r)
                .attr("fill", function(d) {return d.color;})
                .on("mouseover", showMouseoverInfo)
                .on("mouseout", hideMouseOverInfo)
                .on("click", openLink);

            // Run the simulation animation
            simulation.nodes(datapoints)
                .on("tick", ticked);

            function ticked() {
                circles
                    .attr("cx", function(d) {
                        return d.x;
                    })
                    .attr("cy", function(d) {
                        return d.y;
                    })
            }
        }
    }


    // CHART UNILITY FUNCTIONS ////////////////////////////////////////////////
    // Create a SVG with starter attributes based on
    // parameters width, height, and parent div.
    function createBlankChart(w, h, p) {
        const svg = d3.select(p)
            .append("svg")
            .attr("width", w)
            .attr("height", h)
            .append("g")
            .attr("transform", "translate(0, 0)");
        return svg;
    }

    // Create a collection of forces that guide animation
    // based on speed, radius, width, and height parameters.
    function createSimulation(s, r, w, h) {
        const simulation = d3.forceSimulation()
            // Converge
            .force("centerX", d3.forceX(w / 2).strength(s))
            .force("centerY", d3.forceY(h / 2).strength(s))
            // Relax
            .force("relax", d3.forceCollide(r + 2));
        return simulation;
    }

    // Connect to dataset, and await completion before
    // calling callback fxn
    function connectToDataset(f, ready) {
        d3.queue()
            .defer(d3.csv, f)
            .await(ready)
    }

    // Show info about an object in the side panel
    const showMouseoverInfo = function(d) {
        d3.select(this).style("cursor", "crosshair");
        const info_txt = document.getElementById("info-txt");
        info_txt.style.textDecoration = "underline";
        info_txt.style.textDecorationColor = d.color;
        info_txt.innerHTML = `${d.title}`;

        const color_txt = document.getElementById("color-txt");
        color_txt.style.textDecoration = "underline";
        color_txt.style.textDecorationColor = d.color;
        color_txt.innerHTML = `${d.color}`;
    }
    
    // Hide info about all objects from the side panel
    const hideMouseOverInfo = function() {
        document.getElementById("info-txt").innerHTML = "";
        document.getElementById("color-txt").innerHTML = "";
    }
    
    // Open info about an object in a new tab
    const openLink = function(d) {
        window.open(d.url, '_blank')
    }


    // ALL TOGETHER ///////////////////////////////////////////////////////////
    function main() {
        togglePageInfo();       // Toggle optional HTML content
        generateDynamicChart(); // Pull data from CSV and display
    }
    main();
})();
