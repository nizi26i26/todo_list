$(loaded);

function loaded() {
  showText();
  // ボタンをクリックしたときに実行するイベントを設定する
  $("#formButton").click(
    // コールバックとしてメソッドを引数にわたす
    function() {
      saveText();
      showText();
    });
	


 $("#deleteButton").click(
	function(){
	localStorage.clear();
 });
}

// 入力された内容をローカルストレージに保存する
function saveText() {
	var Mytext=$("#formText");
	var time=new Date();
	var tmp=Mytext.val();



	tmp=escapeText(tmp);
	if(checkText(tmp)){
		localStorage.setItem(time, tmp);
		Mytext.val("");
	}
}

// ローカルストレージに保存した値を再描画する
function showText() {
	var list=$(".list");
	list.children().remove();
	var key,value,html=[];
	//ローカルストレージのの値を新しい順にリストに追加
	var len=localStorage.length;
	for(var i=len-1;i>=0;i--){
		key=localStorage.key(i);
		value=localStorage.getItem(key);
		//チェックボックスとテキストを追加
		html.push("<div>");
		html.push("<input  type= \"checkbox\" id=\"Checkbox\" />");
		html.push("<label for=\"Checkbox\">"+value+ "</label>");
		html.push("</div>");
	}
	list.append(html.join(''));
}

function escapeText(text){
	return $("<div>").text(text).html();
}


function checkText(text){
	
	if(text.length==0||text.length>10){
		alert("文字数は0～10字にしてください。")
		return false;
	}
	
	var length=localStorage.length;
	for(var i=0;i<length;i++){
		var key=localStorage.key(i);
		var value=localStorage.getItem(key);
		if(text==value){
			alert("同じ内容は避けてください");
			return false;
		}
	}
	
	return true;
}
