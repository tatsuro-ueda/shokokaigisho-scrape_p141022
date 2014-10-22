/**
 * Created by weed on 2014/10/22.
 */

var fs = require( 'fs' );

//var outFilePath = tmp.tsv;

describe( 'shokokaigisho', function () {
  browser.ignoreSynchronization = true;
  browser.get( 'http://meikan.yokkaichi-cci.or.jp/list.php?mode=list&page_no=1' );

  it( 'テスト', function () {
    console.log('test');
  });
});