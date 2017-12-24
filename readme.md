# 最近話題のParcelをさわってみる

## Parcelとは
parcelとは設定ファイルを必要としない高速なモジュールバンドラです。
> Parcel is a web application bundler, differentiated by its developer experience. It offers blazing fast performance utilizing multicore processing, and requires zero configuration.


使ってみた個人的な感想としては  
設定が容易で導入が簡単であると感じました。  

目的によってできること出来ないことはあると思いますが  
ファイル分割やhotloaderなどの環境を手軽に構築したい際に  
webpackよりも簡単に導入でき  
便利なツールです。

https://github.com/parcel-bundler/parcel

## 使い方
公式ドキュメントを参考に使い方を紹介します。  
https://parceljs.org/getting_started.html  

## package.jsonの作成
今回はyarnでインストールしていきますが  
npmで行う場合は適宜変更してください。

```Bash
$ yarn init -y
```
## Parcelをインストール
公式ドキュメントではGlobalにインストールしていますが  
ここではローカルにインストールして使用する前提で進めます

```Bash
$ yarn add parcel-bundler
```

## 動かしてみる
### index.htmlを作成
```html:index.html
<html>
<body>
  <script src="./js/app.js"></script>
</body>
</html>
```
### js/app.jsを作成
```js:js/app.js
console.log('hello world');
```
### 実行  
yarn run で実行。  
npmでインストールされた場合はnpxコマンドなどを使用してください
```Bash
$ yarn run parcel index.html
yarn run v1.3.2
$ /Users/hoge/workspace/parcel/node_modules/.bin/parcel index.html
Server running at http://localhost:1234
✨  Built in 717ms.
```
ブラウザからhttp://localhost:1234へアクセスし  
コンソールを開いてみると
```Bash:console.log
hello world
```
### js/app.jsを更新
```js:js/app.js
console.log('hello world');
console.log('hoge');
```
保存すると新しいログが出力されます。
```Bash:console.log
hello world
hello world
hoge
```
## importやexportを試してみる
### js/hoge.jsを作成
```js:js/hoge.js
export default function hoge() {
  console.log('hoge.js');
}
```
### js/app.jsを更新
```js:js/app.js
import hoge from './hoge'
hoge();
```
保存するとhoge.jsを呼び出したログが確認できます。  
ファイル追加についてもwacthを検出してくれます。
```Bash:console.log
hello world
hello world
hoge
hoge.js
```
## Reactを動かしてみる
### パッケージをインストール  
react  
react-dom  
babel-preset-env  
babel-preset-react
```Bash
$ yarn add react react-dom babel-preset-env babel-preset-react
```
### .babelrcを作成
babelの設定ファイルを作成すると起動時に自動で読み込んでくれます。
```json:.babelrc
{
  "presets": ["env", "react"]
}
```
### index.htmlを更新
#appを追加
```html:index.html
<html>
<body>
  <div id="app"></div>
  <script src="./js/app.js"></script>
</body>
</html>
```

### js/app.jsを更新
```js:js/app.js
import React, { Component } from 'react';
import { render } from 'react-dom';

class App extends Component {
  render() {
    return (
      <div>
        Hello world
      </div>
    );
  }
}
render(
  <App />,
  document.getElementById('app')
);

```
## PostCSS（CSS modules）を使ってみる
### パッケージをインストール  
postcss-modules  
autoprefixer  
```Bash
yarn add postcss-modules autoprefixer
```
### .postcssrcを作成
```json:.postcssrc
{
  "modules": true,
  "plugins": {
    "autoprefixer": {
      "grid": true,
      "browsers": [
        "last 2 versions"
      ]
    }
  }
}
```
### css/style.cssを作成
```css:css/style.css
body {
  background: #efefef;
}
.grid {
  display: grid;
  grid-template-rows: 400px 150px;
  grid-template-columns: 200px 1fr;
}
.nav {
  grid-row: 1 / 3;
  grid-column: 1 / 2;
  background: #ddd;
}
.main {
  grid-row: 1 / 2;
  grid-column: 2 / 3;
  background: #fff;
}
.foot {
  grid-row: 2 / 3;
  grid-column: 2 / 3;
  background: #666;
}

```
### js/app.jsを更新
```js:js/app.js
import React, { Component } from 'react';
import { render } from 'react-dom';
import styles from '../css/style.css'
class App extends Component {
  render() {
    return (
      <div className={styles.grid}>
        <div className={styles.nav}>nav</div>
        <div className={styles.main}>main</div>
        <div className={styles.foot}>foot</div>
      </div>
    );
  }
}
render(
  <App />,
  document.getElementById('app')
);

```

## プロダクションモードでBuildする
```
$ yarn run parcel build index.html
```

cssやjsを個別にディレクトリを設定してdistする場合はタスクを分ける必要がある
```
$ yarn run parcel build js/* -d dist/js
$ yarn run parcel build css/* -d dist/css
```

## 所感
 - 導入は容易であり手軽にアプリケーションを構築する際に有用
 - 既存のプロダクトへ組み替えを検討する際は少々面倒（アップデートに期待）


## 参考文献
https://qiita.com/bitrinjani/items/b08876e0a2618745f54a  
https://qiita.com/soarflat/items/3e43368b2d767c730781
