module.exports = {
  baseUrl: './',
  css: {
    loaderOptions: {
      sass: {
        // 自動載入常用的檔案，例: 全局變數、常用函數
        data: '@import "@/assets/scss/_variables.scss";',
      },
    },
  },
};
