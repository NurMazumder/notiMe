import requests
from bs4 import BeautifulSoup
import json
import sys

def scrape(url):
    # Make a GET request to fetch the raw HTML content
    response = requests.get(url)
    html_content = response.content

    # Parse the html content
    soup = BeautifulSoup(html_content, "html.parser")

    # Function to extract the last five chapters' details
    def get_last_five_chapters(soup):
        chapters = []
        base_url = "https://asuracomic.net/series/"  # Base URL to prepend

        # Find the title of the manga
        title = soup.find('div', class_='py-2 px-5 border-b-[1px] border-b-[#A2A2A2]/20').find('h3').text.strip()

        # Find the chapter list (in this case, the relevant divs)
        chapter_list = soup.find_all('div', class_='pl-4 py-2 border rounded-md group w-full hover:bg-[#343434] cursor-pointer border-[#A2A2A2]/20', limit=5)

        for chapter in chapter_list:
            chapter_info = {}
            link_tag = chapter.find('a')
            chapter_info['title'] = title
            chapter_info['link'] = base_url + link_tag['href']  # Prepending the base URL
            chapter_info['chapter_number'] = link_tag.text.strip()
            chapter_info['release_date'] = chapter.find('h3', class_='text-xs text-[#A2A2A2]').text.strip()
            chapter_info['img_url'] = soup.find('div', class_='relative col-span-12 sm:col-span-3 space-y-3 px-6 sm:px-0').find('img')['src']

            chapters.append(chapter_info)

        return chapters

    # Get the last five chapters
    last_five_chapters = get_last_five_chapters(soup)

    # Return the result as a JSON string
    return json.dumps(last_five_chapters, indent=4)

if __name__ == "__main__":
    url = sys.argv[1]
    print(scrape(url))
