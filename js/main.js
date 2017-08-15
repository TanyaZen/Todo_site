var newListElement = '<li><a onclick="return remove_item(this)" href="" id="close_box%item_id%">x</a><input type="checkbox" name="task_name" class="strikethrough" value="1"><span id="task_name">%data%</span></li>';


var nextId=1;

function add_item() {
	var showText = document.getElementById("custom_textbox");
	var newListElement_edit = newListElement.replace("%data%", showText.value).replace('%item_id%', nextId);
	nextId+=1;
	$("#list").append(newListElement_edit);
	document.getElementById('custom_textbox').value='';

}

function remove_item(close_a) {
	
	$(close_a).parent('li').remove();
	return false;
}