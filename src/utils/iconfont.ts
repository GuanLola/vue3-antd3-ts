import { loadCss } from "./common"

const cssUrls: Array<string> = [
  /*
    font-awesome矢量图标 版本5
    https://fa5.dashgame.com/
  */
  '//cdn.bootcdn.net/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css' // font-awesome 版本4 cdn地址
]

export default function init() {
  if (cssUrls.length > 0) {
    cssUrls.map(v => {
      loadCss(v)
    })
  }
}