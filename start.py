import pandas as pd
import requests
import time
import json
import urllib3
from requests.packages.urllib3.exceptions import InsecureRequestWarning
import certifi

import ssl 
ssl._create_default_https_context = ssl._create_unverified_context
#C:\\Users\\Sawert\\AppData\\Local\\Programs\\Python\\Python311\\lib\\site-packages\\certifi\\cacert.pem
certifi.where()

requests.packages.urllib3.disable_warnings(InsecureRequestWarning)

# URL API, который осуществляет поиск по ИС
search_url = 'https://rosrid.ru/api/base/search'
uid = '10184556'
start_date = '2023-01-01'
end_date = '2023-12-31'

payload = {
    "search_query": None,
    "critical_technologies": [],
    "dissertations": False,
    "full_text_available": False,
    "ikrbses": False,
    "nioktrs": False,
    "organization": [uid],
    "page": 1,
    "priority_directions": [],
    "rids": False,
    "rubrics": [],
    "search_area": "Во всех полях",
    "sort_by": "Дата регистрации",
    "open_license": False,
    "free_licenses": False,
    "expert_estimation_exist": False,
    "start_date": start_date,
    "end_date": end_date
}


session = requests.session()


# Для проверки подключаемся к странице поиска и возвращаем код ответа (должен быть 200)
home_resp = session.request('GET', 'https://rosrid.ru/global-search',verify=False)
home_resp.status_code

# Формируем заготовку для основного тела поиска

print(requests.get(search_url, verify=False))
session.headers.update({
    'authority': 'rosrid.ru',
    'pragma': 'no-cache',
    'cache-control': 'no-cache',
    'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="98", "Google Chrome";v="98"',
    'accept': 'application/json, text/plain, */*',
    'sec-ch-ua-mobile': '?0',
    'content-type': 'application/json;charset=UTF-8',
    'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.80 Safari/537.36',
    'sec-ch-ua-platform': '"Linux"',
    'origin': 'https://rosrid.ru',
    'sec-fetch-site': 'same-origin',
    'sec-fetch-mode': 'cors',
    'sec-fetch-dest': 'empty',
    'referer': 'https://rosrid.ru/global-search',
    'accept-language': 'ru,en-US;q=0.9,en;q=0.8,ru-RU;q=0.7'
})


# <Response [200]>
def get_search_results(data, timeout=1):
    items_in_page = 10
    search_results = []

    try:
        resp = session.request("POST", search_url, data=json.dumps(data, ensure_ascii=False).encode('utf-8'))

        if resp.status_code == 200:
            json_resp = resp.json()
            page = data['page']
            total = json_resp['hits']['total']['value']
            count_of_pages = (int(total / items_in_page) + 1) if total % items_in_page else total / items_in_page

            print(f"Downloaded data from page {page} of {count_of_pages}")

            if page < 1:
                time.sleep(timeout)
                search_results += json_resp['hits']['hits'] + get_search_results({**data, 'page': page + 1}, timeout)
            else:
                search_results += json_resp['hits']['hits']
    except BaseException as e:
        print('Retry connection', str(e))
        search_results = get_search_results({**data, 'page': 1}, timeout)

    return search_results


pd.set_option('display.max_columns', None)


rids = pd.json_normalize(get_search_results({**payload, 'rids': True}),max_level = 1)
rids.dropna(axis=1).head(5)

exploded_df = rids["_source.keyword_list"].explode("_source.keyword_list")
#q = rids["_source.work_supervisor"].explode("_source.work_supervisor")
#pd.concat(exploded_df,q)
name1 = rids['_source.work_supervisor']
print(name1.apply(pd.Series))
