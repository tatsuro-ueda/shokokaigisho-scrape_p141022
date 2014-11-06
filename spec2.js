/**
 * Created by weed on 2014/11/06.
 */
/**
 * Created by weed on 2014/10/22.
 *
 * 商工会議所の事業所検索ページから
 * 全ての事業所の情報を引き出すプログラムです
 */

describe( '情報取得', function () {

  /**
   * ファイルシステムモジュール
   * @type {exports}
   */
  var fs = require( 'fs' );

  /**
   * 出力ファイル名
   * @type {string}
   */
  var out_file_path = 'result.tsv';

  fs.unlink(out_file_path);

  /**
   * 出力ファイルの1行目のヘッダー
   * @type {string}
   */
  var header = "業種\t企業名\t所在地\t電話番号\t代表者\t創業年月\t法人設立年月\t資本金\t従業員数\t" +
    "業種詳細\t営業内容\t自社PR\tURL\t部会\n";
  fs.appendFileSync(out_file_path, header);

  /**
   * 業種名
   * @type {string}
   */
  var gyoshu;

  it('金融保険業のページへ行く', function () {
    // AngularJSを使っていないサイトでProtractorを使用する
    browser.ignoreSynchronization = true;

    // 商工会議所の事業所検索ページに行く
    browser.get('http://meikan.yokkaichi-cci.or.jp/index.html');

    /**
     * 業種リスト
     * p.f6_index: 検索画面の該当業種の業種名を取得するための番号
     * input_name: 検索画面の該当業種のチェックボックスの
     * @type {*[]}
     */
    var gyoshu_info = [
      {"p.f6_index": 8, "input_name": "g1"}, // 0 農林水産業
      {"p.f6_index": 10, "input_name": "g3"}, // 1 建設業
      {"p.f6_index": 11, "input_name": "g4"}, // 2 製造業
      {"p.f6_index": 12, "input_name": "g5"}, // 3 卸売業
      {"p.f6_index": 13, "input_name": "g6"}, // 4 小売業
      {"p.f6_index": 14, "input_name": "g7"}, // 5 金融保険業
      {"p.f6_index": 15, "input_name": "g8"}, // 6 不動産業
      {"p.f6_index": 16, "input_name": "g9"}, // 7 運輸通信
      {"p.f6_index": 17, "input_name": "g10"}, // 8 サービス業
      {"p.f6_index": 18, "input_name": "g11"}, // 9 電気・ガス・水道・熱供給業
      {"p.f6_index": 19, "input_name": "g12"} // 10 学校・団体
    ];

    // 検索フォームの金融保険業のチェックボックスをチェックする
    $('input[name=' + gyoshu_info[1]['input_name'] + ']').click();
    // CSSセレクタを使って業種名を取得する
    // 非同期なので.then(function)を使う
    element.all(by.css('p.f6')).get(gyoshu_info[1]['p.f6_index']).getText().then(function (text) {
      gyoshu = text;
    });

    // 検索フォームの「検索」ボタンを押す
    $('input[name=submit]').click();
  });

  for (var j = 1; j <= 500; j++) {
    (function ( page_number ) {
      // 1ページの内容全てを取得し終わったら次のページへ進む

      it('次のページへ進む', function () {
        if ( page_number === 1 ) {
          // 最初のページではページ番号へのリンクをクリックしない
        }
        else if ( (page_number % 20) === 0 ) {
          $('a:nth-of-type(' + (page_number - 1) + ')').click();
        }
        else if ( (page_number % 20) === 1 ) {
          $('a:nth-of-type(1)').click();
        }
        else if ( page_number <= 20 ) {
          $('a:nth-of-type(' + (page_number - 1) + ')').click();
        }
        else {
          $('a:nth-of-type(' + (page_number % 20) + ')').click();
        }
      });

      // 1つの事業所の情報を取得したら次の事業所へ進む
      // 1ページに含まれる事業所数は最大20
      //for (var i = 1; isLinkPresent; i++) {
      for (var i = 1; i <= 20; i++) {
        (function (index) {

          /**
           * 事業所内容ページへのリンク
           * @type {*|jQuery|HTMLElement}
           */
          var link;

          /**
           * 次の事業所内容ページへのリンクが存在するか
           * @type {boolean}
           */
          var isLinkPresent = true;

          it('次の事業所があるか調べる', function () {
            link = $('div#search_result_list:nth-of-type(' + ( index + 1 ) + ') a:nth-of-type(1)');
            link.isPresent().then(function (bool) {
              isLinkPresent = bool;
            });
          });

          /**
           * @type {string}
           */
          var result_company, shozaichi, denwaBango, daihyoSha, sougyouNengetsu, houjinSetsuritsuNengetsu,
            shihonkin, juugyouinSuu, gyoshuShousai, eigyouNaiyou, jishaPr, url, bukai;

          it('事業所内容を取得する', function () {
            if ( isLinkPresent ) {
              link.click();

              function getTextFromTable (selector, index) {
                return element.all(by.css(selector)).get(index).getText();
              }

              /**
               * 各企業情報を取得する
               * 空白の場合は空文字列''を入れる
               */
              $('.result_company').getText().then(function (text) {
                result_company = result_company === null ? '' : text;
              });
              getTextFromTable('p', 6).then(function (text) {
                shozaichi = shozaichi === null ? '' : text;
              });
              getTextFromTable('p', 8).then(function (text) {
                denwaBango = denwaBango === null ? '' : text;
              });
              getTextFromTable('p', 10).then(function (text) {
                daihyoSha = daihyoSha === null ? '' : text;
              });
              getTextFromTable('p', 12).then(function (text) {
                sougyouNengetsu = sougyouNengetsu === null ? '' : text;
              });
              getTextFromTable('p', 14).then(function (text) {
                houjinSetsuritsuNengetsu = houjinSetsuritsuNengetsu === null ? '' : text;
              });
              getTextFromTable('p', 16).then(function (text) {
                shihonkin = shihonkin === null ? '' : text;
              });
              getTextFromTable('p', 18).then(function (text) {
                juugyouinSuu = juugyouinSuu === null ? '' : text;
              });
              getTextFromTable('p', 20).then(function (text) {
                gyoshuShousai = gyoshuShousai === null ? '' : text;
              });
              getTextFromTable('p', 22).then(function (text) {
                eigyouNaiyou = eigyouNaiyou === null ? '' : text;
              });
              getTextFromTable('p', 24).then(function (text) {
                jishaPr = jishaPr === null ? '' : text;
              });
              getTextFromTable('a', 2).then(function (text) {
                url = url === null ? '' : text;
              });
              getTextFromTable('p', 28).then(function (text) {
                bukai = bukai === null ? '' : text;
              });
            } // if
            else {
              return; // breakだとなぜかエラーが出て止まる
            }
          });

          it('save data', function () {
            if (isLinkPresent === true) {
              /**
               * 全ての事業所データを連結したもの
               * @type {string}
               */
              var content = [
                gyoshu, result_company, shozaichi, denwaBango, daihyoSha, sougyouNengetsu, houjinSetsuritsuNengetsu, shihonkin,
                juugyouinSuu, gyoshuShousai, eigyouNaiyou, jishaPr, url, bukai
              ].join('\t') + '\n';

              fs.appendFileSync(out_file_path, content);
              console.log('wrote: ' + out_file_path);

              browser.navigate().back();
            }
          });
        })(i);
      } // for i
    })(j); // (function
  } // for j

  it ('', function () {
    browser.sleep(100000);
  })
});