# WEBPACK

Nota: El fichero .gitignore se encuentra en la carpeta principal del repositorio.

1. Iniciar proyecto con nodejs

```bash
  $ npm init -y
```

2. Instalar Webpack y Webpack cli

```bash
  $ npm install webpack webpack-cli --save-dev
```

3. Instalar babel y el loader de babel

```bash
  $ npm install @babel/cli @babel/core @babel/preset-env --save-dev
```

```bash
  $ npm install babel-loader --save-dev
```

```js
//webpack.config.js
 entry: ["./src/main.js"],
 module: {
 rules: [
 {
   test: /\.js$/,
   exclude: /node_modules/,
   loader: "babel-loader",
 },
 ],
},
```

Creamos el archivo de configuración de babel (.babelrc) y le añadimos el preset para javascript:

```js
{
  "presets": ["@babel/preset-env"]
}

```

4. Webpack devserver para levantar un servidor en local

```bash
  $ npm install --save-dev webpack-dev-server
```

```js
//webpack.config.js
import path from "path";
import url from "url";
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
devServer: {
port: 8080,
static: path.join(__dirname, "src"),
},
```

5. Soporte para css

```bash
  $ npm install css-loader style-loader --save-dev
```

```js
//webpack.config.js
   {
     test: /\.css$/,
     exclude: /node_modules/,
     use: ["style-loader", "css-loader"]
   },
```

6. MiniCssExtractPlugin

```bash
  $ npm install --save-dev mini-css-extract-plugin
```

```js
//webpack.config.js
new MiniCssExtractPlugin({
  filename: "[name].chunkhash.css",
  chunkFilename: "[id].css",
});
```

7. Soporte para sass

```bash
  $ npm install sass sass-loader --save-dev
```

```js
// webpack.config.js
 {
     test: /\.scss$/,
     exclude: /node_modules/,
     use: ["style-loader", "css-loader", "sass-loader"],
   },
```

8. Soporte para archivos .png y .jpg (opción 1 - para 'imports' dentro de ficheros /\.(t|j)sx?$/ )

```js
//webpack.config.js
  {
    test: /\.(png|jpg)$/,
    type: "asset/resource",
  },
```

9. Soporte para archivos .png y .jpg (opción 2 - Para imágenes contenidas en el html)

```bash
  $ npm install html-loader --save-dev
```

```js
//webpack.config.js
   {
     test: /\.html$/,
     loader: "html-loader",
   }
```

10. Plugin para generar archivo index.html en /dist

```bash
  $ npm install html-webpack-plugin --save-dev
```

Añadimos la configuración del plugin:

```js
// webpack.config.js
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
      scriptLoading: "blocking",
    }),
```

## SOPORTE A TYPESCRIPT

1. En el archivo de configuración de webpack, cambiamos la configuración de "babel-loader" para que acepte typescript:

```js
// webpack.conf.js
  {
    test: /\.(t|j)sx?$/,
    exclude: /node_modules/,
    loader: "babel-loader",
  },
```

2. Instalar Typescript y el preset de typescript para Babel

```bash
  $ npm install typescript --save-dev
```

```bash
  $ npm install @babel/preset-typescript --save-dev
```

3. Añadimos el preset al archivo de configuración de Babel:

```js
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-typescript"
  ]
}
```

4. Fichero de configuración de Typescript: En la raíz del proyecto creamos el fichero "tsconfig.json", con el siguente contenido:

```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "ES6",
    "moduleResolution": "node",
    "declaration": false,
    "noImplicitAny": false,
    "allowSyntheticDefaultImports": true,
    "sourceMap": true,
    "jsx": "react",
    "noLib": false,
    "skipLibCheck": true,
    "esModuleInterop": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

5. Terminamos de configurar webpack.

Se añade una nueva opción en el fichero webpack.config.js para resolver la extensión .ts:

```js
resolve: {
  extensions: [".js", ".ts"];
}
```

Se añade, como punto de entrada, el archivo principal de la aplicación, con extensión .ts

Para que typescript acepte imports de archivos CSS y .png, añadimos un fichero de declaración de tipos, en la carpeta src:

```ts
// declaration.d.ts
declare module "*.scss";
declare module "*.png";
```

6. Añadimos comandos del cli de Typescrit al archivo package.json:

- Añadimos dos nuevos comandos:
  "type-check": "tsc --noEmit",
  "type-check:watch": "npm run type-check -- --watch"

- Cambiamos el script "start":
  "start": "run-p type-check:watch start:dev"

7. Instalar la librería npm-run-all par poder arrancar scripts en paralelo:

```bash
  $ npm install npm-run-all --save-dev
```

- Modificamos script en package.json

```json
    "start": "npm-run-all --parallel type-check start:dev",
    "start:dev": "webpack serve --mode development",
```

## ACTIVAR LOS FICHEROS SOURCE-MAP

- En webpack.config, dentro del export default, añadimos la propiedad devtool, con el valor "eval-source-mao", para asociar el código que se ejecuta en el navegador, con el código original:

  ```js
    devtool: "eval-source-map",
  ```

- El source-map solamente lo queremos para desarrollo!

## IMPLEMENTAR REACT

1. Instalar React:

```bash
  $ npm install react react-dom --save
```

2. Instalar babel preset para React y añadirlo al fichero .babelrs

```bash
  $ npm install @babel/preset-react --save-dev
```

3. Cambiamos el punto de entrada de la app a "./index.tsx" y en la opcón resolve, añadimos la extensión ".tsx":

```js
resolve: {
  extensions: [".js", ".ts", ".tsx"];
}
```

Cambiamos también la opción test de "babel-loader" para que tenga acceso a los archivos .tsx y .jsx

```js
    {
      test: /\.(t|j)sx?$/,
      exclude: /node_modules/,
      loader: "babel-loader",
    },
```

## ARCHIVOS DE CONFIGURACIÓN DE WEBPACK PARA DESARROLLO, PARA PRODUCCIÓN Y COMMON:

1. Archivo webpack.common.js para la configuración común para producción y desarrollo.

2. Archivo webpack.dev.js con la configuración para desarrollo e importamos la configuración del archivo webpack.common.js.

Para facilitar el import de las reglas comúnes, instalamos la librería de webpack "webpack-merge"

```bash
  $ npm install webpack-merge --save-dev
```

Hacemos los imports correspondientes en el archivo dev:

```js
import merge from "webpack-merge";
import common from "./webpack.common.js";
```

Y el export default se queda de la siguente manera:

```js
export default merge(common, {
  //
});
```

- En el archivo de webpack.dev.js, añadimos mode: "development", para indicarle a webpack, que el archivo contiene la configuración de desarrollo.

- Ahora, en package.json, en el "start:dev", cambiamos --mode development por --config webpack.dev.js, para indicar el archivo que debe utilizar webpack para arrancar el servidor local en modo desarrollo.

- También añadimos un nuevo script: "build:dev":

  ```js
     "build:dev": "webpack --mode development --config webpack.dev.js",
  ```

3. Archivo webpack.prod.js:

- Hacemos el import de merge y common para añadir la configuración común y añadimos la configuración para la producción.

- Añadimos mode: "production"

4. Modificamos los scripts en package.json, para que tener distintos comandos de start y build, para desarrollo y para producción.

- "scripts" quedaría de la siguiente manera:

```json
  "scripts": {
    "start": "run-p type-check:watch start:dev",
    "start:dev": "webpack serve --config webpack.dev.js",
    "start:prod": "webpack serve --config webpack.prod.js",
    "build:dev": "webpack --config webpack.dev.js",
    "build:prod": "npm run type-check && webpack --config webpack.prod.js",
    "type-check": "tsc --noEmit",
    "type-check:watch": "npm run type-check -- --watch"
  },
```

## MEDIR CUANTO OCUPA CADA LIBRERÍA DE NUESTRO CÓDIGO EN EL BUNDLE:

## CALCULAR EL PESO DE NUESTRA APP

- Para esto, webpack nos da un plugin webpack-bundle-analyzer

  ```bash
    $ npm install webpack-bundle-analyzer --save-dev
  ```

- Creamos un nuevo archivo en la raiz: webpack.perf.js

- Hacemos los siguientes imports:

  ```js
  import { merge } from "webpack-merge";
  import prod from "./webpack.prod.js";
  import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
  ```

- Instanciamos el plugin del analyzer, e importamos ls config de prod

  ```js
  export default merge(prod, {
    plugins: [new BundleAnalyzerPlugin()],
  });
  ```

- Creamos un nuevo script en package.json

  ```json
     "build:perf": "npm run type-check && webpack --config webpack.perf.js",
  ```
