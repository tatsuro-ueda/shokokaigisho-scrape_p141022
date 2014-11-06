---
title: 受け入れテストツールProtractorでスクレイピング
---

## 受け入れテストツール
## Protractor / Angular
## でスクレイピング

---

## Protractorって何？

![](image/protractor.png)

- 日本語で「分度器」
- AngularJSに付属している受け入れテストツール
- AngularJSを使ってない普通のサイトでも使用可能
- 内部でSeleniumを使用

---

## どんなふうに使うの？

---

## こんなサイトがあるとします

足し算をするサイト

![](image/calculator.jpg)

---

## 受け入れテストは、こんな感じ

- 1つめのボックスに「1」を入力し、
- 2つめのボックスに「2」を入力すると・・・
- 「3」が出力されるはず 

---

<pre style="background:#0c1021;color:#f8f8f8">describe(<span style="color:#61ce3c">'AngularJSホームページ'</span>, <span style="color:#fbde2d">function</span>() {
  it(<span style="color:#61ce3c">'1と2を加える'</span>, <span style="color:#fbde2d">function</span>() {
    <span style="color:#aeaeae">// 足し算をするサイト</span>
    browser.get(<span style="color:#61ce3c">'http://juliemr.github.io/protractor-demo/'</span>);
    element(by.model(<span style="color:#61ce3c">'first'</span>)).sendKeys(<span style="color:#d8fa3c">1</span>);
    element(by.model(<span style="color:#61ce3c">'second'</span>)).sendKeys(<span style="color:#d8fa3c">2</span>);

    element(by.<span style="color:#8da6ce">id</span>(<span style="color:#61ce3c">'gobutton'</span>)).<span style="color:#8da6ce">click</span>();

    <span style="color:#aeaeae">// 1と2を足したら結果は3になるはず、というテスト</span>
    expect(element(by.binding(<span style="color:#61ce3c">'latest'</span>)).getText()).toEqual(<span style="color:#61ce3c">'3'</span>);
  });
});
</pre>

---

- このテストコードで実際にブラウザが起ち上がってテストをします
- ヘッドレスではないので、テストの過程がわかりやすいです

## このテストツールを使って
## スクレイピングしてしまう、
## というのが今回の発表内容です

---

## 目的

とある商工会議所の事業所検索ページから、

**全ての事業所の情報**を引き出す

---

<pre style="background:#0c1021;color:#f8f8f8">  it(<span style="color:#61ce3c">'目標業種のページへ行く'</span>, <span style="color:#fbde2d">function</span> () {

    <span style="color:#aeaeae">// 商工会議所の事業所検索ページに行く</span>
    browser.get(<span style="color:#61ce3c">'http://meikan.yokkaichi-cci.or.jp/index.html'</span>);

    <span style="color:#aeaeae">// 検索フォームの金融保険業のチェックボックスをチェックする</span>
    <span style="color:#fbde2d">$</span>(<span style="color:#61ce3c">'input[name=g3]'</span>).<span style="color:#8da6ce">click</span>();

    <span style="color:#aeaeae">// 検索フォームの「検索」ボタンを押す</span>
    <span style="color:#fbde2d">$</span>(<span style="color:#61ce3c">'input[name=submit]'</span>).<span style="color:#8da6ce">click</span>();
  });
</pre>

---

<pre style="background:#0c1021;color:#f8f8f8">it(<span style="color:#61ce3c">'次のページへ進む'</span>, <span style="color:#fbde2d">function</span> () {
  <span style="color:#fbde2d">$</span>(<span style="color:#61ce3c">'a:nth-of-type('</span> <span style="color:#fbde2d">+</span> (page_number <span style="color:#fbde2d">%</span> <span style="color:#d8fa3c">20</span>) <span style="color:#fbde2d">+</span> <span style="color:#61ce3c">')'</span>).<span style="color:#8da6ce">click</span>();
  <span style="color:#aeaeae">// 例えば15ページ目に行くには</span>
  <span style="color:#aeaeae">// $('a:nth-of-type(15).click()</span>
}
</pre>