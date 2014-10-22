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

  it( '1番目のリンクをたどる', function () {
    $('input[name=submit]').click();
//    element.all( by.css( 'a' ) ).click();
    element.all( by.css( 'a' ) ).get( 21 ).click();
//    $( 'a' ).get( 5 ).click();
//    $('a[href="list.php\?mode=detail\&id=565107"]').click();
    expect(browser.getCurrentUrl()).toContain( '565107' );

    var result_company = $( '.result_company' ).getText();
    expect( result_company ).toBe( 'アップルインターナショナル（株）' );

    var shozaichi = element.all( by.css( 'p' )).get( 6 ).getText();
    expect( shozaichi ).toBe( '三重県四日市市日永二丁目' );

    var denwaBango;
    element.all( by.css( 'p' )).get( 8 ).getText().then(function( text ) {
      denwaBango = text;
      console.log( denwaBango );
    });
    var daihyoSha = element.all( by.css( 'p' )).get( 10 ).getText();
    var sougyouNengetsu = element.all( by.css( 'p' )).get( 12 ).getText();
    var houjinSetsuritsuNengetsu = element.all( by.css( 'p' )).get( 14 ).getText();
    var shihonkin = element.all( by.css( 'p' )).get( 16 ).getText();
    var juugyouinSuu = element.all( by.css( 'p' )).get( 18 ).getText();
    var gyoshu = element.all( by.css( 'p' )).get( 20 ).getText();
    var eigyouNaiyou = element.all( by.css( 'p' )).get( 22 ).getText();
    var jishaPr = element.all( by.css( 'p' )).get( 24 ).getText();
    var url = element.all( by.css( 'a' )).get( 2 ).getText();
    var bukai = element.all( by.css( 'p' )).get( 28 ).getText();

    var content = [
      result_company, shozaichi, denwaBango, daihyoSha, sougyouNengetsu, houjinSetsuritsuNengetsu, shihonkin,
      juugyouinSuu, gyoshu, eigyouNaiyou, jishaPr, url, bukai
    ].join('\t');

    fs.writeFileSync(outFilePath, content);
    console.log('wrote: ' + outFilePath);
  })
});