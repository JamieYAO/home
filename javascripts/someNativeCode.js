// 代替
// 创建全局的 '$' 变量
window.$ = function(selector) {
	return document.querySelector(selector);
};

(function() {
	// 通过id查找item1，将它的背景颜色修改为浅红
	var item = $("#salmon").style.backgroundColor="salmon";
	console.log(item);
}());

// jQuery方式
$("#picture").attr("src", "http://placekitten.com/200/200");

//使用将querySelector映射为$的原生js方式
$("#picture").src = "http://placekitten.com/200/200";


  window.$$ = function(selector) {
    var items = {},
    results = [],
    length = 0,
    i = 0;

    // 注意，IE8不支持这种做法
    results = Array.prototype.slice.call(document.querySelectorAll(selector));

    length = results.length;

    // add the results to the items object
    for ( ; i < length; ) {
      items[i] = results[i];
      i++;
    }

    // 添加一些额外的属性，让它更像一个Array
    items.length = length;
    items.splice = [].splice();

    // 添加 'each' 方法
    items.each = function(callback) {
      var i = 0;
      for ( ; i < length; ) {
        callback.call(items[i]);
        i++;
      }
    }

    return items;
  };

  (function() {

    // 查找green项，修改字体大小
    $("#green").style.fontSize = "2em";

    // 通过id查找，修改背景色
    $$("li").each(function() {
      this.style.backgroundColor = this.id;
    });
  }());


window.$ = function(selector) {
    return document.querySelector(selector);
  };

  //----增加CSS类------

  /* jQuery */
  $(".main-content").addClass("someClass");

  /* 等效内置方法 */
  $(".main-content").classList.add("someClass");

  //----删除一个CSS类-----

  /* jQuery */
  $(".main-content").removeClass("someClass");

  /* 等效内置方法 */
  $(".main-content").classList.remove("someClass");

  //----判断是否存在一个CSS类---

  /* jQuery */
  if($(".main-content").hasClass("someClass"))

  /* 等效内置方法 */
  if($(".main-content").classList.contains("someClass"))
