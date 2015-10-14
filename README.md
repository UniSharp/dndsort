# dndsort
Help building sorted list items by jQuery.

## Installation

 * this plugin requires jQuery and jQuery-UI

## Initialization

 * generate list items :

	```javascript
		$('ul#sortable').sortable();

		$('#sortable').dndsort('init', {
		  data : [],               // set your items
		  submit_name : 'sorted',  // set sorted input field name
		  labels : {},             // set labels for new item and buttons
		  attrs : {},              // set attributes for list and buttons
		  render : func_render     // set custom rendering function
		});
	```

 * generate new item in list

	```javascript
		$('#new-data').click(function(){
		  $('#sortable').dndsort('new');
		});
	```

 * generate sorted data

	```javascript
		$('#submit').click(function(){
		  $('#sortable').dndsort('save');
		});
	```

	this make input like below :

	```html
		<input type='text' name='sorted' value='sorted_data_in_json'>
	```

## Setting Attributes

## Todo

 * Add support for not-listed items.
