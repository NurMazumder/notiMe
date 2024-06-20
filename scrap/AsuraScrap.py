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
        # Find the chapter list
        chapter_list = soup.find('div', class_='eplister').find('ul', class_='clstyle').find_all('li', limit=5)

        for chapter in chapter_list:
            chapter_info = {}
            link_tag = chapter.find('a')
            chapter_info['title'] = soup.find('div', class_='releases').find('h2').text.strip()
            chapter_info['link'] = link_tag['href']
            chapter_info['chapter_number'] = link_tag.find('span', class_='chapternum').text.strip()
            chapter_info['release_date'] = link_tag.find('span', class_='chapterdate').text.strip()
            chapter_info['img_url'] = soup.find('div', class_='thumb').find('img')['src']  
            chapters.append(chapter_info)

        return chapters

    # Get the last five chapters
    last_five_chapters = get_last_five_chapters(soup)

    # Return the results as JSON
    return json.dumps(last_five_chapters, indent=4)

if __name__ == "__main__":
    url = sys.argv[1]
    print(scrape(url))
