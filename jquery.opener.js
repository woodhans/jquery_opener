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
				base.setup()
			},
			setup:function(){
				var base=this;
				var _width=typeof(base.$opt.width)=="string"?base.$opt.width:base.$opt.width+"px",
					_height=typeof(base.$opt.height)=="string"?base.$opt.height:base.$opt.height+"px",
					_radius=base.$opt.radius>0?"radius:"+base.$opt.radius+"px; -webkit-radius:"+base.$opt.radius+"px;-moz-radius:"+base.$opt.radius+"px;":"",
					_overfl=typeof(base.$opt.overflow)=="string"?"overflow:"+base.$opt.overflow+";":getOverflow(base.$opt.overflow);
					_bgcolor=typeof(base.$opt.bgcolor)=="string"?base.$opt.bgcolor:Hex2Color(base.$opt.bgcolor);
				
				titleHtml=base.getTitle();
				imgHtml=base.getImg();
				contentHtml=base.getContent();
				
				var html='<div class="hw_opener" style="width:'+_width+"; height:"+_height+"; background-color:"+_bgcolor+";"+_radius+_overfl+"z-index:"+base.$opt.zIndex+';" id="'+base.$opt.id+'">'+titleHtml+imgHtml+contentHtml+"</div><div class='hw_mask'></div>";
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
				if(!base.$opt.success && typeof (base.$opt.success)=="function"){
					setTimeout(base.$opt.success,100);
				}
				$('.hw_mask').on('click',function(){
					base.remove();
				})
			},
			getTitle:function(){
				var base=this;
				return base.$opt.title!=""?"<div class='hw_title'><h3>"+base.$opt.title+"</h3></div>":"";
				
			},
			getContent:function(){
				var base=this;
				return base.$opt.content!=""?"<div class='hw_content'><p>"+base.$opt.content+"</p></div>":""
			},
			getImg:function(){
				var base=this;return base.$opt.img!=""?"<div class='hw_imgs'>"+getImgs(base.$opt.img)+"</div>":""
			},
			
			remove:function(){
				var base=this;
				$('.hw_mask').remove();
				$('#'+base.$opt.id).remove();
			}
		}
	};
	$.fn.opener=function(options){
		options=$.extend({},$.fn.opener.options,this.data(),options);
		if(options.id==""){options.id=randomString(4,8)}
		
		if(typeof (options.img) =="string" && options.img.indexOf("[")>-1&&options.img.indexOf("]")>1){options.img=eval("("+options.img+")");}
		if(typeof (options.overflow) =="string" && options.overflow.indexOf("{")>-1&&options.overflow.indexOf("}")>1){options.overflow=eval("("+options.overflow+")");}
		
		var op=new Opener();
		op.init(options,this)
	};
	$.fn.opener.options={
		width:"auto",
		height:"auto",
		align:"CENTER",
		img:"",
		content:"",
		title:"",
		overflow:"scroll",
		radius:0,
		zIndex:9999,
		id:"",
		bgcolor:0xffffff,
		success:null,
	};
	function getImgs(imgs){
		var res="";
		if(typeof imgs=="string"){
			res="<img src='"+imgs+"' />"
		}else{
			for(i=0;i<imgs.length;i++){
				res+="<img src='"+imgs[i]+"' />"}
			}
		return res
	}
	function getOverflow(o){
		var res="";
		if(!o.x){
			res+="overflow-x:"+o.x+";"
		}
		if(!o.y){
			res+="overflow-y:"+o.y+";"
		}
		return res
	}
	function randomString(minlen,maxlen){
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
	function Hex2Color(hex){
		return "#"+hex.toString(16)
	}
}(jQuery,window,document));