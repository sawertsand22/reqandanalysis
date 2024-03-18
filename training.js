//var sslRootCAs = require('ssl-root-cas');
//sslRootCAs.inject();
//if(process.env.NODE_ENV === 'debug'){
 //   setDebugLevel(1)
//}
//import axios, {isCancel, AxiosError} from 'axios';
//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
//import axios from 'axios';
//import axios from 'axios';
//import * as https from 'https';
// const agent = new https.Agent({
//  rejectUnauthorized: false,
//});
//const axios = require('axios').default;
//import https from 
//import https from 'https';
//axios.defaults.httpsAgent ={
//const https = require('https');
//const agent = new https.Agent({
  //  rejectUnauthorized: false
//};

//const { create } = require("ssl-root-cas");

//
const search_url = 'https://rosrid.ru/api/base/search';
const uid = '10184556';
const start_date = '2023-01-01';
const end_date = '2023-12-31';

function set_payload(page,uid)
{ //Задает payload для запроса
  const payload = {
  search_query: null,
  critical_technologies: [],
  dissertations: false,
  full_text_available: false,
  ikrbses: false,
  nioktrs: false,
  organization: [uid],
  page: page,
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
  return payload;
}

const instance = axios.create({
//Создает Инстанс
baseURL: 'https://rosrid.ru',
timeout: 1000,
headers: {
//'authority': 'rosrid.ru',
//'pragma': 'no-cache',
//'cache-control': 'no-cache',
////'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="98", "Google Chrome";v="98"',
//'accept': 'application/json, text/plain, */*',
////'sec-ch-ua-mobile': '?0',
//'content-type': 'application/json;charset=UTF-8',
////'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.80 Safari/537.36',
////'sec-ch-ua-platform': '"Linux"',
////'origin': 'https://rosrid.ru',
////'sec-fetch-site': 'same-origin',
////'sec-fetch-mode': 'cors',
////'sec-fetch-dest': 'empty',
////'referer': 'https://rosrid.ru/global-search',
//'accept-language': 'ru,en-US;q=0.9,en;q=0.8,ru-RU;q=0.7'
}
});

let numbOfPage = 1
let max_in_page = 10;
let data = [];
function page() {
  // numbOfPage = document.getElementById('button').value;
  //res(numbOfPage);
}

function res(numbOfPage) {
  //Считает количевство страниц для добавления кнопок и добавлояет их
  //payload.page = numbOfPage;
  instance.post('api/base/search', set_payload(numbOfPage,uid))
    .then(function (response) {
      console.log(response);
      //for (let i = 0; i < max_in_page;i++)
      // console.log(JSON.stringify(response.data.hits.hits[i]._source.name));
      //data = (response.data.hits.hits);
      //console.log(data[1]);
      if (response.status == 200) {
        console.log(response.data.hits.total.value / 10);
        countOfpages = response.data.hits.total.value / 10;
        footer = document.createElement('footer')
        document.body.append(footer);
        for (let i = 1; i < countOfpages+1; i++)
        {
          let btn = document.createElement('button');
          btn.innerHTML = `${i}`;
          btn.addEventListener('click', () => {
            // When there is a "click"
            // it shows an alert in the browser
            change_page(i);
          })         
          footer.appendChild(btn);
          //document.body.append(btn);
          }
        //if (numbOfPage < countOfpages) {
        //  res(numbOfPage + 1);
        //}
      }
        //get_page(data, numbOfPage);
      
        
    })
    .catch(function (error) {
      console.log(error);
    });
}

function change_page(numbOfPage) {
  //Делает запрос для отображение информации для определенной страницы
  instance.post('api/base/search', set_payload(numbOfPage,uid))
    .then(function (response) {
      //console.log(response);
      //for (let i = 0; i < max_in_page;i++)
      // console.log(JSON.stringify(response.data.hits.hits[i]._source.name));
      data = (response.data.hits.hits);
      //console.log(data);
      if (response.status == 200) {

        //if (numbOfPage < countOfpages) {
        //  res(numbOfPage + 1);
        //}
        get_page(data);
      }
      
        
    })
    .catch(function (error) {
      console.log(error);
    });
}

function get_functionForModal(data,i)
{ //Задаает массив элеметов для добавление в модальное окно
  arr = [];
  arr.push('Авторы:');
  arr.push(get_authors(data, i));
  arr.push('Описание работы:');
  arr.push(get_discriptions(data, i));
  arr.push('Ключевые слова:');
  arr.push(get_keyword_list(data, i));
  arr.push('Руководитель:');
  arr.push(get_work_supervisor(data, i));
  arr.push('Oecds:');
  arr.push(get_oecds(data, i));
  return arr;
}
function setModalData(popup,data, i)
{ //Задает Элементы в модальном окне
  arr = get_functionForModal(data, i);
  for (let j = 0; j < arr.length; j++) {
    p = document.createElement('p');
    p.innerText = arr[j];// get_authors(data, i);
    popup.appendChild(p);
  }
}


function get_page(data)
{ //Задает отрображение элементов для выбранной страницы
  if(document.getElementById('div_1')!==null)
  for(let i = 0; i < 10; i++)
  { if(document.getElementById(`div_${i}`))
    element = document.getElementById(`div_${i}`); 
    element.remove();
  }
  if(document.getElementById('win1')!==null)
  for(let i = 0; i < 10; i++)
  {
    element = document.getElementById(`win1`); 
    element.remove();
  }
  for (let i = 0; i < 10; i++) {
    //console.log(JSON.stringify(data[i]._source.name))
    pages = document.getElementById('pages');
    let div = document.createElement('div');
    div.classList.add('dataElement');
    div.id ='div_'+i;
//    <a href="#win${i}" class="button button-blue">№${i} ${data[i]._source.name}</a>
//<a href="#x" class="overlay" id="win${i}"></a>
//<div class="popup">
//    Дата внутри
//</div>
    //   ШАБЛОН ДЛЯ МОДАЛЬНОГ ОКНА
    if (data[i]._source.name) {
      pages.appendChild(div);
      a = document.createElement('a');
      a.href = `#win${i}`;
      a.classList.add("button");
      a.classList.add("button-blue");
      a.innerHTML = `№ ${i} ${data[i]._source.name}`;
      div.appendChild(a);
      aSub = document.createElement('a');
      aSub.href = '#x';
      aSub.classList.add("overlay");
      aSub.id = `win${i}`;
      div.appendChild(aSub);
      popup = document.createElement('div');
      popup.classList.add('popup');
      div.appendChild(popup);
      h1 = document.createElement('h1');
      h1.innerText = `${data[i]._source.name}`;
      popup.appendChild(h1);
      aClose = document.createElement('a');
      aClose.classList.add('close');
      aClose.href = '#close';
      popup.appendChild(aClose);
      setModalData(popup, data, i);
    }
  }




}
let chech = 0;

//Задает начало работы скрипта, а именно запрос на количество станиц
  res(numbOfPage);
