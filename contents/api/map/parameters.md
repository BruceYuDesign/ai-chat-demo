---
title: 參數
description: mapPlus的參數說明
index: 0
---




於[註冊](../getting-started/register)取得專屬的 Key 和 Token 後，並安裝完 mapPlus，即可使用以下程式碼，快速建立地圖。




## 參數說明

`await new mapPlus(container, options)`

地圖為非同步載入，建立地圖時，需使用 `await` 等待地圖載入完成。

**參數：**

- **container** `string|HTMLElement` : 地圖的容器，可填選`id`名稱或是`HTMLElement`。
- **options** `Object` : 

| 名稱 | 描述 |
| :-- | :-- |
| **options.accessKey** `string` | 地圖的 Key，聯絡勤崴國際團隊，取得專屬 Key。 |
| **options.accessToken** `string` | 地圖的 Token，取得專屬 Key 後，於 'Get Key and Token' 頁面取得專屬的 Token。 |
| **options.style** `string` | 地圖的樣式，接受`.etxt`格式資料。 |
| **options.center** `number[]` | 地圖的初始的中心點，格式為`[經度, 緯度]`。 |
| **options.trackResize** `boolean`<br>預設: `true` | 若為`true`，地圖會在瀏覽器視窗變更大小時自動調整大小。 |
| **options.zoom** `number`<br>預設: `16` | 地圖的初始縮放級別`(0-24)`，預設為`16`。 |
| **options.minZoom** `number`<br>預設: `7` | 地圖的最小縮放級別`(0-24)`，預設為`7`。 |
| **options.maxZoom** `number`<br>預設: `16.99` | 地圖的最大縮放級別`(0-24)`，預設為`16.99`。 |
| **options.scrollZoom** `boolean`<br>預設: `true` | 若為`true`，將啟用「滾動縮放」互動。 |
| **options.boxZoom** `boolean`<br>預設: `true` | 若為`true`，將啟用「方框縮放」互動。 |
| **options.doubleClickZoom** `boolean`<br>預設: `true` | 若為`true`，將啟用「雙擊縮放」互動。 |
| **options.touchZoomRotate** `boolean`<br>預設: `true` | 若為`true`，將啟用「捏取以旋轉和縮放」互動。 |
| **options.pitch** `number`<br>預設: `0` | 地圖的初始傾斜角`(0-85)`，預設為`0`。 |
| **options.minPitch** `number`<br>預設: `0` | 地圖的最小傾斜角`(0-85)`，預設為`0`。 |
| **options.maxPitch** `number`<br>預設: `60` | 地圖的最大傾斜角`(0-85)`，預設為`60`。 |
| **options.pitchWithRotate** `boolean`<br>預設: `true` | 若為`false`，使用者將無法透過「拖曳以旋轉」互動來控制地圖的傾斜角。 |
| **options.touchPitch** `boolean`<br>預設: `true` | 若為`true`，將啟用「拖曳以傾斜」互動。 |
| **options.bearing** `number`<br>預設: `0` | 地圖的初始旋轉角，以度數計，預設為`0`。 |
| **options.bearingSnap** `number`<br>預設: `7` | 定地圖的方向(方位)在多少度內會貼齊北方。例如，若`bearingSnap`為`7`，當使用者將地圖旋轉在距離北方`7`度以內，地圖會自動貼齊正北方向。 |
| **options.dragRotate** `boolean`<br>預設: `true` | 若為`true`，將啟用「拖曳以旋轉」互動。 |
| **options.dragPan** `boolean`<br>預設: `true` | 若為`true`，將啟用「拖曳以平移」互動。 |
| **options.keyboard** `boolean`<br>預設: `true` | 若為`true`，將啟用鍵盤快捷鍵。 |
| **options.interactive** `boolean`<br>預設: `true` | 若為`false`，地圖將不會附加滑鼠、觸控或鍵盤監聽器，因此不會對互動作出回應。 |
| **options.bounds** `Array` `null` `undefined`<br>預設: `undefined` | 地圖的初始範圍。如果指定了`bounds`，它將覆蓋建構選項中的`center`和`zoom`。 |
| **options.maxBounds** `Array` `null` `undefined`<br>預設: `undefined` | 若設定，地圖將受限於指定的範圍內。 |




## 使用範例

基本使用：

```javascript
const map = await new mapPlus(document.getElementById('map'), {
    accessKey: __KEY__,
    accessToken: __TOKEN__,
    style: __STYLE__,
});
```

進階使用：

```javascript
const map = await new mapPlus(document.getElementById('map'), {
    accessKey: __KEY__,
    accessToken: __TOKEN__,
    style: __STYLE__,
    center: [120.5, 24.0],
    trackResize: true,
    zoom: 16,
    minZoom: 7,
    maxZoom: 16.99,
    scrollZoom: true,
    boxZoom: true,
    doubleClickZoom: true,
    touchZoomRotate: true,
    pitch: 0,
    minPitch: 0,
    maxPitch: 60,
    pitchWithRotate: true,
    touchPitch: true,
    bearing: 0,
    bearingSnap: 7,
    dragRotate: true,
    dragPan: true,
    keyboard: true,
    interactive: true,
    maxBounds: [[120.0, 23.5], [121.0, 24.5]],
    // bounds: [[120.5, 24.0], [121.0, 24.5]], 若有設定 bounds，center 和 zoom 將被覆蓋
});
```