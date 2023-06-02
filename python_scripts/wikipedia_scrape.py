import requests
from bs4 import BeautifulSoup
import csv

URL = "https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes"
page = requests.get(URL)
soup = BeautifulSoup(page.content, "html.parser")
rows = soup.find("table").find_all("tr")

fieldnames = [
        "iso",
        "iso_a2",
        "iso_a3",
        "flag",
        "status",
        "long",
        "lon_gender",
        "long_en",
        "short",
        "short_gender",
        "short_en",
        "capital",
        "capital_en",
        "language",
        "national_m",
        "national_f",
        "nationality",
        "sov_status",
        "part_of"
    ]

with open("../official_countries_names.csv", "w", newline="") as csvfile:
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames, delimiter=",")
    writer.writeheader()

    for r in rows[2:]: # skipping header rows
        data = r.find_all("td")
        
        flag_icon = ""
        short_name = ""
        off_state_name = ""
        sov_status = ""
        part_of = ""
        iso_a2 = ""
        iso_a3 = ""
        iso = ""

        country_name = data[0]
        flag_elem = country_name.find("img", class_="thumbborder")
        if flag_elem:
            flag_icon = "https:" + flag_elem["src"]
        short_name = country_name.find("a", recursive=False).text # only direct child
        try:
            off_state_name = data[1].text.strip()
            sov_status = data[2].text.strip()
            if sov_status != "" and sov_status != "UN member state":
                part_of = sov_status
                sov_status = "" 
            iso_a2 = data[3].text.strip()
            iso_a3 = data[4].text.strip()
            iso = data[5].text.strip()
        except IndexError:
            continue

        print(f'''Writing: {iso}, {iso_a2}, {iso_a3}, {flag_icon}, {off_state_name}, {short_name}, {sov_status}, {part_of}''')
        
        writer.writerow({
            "iso": iso,
            "iso_a2": iso_a2,
            "iso_a3": iso_a3,
            "flag": flag_icon,
            "long_en": off_state_name,
            "short_en": short_name,
            "sov_status": sov_status,
            "part_of": part_of
        })