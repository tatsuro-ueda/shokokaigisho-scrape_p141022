/**
 * Created by weed on 2014/10/22.
 */

var fs = require( 'fs' );
var outFilePath = 'tmp.tsv';
fs.unlink(outFilePath);

describe( 'shokokaigisho', function () {
  browser.ignoreSynchronization = true;
  browser.get( 'http://meikan.yokkaichi-cci.or.jp/index.html' );

  var categoryHash = {
    "農林水産業": { "p.f6_index": 8, "input_name": "g1" },
    "建設業": { "p.f6_index": 10, "input_name": "g3" },
    "製造業": { "p.f6_index": 11, "input_name": "g4" },
    "卸売業": { "p.f6_index": 12, "input_name": "g5" },
    "小売業": { "p.f6_index": 13, "input_name": "g6" },
    "金融保険業": { "p.f6_index": 14, "input_name": "g7" },
    "不動産業": { "p.f6_index": 15, "input_name": "g8" },
    "運輸通信業": { "p.f6_index": 16, "input_name": "g9" },
    "サービス業": { "p.f6_index": 17, "input_name": "g10" },
    "電気・ガス・水道・熱供給業": { "p.f6_index": 18, "input_name": "g11" },
    "学校・団体": { "p.f6_index": 19, "input_name": "g12" }
  };
  $('input[name=' + categoryHash['金融保険業']['input_name'] + ']').click();

  var category;
  element.all( by.css('p.f6')).get(categoryHash['金融保険業']['p.f6_index']).getText().then( function ( text ) {
    category = text;
  });

  $('input[name=submit]').click();

  var link, isLinkPresent;
  var result_company, shozaichi, denwaBango, daihyoSha, sougyouNengetsu, houjinSetsuritsuNengetsu,
    shihonkin, juugyouinSuu, gyoshu, eigyouNaiyou, jishaPr, url, bukai;
  var content;

  for (var j = 1; j <= 6; j++) {
    (function ( index2 ) {
      it('click next page link', function () {
        if ( index2 != 1 ) {
          $('a:nth-of-type(' + ( index2 - 1 ) + ')').click();
        }
      })

      for (var i = 1; i <= 20; i++) {
        (function (index) {
          it('Open first company page and scrape data', function () {
            link = $('div#search_result_list:nth-of-type(' + ( index + 1 ) + ') a:nth-of-type(1)');
            link.isPresent().then(function (b) {
              isLinkPresent = b;
            });
          });

          it('hoge', function () {
            if (isLinkPresent === true) {
              link.click();

              var getTextFromTable = function (selector, index) {
                return element.all(by.css(selector)).get(index).getText();
              };

              $('.result_company').getText().then(function (text) {
                result_company = text;
              });

              getTextFromTable('p', 6).then(function (text) {
                shozaichi = text;
              });
              getTextFromTable('p', 8).then(function (text) {
                denwaBango = text;
              });
              getTextFromTable('p', 10).then(function (text) {
                daihyoSha = text;
              });
              getTextFromTable('p', 12).then(function (text) {
                sougyouNengetsu = text;
              });
              getTextFromTable('p', 14).then(function (text) {
                houjinSetsuritsuNengetsu = text;
              });
              getTextFromTable('p', 16).then(function (text) {
                shihonkin = text;
              });
              getTextFromTable('p', 18).then(function (text) {
                juugyouinSuu = text;
              });
              getTextFromTable('p', 20).then(function (text) {
                gyoshu = text;
              });
              getTextFromTable('p', 22).then(function (text) {
                eigyouNaiyou = text;
              });
              getTextFromTable('p', 24).then(function (text) {
                jishaPr = text;
              });
              getTextFromTable('a', 2).then(function (text) {
                url = text;
              });
              getTextFromTable('p', 28).then(function (text) {
                bukai = text;
              });
            } // if
          });

          it('save data', function () {
            if (isLinkPresent === true) {
              content = [
                category, result_company, shozaichi, denwaBango, daihyoSha, sougyouNengetsu, houjinSetsuritsuNengetsu, shihonkin,
                juugyouinSuu, gyoshu, eigyouNaiyou, jishaPr, url, bukai
              ].join('\t') + '\n';

              fs.appendFileSync(outFilePath, content);
              console.log('wrote: ' + outFilePath);

              browser.navigate().back();
            }
          });
        })(i); // (function
      } // for i
    })(j); // (function
  } // for j
}); // describe