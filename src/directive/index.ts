/*
* 管理所有指令
*/
import type { App } from 'vue'
//批量导入指令
const directives = import.meta.globEager('./*.ts')
export default function Directive(app: App) {
  for (const key in directives) {
    if (Object.prototype.hasOwnProperty.call(directives, key)) {
      let module = directives[key]
      module.default(app)
    }
  }
}