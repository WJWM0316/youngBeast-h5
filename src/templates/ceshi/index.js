import "./index.css";

let render = require('./index.art');
let ceshi  =  'nihao'
let data = {
    title: 'My Page121212',
    data1: {
      title: '测试看看',
      className: 'ceshi',
      list: [
        {
          name: '测试00',
          className: 'ceshi',
          clickFun: `function () {
            console.log(1111111111111)
          }`,
          test: 111
        },
        {
          name: '测试11',
          className: 'cesh2',
          clickFun: `function () {
            console.log(22222222222222)
          }`,
          test: 222
        }
      ]
    },
    data2: {
      title: '测试看看',
      content: '测试看看测试看看测试看看测试看看',
      cancelTxt: '好的',
      cancelClassName: 'c1',
      cancelFun: `function () {
        console.log('取消111')
      }`,
      comfirmTxt: '',
      comfirmClassName: 'c2',
      comfirmFun: `function () {
        console.log('确认222')
      }`
    },
    data3: {
      type: 2
    },
    data4: {
      type: 'loading',
      content: '测试看看测试看看测试看看测试看看测试看看测试看看测试看看测试看看测试看看测试看看测试看看测试看看测试看看测试看看测试看看测试看看测试看看测试看看测试看看'
    }
};

let html = render(data);

if (typeof document === 'object') {
  document.body.innerHTML = html;
}


export default render;