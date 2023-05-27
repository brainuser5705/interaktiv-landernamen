import requests
from bs4 import BeautifulSoup
import csv

URL = "https://www.laenderdaten.de/staaten.aspx"
page = requests.get(URL)

soup = BeautifulSoup(page.content, "html.parser")

table = soup.find(id="SheetContentPlaceHolder_GridView1")
rows = table.find_all("tr")

with open('landernamen.csv','w', newline="") as csvfile:
    fieldnames = ["iso","name"]
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames, delimiter=',')

    writer.writeheader()

    for r in rows[1:]: # skip header row

        # way too overly complex lambdas!!!
        data = list(
            map(lambda x : x[1], 
                filter(lambda x : x[0] in [2,5], # only need these columns
                    enumerate(r.find_all("td")))))
    
        iso = data[1].text
        name = data[0].text
        
        print("writing: ", iso, ",", name)
        writer.writerow({
            'iso':iso,
            'name':name
        })

