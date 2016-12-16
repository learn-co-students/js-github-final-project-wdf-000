var token = "6e2abffe785a2eedba31fb6fed5af2d8149e7f5f"

class GithubInteractor{
	constructor(token){
		this.token = token
	};
}

function createIssue(repoName, repoOwner, issueTitle, issueBody){

	var data = {
		title: `${issueTitle}`,
		body: `${issueBody}`
	}

	$.ajax({
		url: `https://api.github.com/repos/${repoOwner}/${repoName}/issues`,		
		type: "POST",
		dataType: "json",
		data: JSON.stringify(data),
		headers: {
    		Authorization: `token ${token}`
  		}
	}).done(function(response){
		handleResponse(response)
	})
	.fail(function(xhr, status, error) {
    	handleError(xhr, status, error)
  	})
}

function handleResponse(data){
	$('#issue').text(data.title);
}

function handleError(jqXHR, textStatus, errorThrown){
	console.log("Post error: " + errorThrown);
}