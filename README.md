# Note about Country/Territories Standardization

As I have learned while researching for this project, it is impossible to have a single source of truth for a list of the world's countries/terriorities let alone the geographical borders between them. Political disputes of the sovereignty of nations, ownership of territories and borders means that there doesn't exist a world map that every country can agree upon. Additionally, open-source providers of such geospatial data often [differ from each other](https://www.geoboundaries.org/geoContrast.html?country=BHR&mainSource=geoBoundaries+%28Open%29&comparisonSource=ESRI&mainLevel=1&comparisonLevel=1) e.g. their exact placement of boundary lines. So even with the most "accurate" standard, the actual borders/shapes cannot be fully universal.

- UN recognized countries
    - UNTERM and German official document
- No UN provided Geojson, so using Natural earth

References:
- [Map in D3 tutorial](https://observablehq.com/@christinelangston/week-11-intro-to-d3-js-mapping-data-with-d3)
- [Hover data in D3](https://medium.com/@kj_schmidt/show-data-on-mouse-over-with-d3-js-3bf598ff8fc2)
- [Zoom](https://observablehq.com/@d3/zoom)
- [World Map](https://observablehq.com/@d3/world-map-svg)


Sources:
-[Natural Earth TopoJSON](https://github.com/topojson/world-atlas)
- [German](https://www.auswaertiges-amt.de/de/service/terminologie/-/215252)
- [English, Spanish, French](https://unterm.un.org/unterm2/en/view/99671138-805d-4a08-8c1e-6ad4ee313970)
- [language in german](https://www.destatis.de/DE/Methoden/Klassifikationen/Staat-Gebietsystematik/Staatsangehoerigkeitsgebietsschluessel_pdf.pdf?__blob=publicationFile)

https://www.thoughtco.com/countries-of-the-world-index-4101906

similar projects
- [UNGEGN world geographical names map](https://unstats.un.org/unsd/geoinfo/geonames/Default.aspx)

moz-extension://9b34c2fe-b307-4f80-81b5-dc941e8cb148/content/web/viewer.html?file=https%3A%2F%2Funstats.un.org%2Funsd%2Fungegn%2Fworking_groups%2Fdocuments%2FCollection_compilation_list_of_country_names_Apr2020.pdf

Wikipedia web scrape
https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes

Grammatical gender
https://de.wiktionary.org/wiki
https://en.wiktionary.org

Capitals in English and German
https://de.wikipedia.org
https://en.wikipedia.org
https://de.wikipedia.org/wiki/Liste_der_Hauptst%C3%A4dte_der_Erde
https://en.wikipedia.org/wiki/List_of_countries_and_dependencies_and_their_capitals_in_native_languages

Official documents
https://www.destatis.de/DE/Methoden/Klassifikationen/Staat-Gebietsystematik/Staatsangehoerigkeitsgebietsschluessel_pdf.pdf?__blob=publicationFile
https://www.auswaertiges-amt.de/blob/215256/e13a148b838b0734f6fca63b15029c9f/laenderverzeichnis-data.pdf (https://www.auswaertiges-amt.de/de/service/terminologie/-/215252)


Other documents (didn't use)
https://unstats.un.org/unsd/geoinfo/UNGEGN/docs/11th-uncsgn-docs/E_Conf.105_13_CRP.13_15_UNGEGN%20WG%20Country%20Names%20Document.pdf
https://laendercode.net/de/
https://www.cia.gov/the-world-factbook/field/country-name/

seat of government differs from capital in that it's where the government buildings are
flag is different from coat of arms


The English, French and Spanish state designations as well as the
Personal designations and the adjectival derivations of the independent states are
UNTERM, as far as the information contained therein is taken from official language usage
correspond to the respective states.
The foreign-language information on capitals and sovereign areas is official
Taken from documents as well as monolingual reference works and atlases.
The German designations correspond to the official ones specified by the Foreign Office
Use.

endonym - native
exonym - non-native

de jure - by law 
vs de facto

unincorporated - parts of the consistution doesn't apply