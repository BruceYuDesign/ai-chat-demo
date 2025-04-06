# mapPlus Loader

## 註冊

請前往 <a href="https://kw3dmap.localking.com.tw/kwmap-docs/api/register/key-and-token" target="_blank">Kwmap Docs</a> 註冊帳號，取得 `accessKey` 與 `accessToken`。

## 安裝

```bash
npm install @kwmap/mapplus
```

## 使用方法

***

### 使用原生 JavaScript 開發

```javascript
import mapPlus from '@kwmap/mapplus';

const map = await new mapPlus(document.getElementById('map'), {
  accessKey: 'get_your_key',
  accessToken: 'get_your_token',
  style: 'https://kw3dmap.localking.com.tw/openapi/map/kwmap.etxt',
  center: [121.53559860212545, 25.029308142529132],
});

map.on('style.load', () => {
  // 可以開始調用 map
});
```

***

### 使用 React 開發

#### main.jsx

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

#### components/Map.jsx

建立 `components/Map.jsx`，並引入 `<MapComponent>` 與 `useMap()`，即可開始使用地圖。

```jsx
import { useEffect } from 'react';
import { MapComponent, useMap, mapPlus } from '@kwmap/mapplus/libs/react';

export default function Map() {
  const { map } = useMap();

  useEffect(() => {
    if (map) {
      // 可以開始調用 map
    }
  }, [map]);

  return (
    <MapComponent
      mapOptions={{
        accessKey: 'get_your_key',
        accessToken: 'get_your_token',
        style: 'https://kw3dmap.localking.com.tw/openapi/map/kwmap.etxt',
        center: [121.53559860212545, 25.029308142529132],
      }}
    />
  )
}
```

***

### 使用 Vue 開發

#### components/Map.vue

建立 `components/Map.jsx`，並引入 `<MapComponent>` 與 `useMap()`，即可開始使用地圖。

```vue
<template>
  <MapComponent
    :mapOptions="mapOptions"
    @style-load="mapOnStyleLoad"
  />
</template>

<script setup>
import { MapComponent, useMap, mapPlus } from '@kwmap/mapplus/libs/vue';

const mapOptions = {
  accessKey: import.meta.env.VITE_MAP_KEY,
  accessToken: import.meta.env.VITE_MAP_TOKEN,
  style: 'https://kw3dmap.localking.com.tw/openapi/map/kwmap.etxt',
  center: [121.53559860212545, 25.029308142529132],
}

const mapOnStyleLoad = () => {
  const { map } = useMap();
  // 可以開始調用 map
}
</script>
```

***

### 使用 Vite 作為打包工具

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