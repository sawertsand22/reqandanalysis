process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";




// Создание нового объекта запроса с указанием корневого сертификата
    //start_date = '2022-01-01';
    //end_date = '2022-12-31';
    //let uid = '10184556';
    //r = {
    //    "critical_technologies": [],
    //    "dissertations": false,
    //    "expert_estimation_exist": false,
    //    "free_licenses": false,
    //    "full_text_available": false,
    //    "ikrbses": false,
    //    "nioktrs": false,
    //    "open_license": false,
    //    "organization": [uid],
    //    "page": 1,
    //    "priority_directions": [],
    //    "rids": true,
    //    "rubrics": [],
    //    "search_area": "Во всех полях",
    //    "search_query": '',
    //    "sort_by": "Дата регистрации",
    //};
    //url = 'https://rosrid.ru/api/base/search';

//const request = new Request('https://rosrid.ru/api/base/search', {
//    method: 'POST',
//    body: r,
//headers: {
//'Accept': 'application/json',
//'Content-Type': 'application/json'
//},
// Добавление корневого сертификата
//ca: rootCert
//});

    //async function getUser() {
    //  try {
    //      const response = await fetch('https://rosrid.ru/api/base/search',
    //          {   method: 'POST',
    //              body: JSON.stringify(r),
    //            headers: {
    //          'authority': 'rosrid.ru',
    //    'pragma': 'no-cache',
    //    'cache-control': 'no-cache',
    //    'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="98", "Google Chrome";v="98"',
    //    'accept': 'application/json, text/plain, */*',
    //    'sec-ch-ua-mobile': '?0',
    //    'content-type': 'application/json;charset=UTF-8',
    //    'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.80 Safari/537.36',
    //    'sec-ch-ua-platform': '"Linux"',
    //    'origin': 'https://rosrid.ru',
    //    'sec-fetch-site': 'same-origin',
    //    'sec-fetch-mode': 'cors',
    //    'sec-fetch-dest': 'empty',
    //    'referer': 'https://rosrid.ru/global-search',
    //    'accept-language': 'ru,en-US;q=0.9,en;q=0.8,ru-RU;q=0.7'
    //    },
    //          
    //      });
      //
    //    if (!response.ok) {
    //      throw new Error(`Error! status: ${response.status}`);
    //    }
    //
    //    // ✅ call response.json() here
    //    const result = await response.json();
    //    return result;
    //  } catch (err) {
    //    console.log(err);
    //  }
    //}
    //
    //getUser().then(res => {
    //  console.log(res);
    //});





// Выполнение запроса с помощью fetch
//esponce = await fetch(request)
//then(response => {
//f (response.status === 200) {
//   // Обработка успешного ответа
//   console.log('responce.status', response.status)
// else {
//   // Обработка ошибки
//   console.log('responce.status', response.status)
//
//)
//catch(error => {
//onsole.error('Ошибка при выполнении запроса:', error);
//);
//
//
//
//onst json = await responce.json();
//onsole.log("Успех:", JSON.stringify(json));



const axios = require('axios');

const search_url = 'https://rosrid.ru/api/base/search';
const uid = '10184556';
const start_date = '2023-01-01';
const end_date = '2023-12-31';

const payload = {
search_query: null,
critical_technologies: [],
dissertations: false,
full_text_available: false,
ikrbses: false,
nioktrs: false,
organization: [uid],
page: 1,
priority_directions: [],
rids: false,
rubrics: [],
search_area: 'Во всех полях',
sort_by: 'Дата регистрации',
open_license: false,
free_licenses: false,
expert_estimation_exist: false,
start_date: start_date,
end_date: end_date
};

const session = axios.create({
baseURL: 'https://rosrid.ru',
timeout: 1000,
headers: {
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
}
});

//sync function get_search_results(data, timeout = 1) {
//   const items_in_page = 10;
//   let search_results = [];
//
//   try {
//       const resp = await session.post('/api/base/search', data);
//
//       if (resp.status === 200) {
//           const json_resp = resp.data;
//           const page = data.page;
//           const total = json_resp.hits.total.value;
//           const count_of_pages = total % items_in_page ? Math.floor(total / items_in_page) + 1 : total / items_in_page;
//
//           console.log(`Downloaded data from page ${page} of ${count_of_pages}`);
//
//           if (page < 1) {
//               await new Promise(resolve => setTimeout(resolve, timeout));
//               search_results += json_resp.hits.hits + await get_search_results({ ...data, page: page + 1 }, timeout);
//           } else {
//               search_results += json_resp.hits.hits;
//           }
//       }
//   } catch (e) {
//       console.log('Retry connection', e.toString());
//       search_results = await get_search_results({ ...data, page: 1 }, timeout);
//   }
//
//   return search_results;
//}
async function get_search_results(data, timeout = 1) {
const items_in_page = 10;
let search_results = [];

try {
const resp = await session.post('/api/base/search', data);

if (resp.status === 200) {
const json_resp = resp.data;
const page = data.page;
const total = json_resp.hits.total.value;
const count_of_pages = total % items_in_page ? Math.floor(total / items_in_page) + 1 : total / items_in_page;

console.log(`Downloaded data from page ${page} of ${count_of_pages}`);

if (page < 1) {
await new Promise(resolve => setTimeout(resolve, timeout));
search_results = search_results.concat(json_resp.hits.hits, await get_search_results({ ...data, page: page + 1 }, timeout));
} else {
search_results = json_resp.hits.hits;
}
}
} catch (e) {
console.log('Retry connection', e.toString());
search_results = await get_search_results({ ...data, page: 1 }, timeout);
}

return search_results;
}

get_search_results(payload)
    .then(results => {
       //q = results[3];
         //printObjProperty(q);
       results.forEach(result => {
          // if ( result._source.authors[0].name) {
           if (result._source.authors in result) {
               console.log('Undef');
           }
           else {
               console.log(result._source.authors[0].surname);
           }
          // }
       });
        }
    
)
.catch(error => {
console.error('Error:', error);
});

function printObjProperty(obj)
{
    //return JSON.stringify(obj, null, 2);
    console.log(JSON.stringify(obj, null, 2));
    //for (let key in obj)
    //{
    //    if (typeof obj[key] === 'object') {
    //        console.log(`${' '.repeat(depth)}${key}`);
    //        printObjProperty(obj[key], depth+1);
    //    }
    //    else {
    //        console.log(`${' '.repeat(depth)}${key}: ${obj[key]}`);
    //    }
    //    }

}

//get_search_results(payload)
//.then(results => {
//    results.forEach(result => {
//    
////console.log(`  ${result._source.name}`); // Предположим, что свойство "id" содержит идентификатор каждого результата
//console.log(Object.entries(result)); // Предположим, что свойство "id" содержит идентификатор каждого результата
//});
//})
//.catch(error => {
//console.error('Error:', error);
//});