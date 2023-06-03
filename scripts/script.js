window.addEventListener("load", main);

const WIDTH = window.outerWidth;
const HEIGHT = window.outerHeight;

const TOOLTIP_X = 20;
const TOOLTIP_Y = 20;

const HEADING_HEIGHT = document.getElementsByTagName("header");

const MISSING_COUNTRY_MSG = "Country is not in dataset.";

const COLOR_MAP = {
    "feminine": "#ebdc71",
    "masculine": "#ad58d1",
    "neuter": "#f22259",
    "plural": "#3fff38",
    "no-gender": "#8f8f8f",
    "no-country": "#030303"
};

const GENDER_MAP = {
    "feminine": "f.",
    "masculine": "m.",
    "neuter": "n.",
    "plural": "pl."
}

const ALPHA = "E6";

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

function drawInfoBox(d, countriesMap){
    country = countriesMap[d.id];

    d3.select("body")
        .append(()=>tooltip.node()) // appends need function returning a node
        .style("left", (d3.event.pageX + TOOLTIP_X) + "px")
        .style("top", (d3.event.pageY + TOOLTIP_Y) + "px");


    long_text = MISSING_COUNTRY_MSG;
    long_text_en = "";
    short_text = MISSING_COUNTRY_MSG;
    short_text_en = "";
    long_gender = "";
    short_gender = "";
    capital = "";
    capital_en = "";
    national_m = "";
    national_f = "";
    nationality = "";
    color = COLOR_MAP["no-country"];

    if (country){

        var iso = country.iso;
        var iso_a2 = country.iso_a2;
        var iso_a3 = country.iso_a3;

        long_text = country.long;
        long_text_en = country.long_en;
        short_text = country.short;
        short_text_en = country.short_en;
        long_gender = GENDER_MAP[country.long_gender];
        short_gender = GENDER_MAP[country.short_gender];

        if (long_gender == GENDER_MAP["feminine"] || long_gender == GENDER_MAP["plural"]){
            long_text = "die " + long_text;
        } else if (long_gender == GENDER_MAP["masculine"]){
            long_text = "der " + long_text;
        }

        capital = country.capital;
        capital_en = country.capital_en;
        national_m = country.national_m;
        national_f = country.national_f;
        nationality = country.nationality;

        var flag = flags[country["iso_a3"]];
        flag = flag ? "https://upload.wikimedia.org/wikipedia/" + flag : "";

        color = country.color;
    }

    if(isChange){

        d3.select("body")
            .append(()=>infobox.node());

        infobox.node().style.backgroundColor = color + ALPHA;
        
    
        d3.select("#info-box-iso").text(iso);
        d3.select("#info-box-iso-a2").text(iso_a2);
        d3.select("#info-box-iso-a3").text(iso_a3);

        d3.select("#info-box-long").text(long_text);
        d3.select("#info-box-long-en").text(long_text_en);
        d3.select("#info-box-short").text(short_text);
        d3.select("#info-box-short-en").text(short_text_en);
        d3.select("#info-box-long-gen").text(long_gender);
        d3.select("#info-box-short-gen").text(short_gender);
        d3.select("#info-box-capital").text(capital);
        d3.select("#info-box-capital-en").text(capital_en);
        d3.select("#info-box-nat-m").text(national_m);
        d3.select("#info-box-nat-f").text(national_f);
        d3.select("#info-box-nationality").text(nationality);
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
                .attr("stroke-width", 0.5)
                .attr("vector-effect", "non-scaling-stroke")
                .attr("fill", d=>{
                    country = countriesMap[d.id];
                    if (country) return country.color;
                    else {
                        // console.log(d.id)
                        return COLOR_MAP["no-country"];
                    };
                })
                .on("mousemove", (d,i,ns)=>{
                    drawInfoBox(d, countriesMap);
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
                        d3.select(infobox.node()).style("pointer-events", "none");     
                    }else if (d != selectedCountry){
                        selectedCountry = d.id;
                        d3.select("#selected-country")
                            .attr("fill", "none") // required so actual vector can be clicked on
                            .attr("stroke", "black")
                            .attr("stroke-width", 0.5)
                            .attr("d", (ns[i]).getAttribute("d"))
                            .attr("filter", "url(#softGlow)");
                        isSelected = true;
                        d3.select(infobox.node()).style("pointer-events", "all");
                    }
                    isChange = true;
                    drawInfoBox(d, countriesMap);
                })
        });

}

function main(){

    if(document.cookie == "") // no cookies
        document.getElementById('help-dialog').showModal();
    document.cookie="access=true;";

    // set the color key canvas elements
    for (let [key, color] of Object.entries(COLOR_MAP)){
        document.getElementById(key + "-color").style.backgroundColor = color;
    }

    var svg = d3.select("#map");
        //.attr("width", WIDTH[0].clientWidth)
        //.attr("height", HEIGHT); // -(HEADING_HEIGHT[0]).clientHeight);

    var longMapGroup = d3.select("#long-map").call(createMap, createCountriesMap("long"));
    var shortMapGroup = d3.select("#short-map").call(createMap, createCountriesMap("short"));
    toggle();

    // info box is initially hidden on load
    d3.select("#info-box").remove();

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
    svg.call(zoom.transform, d3.zoomIdentity.translate(WIDTH *.2, 200));

}