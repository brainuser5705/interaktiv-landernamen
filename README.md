# Interactive Country Names

Read the [CHANGELOG](./CHANGELOG.md) for updates to the project.

The original raw data set has been uploaded onto [Kaggle](https://www.kaggle.com/datasets/brainuser5705/unterm-countries-names-in-different-languages). On there, I also provide the sources I use and explanations about the data fields on there. Here is some additional information not described on Kaggle:

- The list of countries/territories in the data set were scraped from [this Wikipedia entry](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes) and no additional countries/territories were added afterwards.
- The main German source ([Auswaertiges Amt](https://www.auswaertiges-amt.de/de/service/terminologie/-/215252) - German Federal Foreign Office) did not provide official names, captials and/or grammatical genders for all countries and territories. The grammatical genders were confirmed with Wikitionary ([de](https://de.wiktionary.org/wiki) and [en](https://en.wiktionary.org) version) for both the long and short name forms. Missing captials were taken from Wikipedia entries ([de](https://de.wikipedia.org/wiki/Liste_der_Hauptst%C3%A4dte_der_Erde), [en](https://en.wikipedia.org/wiki/List_of_countries_and_dependencies_and_their_capitals_in_native_languages)).
- As Auswartiges Amt did not cover all the terriorities, the missing data is sourced from [Destatis](https://www.destatis.de/DE/Methoden/Klassifikationen/Staat-Gebietsystematik/Staatsangehoerigkeitsgebietsschluessel_pdf.pdf?__blob=publicationFile)
- Here's the translation for where Auswaertiges got its information:
```
The English, French and Spanish state designations as well as the
Personal designations and the adjectival derivations of the independent states are
UNTERM, as far as the information contained therein is taken from official language usage
correspond to the respective states.
The foreign-language information on capitals and sovereign areas is official
Taken from documents as well as monolingual reference works and atlases.
The German designations correspond to the official ones specified by the Foreign Office
Use.
```

## Note about Country/Territories Standardization

As I have learned while researching for this project, it is impossible to have a single source of truth for a list of the world's countries/terriorities let alone the geographical borders between them. Political disputes of the sovereignty of nations, ownership of territories and borders means that there doesn't exist a world map that every country can agree upon. Additionally, open-source providers of such geospatial data often [differ from each other](https://www.geoboundaries.org/geoContrast.html?country=BHR&mainSource=geoBoundaries+%28Open%29&comparisonSource=ESRI&mainLevel=1&comparisonLevel=1) e.g. their exact placement of boundary lines. 

Just for personal convience, I am Natural Earth's [TopoJSON](https://github.com/topojson/world-atlas) of the world's countries since it was the first one I found. It actually does not fully align with the names data set as it has vectors for countries not present in the other. But both data sets cover all the countries with official ISO 3166-1 codes.

## Other interesting references

Here's a list of interesting sources/references I encountered but did not use during development:
- [Country names in English, Spanish and French](https://unstats.un.org/unsd/geoinfo/UNGEGN/docs/11th-uncsgn-docs/E_Conf.105_13_CRP.13_15_UNGEGN%20WG%20Country%20Names%20Document.pdf)
- [UNGEGN world geographical names map](https://unstats.un.org/unsd/geoinfo/geonames/Default.aspx) - the official organization in charge of standardization for country names in different languages also has a map (but it only has the names in the endonym form)
- [CIA Factbook](https://www.cia.gov/the-world-factbook/field/country-name/) - contains etymologies for country names
- [Ländercode](https://laendercode.net/de/) - German site that has a directory for countries


## Technical references
- [Map in D3 tutorial](https://observablehq.com/@christinelangston/week-11-intro-to-d3-js-mapping-data-with-d3)
- [Hover data in D3](https://medium.com/@kj_schmidt/show-data-on-mouse-over-with-d3-js-3bf598ff8fc2)
- [Zoom](https://observablehq.com/@d3/zoom)
- [World Map](https://observablehq.com/@d3/world-map-svg)


## Things learned while researching
- Seat of government differs from capital in that it's where the government buildings are
- Countries often have two flags, the offical one and their coat of arms
- endonym - native; exonym - non-native
- de jure - by law; vs de facto
- unincorporated territories - parts of the consistution doesn't apply
