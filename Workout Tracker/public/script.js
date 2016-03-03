document.addEventListener("DOMContentLoaded", function() {
	selectAllRows();
	saveChanges();
});


function saveChanges() {
	var addNew = document.getElementById('saveChanges');
	addNew.addEventListener("click", function(event){
		event.stopPropagation();
		
		// get data from form and add to URL
		var formPosition = document.getElementById("name_edit");
		var newName = formPosition.value;
	
		if (newName == "") {
			alert("Name cannot be blank.  Row has not been added.");
			return;
		}
		formPosition = document.getElementById("reps_edit");
		var newReps = formPosition.value;
	
		formPosition = document.getElementById("weight_edit");
		var newWeight = formPosition.value;

		formPosition = document.getElementById("date_edit");
		var newDate = formPosition.value;
	
		formPosition = document.getElementById("lbs_edit");
		var newLbs = formPosition.value;
		
		insertRow(newName, newReps, newWeight, newDate, newLbs);
		
	});

}

function editRow(rowID) {
	
	var request = new XMLHttpRequest();
	request.open('GET','http://54.149.130.65:3000/select?id=' + rowID,true);
	request.addEventListener('load',function() {
	
		if(request.status >= 200 && request.status < 400) {
			var response = JSON.parse(request.responseText);
		
			var formPosition = document.getElementById("name_edit");
			formPosition.value = response[0].name;
		
			formPosition = document.getElementById("reps_edit");
			formPosition.value = response[0].reps;
		
			formPosition = document.getElementById("weight_edit");
			formPosition.value = response[0].weight;
		
			formPosition = document.getElementById("date_edit");
			formPosition.value = response[0].date;

			formPosition = document.getElementById("lbs_edit");
			formPosition.value = response[0].lbs;
			
			deleteRow(rowID);
		}
	
		else {
			alert("Sorry, the request failed! " + request.StatusText);
		}
	
	}); 
	request.send();
	event.stopPropagation();
}

function selectAllRows() {
	var request = new XMLHttpRequest();
	request.open('GET','http://54.149.130.65:3000/select',true);
	request.addEventListener('load',function() {
	
		if(request.status >= 200 && request.status < 400) {
			var response = JSON.parse(request.responseText);
			var printData = document.getElementById("displayData");
		
			for (var i = 0; i < response.length; i++) {
			
				var newRow = document.createElement("tr");
				newRow.id = ('row' + response[i].id);
				printData.appendChild(newRow);
			

				var newCell = document.createElement("td");
				var newCellText = document.createTextNode(response[i].name);
				newCell.appendChild(newCellText);
				newRow.appendChild(newCell);
				
				newCellText = document.createTextNode(response[i].reps);
				newCell = document.createElement("td");
				newCell.appendChild(newCellText);
				newRow.appendChild(newCell);
				
				newCell = document.createElement("td");
				newCellText = document.createTextNode(response[i].weight);
				newCell.appendChild(newCellText);
				newRow.appendChild(newCell);
				
				newCell = document.createElement("td");
				newCellText = document.createTextNode(response[i].date);
				newCell.appendChild(newCellText);
				newRow.appendChild(newCell);
				
				newCell = document.createElement("td");
				newCellText = document.createTextNode(response[i].lbs);
				newCell.appendChild(newCellText);
				newRow.appendChild(newCell);

				newCell = document.createElement("td");
				newRow.appendChild(newCell);
				var editClickHandler = function(arg) {
					return function() {  
						editRow(arg);
						};
				}
				
				var editButton=document.createElement('button');
				editButton.onclick = editClickHandler(response[i].id);
				editButton.innerHTML="Edit";

				newCell.appendChild(editButton);
				var deleteClickHandler = function(arg) {
					return function() {  
						deleteRow(arg);
						};
				}
				
				var deleteButton=document.createElement('button');
				deleteButton.onclick = deleteClickHandler(response[i].id);
				deleteButton.innerHTML="Delete";

				newCell.appendChild(deleteButton);
				
			} 
		}		
		
		else {
			alert("Sorry, the request failed! " + request.StatusText);
		}
	}); 
	request.send();
	event.stopPropagation();
}

function insertRow(newName, newReps, newWeight, newDate, newLbs) {
	var request = new XMLHttpRequest();
	request.open('GET','http://54.149.130.65:3000/insert?name=' + newName + '&reps=' + newReps + '&weight=' + newWeight + '&date=' + newDate + '&lbs=' + newLbs,true);
	
	request.addEventListener('load',function() {

		if(request.status >= 200 && request.status < 400) {
			var dataTable = document.getElementById("displayData");
			var rowAdd = document.createElement("tr");
			
			var response = JSON.parse(request.responseText);
			rowAdd.id = ('row' + response.id);
			displayData.appendChild(rowAdd);
			
			var cellAdd = document.createElement("td");
			cellAdd.textContent = newName;
			rowAdd.appendChild(cellAdd);
			
			cellAdd = document.createElement("td");
			cellAdd.textContent = newReps;
			rowAdd.appendChild(cellAdd);
			
			cellAdd = document.createElement("td");
			cellAdd.textContent = newWeight;
			rowAdd.appendChild(cellAdd);
			
			cellAdd = document.createElement("td");
			cellAdd.textContent = newDate;
			rowAdd.appendChild(cellAdd);
			
			cellAdd = document.createElement("td");
			cellAdd.textContent = newLbs;
			rowAdd.appendChild(cellAdd);
			
			cellAdd = document.createElement("td");
			rowAdd.appendChild(cellAdd);
			var editClickHandler = function(arg) {
				return function() {  
					editRow(arg);
					};
			}
				
			var editButton=document.createElement('button');
			editButton.onclick = editClickHandler(response.id);
			editButton.innerHTML="Edit";
			cellAdd.appendChild(editButton);

			var deleteClickHandler = function(arg) {
				return function() {  
					deleteRow(arg);
				};
			}
				
			var deleteButton=document.createElement('button');
			deleteButton.onclick = deleteClickHandler(response.id);
			deleteButton.innerHTML="Delete";
			cellAdd.appendChild(deleteButton);
		}
	
		// failed
		else {
			alert("Sorry, the request failed! " + request.StatusText);
		}
	
	});
	request.send();
}

function deleteRow(idNum) {
	var request = new XMLHttpRequest();
	request.open('GET','http://54.149.130.65:3000/delete?id=' + idNum,true);
	
	request.addEventListener('load',function() {

		if(request.status >= 200 && request.status < 400) {
			var nodeRemove = document.getElementById('row' + idNum);
			displayData.removeChild(nodeRemove);
		}
		else {
			alert("Sorry, the request failed! " + request.StatusText);
		}
	
	}); 
	request.send();
}

function resetTable() {
	var request = new XMLHttpRequest();
	request.open('GET','http://54.149.130.65:3000/reset-table',true);
	
	request.addEventListener('load',function() {
	
		if(request.status >= 200 && request.status < 400) {
			document.location.reload(true);
		}

		else {
			alert("Sorry, the request failed! " + request.StatusText);
		}
	
	}); 
	request.send();
}  