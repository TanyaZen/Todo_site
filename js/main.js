function taskObj (task_id, task_name, date_time) {
				this.task_id = task_id;
            	this.task_name = task_name;
            	this.date_time = date_time;
            }; 

var task_array = [];

//delete task function

function delete_task(find_id) {
	for (var i=0; i<task_array.length; i++) {
    	if (task_array[i].task_id === find_id) {
        		task_array.splice(i, 1);
	    }
    }
}

var newListElement = '<li><a onclick="return remove_item(this)" id="task%item_id%" href="" class="close_box" id="close_box%item_id%">x</a><input type="checkbox" name="task_name" class="strikethrough"><span>%data%</span><span class="time_class" id="task_time%item_id%">%current_time%</span></li>';

function setFocusToTextBox(){
    document.getElementById("custom_textbox").focus();
};

//checking if the item already in the list

function contains (value) {
  var doesContain = false

  for (var i = 0, length = task_array.length; i < length; i++) {
    if (task_array[i].task_name === value) {
      doesContain = true
      break
    }
  }

  return doesContain
}

//adding new item to HTML and JS array

var nextId=1;
function add_item() {
	var showText = document.getElementById("custom_textbox");
	if (contains (showText.value)) {
		window.alert("This Task is already in the list");
	} else {

		var newListElement_edit = newListElement.replace("%data%", showText.value).replace(/%item_id%/g, nextId).replace("%current_time%", "Added "+time_getter());
		var new_task = new taskObj('task'+this.nextId, showText.value, time_getter());
		task_array.push(new_task); 
		nextId+=1;
		$("#list").append(newListElement_edit);
		$('p').hide();
		$(".paragraph").css('height', '20px');   	
		document.getElementById('custom_textbox').value='';
		setFocusToTextBox();
	} 
    	
}

//removing item when clicking x box

function remove_item(close_a) {
	if (confirm("Are you sure you want to delete this item?")) {

	delete_task($(close_a).attr("id"));
		

	$(close_a).parent('li').remove();
	
	return false;
	}
}

//function to add time

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

//show modal - list of tasks

function show_full_task_list() {
	
	for (var i = 0, length = task_array.length; i < length; i++) {
		var line_item = '<li class="child">%data%</li>';
		var new_line_item = line_item.replace("%data%", task_array[i].task_name);
		$('#show_full_list').append(new_line_item);
	}
}

//Modal - close window - empty list

function zero_out() {
	$('.parent .child').remove();
}

//add functionality to be able to add item when pressing Enter

$( document ).ready(function() {
	$("#custom_textbox").keyup(function(event){
    	if(event.keyCode == 13){
        	$("#but").click();
    	}
    })
});

