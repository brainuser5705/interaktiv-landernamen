window.addEventListener("load", main);

const WIDTH = 1500; // window.outerWidth;
const HEIGHT = 700; // window.outerHeight;

const TOOLTIP_X = 20;
const TOOLTIP_Y = 20;

const HEADING_HEIGHT = document.getElementsByTagName("header");

function createCountriesMap(){
    var countriesMap = {};
    d3.csv("data/official_land_names_de.csv")
        .then((data)=>{
            data.forEach((d)=>{
                d["color"] = "blue";
                countriesMap[d.iso]=d
            });
        });
    return countriesMap;
}

function createMap(group, countriesMap){

    var projection = d3.geoMercator()
        .scale(120);

    var path = d3.geoPath().projection(projection);

    d3.json("data/countries-50m.json")
        .then((world)=>{

            // group.attr("transform", "translate(0," + HEADING_HEIGHT + ")");

            var tooltip = d3.select("#tooltip");

            group.selectAll("path")
                .data(topojson.feature(world, world.objects.countries).features)
                .enter()
                .append("path")
                .attr("d", path)
                .attr("stroke", "black")
                .attr("stroke-width", 0.3) // see if this can change dynamically with zoom
                // .attr("vector-effect", "non-scaling-stroke")
                .attr("fill", d=>{
                    country = countriesMap[d.id];
                    if (country) return country.color;
                    else {
                        console.log(d.id)
                        return "lightgray"
                    };
                })
                .on("mousemove", (d,i,ns)=>{
                    d3.select("body")
                        .append(()=>tooltip.node()) // appends need function returning a node
                        .style("left", (d3.event.pageX + TOOLTIP_X) + "px")
                        .style("top", (d3.event.pageY + TOOLTIP_Y) + "px");
                    d3.select("#tooltip").text((countriesMap[d.id]).long);
                })
                .on("mouseout", (d,i,ns)=>{
                    tooltip.remove();
                })
        });

}

function main(){
    var svg = d3.select("#map")
        .attr("width", WIDTH)
        .attr("height", HEIGHT); // -(HEADING_HEIGHT[0]).clientHeight);

    var mapGroup = svg.append("g").call(createMap, createCountriesMap());

    var zoom = d3.zoom()
        .scaleExtent([1,20])
        .on("zoom", ()=>mapGroup.attr("transform", d3.event.transform));
    svg.call(zoom);

}