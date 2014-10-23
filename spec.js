/**
 * Created by weed on 2014/10/22.
 */

var fs = require( 'fs' );
var outFilePath = 'tmp.tsv';
fs.unlink(outFilePath);

describe( 'shokokaigisho', function () {
  browser.ignoreSynchronization = true;
  browser.get( 'http://meikan.yokkaichi-cci.or.jp/index.html' );
  $('input[name=submit]').click();

  var result_company, shozaichi, denwaBango, daihyoSha, sougyouNengetsu, houjinSetsuritsuNengetsu,
    shihonkin, juugyouinSuu, gyoshu, eigyouNaiyou, jishaPr, url, bukai;
  var content;

  for (var i = 1; i <= 10; i++) {
    (function ( index ) {
      it( 'Open first company page and scrape data', function () {
        $('div#search_result_list:nth-of-type(' + ( index + 1 ) + ') a:nth-of-type(1)').click();

        var getTextFromTable = function ( selector, index ) {
          return element.all( by.css( selector ) ).get( index ).getText();
        };

        $('.result_company').getText().then( function ( text ) {
          result_company = text;
        });

        getTextFromTable( 'p', 6 ).then( function ( text ) {
          shozaichi = text;
        });
        getTextFromTable( 'p', 8 ).then( function ( text ) {
          denwaBango = text;
        });
        getTextFromTable( 'p', 10 ).then( function ( text ) {
          daihyoSha = text;
        });
        getTextFromTable( 'p', 12 ).then( function ( text ) {
          sougyouNengetsu = text;
        });
        getTextFromTable( 'p', 14 ).then( function ( text ) {
          houjinSetsuritsuNengetsu = text;
        });
        getTextFromTable( 'p', 16 ).then( function ( text ) {
          shihonkin = text;
        });
        getTextFromTable( 'p', 18 ).then( function ( text ) {
          juugyouinSuu = text;
        });
        getTextFromTable( 'p', 20 ).then( function ( text ) {
          gyoshu = text;
        });
        getTextFromTable( 'p', 22 ).then( function ( text ) {
          eigyouNaiyou = text;
        });
        getTextFromTable( 'p', 24 ).then( function ( text ) {
          jishaPr = text;
        });
        getTextFromTable( 'a', 2 ).then( function ( text ) {
          url = text;
        });
        getTextFromTable( 'p', 28 ).then( function ( text ) {
          bukai = text;
        });
      });

      it( 'save data' , function () {
        content = [
          result_company, shozaichi, denwaBango, daihyoSha, sougyouNengetsu, houjinSetsuritsuNengetsu, shihonkin,
          juugyouinSuu, gyoshu, eigyouNaiyou, jishaPr, url, bukai
        ].join('\t') + '\n';

        fs.appendFileSync(outFilePath, content);
        console.log('wrote: ' + outFilePath);

        browser.navigate().back();
      });

    })(i);
  } // for
});