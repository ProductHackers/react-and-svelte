# react-and-svelte

Hemos creado la app de React con un simple `npx create-react-app react-app`.

La de Svelte con `npx degit sveltejs/template svelte-app`

[1] Hello, World

Para una build muy sencilla de ambas aplicaciones, el tamaño de sus estáticos difiere bastante.

- `du ./react-app/build/static`: 476K
- `du ./svelte-app/public/build`: 68K

[2] Un poco de interactividad

Si añadimos un poco de interactividad la app de React crece bastante, la de Svelte no.

- du `./react-app/build/static`: 480K
- `du ./svelte-app/public/build`: 68K
