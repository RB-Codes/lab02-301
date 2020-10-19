'use strict';
// let list = ['narwhal', 'rhino', 'unicorn', 'unilego', 'triceratops', 'markhor', 'mouflon', 'addax', 'chameleon', 'lizard', 'dragon'];
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

  let printed = $('.horn-box').clone();
  $('main').append(printed);
  printed.find('h2').text(this.title);
  printed.find('img').attr('src', this.image_url);
  printed.find('p').text(this.description);
  printed.attr('class', this.keyword);
};



const ajaxSettings = {
  method: 'get',
  dataType: 'json'
};


$.ajax('data/page-1.json', ajaxSettings).then((data) => {

  let list = [];
  data.forEach((getKeyword) => {
    if (list.indexOf(getKeyword.keyword) === -1) {
      list.push(getKeyword.keyword);
      $('#menu').append(
        $('<option/>')
          .attr('value', getKeyword.keyword)
          .text(getKeyword.keyword)
      );
    }


  });
  $('select').change(function () {
    $('section').hide();
    let str = [];
    $('select option:selected').each(function () {
      str.push($(this).val());

      for (let i = 0; i < hornsArr.length; i++) {
        if ($(this).val() === hornsArr[i].keyword) {
          $(`.${$(this).val()}`).show();

        }
      }

    });
  });

});



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

