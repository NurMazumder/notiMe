import os
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
import json
import sys

def scrape(url):
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    
    # Use the CHROME_BIN and CHROME_DRIVER_PATH environment variables
    service = Service(os.getenv("CHROME_DRIVER_PATH"))
    chrome_options.binary_location = os.getenv("CHROME_BIN")

    driver = webdriver.Chrome(service=service, options=chrome_options)

    driver.get(url)
    html_content = driver.page_source
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

    driver.quit()

    if "error" in last_five_chapters:
        return json.dumps(last_five_chapters, indent=4)

    return json.dumps(last_five_chapters, indent=4)

if __name__ == "__main__":
    url = sys.argv[1]
    print(scrape(url))
