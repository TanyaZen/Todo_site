function taskObj (task_id, task_name, date_time) {
				this.task_id = task_id;
            	this.task_name = task_name;
            	this.date_time = date_time;
            }; 

var task_array = [];

var newListElement = '<li><a onclick="return remove_item(this)" href="" class="close_box" id="close_box%item_id%">x</a><input type="checkbox" name="task_name" class="strikethrough"><span id="task_name%item_id%">%data%</span><span id="task_time%item_id%">%current_time%</span></li>';


function setFocusToTextBox(){
    document.getElementById("custom_textbox").focus();
};

var nextId=1;
function add_item() {
	var showText = document.getElementById("custom_textbox");
	var newListElement_edit = newListElement.replace("%data%", showText.value).replace(/%item_id%/g, nextId).replace("%current_time%", time_getter());
	var new_task = new taskObj('task'+this.nextId, showText.value, time_getter());
	task_array.push(new_task); 
	nextId+=1;
	$("#list").append(newListElement_edit);
	$('p').hide();
	$(".paragraph").css('height', '20px');   	
	document.getElementById('custom_textbox').value='';
	setFocusToTextBox();
    	
}

function remove_item(close_a) {
	
	$(close_a).parent('li').remove();
	return false;
}

function time_getter() {
	var now = new Date();
	var n =  new Date();
	var y = n.getFullYear();
	var m = n.getMonth() + 1;
	var d = n.getDate();
	var e = n.getHours();
	var f = n.getMinutes();
	if (e < 10) {e = "0"+e;}
	if (f < 10) {f = "0"+f;}

	var vremya = m + "/" + d + "/" + y + " " + e + ":" + f;
	return vremya;
}

$( document ).ready(function() {
	$("#custom_textbox").keyup(function(event){
    	if(event.keyCode == 13){
        	$("#but").click();
    	}
    })
});

