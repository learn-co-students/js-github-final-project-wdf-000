function submitForm() {
  $('#raise').click(function(event) {
    var repoName = $('#repoName');
    var repoOwner = $('#repoOwner');
    var repoTitle = $('#title');
    var repoBody = $('#body');
    createIssue(repoName, repoOwner, repoTitle, repoBody);
  });

}

function createIssue(name, owner, title, body) {
  var data = {
    title: title,
    body: body
  }

  $.ajax({
    url: "https://api.github.com/repos/" + owner + "/" + name + "/issues",
    type: 'POST',
    data: JSON.stringify(data),
    success: function(response) {
      handleResponse(response)
    }
  }).fail(function(resp) {
    handleError(resp);
  });
}

function handleResponse(response) {
  $("#issue").html(response.title)
}

function handleError(jqHXR, textStatus, errorThrown) {
  console.log("Post error: " + errorThrown);
}

function GithubInteractor(token) {
  this.token = token;
}

$(document).ready(function() {

});