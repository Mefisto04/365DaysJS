import requests
from bs4 import BeautifulSoup
import csv

def get_user_data(profile_url):
    response = requests.get(profile_url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')

        rating_tag = soup.find('div', class_='rating-number')
        rating = rating_tag.text.strip() if rating_tag else "Rating not found"

        country_tag = soup.find('span', class_='user-country-name')
        country = country_tag.text.strip() if country_tag else "Country not found"

        return {
            'rating': rating,
            'country': country
        }
    else:
        print(f"Failed to retrieve the page. Status code: {response.status_code}")
        return None

def scrape_ranklist(ranklist_url, csv_filename="codechef_ranklist.csv"):
    with open(csv_filename, 'w', newline='') as csvfile:
        fieldnames = ['Rank', 'Name', 'Rating', 'Country']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

        writer.writeheader()

        response = requests.get(ranklist_url)

        if response.status_code == 200:
            soup = BeautifulSoup(response.text, 'html.parser')

            ranks = soup.find_all('p', class_='MuiTypography-root MuiTypography-body1 MuiTypography-noWrap MuiTypography-alignCenter')
            names = soup.find_all('span', class_='m-username--link')

            for rank, name in zip(ranks, names):
                rank_text = rank.text.strip()
                name_text = name.text.strip()

                profile_link = name.find('a')['href']
                profile_url = f"https://www.codechef.com{profile_link}"

                user_data = get_user_data(profile_url)

                writer.writerow({
                    'Rank': rank_text,
                    'Name': name_text,
                    'Rating': user_data['rating'],
                    'Country': user_data['country']
                })

        else:
            print(f"Failed to retrieve the page. Status code: {response.status_code}")

# Example usage
ranklist_url = "https://www.codechef.com/rankings/START110A?itemsPerPage=100&order=asc&page=1&sortBy=rank"
scrape_ranklist(ranklist_url)
print("Data written to codechef_ranklist.csv")
