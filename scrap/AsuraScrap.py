import requests
from bs4 import BeautifulSoup
import json
import sys

def scrape(url):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Connection': 'keep-alive',
        'DNT': '1'
    }

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()  # Raise an exception for HTTP errors
        html_content = response.content
    except requests.exceptions.RequestException as e:
        return json.dumps({"error": str(e)})

    soup = BeautifulSoup(html_content, "html.parser")

    def get_last_five_chapters(soup):
        chapters = []
        try:
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
        except AttributeError as e:
            return {"error": "Failed to find elements on the page. The structure might have changed.", "details": str(e)}

        return chapters

    last_five_chapters = get_last_five_chapters(soup)

    if "error" in last_five_chapters:
        return json.dumps(last_five_chapters, indent=4)

    return json.dumps(last_five_chapters, indent=4)

if __name__ == "__main__":
    url = sys.argv[1]
    print(scrape(url))
