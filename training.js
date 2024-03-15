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
  payload.page = numbOfPage;
  session.post('api/base/search', payload)
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
  
  payload.page = numbOfPage;
  session.post('api/base/search', payload)
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

function get_page(data, numbOfPage)
{
  if(document.getElementById('div_1')!==null)
  for(let i = 0; i < 10; i++)
  {
    element = document.getElementById(`div_${i}`); 
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
    div.innerHTML= `${i}:`;
    div.innerHTML= (JSON.stringify(data[i]._source.name));
    document.body.append(div);
  }




}
let chech = 0;
//const prompt = require("prompt-sync")({ sigint: true });
  res(numbOfPage);
