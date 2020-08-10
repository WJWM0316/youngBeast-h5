
import weui from 'weui';
console.log(weui)
class  Wechatui {
  async actionSheet (option) {
    
    console.log(weui)
    weui.actionSheet(option);
  }
}
export default new Wechatui()