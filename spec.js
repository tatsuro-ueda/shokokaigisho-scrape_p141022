/**
 * Created by weed on 2014/10/22.
 */

var fs = require( 'fs' );

var outFilePath = 'tmp.tsv';

describe( 'shokokaigisho', function () {
  browser.ignoreSynchronization = true;
  browser.get( 'http://meikan.yokkaichi-cci.or.jp/index.html' );
//  browser.get( 'http://meikan.yokkaichi-cci.or.jp/list.php?mode=list&page_no=1' );

  it( 'テスト', function () {
    console.log( 'test' );
  });

  var result_company, shozaichi, denwaBango, daihyoSha, sougyouNengetsu, houjinSetsuritsuNengetsu,
    shihonkin, juugyouinSuu, gyoshu, eigyouNaiyou, jishaPr, url, bukai;
  var content;

  it( '1番目のリンクをたどる', function () {
    $('input[name=submit]').click();
//    element.all( by.css( 'a' ) ).click();
    element.all( by.css( 'a' ) ).get( 21 ).click();
//    $( 'a' ).get( 5 ).click();
//    $('a[href="list.php\?mode=detail\&id=565107"]').click();
    expect(browser.getCurrentUrl()).toContain( '565107' );

    var getTextFromTable = function ( tag, number ) {
      return element.all( by.css( tag ) ).get( number ).getText();
    };

    $( '.result_company' ).getText().then( function ( text ) {
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

//    var getTextWaitForDone = function ( varName, tag, number ) {
//      element.all( by.css( tag )).get( number ).getText().then( function ( text ) {
//        varName = text;
//      })
//    }
//    expect( shozaichi ).toBe( '三重県四日市市日永二丁目' );
//    expect( result_company ).toBe( 'アップルインターナショナル（株）' );
//    getTextWaitForDone( denwaBango, getTextFromTable( 'p', 8 ));
//    element.all( by.css( 'p' )).get( 8 ).getText().then(function( text ) {
//      denwaBango = text;
//    });
//    getTextWaitForDone( daihyoSha, 'p', 10);
//    daihyoSha = element.all( by.css( 'p' )).get( 10 ).getText();

//    sougyouNengetsu = element.all( by.css( 'p' )).get( 12 ).getText();
//    houjinSetsuritsuNengetsu = element.all( by.css( 'p' )).get( 14 ).getText();
//    shihonkin = element.all( by.css( 'p' )).get( 16 ).getText();
//    juugyouinSuu = element.all( by.css( 'p' )).get( 18 ).getText();
//    gyoshu = element.all( by.css( 'p' )).get( 20 ).getText();
//    eigyouNaiyou = element.all( by.css( 'p' )).get( 22 ).getText();
//    jishaPr = element.all( by.css( 'p' )).get( 24 ).getText();
//    url = element.all( by.css( 'a' )).get( 2 ).getText();
//    bukai = element.all( by.css( 'p' )).get( 28 ).getText();
  });

  it( '保存する' , function () {

//    console.log(denwaBango);

    content = [
      result_company, shozaichi, denwaBango, daihyoSha, sougyouNengetsu, houjinSetsuritsuNengetsu, shihonkin,
      juugyouinSuu, gyoshu, eigyouNaiyou, jishaPr, url, bukai
    ].join('\t');



    fs.writeFileSync(outFilePath, content);
    console.log('wrote: ' + outFilePath);
  });
});