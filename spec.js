/**
 * Created by weed on 2014/10/22.
 */

/**
 * ファイルシステムモジュール
 * @type {exports}
 */
var fs = require( 'fs' );

/**
 * 出力ファイル
 * @type {string}
 */
var out_file_path = 'tmp.csv';

fs.unlink(out_file_path);

describe( '情報取得開始', function () {

  // AngularJSを使っていないサイトでProtractorを使用する
  browser.ignoreSynchronization = true;

  // 商工会議所の事業所検索ページに行く
  browser.get( 'http://meikan.yokkaichi-cci.or.jp/index.html' );

    /**
     * 業種リスト
     * p.f6_index: 検索画面の該当業種の業種名を取得するための番号
     * input_name: 検索画面の該当業種のチェックボックスの
     * @type {*[]}
     */
    var gyoshu_info = [
    {"p.f6_index": 8, "input_name": "g1" }, // 農林水産業
    {"p.f6_index": 10, "input_name": "g3" }, // 建設業
    {"p.f6_index": 11, "input_name": "g4" }, // 製造業
    {"p.f6_index": 12, "input_name": "g5" }, // 卸売業
    {"p.f6_index": 13, "input_name": "g6" }, // 小売業
    {"p.f6_index": 14, "input_name": "g7" }, // 金融保険業
    {"p.f6_index": 15, "input_name": "g8" }, // 不動産業
    {"p.f6_index": 16, "input_name": "g9" }, // 運輸通信
    {"p.f6_index": 17, "input_name": "g10" }, // サービス業
    {"p.f6_index": 18, "input_name": "g11" }, // 電気・ガス・水道・熱供給業
    {"p.f6_index": 19, "input_name": "g12" } // 学校・団体
  ];

  // 金融保険業のチェックボックスをチェックする
  $('input[name=' + gyoshu_info[5]['input_name'] + ']').click();

  /**
   * 業種名
   * @type {string}
   */
  var gyoshu;

  // CSSセレクタを使って業種名を取得する
  element.all( by.css('p.f6')).get(gyoshu_info[5]['p.f6_index']).getText().then( function ( text ) {
    gyoshu = text;
  });

  $('input[name=submit]').click();

  var link, isLinkPresent;
  var result_company, shozaichi, denwaBango, daihyoSha, sougyouNengetsu, houjinSetsuritsuNengetsu,
    shihonkin, juugyouinSuu, gyoshu_shousai, eigyouNaiyou, jishaPr, url, bukai;
  var content;

  for (var j = 1; j <= 6; j++) {
    (function ( index_j ) {
      it('click next page link', function () {
        if ( index_j != 1 ) {
          $('a:nth-of-type(' + ( index_j - 1 ) + ')').click();
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
                gyoshu_shousai = text;
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
                gyoshu, result_company, shozaichi, denwaBango, daihyoSha, sougyouNengetsu, houjinSetsuritsuNengetsu, shihonkin,
                juugyouinSuu, gyoshu_shousai, eigyouNaiyou, jishaPr, url, bukai
              ].join('\t') + '\n';

              fs.appendFileSync(out_file_path, content);
              console.log('wrote: ' + out_file_path);

              browser.navigate().back();
            }
          });
        })(i); // (function
      } // for i
    })(j); // (function
  } // for j
}); // describe