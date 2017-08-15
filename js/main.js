var newListElement = '<li><a href="" id="close_box">x</a><input type="checkbox" name="task_name" class="strikethrough" value="1"><span id="task_name">%data%</span></li>';

function add_item() {
	var showText = document.getElementById("custom_textbox");
	var newListElement_edit = newListElement.replace("%data%", showText.value);
	alert(showText.value);
	$("#list").append(newListElement_edit);
	document.getElementById('custom_textbox').value='';

}