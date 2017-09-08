function taskObj (task_id, task_name, date_time, status) {
				this.task_id = task_id;
            	this.task_name = task_name;
            	this.date_time = date_time;
            	this.status = status;
            }; 

var task_array=[];
AjaxRequest();

//delete task from array function

function delete_task(find_id) {
	for (var i=0; i<task_array.length; i++) {
    	if (task_array[i].task_id === find_id) 
        		task_array.splice(i, 1);
  
    }
    save_list_storage();
};

//save task list in local storage

function save_list_storage () {
	window.localStorage.setItem('task_array', JSON.stringify(task_array));
}

//change marked task status to "Completed"

function task_completed (task_number) {
	for (var i=0; i<task_array.length; i++) {
		if (task_array[i].task_id === $(task_number).siblings("a").attr("id")) {
			task_array[i].status = "Completed";
		}
	}
	save_list_storage();
}


//delete completed checked tasks

function delete_completed_tasks() {
	for (var i=task_array.length-1; i>=0; i--) {
		if (task_array[i].status === "Completed") 
			task_array.splice(i, 1);
	    };
	$('input[name=task_name]:checked').parent().remove();
	save_list_storage();
}



var newListElement = '<li><a onclick="return remove_item(this)" id="task%item_id%" href="" class="close_box" id="close_box%item_id%">x</a><input type="checkbox" name="task_name" class="strikethrough" onchange="task_completed(this)"><span>%data%</span><span class="time_class" id="task_time%item_id%">%current_time%</span></li>';

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
		nextId=task_array.length;
		var newListElement_edit = newListElement.replace("%data%", showText.value).replace(/%item_id%/g, nextId).replace("%current_time%", "Added "+time_getter());
		var new_task = new taskObj('task'+this.nextId, showText.value, time_getter(), "Incomplete");
		task_array.push(new_task); 
		nextId+=1;
		$("#list").append(newListElement_edit);
		$('p').hide();
		$(".paragraph").css('height', '20px');   	
		document.getElementById('custom_textbox').value='';
		setFocusToTextBox();
	}
	save_list_storage(); 
    	
}

//removing item from DOM when clicking x box

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
    });

   unnullArray();
   AjaxRequest();
   load_saved_tasks();

});

function unnullArray () {
   	task_array = JSON.parse(window.localStorage.getItem('task_array'));
   		if (task_array==null) {
   			task_array=[];
   		}

   }
function load_saved_tasks() {
	for (var i=0; i<task_array.length; i++) {
	var newListElement_saved = newListElement.replace("%data%", task_array[i].task_name).replace(/%item_id%/g, task_array[i].task_id).replace("%current_time%", "Added " + task_array[i].date_time);
	$("#list").append(newListElement_saved);
	};
	$('p').hide();
	$(".paragraph").css('height', '20px');   
}

//AJAX request

function AjaxRequest() {
	var url = "http://api.openweathermap.org/data/2.5/weather?zip=94595,us";
	var apiKey = "047abc3174f816049218e3246d595107"; // Replace "APIKEY" with your own API key; otherwise, your HTTP request will not work
    var httpRequest;

    //create and send XHR request

    function makeRequest() {
    	httpRequest = new XMLHttpRequest();
    	httpRequest.onreadystatechange = responseMethod;
    	httpRequest.open('GET', url + '&appid=' + apiKey);
    	httpRequest.send();
    };

    //handle XHR Response

    function responseMethod() {
    	if (httpRequest.readyState ===4) {
    		if (httpRequest.status ===200) {
    			updateUISuccess(httpRequest.responseText);

    		} else {
    			updateUIError();	
    		}
    		console.log(httpRequest.responseText);
    	}
    };

    //handle XHR success

    function updateUISuccess (responseText) {
    	var response = JSON.parse(responseText);
    	var condition = response.weather[0].main;
    	var degC = response.main.temp - 273.15;
    	var degCInt = Math.floor(degC);
    	var degF = degC * 1.8 +32;
    	var degFInt = Math.floor(degF);
    	var weatherBox = $('#weather');
    	weatherBox.InnerHTML = "<p>" + degCInt + "&#176; C / " + degFInt + "&#176; F</p></p>" + condition + "</p>";
    };

    //handle error

    function updateUIError() {
    	var weatherBox = $('#weather');
    	alert("Error");
    };
}; 





