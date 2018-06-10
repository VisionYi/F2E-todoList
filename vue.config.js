const fs = require('fs');

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        // 自動載入常用的檔案，例: 全局變數、常用函數
        data: fs.readFileSync('src/assets/scss/_variables.scss', 'utf-8'),
      },
    },
  },
};
