jQuery弹窗插件
==============
Autor: [Hans.Wu](http://www.hanswu.com)
--------------
[DEMO](http://www.hanswu.com/project/jquery_opener)
Usage
--------------
* 引入文件jquery_opener.min.js&jquery_opener.css
* body加入代码  

```javascript
//haml
.opener openIt
//javascript
$(document).ready(function(){
  $('.opener').opener();
})
```

[预览](http://codepen.io/hanswu/pen/xEzzow)

* 参数
```javascript
options={
    width:"auto",            //宽度
    height:"auto",           //高度
    align:"CENTER",          //对齐
    action:"click",          //触发事件
    img:"",                  //图片
    content:"",              //内容
    title:"",                //标题
    overflow:"auto",         //溢出样式
    border:'1px solid #333', //边框样式
    radius:0,                //圆角
    zIndex:9999,             //z轴
    id:"",                   //id
    animation:!!0,           //是否以动画形式弹出
    async:!!0,               //是否异步加载内容
    bgcolor:0xffffff,        //背景颜色
    before:null,             //弹出前调用函数
    success:null,            //弹出成功调用函数
    closeDom:'.hw_mask',     //关闭弹窗的dom
    closed:null,             //关闭后调用函数
    beforeClose:null         //关闭前调用函数
};
```
