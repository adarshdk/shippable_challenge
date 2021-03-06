$(document).ready(function(){
	//Define behaviour on click of the Refresh open issues button
	$("#refresh").click(function(){
		//Get repo clone link, and parse it to get the repo name and owner
		var repoLink = $("input#repo_name").val();
		var repoArray = repoLink.split("/");
		var repoName = repoArray[repoArray.length-1].split(".")[0];
		var repoOwner = repoArray[repoArray.length-2];
		//Use jQuery's getJSON method to get information about open issues on a repo.
		//Then, add the information obtained using a callback to a table on the page.
		$.getJSON( "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/issues", function( data ) {
			var	tableString = "<tr><td>Issue Number</td><td>Title</td><td>User</td><td>Created Time</td></tr>";
			for(var i = 0; i< data.length; i++){
				var userURL = "<a href=\"" + data[i]["user"]["html_url"] + "\">" + data[i]["user"]["login"] + "</a>";
				tableString += "<tr><td>" + data[i]["number"] + "</td><td>" + data[i]["title"] + "</td><td>" + userURL + "</td><td>" + data[i]["created_at"] + "</td></tr>";
			}
  			$( "#issues_table" ).html( tableString );
		});
	});
});