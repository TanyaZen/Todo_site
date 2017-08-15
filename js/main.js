var newListElement = '<li><a href="" id="close_box">x</a><input type="checkbox" name="task_name" class="strikethrough" value="1"><span id="task_name">%data%</span></li>';

function add_item() {
	var showText = document.getElementById("custom_textbox");
	alert(showText.value);
	document.getElementById('custom_textbox').value='';

}