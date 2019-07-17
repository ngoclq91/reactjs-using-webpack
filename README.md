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

## 4. Apply babel vào project

### 4.1. Loader
- Loader cho phép xử lý 1 file trước khi require (import) hoặc load vào.
- Loader giúp chuyển đổi 1 file từ nhiều ngôn ngữ (cú pháp) (điển hình như 3 loại dưới) khác nhau sang js thuần
	- JSX
	- ES6(ES2015), 7,...
	- CSS (require 1 file css trong javascript)

### 4.2. Babel
- Giúp biến đổi code ES6 -> ES5
- 1 số module tiêu biểu cần tìm hiểu:
	- `Babel-loader`: hướng dẫn babel biết được làm thế nào làm việc được với webpack
	- `Babel-core`: lấy và phân tích mã nguồn để rồi output ra 1 file
	- `Babel-preset-env`: bộ quy tắc giải thích với babel về cú pháp ES6,7 cần tìm và làm thế nào để chuyển đổi sang ES5
	- `Babel-preset-react`: chuyển đổi code JSX -> JS
- Cài đặt các module trên
```bash
	# -D == --save-dev
	> $ npm install -D babel-loader@latest @babel/core@latest @babel/preset-env@latest
```

### 4.3. Apply babel để có thể sử dụng đc ES6
- Trước khi apply babel ta cần phải khai báo cho các quy tắc cũng như các module cho webpack biết ở file `webpack.config.js`
```javascript
	const path = require('path');
	const config = {
		mode: 'development',
		entry : './src/index.js',
		output: {
			filename: 'bundle.js',
			path: path.resolve(__dirname, 'build')
		},
		
		// add module theo quy tắc chỉ định
		module: {
			rules: [
				// sử dụng babel-loader và áp dụng cho file javascript
				{
					use: 'babel-loader',
					test: /\.js$/
				}
			]
		}
	};
	
	module.exports = config;
```
- Sau đó, thiết lập bộ quy tắc để chuyển ES6,7 -> ES5 bằng cách ở thư mục root tạo file `.babelrc`
```bash
	> $ touch .babelrc
```
- Ở file `.babelrc` ta ghi như sau:
```javascript
	{
	  "presets": ["@babel/preset-env"]
	}
```
- Như vậy ở file `./src/math.js` ta đã có thể sử dụng cú pháp `export default` của ES6 thay cho `module.exports`
```javascript
	const math = {
		sum(a, b) { return a + b },
		sub(a, b) { return a - b },
		mul(a, b) { return a * b },
		div(a, b) { return a / b },
	};

	export default math;	// thay cho module.exports = math
```
- Ở file `./src/index.js` ta có thể sử dụng cú pháp `import...from..` thay cho `require()`:
```javascript
	import math from './math.js';

	console.log(`2 + 3 = ${math.sum(2, 3)}`);
	console.log(`3 - 2 = ${math.sub(3, 2)}`);
	console.log(`2 * 3 = ${math.mul(2, 3)}`);
	console.log(`3 / 2 = ${math.div(3, 2)}`);
```

### 4.4. 【Note】Fix error export and import when run
- Error content:
```javascript
	$ node ./src/index.js
	E:\reactjs\reactjs-using-webpack\src\index.js:1
	(function (exports, require, module, __filename, __dirname) { import math from './math';
																		 ^^^

	SyntaxError: Unexpected identifier
		at new Script (vm.js:79:7)
		at createScript (vm.js:251:10)
		at Object.runInThisContext (vm.js:303:10)
		at Module._compile (internal/modules/cjs/loader.js:657:28)
		at Object.Module._extensions..js (internal/modules/cjs/loader.js:700:10)
		at Module.load (internal/modules/cjs/loader.js:599:32)
		at tryModuleLoad (internal/modules/cjs/loader.js:538:12)
		at Function.Module._load (internal/modules/cjs/loader.js:530:3)
		at Function.Module.runMain (internal/modules/cjs/loader.js:742:12)
		at startup (internal/bootstrap/node.js:279:19)
```
- Cách xử lý : ([tham khảo tại đây](https://stackoverflow.com/questions/45854169/how-can-i-use-an-es6-import-in-node))
	- Install `esm` package:
	```bash
		> $ yarn add esm
		OR
		> $ npm install esm
	```
	- Ở file `package.json` chỉ định yêu cầu package này khi run server
	```javascript
		{
		  ...
		  "scripts": {
			"test": "echo \"Error: no test specified\" && exit 1",
			"start": "node -r esm ./src/index.js"
		  },
		}
	```
	- その後、端末から以下のコマンドを実行してnodeサーバーを起動
	```bash
		> $ npm start
	```

## 【Note】参考リンクまとめ
- [Cách import / export trong ES6](https://www.codehub.vn/ES6-Co-Ban/ES6-import-va-export)
- [Why your ES6+ syntax doesn’t work in Node.js and how to fix it](https://medium.com/@pativancarrasco/why-your-es6-syntax-doesnt-work-in-node-js-and-how-to-fix-it-161f0708f1ad)
- [[es6] import, export, default cheatsheet](https://hackernoon.com/import-export-default-require-commandjs-javascript-nodejs-es6-vs-cheatsheet-different-tutorial-example-5a321738b50f)