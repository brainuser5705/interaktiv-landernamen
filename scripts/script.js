window.addEventListener("load", main);

const WIDTH = window.outerWidth;
const HEIGHT = window.outerHeight;

const TOOLTIP_X = 20;
const TOOLTIP_Y = 20;

const HEADING_HEIGHT = document.getElementsByTagName("header");

const MISSING_COUNTRY_MSG = "Country is not in dataset.";

const COLOR_MAP = {
    "feminine": "lightyellow",
    "masculine": "lightblue",
    "neuter": "lightgreen",
    "plural": "lightpink",
    "no-gender": "red",
    "no-country": "lightgray"
};

var toggleBool = true;
var longMapVis = "visible", shortMapVis = "hidden";

function toggle(){
    document.getElementById("toggle").innerHTML = toggleBool ? "short" : "long";
    document.getElementById("long-map").style.visibility = longMapVis;
    document.getElementById("short-map").style.visibility = shortMapVis;
    [longMapVis, shortMapVis] = [shortMapVis, longMapVis];
    toggleBool = !toggleBool;
}

function getColor(gender){
    color = COLOR_MAP[gender];
    if (!color){
        color = COLOR_MAP["no-gender"];
    }
    return color;
}

function createCountriesMap(form){
    var countriesMap = {};
    d3.csv("data/official_land_names_de.csv")
        .then((data)=>{
            data.forEach((d)=>{
                if (form == "long"){
                    d["color"] = getColor(d["long_gender"]);
                }else if (form == "short"){
                    d["color"] = getColor(d["short_gender"]);
                }
                countriesMap[d.iso]=d
            });
        });
    return countriesMap;
}

function createMap(group, countriesMap){

    var projection = d3.geoMercator()
        .scale(150);

    var path = d3.geoPath().projection(projection);

    d3.json("data/countries-50m.json")
        .then((world)=>{

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
                        // console.log(d.id)
                        return COLOR_MAP["no-country"];
                    };
                })
                .on("mousemove", (d,i,ns)=>{
                    country = countriesMap[d.id];
                    d3.select("body")
                        .append(()=>tooltip.node()) // appends need function returning a node
                        .style("left", (d3.event.pageX + TOOLTIP_X) + "px")
                        .style("top", (d3.event.pageY + TOOLTIP_Y) + "px");
                    
                    long_text = country ? country.long : MISSING_COUNTRY_MSG;
                    short_text = country ? country.short : MISSING_COUNTRY_MSG;

                    d3.select("#tooltip-long").text(long_text);
                    d3.select("#tooltip-short").text(short_text);
                    
                })
                .on("mouseout", (d,i,ns)=>{
                    tooltip.remove();
                })
        });

}

function main(){

    // set the color key
    for (let [key, color] of Object.entries(COLOR_MAP)){
        document.getElementById(key + "-color").style.backgroundColor = color;
    }

    var svg = d3.select("#map")
        //.attr("width", WIDTH[0].clientWidth)
        //.attr("height", HEIGHT); // -(HEADING_HEIGHT[0]).clientHeight);

    var longMapGroup = d3.select("#long-map").call(createMap, createCountriesMap("long"));
    var shortMapGroup = d3.select("#short-map").call(createMap, createCountriesMap("short"));
    toggle();

    var zoom = d3.zoom()
        .scaleExtent([1,20])
        .on("zoom", ()=>{
            longMapGroup.attr("transform", d3.event.transform);
            shortMapGroup.attr("transform", d3.event.transform);
        });
    svg.call(zoom);

    longMapGroup.attr("transform", "translate(" + (WIDTH * .3) / 2+ ", 200)");
    shortMapGroup.attr("transform", "translate(" + (WIDTH * .3) / 2+ ", 200)");

}