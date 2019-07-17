# WEBPACKについて

[TOC]

- - -

- [公式ページ](https://webpack.js.org/)
- [ドキュメント](https://webpack.js.org/concepts/)

## 1. Webpackとは
- ![webpack](http://i.imgur.com/iy9HXob.png)
- Webpackは最新のJavascriptアプリケーション用の静的モジュールハンドラ (Static Module Bundler)です。
- モジュールハンドラとは:
	- 複数のモジュールを1つにまとめたファイルを出力するツールのこと。ただし、出力設定によっては複数のファイルを出力することもある。
- Webpack以外に、以下のようなモジュールハンドラが存在する
	- [Browserify](http://browserify.org/)
	- [RequireJS](https://requirejs.org/)
- 大プロジェクト向けに利用して、カスタマイズに、簡単に管理でき、スピードアップできる。
- メリット
	- Phân tách module ra để phân chia công việc cho từng module cụ thể
	- Can thiệp sâu, cải thiện performance
	- Đóng gói
	- Chỉ load module nào thật sự cần 

- - -

## 2. Webpackによく利用用語
- ** モジュール**
	- 機能ごとに分割されたファイルのこと。
- ** バンドル**
	- まとめられたファイルのこと。`バンドルファイル`とも言う。そのため、以下の言葉もある
		- ** バンドルが大きい** : まとめされたファイルのサイズが多き
		- ** バンドルを生成する** : まとめられたファイルを生成する
- ** バンドルする**
	- まとめるという意味。
	- なので、「モジュールをまとめる」＝「モジュールをバンドルする」
- ** ビルド**
	- 「バンドルを出力するまでの一連の処理」という意味。なので、以下の言葉もある
	- ** ビルドする** : バンドルを出力するまでの一連の処理を実行する
	- ** ビルドが遅い** : バンドルを出力するまでの一連の処理が遅い

- - -

## 3. インストールと基本的な利用

### 3.1. 準備
- プロジェクト作成
```bash
	> $ npm init
	OR
	> $ yarn init
```
- RootにWebpack設定用ファイル作成
```bash
	> $ touch webpack.config.js
```
- 以下のディレクトリを構成しておく:
```javascript
	.
	├── package.json
	├── src
	│   └── index.js
	│   └── math.js
	└── webpack.config.js
	└── index.html
```
- Webpackインストール (chỉ cần cài ở env dev, vì khi build xong webpack tạo ra file js và nhúng vào sử dụng thôi)
```bash
	> $ npm install webpack --save-dev
```
- Để build đc webpack cần cài thư viện webpack ở global
```bash
	> $ npm install -D webpack-cli
```

### 3.2. 基本的な書き方
- 次には、以下の通りに基本的なWebpackの設定構文を書いている:
```javascript
	// output.pathに絶対パスを指定する必要があるため、pathモジュールを読み込んでおく
	const path = require('path');
	const config = {
		// モードの設定、v4系以降はmodeを指定しないと、webpack実行時に警告が出る
		mode : 'development',
		
		// エントリーポイントの設定
		entry: './src/index.js',
		
		// 出力の設定
		output: {
			filename : 'bundle.js',	// 出力するファイル名
			// 出力先のパス（絶対パスを指定する必要がある）
			path : path.join(__dirname, 'build')	// == `${__dirname}/output`
		}
	}
	module.exports = config;
```

### 3.3. 各項目の説明
- ** mode**:
	- モードは`development`、`production`、`none`が存在する。
	- `development`か`production`を指定すると、様々な設定が有効になってwebpackが実行される。例えば、`production`にすれば`optimization.minimizer`という設定が有効になり、圧縮されたファイルが出力される。
- ** entry**:
	- エントリーポイントの設定。複数設定することも可能。
	- エントリーポイントとはモジュール間の依存関係の解析を開始する地点のこと。
	- 各モジュールを読み込んでメインの処理をするJavaScriptファイルだと認識しておけば良い。
- ** output**:
	- 出力の設定。
	- 出力するファイル名や出力先のパスを指定する。
	- OSによってパスが異なることを防ぐために、出力先のパスの指定には`path.join()`を利用する。

### 3.4. 例えば
- File `math.js`:
```javascript
	const math = {
		sum(a, b) { return a + b },
		sub(a, b) { return a - b },
		mul(a, b) { return a * b },
		div(a, b) { return a / b },
	};
	module.exports = math;
```

- File `webpack.config.js`
```javascript
	const path = require('path');
	const config = {
		mode: 'development',
		entry: './src/index.js',
		output: {
			filename: 'bundle.js',
			path: path.join(__dirname, 'build')	// khi chạy lệnh build webpack thì sẽ tạo ra folder build, trong folder này sẽ tạo ra file bundle.js
		}
	}
	
	module.exports = config;
```
- File `./src/index.js`
```javascript
	const math = require('./math');

	console.log(`2 + 3 = ${math.sum(2, 3)}`);
	console.log(`3 - 2 = ${math.sub(3, 2)}`);
	console.log(`2 * 3 = ${math.mul(2, 3)}`);
	console.log(`3 / 2 = ${math.div(3, 2)}`);
```
- Run build
```bash
	> $ webpack -w && node ./src/index.js
```