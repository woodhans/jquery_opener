/*! author Hans.Wu http://www.hanswu.com
 * project: https://github.com/woodhans/opener
 require jquery 1.6+*/
(function($,window,document){
	var Opener=function(){
		return{
			init:function(options,el){
				var base=this;
				base.$opt=options;
				base.$elem=el;
				base._setup()
			},
			_setup:function(){
				var base=this;
				var _radius="radius:"+base.$opt.radius+"; -webkit-radius:"+base.$opt.radius+";-moz-radius:"+base.$opt.radius+";",
					_overfl=typeof(base.$opt.overflow)=="string"?"overflow:"+base.$opt.overflow+";":_getOverflow(base.$opt.overflow);
					_bgcolor=typeof(base.$opt.bgcolor)=="string"?base.$opt.bgcolor:_Hex2Color(base.$opt.bgcolor);

				titleHtml=base._getTitle();
				imgHtml=base._getImg();
				contentHtml=base._getContent();
				var html='<div class="hw_opener" style="width:'+base.$opt.width+"; height:"+base.$opt.height+"; background-color:"+_bgcolor+";"+_radius+_overfl+"z-index:"+base.$opt.zIndex+';" id="'+base.$opt.id+'">'+titleHtml+imgHtml+contentHtml+"</div><div class='hw_mask'></div>";
				base.$elem.on(base.$opt.action,function(){
					if(!base.$opt.before && typeof (base.$opt.before)=="function") base.$opt.before();
					base._generateHtml(html);
				})

				if(!base.$opt.success && typeof (base.$opt.success)=="function"){
					setTimeout(base.$opt.success,100);
				}

			},
			_getTitle:function(){
				var base=this;
				return base.$opt.title!=""?"<div class='hw_title'><h3>"+base.$opt.title+"</h3></div>":"";

			},
			_getContent:function(){
				var base=this;
				return base.$opt.content!=""?"<div class='hw_content'><p>"+base.$opt.content+"</p></div>":""
			},
			_getImg:function(){
				var base=this;return base.$opt.img!=""?"<div class='hw_imgs'>"+_getImgs(base.$opt.img)+"</div>":""
			},
			_generateHtml:function(html){
				var base=this;
				$("body").append(html);
				$opener=$('.hw_opener');
				half_lft=$opener.width()/2*-1;
				half_top=$opener.height()/2*-1;
				if(base.$opt.align.indexOf('_')>1){
					_a=base.$opt.align.split('_');
					if(_a[0]=="TOP" || _a[1]=="TOP"){
						$opener.css('top',0);
						if(_a[0]=="CENTER" || _a[1]=="CENTER"){
							$opener.css({"left":"50%","margin-left":half_lft});
						}
					}
					if(_a[0]=="BOTTOM" || _a[1]=="BOTTOM"){
						$opener.css('bottom',0);
						if(_a[0]=="CENTER" || _a[1]=="CENTER"){
							$opener.css({"left":"50%","margin-left":half_lft});
						}
					}
					if(_a[0]=="LEFT" || _a[1]=="LEFT"){
						$opener.css('left',0);
						if(_a[0]=="CENTER" || _a[1]=="CENTER"){
							$opener.css({"top":"50%","margin-top":half_top});
						}
					}
					if(_a[0]=="RIGHT" || _a[1]=="RIGHT"){
						$opener.css('right',0);
						if(_a[0]=="CENTER" || _a[1]=="CENTER"){
							$opener.css({"top":"50%","margin-top":half_top});
						}
					}
				}else{
					if(base.$opt.align=="TOP"){
						$opener.css({"left":"50%","margin-left":half_lft,"top":0});
					}
					if(base.$opt.align=="BOTTOM"){
						$opener.css({"left":"50%","margin-left":half_lft,"bottom":0});
					}
					if(base.$opt.align=="LEFT"){
						$opener.css({"top":"50%","margin-top":half_top,"left":0});
					}
					if(base.$opt.align=="RIGHT"){
						$opener.css({"top":"50%","margin-top":half_top,"right":0});
					}
					if(base.$opt.align=="CENTER"){
						$opener.css({"left":"50%","margin-left":half_lft,"top":"50%","margin-top":half_top});
					}
				}
				$(base.$opt.closeDom).on('click',function(){
					base.remove();
				})
			},
			remove:function(){
				var base=this;
				$('.hw_mask').remove();
				$('#'+base.$opt.id).remove();
			}
		}
	};
	$.fn.opener=function(options){
		if(typeof (this.data().overflow) =="string" && /^\{+[x|y]:[scroll|hidden|auto|visible|inherit|overlay|initial]+(,[x|y]:[scroll|hidden|auto|visible|inherit|overlay|initial]+)?\}$/.test(this.data().overflow)) this.data().overflow=eval("("+this.data().overflow+")");
		options=$.extend({},$.fn.opener.options,this.data(),options);
		if(options.id=="") options.id=_randomString(4,8);
		options.action=options.action.toLowerCase();
		if(options.action=="hover") options.action="mouseover";
		if(typeof (options.img) =="string" && options.img.indexOf(",")>1) options.img=options.img.split(",");

		options.align=options.align.toUpperCase();
		if(typeof(options.radius)=="number" &&options.radius>0) options.radius=options.radius+"px";
		if(typeof(options.width)=="number" &&options.width>0) options.width=options.width+"px";
		if(typeof(options.height)=="number" &&options.height>0) options.height=options.height+"px";

		var op=new Opener();
		op.init(options,this)
	};
	$.fn.opener.options={
		width:"auto",
		height:"auto",
		align:"CENTER",
		action:"click",
		img:"",
		content:"",
		title:"",
		overflow:"auto",
		radius:0,
		zIndex:9999,
		id:"",
		animation:!!0,
		async:!!0,
		bgcolor:0xffffff,
		before:null,
		success:null,
		closeDom:'.hw_mask',
		closed:null,
		beforeClose:null
	};

	function _getImgs(imgs){
		var res="";
		if(typeof imgs=="string"){
			res="<img src='"+imgs+"' />"
		}else{
			for(i=0;i<imgs.length;i++){
				res+="<img src='"+imgs[i]+"' />"}
			}
		return res
	}
	function _getOverflow(o){
		var res="";
		if(!o.x){
			res+="overflow-x:"+o.x+";"
		}
		if(!o.y){
			res+="overflow-y:"+o.y+";"
		}
		return res
	}
	function _randomString(minlen,maxlen){
		var _rnd,
		maxlen=maxlen?maxlen:minlen,
		str=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",0,1,2,3,4,5,6,7,8,9],
		_arr=[];
		for(i=0;i<maxlen;i++){
			if(i==0)
				_rnd=Math.floor(Math.random()*26)
			else
				_rnd=Math.floor(Math.random()*str.length)
			if(i>minlen){
				if(Math.round(Math.random()))
					return _arr.join("")
			}
			_arr.push(str[_rnd])
		}
		return _arr.join("")
	}
	function _Hex2Color(hex){
		var color=hex.toString(16);
		if(color.length!=3||color.length!=6) return "#ffffff";
		if(color.length==3) color=color.substr(0,1)+color.substr(0,1)+color.substr(1,1)+color.substr(1,1)+color.substr(2,1)+color.substr(2,1);
		return "#"+color;
	}
}(jQuery,window,document));
