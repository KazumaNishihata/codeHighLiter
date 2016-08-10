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
				var after;
				switch(this.lang){
					case "HTML" :
						after = this.htmlHightLight(this.target);
						break;
					case "CSS" :
						after = this.cssHightLight(this.target);
						break;
					case "JavaScript" :
						after = this.jsHightLight(this.target);
						break;
					case "command" :
						after = this.commandHightLight(this.target);
						break;
				}
				return after;
			},
			htmlHightLight : function(before){
				var after = before.replace(/(&lt;style[\s\S]*?&gt;)[\s\S]+?(&lt;\/style&gt;)/g,"$1css$2");
				after = after.replace(/&lt;[\s\S]+?&gt;/g,this.htmlHightLightReplace);
				return after;
			},
			htmlHightLightReplace : function(str){
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
			cssHightLight : function(before){
				//セレクタ
				var after = before.replace(/(.+?)({[\s\S]+?})/g,"<span class='codeHighLiterElement'>$1</span>$2");
				//プロパティ: バリュー
				after = after.replace(/(.+?):(.+)/g,function($0,$1,$2){
						return "<span class='codeHighLiterAttribulte'>"+$1+"</span>:<span class='codeHighLiterString'>"+$2+"</span>";
				});
				//コメント
				after = after.replace(/(\/\*[\s\S]+?\*\/)/g,"<b class='codeHighLiterComment'>$1</b>");

			},
			jsHightLight : function(before){
				var keywords = [
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
						"super"
					],
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
				var after = before.replace(/(["'].+?["'])/g,"<span class='codeHighLiterString'>$1</span>");
				//コメント
				after = after.replace(/(\/\*[\s\S]+?\*\/)/g,"<span class='codeHighLiterComment'>$1</span>");
				after = after.replace(/(\/\/.+)/g,"<span class='codeHighLiterComment'>$1</span>");
				//キーワード
				for(i=0 ; i<keywords.length ; i++){
					after = after.replace(new RegExp("\\b"+keywords[i]+"\\b","g"),"<span class='codeHighLiterKeyword'>$&</span>");
				}
				//記号
				for(i=0 ; i<symbol.length ; i++){
					after = after.replace(symbol[i],"<span class='codeHighLiterSymbol'>$&</span>");
				}


				return after;
			},
			commandHightLight: function(before){
				var after = before.replace(/(#.+)/g,"<span class='codeHighLiterComment'>$1</span>");
				return after;
			},
			putHightLight : function(str){
				$this.html(str);
			}
		}).init();

	});
}
$("[data-code]").codeHighLiter();
