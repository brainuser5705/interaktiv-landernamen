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

var flags;
fetch("/data/flag_svgs.json")
    .then((response)=>response.json())
    .then((json)=>{flags = json});

var toggleBool = true;
var longMapVis = "visible", shortMapVis = "hidden";

var isSelected = false;
var selectedCountry = 0; // dummy value
var isChange = true;

var tooltip = d3.select("#tooltip");
var infobox = d3.select("#info-box");

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

function drawCountry(d, countriesMap){
    country = countriesMap[d.id];

    d3.select("body")
        .append(()=>tooltip.node()) // appends need function returning a node
        .style("left", (d3.event.pageX + TOOLTIP_X) + "px")
        .style("top", (d3.event.pageY + TOOLTIP_Y) + "px");


    long_text = MISSING_COUNTRY_MSG;
    short_text = MISSING_COUNTRY_MSG;
    long_gender = "";
    short_gender = "";

    if (country){
        long_text = country.long;
        short_text = country.short;
        long_gender = country.long_gender;
        short_gender = country.short_gender;

        var flag = flags[country["iso_a3"]];
        flag = flag ? "https://upload.wikimedia.org/wikipedia/" + flag : "";
        
    }

    if(isChange){

        d3.select("body")
            .append(()=>infobox.node());
    
        d3.select("#info-box-long").text(long_text);
        d3.select("#info-box-short").text(short_text);
        d3.select("#info-box-long-gen").text(long_gender);
        d3.select("#info-box-short-gen").text(short_gender);
        d3.select("#info-box-flag").attr("src", flag);
        
        if (isSelected) isChange = false;
    }

    d3.select("#tooltip-long").text(long_text);
    d3.select("#tooltip-short").text(short_text);
}

function createMap(group, countriesMap){

    var projection = d3.geoMercator()
        .scale(150);

    var path = d3.geoPath().projection(projection);

    d3.json("data/countries-50m.json")
        .then((world)=>{

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
                    drawCountry(d, countriesMap);
                })
                .on("mouseout", (d,i,ns)=>{
                    if (!isSelected) infobox.remove();
                    tooltip.remove();
                })
                .on("click", (d,i,ns)=>{

                    if (isSelected && d.id == selectedCountry){
                        d3.select("#selected-country")
                            .attr("stroke", "none")
                            .attr("filter", null);
                        isSelected = false;     
                    }else if (d != selectedCountry){
                        selectedCountry = d.id;
                        d3.select("#selected-country")
                            .attr("fill", "none") // required so actual vector can be clicked on
                            .attr("stroke", "black")
                            .attr("d", (ns[i]).getAttribute("d"))
                            .attr("filter", "url(#softGlow)");
                        isSelected = true;
                    }
                    isChange = true;
                    drawCountry(d, countriesMap);
                })
        });

}

function main(){

    // set the color key canvas elements
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
        // .translateExtent([[-WIDTH,-200],[WIDTH, 1000]])
        .on("zoom", ()=>{
            longMapGroup.attr("transform", d3.event.transform);
            shortMapGroup.attr("transform", d3.event.transform);
            d3.select("#selected-country").attr("transform", d3.event.transform);
        });
    svg.call(zoom);

    // initial transformation for zoom
    svg.call(zoom.transform, d3.zoomIdentity.translate(WIDTH *.3, 200));

}