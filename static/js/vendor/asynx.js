


var asynx = {

	init : function(){
		$(document).scroll(this.scroll);
		$(window).resize(this.resize);
		this.scroll();
		this.resize();
		setTimeout(function(){
			asynx.scroll();
			asynx.resize();
		},300);
	},

	update : function(){
		asynx.scroll();
		asynx.resize();

	},

	scroll : function(){

		$("*[asynx]").not(".loaded").each(function(){

			if (asynx.isElementInViewport($(this))){

				$(this).addClass("loaded");

				var img = new Image();
				img.$this = $(this);
				img.onload = function(){

					this.$this.css({
						backgroundImage:"url(" +  this.$this.attr("asynx") + ")"
					});
					TweenMax.to(this.$this,1.5,{opacity:1, ease:Expo.easeOut})
				}
				img.src = $(this).attr("asynx");


			}
		});

		$("*[asynx-image]").not(".loaded").each(function(){

			if (asynx.isElementInViewport($(this))){

				$(this).addClass("loaded");

				var img = new Image();
				img.$this = $(this);
				img.onload = function(){

					TweenMax.set(this.$this,{opacity:0})
					this.$this.attr("src", this.$this.attr("asynx-image"));
					TweenMax.to(this.$this,1.5,{opacity:1, ease:Expo.easeOut})
				}
				img.src = $(this).attr("asynx-image");


			}
		});


	},

	resize : function(){
		/*$("picture[asynx]").each(function(){
			$(this).css({
				height : $(this).width()*Number($(this).attr("data-height"))/Number($(this).attr("data-width"))
			});
		});*/

	},

	isElementInViewport : function($el) {
		  var el = $el[0];
		  var top = el.offsetTop;
		  var left = el.offsetLeft;
		  var width = el.offsetWidth;
		  var height = el.offsetHeight;

		  while(el.offsetParent) {
		    el = el.offsetParent;
		    top += el.offsetTop;
		    left += el.offsetLeft;
		  }

		  return (
		    top < (window.pageYOffset + window.innerHeight) &&
		    left < (window.pageXOffset + window.innerWidth) &&
		    (top + height) > window.pageYOffset &&
		    (left + width) > window.pageXOffset
		  );
		}
}

asynx.init();
