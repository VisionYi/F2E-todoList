# The F2E Challenge Week 1 - todoList

- [挑戰說明](https://www.facebook.com/groups/173311386703334/permalink/179453469422459/)
- [線上設計稿](https://bit.ly/2HfaR2M)

## 網頁切版的學習筆記
- 自訂的 checkbox

- 自訂的 file 上傳按鈕

- button 如果是 icon 時，當觸發 hover 功能可以產生淡化的背景提示，這是一個按鈕
  - 可以在元素的 `::before` 上使用 `position: absolute`，就能避免原始元素會改變位置或大小
  - `background-color: currentColor` 可以抓取當前的 `color` 屬性內容值
  - 之後再搭配 `opacity` 就能自動產生不同的淡化背景

- helps classes 可以事先產生多種
  - margin 間距
  - 背景或文字顏色

- **狀態類型的或可搭配 JS 來顯示的 CSS 樣式**，這種類型的需要特別獨立出來，可以加上 prefix 字樣 `js-*`，最後都會改由 JS 來控制，好處是可一統管理顯示與隱藏的狀態變化


## JS 功能的筆記學習
- 狀態管理很重要，可以藉由狀態資訊改變各種 CSS 樣式 & DOM 顯示隱藏

- vuex store 中的 actions 都需要事先加上初始化的方法，以防需要使用 API 後端資料時，資料結構會與前端差很多

- vue directives 的使用方式

- 使用以下方法應用在 vue data 資料時，需要避免 vue 無限循環觀察 (observer) data 的變化，尤其使用在 v-for 更需要如此
  - 陣列函數中自身會變異的方法
    - `Array.prototype.reverse`
    - `Array.prototype.sort`
  - 必須先把 data 淺拷貝成原始的 Array 型態，脫離 vue 的綁定觀察
  - 使用賦值解構拷貝成新的資料 `[...this.items]`，再放入 computed 裡讓 vue 繼續觀察變動
  - 參考: [Vuejs v-for infinite update loop using reverse() or sort()](https://stackoverflow.com/questions/49467217/vuejs-v-for-infinite-update-loop-using-array-prototype-reverse)
