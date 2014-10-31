/**
 * Created by weed on 2014/10/22.
 *
 * 商工会議所の事業所検索ページから
 * 全ての事業所の情報を引き出すプログラムです
 */

console.log('script just started');

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

describe( '情報取得処理', function () {

  /**
   * 業種名
   * @type {string}
   */
  var gyoshu;

  /**
   * 次の事業所内容ページへのリンクが存在するか
   * @type {boolean}
   */
  var isLinkPresent;

  /**
   * 事業所内容ページへのリンク
   * @type {*|jQuery|HTMLElement}
   */
  var link;

  /**
   * @type {string}
   */
  var result_company, shozaichi, denwaBango, daihyoSha, sougyouNengetsu, houjinSetsuritsuNengetsu,
    shihonkin, juugyouinSuu, gyoshu_shousai, eigyouNaiyou, jishaPr, url, bukai;
  var content;

  it('開始', function () {

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

    // AngularJSを使っていないサイトでProtractorを使用する
    browser.ignoreSynchronization = true;

    console.log('商工会議所に行く直前');

    // 商工会議所の事業所検索ページに行く
    browser.get('http://meikan.yokkaichi-cci.or.jp/index.html');

    console.log('商工会議所に行く、の直後');

    // 検索フォームの金融保険業のチェックボックスをチェックする
    $('input[name=' + gyoshu_info[5]['input_name'] + ']').click();

    // CSSセレクタを使って業種名を取得する
    // 非同期なので.then(function)を使う
    element.all( by.css('p.f6')).get(gyoshu_info[5]['p.f6_index']).getText().then( function ( text ) {
      gyoshu = text;
    });

    isLinkPresent = true;

    // 検索フォームの「検索」ボタンを押す
    $('input[name=submit]').click();
  });

  //for (var j = 5; j <= 6; j++) {
  //  (function ( page_number ) {
  //    // 1ページの内容全てを取得し終わったら次のページへ進む
  //
  //    it('次のページへ進む', function () {
  //      if ( page_number != 1 ) {
  //        $('a:nth-of-type(' + ( page_number - 1 ) + ')').click();
  //      }
  //    });

      // 1つの事業所の情報を取得したら次の事業所へ進む
      // 1ページに含まれる事業所数は最大20
      console.log('isLinkPresent: ' + isLinkPresent);
      //for (var i = 1; isLinkPresent; i++) {
      for (var i = 1; i <= 20; i++) {
        (function ( index ) {
          it('次の事業所があるか調べる', function () {
            link = $('div#search_result_list:nth-of-type(' + ( index + 1 ) + ') a:nth-of-type(1)');
            link.isPresent().then( function (bool) {
              isLinkPresent = bool;
            });
          });

          it('事業所内容を取得する', function () {

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
            else
            {
              return; // breakだとなぜかエラーが出て止まる
            }
          });

          it('save data', function () {
            if (isLinkPresent === true) {
              content = [
                gyoshu, result_company, shozaichi, denwaBango, daihyoSha, sougyouNengetsu, houjinSetsuritsuNengetsu, shihonkin,
                juugyouinSuu, gyoshu_shousai, eigyouNaiyou, jishaPr, url, bukai
              ].join(',\t') + '\n';

              fs.appendFileSync(out_file_path, content);
              console.log('wrote: ' + out_file_path);

              browser.navigate().back();
            }
          });
        })(i); // (function
      } // for i

      it('このページの情報取得を完了しました', function () {
      });

  //  })(j); // (function
  //} // for j

  it('全ページの情報取得を完了しました', function () {
  })

}); // describe