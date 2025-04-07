---
title: 安裝與初始化
description: 安裝 mapPlus 到你的專案，開始開發地圖
index: 1
---




可使用 npm 安裝 `@kwmap/mapplus`（建議），或是使用 CDN 標籤引入。

安裝完後，於[註冊](./register)頁面取得專屬的 Key 和 Token 後，即可開始建立地圖。




## 使用 CDN 引入

於頁面 `<head/>` 標籤中引入 `mapPlus`。

```html
<script src=__MAPPLUS__ crossorigin="anonymous" referrerpolicy="origin"></script>
```

**快速開始：**

```html
<!DOCTYPE html>
<html>

<head>
<meta charset=utf-8 />
<title>Kingway Map</title>
<meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" />
<script src=__MAPPLUS__ crossorigin="anonymous" referrerpolicy="origin"></script>
<style>
  body { margin: 0; padding: 0; }
  #map { width: 100vw; height: 100vh; }
</style>
</head>

<body>
<div id="map"></div>
<script type="module">
  const map = await new mapPlus(document.getElementById('map'), {
    accessKey: __KEY__,
    accessToken: __TOKEN__,
    style: __STYLE__,
    center: [121.53559860212545, 25.029308142529132],
  });

  map.on('style.load', () => {
    // 可以開始調用 map
  });
</script>
</body>

</html>
```




## 使用 npm 安裝

在終端機中執行以下指令安裝 `@kwmap/mapplus`。

```bash
npm install @kwmap/mapplus
```




---

### 使用原生 JavaScript 開發

**index.html：**

於 html 中引入建立地圖容器。

```html
<div id="map" style="width: 100vw; height: 100vh;"></div>
```

**main.js：**

建立 `main.js`，並引入 `mapPlus`，即可開始使用地圖。

```js
import mapPlus from '@kwmap/mapplus';

const map = await new mapPlus(document.getElementById('map'), {
  accessKey: __KEY__,
  accessToken: __TOKEN__,
  style: __STYLE__,
  center: [121.53559860212545, 25.029308142529132],
});
```




---

### 使用 React 開發

**※注意：** 需使用 React `v17.0.0` 以上版本。

**main.jsx：**

於 `main.jsx` 使用 `<MapProvider>` 包裹 `useMap()` 與 `<MapComponent>` 作用域。

```jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MapProvider } from '@kwmap/mapplus/libs/react';
import Map from './components/Map';
import './main.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MapProvider>
      <Map/>
    </MapProvider>
  </StrictMode>,
);
```

**components/Map.jsx：**

建立 `components/Map.jsx`，並引入 `<MapComponent>` 與 `useMap()`，即可開始使用地圖。

```jsx
import { useEffect } from 'react';
import { MapComponent, useMap, mapPlus } from '@kwmap/mapplus/libs/react';

export default function Map() {
  const { map } = useMap();

  const mapOptions = {
    accessKey: __KEY__,
    accessToken: __TOKEN__,
    style: __STYLE__,
    center: [121.53559860212545, 25.029308142529132],
  }

  useEffect(() => {
    if (map) {
      // 可以開始調用 map
    }
  }, [map]);

  return (
    <MapComponent
      mapOptions={mapOptions}
    />
  );
}
```




---

### 使用 Vue 開發

**※注意：** 需使用 Vue `v3.0.0` 以上版本。

**components/Map.vue：**

建立 `components/Map.vue`，並引入 `<MapComponent>` 與 `useMap()`，即可開始使用地圖。

```vue
<script setup>
import { MapComponent, useMap, mapPlus } from '@kwmap/mapplus/libs/vue';

const mapOptions = {
  accessKey: __KEY__,
  accessToken: __TOKEN__,
  style: __STYLE__,
  center: [121.53559860212545, 25.029308142529132],
}

const mapOnStyleLoad = () => {
  const { map } = useMap();
  // 可以開始調用 map
}
</script>

<template>
  <MapComponent
    :mapOptions="mapOptions"
    @style-load="mapOnStyleLoad"
  />
</template>
```




---

### 使用 Vite 打包

**※注意：** 需使用 npm 安裝 `@kwmap/mapplus`。

在 `vite.config.js` 中引入 `viteMapPlusPlugin()`。

```js
import { defineConfig } from 'vite';
import viteMapPlusPlugin from '@kwmap/mapplus/libs/vite';

export default defineConfig({
  plugins: [
    viteMapPlusPlugin(),
  ],
});
```