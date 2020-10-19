'use strict';

let hornsArr = [];
function Horn(title, image_url, description, keyword, horns) {
  this.title = title;
  this.image_url = image_url;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
  hornsArr.push(this);
}

Horn.prototype.printOut = function () {

  console.log(this.title);
  let printed = $('.horn-box').clone();
  $('main').append(printed);
  printed.find('h2').text(this.title);
  printed.find('img').attr('src', this.image_url);
  printed.find('p').text(this.description);
  printed.attr('class', this.title);
};

for (let i=0; i<hornsArr.length ; i++){
  let menu = $('.choice').clone();
  $('select').append(menu);
  menu.text(hornsArr[i].keyword);
}


const ajaxSettings = {
  method: 'get',
  dataType: 'json'
};

$.ajax('data/page-1.json', ajaxSettings).then((data) => {
  data.forEach(hn => {
    new Horn(hn.title, hn.image_url, hn.description, hn.keyword, hn.horns);
    for (let i = 0; i < hornsArr.length; i++) {
      hornsArr.forEach((value, index) => {
        if (index === 19) {
          hornsArr[i].printOut();
        }
      });
    }
  });
});
console.log(hornsArr);
