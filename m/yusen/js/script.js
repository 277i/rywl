/**
 * @author: xiangliang.zeng
 * @description:
 * @Date: 2017/1/4 11:38
 * @Last Modified by:   xiangliang.zeng
 */
(function () {
  // if (!loader51._isReady) {
  // 	loader51.$on("ready", function () {
  // 		// onDomReady();
  // 		console.log('-ready-');
  // 	})
  // } else {
  // 	onDomReady();
  // }

  // if (!loader51._isLoaded) {
  // 	loader51.$on("loaded", function () {
  // 		onLoaded();
  // 		console.log('-loaded-');
  // 	});
  // } else {
  // 	onLoaded();
  // }
  onLoaded();

  // 类似Jquery的$(function(){});
  // function onDomReady() {
  // 	musicSwitch();
  // 	console.log('DOM is ready');
  // }
  // 当loading页面关闭时执行的函数
  function onLoaded() {
    removeTouchMove();
    console.log("Loaded");
    init();
  }

  function init() {
    // 实例化swiper对象
    var mySwiper = new Swiper(".myswiper1", {
      //Slides的滑动方向，可设置水平(horizontal)或垂直(vertical)
      direction: "vertical",
      height: window.innerHeight,
      slidesPerView: 1, // 每次只显示一个slide
      resistanceRatio: 0.3,
      //将hashnav设置为true，并在每个slide处增加data-hash属性，可在当前页刷新。
      hashnav: true,
      on: {
        init: function () {
          swiperAnimateCache(this); //隐藏动画元素
          swiperAnimate(this); //初始化完成开始动画
          $(".swiper-slide").scrollTop(0);
          $(".swiper-slide .msco_content").scrollTop(0);
        },
        slideChangeTransitionEnd: function () {
          swiperAnimate(this); //每个slide切换结束时也运行当前slide动画
          $(".swiper-slide").scrollTop(0);
          $(".swiper-slide .msco_content").scrollTop(0);
          // console.log(this.realIndex);
          // if (this.realIndex==0) {
          // 	$('.menuss').hide()
          // }else{
          // 	// $('.nav p').eq(this.realIndex).addClass('on').siblings().removeClass('on')
          // 	$('.menuss').show()
          // }
          let listIndex = this.realIndex;
          if (this.realIndex >= 4) {
            listIndex = this.realIndex + 1;
          }
          $(".mulist p").removeClass("on");
          $(`.mulist p:eq(${listIndex})`).addClass("on");
          // $(`.mulist p:eq(${index})`).addClass('on')
        },
      },
    });

    // 引导页的enter键点击划入第二页
    $("#s1 .enter1").on("click", function (event) {
      mySwiper.slideTo(1, 1000, true);
    });
    $(".menuss1").on("click", function (event) {
      mySwiper.slideTo(0, 0, true);
      $(".mulist").hide();
    });
    $(".mulist li").each(function (index) {
      $(this).click(function () {
        // switch (index) {
        // 	case 0:
        // 		mySwiper.slideTo(1, 1000, true);
        // 		break;
        // 	case 1:
        // 		mySwiper.slideTo(2, 1000, true);
        // 		break;
        // 	case 2:
        // 		mySwiper.slideTo(3, 1000, true);
        // 		break;
        // 	case 3:
        // 		mySwiper.slideTo(4, 1000, true);
        // 		break;
        // 	case 4:
        // 		mySwiper.slideTo(5, 1000, true);
        // 		break;
        // 	default:
        // 		mySwiper.slideTo(1, 1000, true);
        // 		break;
        // }
        //空宣视频
        if (index === 4) {
          window.open("https://video.51job.com/watch/6340571", "_blank");
          return;
        }
        let targetSwiperIndex = index;
        if (index > 4) {
          targetSwiperIndex = index - 1;
        }
        mySwiper.slideTo(targetSwiperIndex, 1000, true);
        $(".dw").hide();
        $(".btnshow").show();
        $(".mulist p").removeClass("on");
        $(`.mulist p:eq(${index})`).addClass("on");
      });
    });
    // 需要局部滚动的页面，阻止事件冒泡 -- 阻止swiper滑动
    $(".info").on("touchmove", function () {
      event.stopPropagation();
    });

    /***************************************** 地图 ***************************************************/
    //添加公司地址位置，修改公司地址方法如下：
    // http://api.map.baidu.com/lbsapi/creatmap/index.html，该地址是百度地图生成器，
    //打开网址后，将公司地址输入，获取到横纵坐标，请“coord=25.015643,102.753885”替换为获取到的横纵坐标，title替换为公司名称
    // $('.map').click(function() {
    //     location.href = 'http://api.map.baidu.com/marker?location=31.184249,121.416137&title=延锋伟世通电子科技（上海）有限公司&content=徐汇区钦州北路1001号&output=html';
    // });

    $(".job p").click(function () {
      var dsn = $(this).next("div").css("display");
      if (dsn == "none") {
        $(this).next("div").slideDown();
      } else {
        $(this).next("div").slideUp();
      }
    });
  }

  // 移除默认事件及阻止冒泡
  function removeDefaultEvt(e) {
    e.preventDefault();
  }
  // 移除默认document的touchmove，针对苹果手机
  function removeTouchMove() {
    document.body.addEventListener("touchmove", removeDefaultEvt, false);
  }
})();

// $(".items .chn").each(function (index) {
// 	$(this).click(function () {
// 		// console.log("点击了第 " + index + " 个a元素");
// 		$(".items .chn").removeClass('on')
// 		// $(`.items .chn:eq(${index})`).addClass("on");
// 		$(this).addClass("on");
// 	});
// });

var as = document.querySelectorAll(".items .chn");
var conts = document.querySelectorAll(".contents");

// let int = 0
// function shows() {
// 	var shows = document.querySelectorAll(".name .show")
// 	var blocks = document.querySelectorAll(".n-item")
// 	shows.forEach((item, index) => {
// 		item.onclick = function () {
// 			int++;
// 			if (int % 2 == 1) {
// 				blocks[index].style.display = 'none'
// 				shows[index].style.transform = 'rotate(180deg)'
// 			} else {
// 				blocks[index].style.display = 'block'
// 				shows[index].style.transform = 'rotate(0deg)'
// 			}

// 		}
// 	})
// }
