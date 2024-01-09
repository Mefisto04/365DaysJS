import requests
from bs4 import BeautifulSoup

def scrape_codechef_profile(profile_url):
    response = requests.get(profile_url)

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')

        name_tag = soup.find('h1', class_='h2-style')
        name = name_tag.text.strip() if name_tag else "Name not found"

        rating = soup.find('div', class_='rating-number').text.strip()
        country = soup.find('span', class_='user-country-name').text.strip()
        global_rank = soup.find('strong').text.strip()

        return {
            'name': name,
            'rating': rating,
            'country': country,
            'global_rank': global_rank
        }
    else:
        print(f"Failed to retrieve the page. Status code: {response.status_code}")
        return None

profile_url = "https://www.codechef.com/users/esomer"
user_data = scrape_codechef_profile(profile_url)

if user_data:
    print("User Data:")
    print(f"Name: {user_data['name']}")
    print(f"Rating: {user_data['rating']}")
    print(f"Country: {user_data['country']}")
    print(f"Global Rank: {user_data['global_rank']}")
