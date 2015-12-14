//https://github.com/to-r/codeHighLiter
$.fn.codeHighLiter = function(){
	return this.each(function(){
		var $this = $(this);
		({
			setting : function(){
				this.target = $this.html();
				this.lang = $this.data("code");
			},
			init : function(){
				this.setting();
				this.setHightLight();
			},
			setHightLight : function(){
				console.log(this.lang,"setHightLight");
				switch(this.lang){
					case "HTML" :
						this.htmlHightLight();
						break;
					case "CSS" :
						this.cssHightLight();
						break;
					case "JavaScript" :
						this.jsHightLight();
						break;
				}
			},
			htmlHightLight : function(){
				console.log(this.lang,"htmlHightLight");
				var target = this.target.replace(/&lt;[\s\S]+?&gt;/g,this.htmlHightLightReplace);
				this.putHightLight(target);
			},
			htmlHightLightReplace : function(str){
				console.log(str);
				if(str[4]==="!"){
					//コメント
					return "<span class='codeHighLiterComment'>"+str+"</span>";
				}else{
					//属性
					str = str.replace(/(\s)(.+?)(\=)(["'].+?["'])/g,"$1<span class='codeHighLiterAttribulte'>$2</span>$3<span class='codeHighLiterString'>$4</span>");
					//要素
					str = str.replace(/(^\S+|&gt;)/g,"<span class='codeHighLiterElement'>$1</span>");
					return str;
				}
			},
			cssHightLight : function(){
				var target = this.target;
				//セレクタ
				target = target.replace(/(.+?)({[\s\S]+?})/g,"<span class='codeHighLiterElement'>$1</span>$2");
				//プロパティ: バリュー
				target = target.replace(/(.+?):(.+)/g,function($0,$1,$2){
						return "<span class='codeHighLiterAttribulte'>"+$1+"</span>:<span class='codeHighLiterString'>"+$2+"</span>";
				});
				//コメント
				target = target.replace(/(\/\*[\s\S]+?\*\/)/g,"<b class='codeHighLiterComment'>$1</b>");
				this.putHightLight(target);
			},
			jsHightLight : function(){
				console.log(this.lang,"jsHightLight");
				var target = this.target,
					keywords = [
						"break",
						"case",
						"catch",
						"continue",
						"debugger",
						"default",
						"delete",
						"do",
						"else",
						"finally",
						"for",
						"function",
						"if",
						"in",
						"instanceof",
						"new",
						"return",
						"switch",
						"this",
						"throw",
						"try",
						"typeof",
						"var",
						"void",
						"while",
						"with",
						// "class",
						"enum",
						"export",
						"extends",
						"import",
						"super"],
					symbol = [
						"{",
						"}",
						"(",
						")",
						"[",
						"]",
						"+",
						";",
						"."
					],
					i;


				//文字列
				target = target.replace(/(["'].+?["'])/g,"<span class='codeHighLiterString'>$1</span>");
				//コメント
				target = target.replace(/(\/\*[\s\S]+?\*\/)/g,"<span class='codeHighLiterComment'>$1</span>");
				target = target.replace(/(\/\/.+)/g,"<span class='codeHighLiterComment'>$1</span>");
				//キーワード
				for(i=0 ; i<keywords.length ; i++){
					target = target.replace(new RegExp("\\b"+keywords[i]+"\\b","g"),"<span class='codeHighLiterKeyword'>$&</span>");
				}
				//記号
				for(i=0 ; i<symbol.length ; i++){
					target = target.replace(symbol[i],"<span class='codeHighLiterSymbol'>$&</span>");
				}
				

				this.putHightLight(target);
			},
			putHightLight : function(str){
				$this.html(str);
			}
		}).init();

	});
}
$("[data-code]").codeHighLiter();