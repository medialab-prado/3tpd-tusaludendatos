(function(){
    var map = L.map('mapa').setView([40.423852777777775, -3.6823194444444445], 13).invalidateSize();

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

})();

//**********************funcion auxiliar*******************//

function JSON2CSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;

    var str = '';
    var line = '';

    if ($("#labels").is(':checked')) {
        var head = array[0];
        if ($("#quote").is(':checked')) {
            for (var index in array[0]) {
                var value = index + "";
                line += '"' + value.replace(/"/g, '""') + '",';
            }
        } else {
            for (var index in array[0]) {
                line += index + ',';
            }
        }

        line = line.slice(0, -1);
        str += line + '\r\n';
    }

    for (var i = 0; i < array.length; i++) {
        var line = '';

        if ($("#quote").is(':checked')) {
            for (var index in array[i]) {
                var value = array[i][index] + "";
                line += '"' + value.replace(/"/g, '""') + '",';
            }
        } else {
            for (var index in array[i]) {
                line += array[i][index] + ',';
            }
        }

        line = line.slice(0, -1);
        str += line + '\r\n';
    }
    return str;

}

//***********************d3 section*****************************//

// Set the dimensions of the canvas / graph
var margin = {top: 30, right: 100, bottom: 70, left: 50},
    legendSize = 200,
    width = 1024 - margin.left - margin.right - legendSize,
    height = 500 - margin.top - margin.bottom;

// Parse the date / time
var parseDate = d3.time.format("%Y").parse;

// Set the ranges
var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

// Define the axes
var xAxis = d3.svg.axis().scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis().scale(y)
    .orient("left");

// Define the line
var priceline = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.price); });

// Adds the svg canvas
var svg = d3.select("#gastoSanitario")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// Get the data
$.get( "/gastosanitario", function(data) {

    //d3.json(data, function(error, data) {
    //    console.log(data);
    //    data.forEach(function(d) {
    //        d.date = parseDate(d.date);
    //        d.price = +d.price;
        //});

        // Scale the range of the data
        x.domain(d3.extent(data, function(d) { return d.date; }));
        y.domain([ d3.min(data, function(d) { return d.price; }), d3.max(data, function(d) { return d.price; })]);

        // Nest the entries by symbol
        var dataNest = d3.nest()
            .key(function(d) {return d.symbol;})
            .entries(data);

        var color = d3.scale.category10();   // set the colour scale

        legendSpace = height/dataNest.length; // spacing for the legend

        // Loop through each symbol / key
        dataNest.forEach(function(d,i) {

            svg.append("path")
                .attr("class", "line")
                .style("stroke", function() { // Add the colours dynamically
                    return d.color = color(d.key); })
                .attr("id", 'tag'+d.key.replace(/\s+/g, '')) // assign ID
                .attr("d", priceline(d.values));

            // Add the Legend
            svg.append("text")
                .attr("y", (legendSpace/2)+i*legendSpace)  // space legend
                .attr("x",width +margin.left )
                .attr("class", "legend")    // style the legend
                .style("fill", function() { // Add the colours dynamically
                    return d.color = color(d.key); })
                .on("click", function(){
                    // Determine if current line is visible
                    var active   = d.active ? false : true,
                        newOpacity = active ? 0 : 1;
                    // Hide or show the elements based on the ID
                    d3.select("#tag"+d.key.replace(/\s+/g, ''))
                        .transition().duration(100)
                        .style("opacity", newOpacity);
                    // Update whether or not the elements are active
                    d.active = active;
                })
                .text(d.key);

        });

        // Add the X Axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        // Add the Y Axis
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);

    //});
});