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

//
const search_url = 'https://rosrid.ru/api/base/search';
const uid = '10184556';
const start_date = '2023-01-01';
const end_date = '2023-12-31';

function set_payload(page,uid)
{
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



//const payload = {
//search_query: null,
//critical_technologies: [],
//dissertations: false,
//full_text_available: false,
//ikrbses: false,
//nioktrs: false,
//organization: [uid],
//page: 1,
//priority_directions: [],
//rids: false,
//rubrics: [],
//search_area: 'Во всех полях',
//sort_by: 'Дата регистрации',
//open_license: false,
//free_licenses: false,
//expert_estimation_exist: false,
//start_date: start_date,
//end_date: end_date
//};

const instance = axios.create({

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
        for (let i = 1; i < countOfpages+1; i++)
        {
          let btn = document.createElement('button');
          btn.innerHTML = `${i}`;
          btn.addEventListener('click', () => {
          // When there is a "click"
            // it shows an alert in the browser
            change_page(i);
})
          document.body.append(btn);
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
  
  //payload.page = numbOfPage;
  instance.post('api/base/search', set_payload(numbOfPage,uid))
    .then(function (response) {
      console.log(response);
      //for (let i = 0; i < max_in_page;i++)
      // console.log(JSON.stringify(response.data.hits.hits[i]._source.name));
      data = (response.data.hits.hits);
      //console.log(data[1]);
      if (response.status == 200) {

        //if (numbOfPage < countOfpages) {
        //  res(numbOfPage + 1);
        //}
        get_page(data, numbOfPage);
      }
      
        
    })
    .catch(function (error) {
      console.log(error);
    });
}

function get_authors(data,i)
{
  let str = '';
 
    if (data[i]._source.authors !== undefined) {
      for (let j = 0; j < data[i]._source.authors.length; j++) {
        let name = JSON.stringify(data[i]._source.authors[j].name);
        let surname = JSON.stringify(data[i]._source.authors[j].surname);
        let patronymic = JSON.stringify(data[i]._source.authors[j].patronymic);
       
        str+= `Имя: ${name}  Фамилия: ${surname} Отчество: ${patronymic} <br>`;
       
      }
    }
    else {
      let name = JSON.stringify(data[i]._source.authors_name);
      let surname = JSON.stringify(data[i]._source.authors_surname);
      let patronymic = JSON.stringify(data[i]._source.authors_patronymic);
        
      str+= `Имя: ${name}  Фамилия: ${surname} Отчество: ${patronymic} <br>`;
     
    }
    
  return str;
}
function get_discriptions(data, i) {
  //let abstract = document.createElement('p');
  if (data[i]._source.abstract)
    return `${data[i]._source.abstract}`;
  else if (data[i]._source.annotation) {
    return `${data[i]._source.annotation}`;
  }
}

function get_keyword_list(data, i)
{
  let str=''
  for (let j = 0; j < data[i]._source.keyword_list.length; j++)
    str += data[i]._source.keyword_list[j].name +', ';
  return str
  
}
function get_work_supervisor(data, i)
{
  if (data[i]._source.work_supervisor)
    return `Имя: ${data[i]._source.work_supervisor.name}  Фамилия: ${data[i]._source.work_supervisor.surname} Отчество: ${data[i]._source.work_supervisor.patronymic}`;
  return "Нет данных";
}

function get_oecds(data, i)
{
  if (data[i]._source.oecds)
  {
    return `Имя: ${data[i]._source.oecds[0].name} Код: ${data[i]._source.oecds[0].code}`; 
  }
}

function get_page(data, numbOfPage)
{
  if(document.getElementById('div_1')!==null)
  for(let i = 0; i < 10; i++)
  {
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
    console.log(JSON.stringify(data[i]._source.name))
    //let div = document.createElement('div');
    //let header = document.createElement('h1');
    //const headerText = document.createTextNode(JSON.stringify(data[i]._source.name)); // создаем текстовый узел
    //header.appendChild(headerText); // добавляем в элемент h1 текстовый узел
    //document.body.appendChild(div);
    
    let div = document.createElement('div');
    
    div.id ='div_'+i;
    div.innerHTML = (`
    <a href="#win${i}" class="button button-blue">№${i} ${data[i]._source.name}</a>
<a href="#x" class="overlay" id="win${i}"></a>
<div class="popup">
    <h1>${data[i]._source.name}</h1>
   <p> ${get_discriptions(data,i)}</p>
     <p>${get_authors(data, i)}</p>
     <p>Руководитель:  <br>
     ${get_work_supervisor(data,i)}
     </p>
    <p>Ключевые слова: <br>
    ${get_keyword_list(data, i)} </p>
    <p>oecds:<br>
    ${get_oecds(data, i)}</p>
    <a class="close" title="Закрыть" href="#close"></a>
</div>
    
    
    `);
    document.body.append(div);
//    if (data[i]._source.authors !== undefined) { 
//      for (let j = 0; j < data[i]._source.authors.length; j++) {
//        let name = JSON.stringify(data[i]._source.authors[j].name);
//        let surname = JSON.stringify(data[i]._source.authors[j].surname);
//        let patronymic = JSON.stringify(data[i]._source.authors[j].patronymic);
//        let p = document.createElement('p');
//        p.innerHTML = (`Имя: ${name}  Фамилия: ${surname} Отчество: ${patronymic}`);
//        div.appendChild(p);
//      }
//    }
//    else {
//      let name = JSON.stringify(data[i]._source.authors_name);
//        let surname = JSON.stringify(data[i]._source.authors_surname);
//        let patronymic = JSON.stringify(data[i]._source.authors_patronymic);
//        let p = document.createElement('p');
//        p.innerHTML = (`Имя: ${name}  Фамилия: ${surname} Отчество: ${patronymic}`);
//        div.appendChild(p);
//    }
//    let abstract = document.createElement('p');
//    if(data[i]._source.abstract)
//      abstract.innerHTML = (data[i]._source.abstract);
//    else if(data[i]._source.annotation){
//      abstract.innerHTML = (data[i]._source.annotation)
//     }
//    
//    div.appendChild(abstract);
  }




}
let chech = 0;
//const prompt = require("prompt-sync")({ sigint: true });
  res(numbOfPage);
