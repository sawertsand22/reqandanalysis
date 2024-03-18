function get_authors(data,i)
{// Возвращает строку с авторами
  let str = '';
 
    if (data[i]._source.authors !== undefined) {
      for (let j = 0; j < data[i]._source.authors.length; j++) {
        let name = data[i]._source.authors[j].name;
        let surname = data[i]._source.authors[j].surname;
        let patronymic = data[i]._source.authors[j].patronymic;
       
        str+= `Имя: ${name}  Фамилия: ${surname} Отчество: ${patronymic} \r\n`;
       
      }
    }
    else {
      let name =data[i]._source.authors_name;
      let surname = data[i]._source.authors_surname;
      let patronymic = data[i]._source.authors_patronymic;
        
      str+= `Имя: ${name}  Фамилия: ${surname} Отчество: ${patronymic} \r\n`;
     
    }
    
  return str;
}
function get_discriptions(data, i) {
  // Возвращает строку с Описанием работы
  //let abstract = document.createElement('p');
  if (data[i]._source.abstract)
    return `${data[i]._source.abstract}`;
  else if (data[i]._source.annotation) {
    return `${data[i]._source.annotation}`;
  }
}

function get_keyword_list(data, i)
{ // Возвращает строку с ключевыми словами
  let str=''
  for (let j = 0; j < data[i]._source.keyword_list.length; j++)
    str += data[i]._source.keyword_list[j].name +', ';
  return str
  
}
function get_work_supervisor(data, i)
{// Возвращает строку с Руководителем
  if (data[i]._source.work_supervisor)
    return `Имя: ${data[i]._source.work_supervisor.name}  Фамилия: ${data[i]._source.work_supervisor.surname} Отчество: ${data[i]._source.work_supervisor.patronymic}`;
  return "Нет данных";
}

function get_oecds(data, i)
{ // Возвращает строку с oecds
  if (data[i]._source.oecds)
  {
    return `Имя: ${data[i]._source.oecds[0].name} Код: ${data[i]._source.oecds[0].code}`; 
  }
}