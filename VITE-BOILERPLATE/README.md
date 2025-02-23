# VITE BOILERPLATE

```bash
$ npm init -y
```

## INSTALAR VITE

```bash
$ npm install vite --save-dev
```

## Añadir scripts start, build,preview en package.json

```json
//package.json
   "scripts": {
    "start": "vite",
   "build": "vite build",
   "preview": "vite preview"
   },
```

- start se utiliza para ararncar Vite para desarrollo

- build se utiliza para producción -> para compilar

- preview se utiliza para levantar un pequeño servidor local para que puedas ver la app. Tb es parte de la prod.

## INSTALAR TYPESCRIPT

```bash
$ npm install typescript --save-dev
```

1. Añadimos el archivo de configuración de typescript -> tsconfig.json:

```json
{
  "compilerOptions": {
    "esModuleInterop": true,
    "isolatedModules": true,
    "lib": ["ESNext", "DOM"],
    "module": "ESNext",
    "moduleResolution": "Node",
    "noEmit": true,
    "noImplicitReturns": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "sourceMap": true,
    "target": "ESNext",
    "useDefineForClassFields": true
  },
  "include": ["src"]
}
```

2. Añadir plugin que se encargue de avisarnos si el código se ha compilado con algún error:

```bash
$ npm install vite-plugin-checker -D
```

3. Añadimos archivo de configuración de Vite -> vite.config.ts:

```js
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
export default defineConfig({
  plugins: [checker({ typescript: true })],
});
```

4. Añadimos un nuevo script en package.json:

```json
"scripts": {
"type-check" : "tsc --noEmit",
"prebuild" : "npm run type-check",
}
```

5. Instalar rollup/plugin-typescript:

```bash
$ npm install @rollup/plugin-typescript tslib -D
```

- Y configuramos vite.config.ts:

```ts
export default defineConfig({
  plugins: [checker({ typescript: true })],
  build: {
    rollupOptions: {
      plugins: [typescript()],
    },
  },
});
```

## REACT

1. Instalar React:

```bash
$ npm install react react-dom
```

2. Instalar paquetes de definición de tipos:

```bash
$ npm install @types/react @types/react-dom --save-dev
```

3. Añadir configuración para archivos .jsx, en el archivo tsconfig.json:

```json
"jsx": "react-jsx",
```

Instalar el plugin de Vite para React, para asegurarnos de que el bundler pueda traspilar correctamente el código escrito en React. También permite añadir presets para Babel.

4. Cambiamos main.ts a main.tsx y le añadimos contenido escrito en .tsx

## Compatibilidad con navegadores antiguos:

1. Vamos a instalar el plugin legacy, que se encarga de crear polyfils para los navegadores que no soportan módulos, de manera nativa:

```bash
$ npm add -D @vitejs/plugin-legacy
```

Este plugin utiliza @babel/preset-env para la traspilación final.

2. Añadimos configuración en el archivo vite.config.ts. El archivo queda de la siguiente manera:

```ts
import { defineConfig } from "vite";
import legacy from "@vitejs/plugin-legacy";
import checker from "vite-plugin-checker";
import typescript from "@rollup/plugin-typescript";

export default defineConfig({
  plugins: [
    checker({ typescript: true }),
    legacy({
      targets: ["defaults", "not IE 11"],
      additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
    }),
  ],
  build: {
    rollupOptions: {
      plugins: [typescript()],
    },
    target: "es5",
  },
});
```

## Variables de entorno:

Al ser un proyecto semilla, es importante que cuente también con un fichero de variables de entorno.

También creamos un fichero de definición de tipos, dentro de la carpeta src, ya que Typescript no sabe resolver el archivo .env

Para el contenido de vite.d.ts: Se utiliza sintaxis específica, que typescript entiende

```ts
/// <reference types="vite/client" />
```
