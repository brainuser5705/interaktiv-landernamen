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

var flags = {
	"ABW": "commons/f/f6/Flag_of_Aruba.svg",
	"AFG": "commons/5/5c/Flag_of_the_Taliban.svg",
	"AGO": "commons/9/9d/Flag_of_Angola.svg",
	"AIA": "commons/b/b4/Flag_of_Anguilla.svg",
	"ALA": "commons/5/52/Flag_of_%C3%85land.svg",
	"ALB": "commons/3/36/Flag_of_Albania.svg",
	"AND": "commons/1/19/Flag_of_Andorra.svg",
	"ANT": "commons/e/eb/Flag_of_the_Netherlands_Antilles_(1959%E2%80%931986).svg",
	"ARE": "commons/c/cb/Flag_of_the_United_Arab_Emirates.svg",
	"ARG": "commons/1/1a/Flag_of_Argentina.svg",
	"ARM": "commons/2/2f/Flag_of_Armenia.svg",
	"ASM": "commons/8/87/Flag_of_American_Samoa.svg",
	"ATG": "commons/8/89/Flag_of_Antigua_and_Barbuda.svg",
	"AUS": "commons/8/88/Flag_of_Australia_(converted).svg",
	"AUT": "commons/4/41/Flag_of_Austria.svg",
	"AZE": "commons/d/dd/Flag_of_Azerbaijan.svg",
	"BDI": "commons/5/50/Flag_of_Burundi.svg",
	"BEL": "commons/6/65/Flag_of_Belgium.svg",
	"BEN": "commons/0/0a/Flag_of_Benin.svg",
	"BES": "commons/2/20/Flag_of_the_Netherlands.svg",
	"BFA": "commons/3/31/Flag_of_Burkina_Faso.svg",
	"BGD": "commons/f/f9/Flag_of_Bangladesh.svg",
	"BGR": "commons/9/9a/Flag_of_Bulgaria.svg",
	"BHR": "commons/2/2c/Flag_of_Bahrain.svg",
	"BHS": "commons/9/93/Flag_of_the_Bahamas.svg",
	"BIH": "commons/b/bf/Flag_of_Bosnia_and_Herzegovina.svg",
	"BLM": "commons/0/03/Saint-Barthelémy_Icône.svg",
	"BLR": "commons/8/85/Flag_of_Belarus.svg",
	"BLZ": "commons/e/e7/Flag_of_Belize.svg",
	"BMU": "commons/b/bf/Flag_of_Bermuda.svg",
	"BOL": "commons/5/5b/Bolivia_Flag.svg",
	"BRA": "commons/0/05/Flag_of_Brazil.svg",
	"BRB": "commons/e/ef/Flag_of_Barbados.svg",
	"BRN": "commons/9/9c/Flag_of_Brunei.svg",
	"BTN": "commons/9/91/Flag_of_Bhutan.svg",
	"BWA": "commons/f/fa/Flag_of_Botswana.svg",
	"CAF": "commons/6/6f/Flag_of_the_Central_African_Republic.svg",
	"CAN": "commons/d/d9/Flag_of_Canada_(Pantone).svg",
	"CCK": "commons/7/74/Flag_of_the_Cocos_(Keeling_Islands).svg",
	"CHE": "commons/f/f3/Flag_of_Switzerland.svg",
	"CHL": "commons/7/78/Flag_of_Chile.svg",
	"CHN": "commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg",
	"CIV": "commons/f/fe/Flag_of_Côte_d%27Ivoire.svg",
	"CMR": "commons/4/4f/Flag_of_Cameroon.svg",
	"COD": "commons/1/11/Flag_of_the_Democratic_Republic_of_the_Congo_(3-2).svg",
	"COG": "commons/9/92/Flag_of_the_Republic_of_the_Congo.svg",
	"COK": "commons/3/35/Flag_of_the_Cook_Islands.svg",
	"COL": "commons/2/21/Flag_of_Colombia.svg",
	"COM": "commons/d/df/Flag_of_the_Comoros_(3-2.svg",
	"CPV": "commons/3/38/Flag_of_Cape_Verde.svg",
	"CRI": "commons/b/bc/Flag_of_Costa_Rica_(state.svg",
	"CUB": "commons/b/bd/Flag_of_Cuba.svg",
	"CUW": "commons/b/b1/Flag_of_Curaçao.svg",
	"CXR": "commons/6/67/Flag_of_Christmas_Island.svg",
	"CYM": "commons/0/0f/Flag_of_the_Cayman_Islands.svg",
	"CYP": "commons/d/d4/Flag_of_Cyprus.svg",
	"CZE": "commons/c/cb/Flag_of_the_Czech_Republic.svg",
	"DEU": "commons/b/ba/Flag_of_Germany.svg",
	"DJI": "commons/3/34/Flag_of_Djibouti.svg",
	"DMA": "commons/c/c4/Flag_of_Dominica.svg",
	"DNK": "commons/9/9c/Flag_of_Denmark.svg",
	"DOM": "commons/9/9f/Flag_of_the_Dominican_Republic.svg",
	"DZA": "commons/7/77/Flag_of_Algeria.svg",
	"ECU": "commons/e/e8/Flag_of_Ecuador.svg",
	"EGY": "commons/f/fe/Flag_of_Egypt.svg",
	"ERI": "commons/2/29/Flag_of_Eritrea.svg",
	"ESH": "commons/2/26/Flag_of_the_Sahrawi_Arab_Democratic_Republic.svg",
	"ESP": "commons/9/9a/Flag_of_Spain.svg",
	"EST": "commons/8/8f/Flag_of_Estonia.svg",
	"ETH": "commons/7/71/Flag_of_Ethiopia.svg",
	"FIN": "commons/b/bc/Flag_of_Finland.svg",
	"FJI": "commons/b/ba/Flag_of_Fiji.svg",
	"FLK": "commons/8/83/Flag_of_the_Falkland_Islands.svg",
	"FRA": "commons/c/c3/Flag_of_France.svg",
	"FRO": "commons/3/3c/Flag_of_the_Faroe_Islands.svg",
	"FSM": "commons/e/e4/Flag_of_the_Federated_States_of_Micronesia.svg",
	"GAB": "commons/0/04/Flag_of_Gabon.svg",
	"GBR": "commons/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg",
	"GEO": "commons/0/0f/Flag_of_Georgia.svg",
	"GGY": "commons/f/fa/Flag_of_Guernsey.svg",
	"GHA": "commons/1/19/Flag_of_Ghana.svg",
	"GIB": "commons/0/02/Flag_of_Gibraltar.svg",
	"GIN": "commons/e/ed/Flag_of_Guinea.svg",
	"GLP": "commons/9/9f/Flag_of_France_%287x10%29.svg",
	"GMB": "commons/7/77/Flag_of_The_Gambia.svg",
	"GNB": "commons/0/01/Flag_of_Guinea-Bissau.svg",
	"GNQ": "commons/3/31/Flag_of_Equatorial_Guinea.svg",
	"GRC": "commons/5/5c/Flag_of_Greece.svg",
	"GRD": "commons/b/bc/Flag_of_Grenada.svg",
	"GRL": "commons/0/09/Flag_of_Greenland.svg",
	"GTM": "commons/e/ec/Flag_of_Guatemala.svg",
	"GUF": "commons/e/ed/Flag_of_France_%28Pantone%29.svg",
	"GUM": "commons/0/07/Flag_of_Guam.svg",
	"GUY": "commons/9/99/Flag_of_Guyana.svg",
	"HKG": "commons/5/5b/Flag_of_Hong_Kong.svg",
	"HND": "commons/8/82/Flag_of_Honduras.svg",
	"HRV": "commons/1/1b/Flag_of_Croatia.svg",
	"HTI": "commons/5/56/Flag_of_Haiti.svg",
	"HUN": "commons/c/c1/Flag_of_Hungary.svg",
    "IOT": "commons/6/65/Flag_of_the_Commissioner_of_the_British_Indian_Ocean_Territory.svg",
	"IDN": "commons/9/9f/Flag_of_Indonesia.svg",
	"IMN": "commons/b/bc/Flag_of_the_Isle_of_Man.svg",
	"IND": "commons/4/41/Flag_of_India.svg",
	"IRL": "commons/c/c0/Republic_of_Ireland_Flag.svg",
	"IRN": "commons/c/ca/Flag_of_Iran.svg",
	"IRQ": "commons/f/f6/Flag_of_Iraq.svg",
	"ISL": "commons/c/ce/Flag_of_Iceland.svg",
	"ISR": "commons/d/d4/Flag_of_Israel.svg",
	"ITA": "commons/0/03/Flag_of_Italy.svg",
	"JAM": "commons/0/0a/Flag_of_Jamaica.svg",
	"JEY": "commons/1/1c/Flag_of_Jersey.svg",
	"JOR": "commons/c/c0/Flag_of_Jordan.svg",
	"JPN": "commons/b/bc/Flag_of_Japan%28bordered%29.svg",
	"KAZ": "commons/d/d3/Flag_of_Kazakhstan.svg",
	"KEN": "commons/4/49/Flag_of_Kenya.svg",
	"KGZ": "commons/c/c7/Flag_of_Kyrgyzstan.svg",
	"KHM": "commons/8/83/Flag_of_Cambodia.svg",
	"KIR": "commons/d/d3/Flag_of_Kiribati.svg",
	"KNA": "commons/f/fe/Flag_of_Saint_Kitts_and_Nevis.svg",
	"KOR": "commons/0/09/Flag_of_South_Korea.svg",
	"KWT": "commons/a/aa/Flag_of_Kuwait.svg",
	"LAO": "commons/5/56/Flag_of_Laos.svg",
	"LBN": "commons/5/59/Flag_of_Lebanon.svg",
	"LBR": "commons/b/b8/Flag_of_Liberia.svg",
	"LBY": "commons/0/05/Flag_of_Libya.svg",
	"LCA": "commons/9/9f/Flag_of_Saint_Lucia.svg",
	"LIE": "commons/4/47/Flag_of_Liechtenstein.svg",
	"LKA": "commons/1/11/Flag_of_Sri_Lanka.svg",
	"LSO": "commons/4/4a/Flag_of_Lesotho.svg",
	"LTU": "commons/1/11/Flag_of_Lithuania.svg",
	"LUX": "commons/d/da/Flag_of_Luxembourg.svg",
	"LVA": "commons/8/84/Flag_of_Latvia.svg",
	"MAC": "commons/6/63/Flag_of_Macau.svg",
	"MAF": "commons/d/dd/Flag_of_Saint-Martin_%28fictional%29.svg",
	"MAR": "commons/2/2c/Flag_of_Morocco.svg",
	"MCO": "commons/e/ea/Flag_of_Monaco.svg",
	"MDA": "commons/2/27/Flag_of_Moldova.svg",
	"MDG": "commons/b/bc/Flag_of_Madagascar.svg",
	"MDV": "commons/0/0f/Flag_of_Maldives.svg",
	"MEX": "commons/f/fc/Flag_of_Mexico.svg",
	"MHL": "commons/2/2e/Flag_of_the_Marshall_Islands.svg",
	"MKD": "commons/7/79/Flag_of_North_Macedonia.svg",
	"MLI": "commons/9/92/Flag_of_Mali.svg",
	"MLT": "commons/7/73/Flag_of_Malta.svg",
	"MMR": "commons/8/8c/Flag_of_Myanmar.svg",
	"MNE": "commons/6/64/Flag_of_Montenegro.svg",
	"MNG": "commons/4/4c/Flag_of_Mongolia.svg",
	"MNP": "commons/e/e0/Flag_of_the_Northern_Mariana_Islands.svg",
	"MOZ": "commons/d/d0/Flag_of_Mozambique.svg",
	"MRT": "commons/4/43/Flag_of_Mauritania.svg",
	"MSR": "commons/d/d0/Flag_of_Montserrat.svg",
	"MTQ": "commons/2/21/Flag_of_the_Territorial_Collectivity_of_Martinique.svg",
	"MUS": "commons/7/77/Flag_of_Mauritius.svg",
	"MWI": "commons/d/d1/Flag_of_Malawi.svg",
	"MYS": "commons/6/66/Flag_of_Malaysia.svg",
	"MYT": "commons/c/c3/Flag_of_France.svg",
	"NAM": "commons/0/00/Flag_of_Namibia.svg",
	"NCL": "commons/6/66/Flag_of_FLNKS.svg",
	"NER": "commons/f/f4/Flag_of_Niger.svg",
	"NFK": "commons/4/48/Flag_of_Norfolk_Island.svg",
	"NGA": "commons/7/79/Flag_of_Nigeria.svg",
	"NIC": "commons/1/19/Flag_of_Nicaragua.svg",
	"NIU": "commons/0/01/Flag_of_Niue.svg",
	"NLD": "commons/2/20/Flag_of_the_Netherlands.svg",
	"NOR": "commons/d/d9/Flag_of_Norway.svg",
	"NPL": "commons/9/9b/Flag_of_Nepal.svg",
	"NRU": "commons/3/30/Flag_of_Nauru.svg",
	"NZL": "commons/3/3e/Flag_of_New_Zealand.svg",
	"OMN": "commons/d/dd/Flag_of_Oman.svg",
	"PAK": "commons/3/32/Flag_of_Pakistan.svg",
	"PAN": "commons/a/ab/Flag_of_Panama.svg",
	"PCN": "commons/8/88/Flag_of_the_Pitcairn_Islands.svg",
	"PER": "commons/c/cf/Flag_of_Peru.svg",
	"PHL": "commons/9/99/Flag_of_the_Philippines.svg",
	"PLW": "commons/4/48/Flag_of_Palau.svg",
	"PNG": "commons/e/e3/Flag_of_Papua_New_Guinea.svg",
	"POL": "commons/1/12/Flag_of_Poland.svg",
	"PRI": "commons/2/28/Flag_of_Puerto_Rico.svg",
	"PRK": "commons/5/51/Flag_of_North_Korea.svg",
	"PRT": "commons/5/5c/Flag_of_Portugal.svg",
	"PRY": "commons/2/27/Flag_of_Paraguay.svg",
	"PSE": "commons/f/f4/Palestine_Flag.svg",
	"PYF": "commons/d/db/Flag_of_French_Polynesia.svg",
	"QAT": "commons/6/65/Flag_of_Qatar.svg",
	"REU": "commons/5/5a/Flag_of_Réunion.svg",
	"ROU": "commons/7/73/Flag_of_Romania.svg",
	"RUS": "commons/f/f3/Flag_of_Russia.svg",
	"RWA": "commons/1/17/Flag_of_Rwanda.svg",
	"SAU": "commons/0/0d/Flag_of_Saudi_Arabia.svg",
	"SDN": "commons/0/01/Flag_of_Sudan.svg",
	"SEN": "commons/f/fd/Flag_of_Senegal.svg",
	"SGP": "commons/4/48/Flag_of_Singapore.svg",
	"SGS": "commons/e/ed/Flag_of_South_Georgia_and_the_South_Sandwich_Islands.svg",
	"SHN": "commons/0/00/Flag_of_Saint_Helena.svg",
	"SJM": "commons/d/d9/Flag_of_Norway.svg",
	"SLB": "commons/7/74/Flag_of_the_Solomon_Islands.svg",
	"SLE": "commons/1/17/Flag_of_Sierra_Leone.svg",
	"SLV": "commons/3/34/Flag_of_El_Salvador.svg",
	"SMR": "commons/b/b1/Flag_of_San_Marino.svg",
	"SOM": "commons/a/a0/Flag_of_Somalia.svg",
	"SPM": "commons/7/74/Flag_of_Saint-Pierre_and_Miquelon.svg",
	"SRB": "commons/f/ff/Flag_of_Serbia.svg",
	"SSD": "commons/7/7a/Flag_of_South_Sudan.svg",
	"STP": "commons/4/4f/Flag_of_Sao_Tome_and_Principe.svg",
	"SUR": "commons/6/60/Flag_of_Suriname.svg",
	"SVK": "commons/e/e6/Flag_of_Slovakia.svg",
	"SVN": "commons/f/f0/Flag_of_Slovenia.svg",
	"SWE": "commons/4/4c/Flag_of_Sweden.svg",
	"SWZ": "commons/f/fb/Flag_of_Eswatini.svg",
	"SXM": "commons/d/d3/Flag_of_Sint_Maarten.svg",
	"SYC": "commons/f/fc/Flag_of_Seychelles.svg",
	"SYR": "commons/5/53/Flag_of_Syria.svg",
	"TCA": "commons/a/a0/Flag_of_the_Turks_and_Caicos_Islands.svg",
	"TCD": "commons/4/4b/Flag_of_Chad.svg",
	"TGO": "commons/6/68/Flag_of_Togo.svg",
	"THA": "commons/a/a9/Flag_of_Thailand.svg",
	"TJK": "commons/d/d0/Flag_of_Tajikistan.svg",
	"TKL": "commons/8/8e/Flag_of_Tokelau.svg",
	"TKM": "commons/1/1b/Flag_of_Turkmenistan.svg",
	"TLS": "commons/2/26/Flag_of_East_Timor.svg",
	"TON": "commons/9/9a/Flag_of_Tonga.svg",
	"TTO": "commons/6/64/Flag_of_Trinidad_and_Tobago.svg",
	"TUN": "commons/c/ce/Flag_of_Tunisia.svg",
	"TUR": "commons/b/b4/Flag_of_Turkey.svg",
	"TUV": "commons/3/38/Flag_of_Tuvalu.svg",
	"TWN": "commons/7/72/Flag_of_the_Republic_of_China.svg",
	"TZA": "commons/3/38/Flag_of_Tanzania.svg",
	"UGA": "commons/4/4e/Flag_of_Uganda.svg",
	"UKR": "commons/4/49/Flag_of_Ukraine.svg",
	"UMI": "commons/0/05/Flag_of_the_U.S..svg",
	"URY": "commons/f/fe/Flag_of_Uruguay.svg",
	"USA": "commons/a/a4/Flag_of_the_United_States.svg",
	"UZB": "commons/8/84/Flag_of_Uzbekistan.svg",
	"VAT": "commons/0/00/Flag_of_the_Vatican_City.svg",
	"VCT": "commons/6/6d/Flag_of_Saint_Vincent_and_the_Grenadines.svg",
	"VEN": "commons/7/7b/Flag_of_Venezuela_(state).svg",
	"VGB": "commons/4/42/Flag_of_the_British_Virgin_Islands.svg",
	"VIR": "commons/f/f8/Flag_of_the_United_States_Virgin_Islands.svg",
	"VNM": "commons/2/21/Flag_of_Vietnam.svg",
	"VUT": "commons/6/6e/Flag_of_Vanuatu_(official).svg",
	"WLF": "commons/d/d2/Flag_of_Wallis_and_Futuna.svg",
	"WSM": "commons/3/31/Flag_of_Samoa.svg",
	"XXK": "commons/1/1f/Flag_of_Kosovo.svg",
	"YEM": "commons/8/89/Flag_of_Yemen.svg",
	"ZAF": "commons/a/af/Flag_of_South_Africa.svg",
	"ZMB": "commons/0/06/Flag_of_Zambia.svg",
	"ZWE": "commons/6/6a/Flag_of_Zimbabwe.svg"
}

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
