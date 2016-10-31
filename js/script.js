// class GithubInteractor {
//   constructor(token) {
//
//   }
// }
// var GithubInteractor = function(){}
//
// function GithubInteractor(token){
//   this.token = token;
// }

class GithubInteractor {
    constructor(token) {
      this.token = token;
    }
  }


function submitForm() {
  $('form').on('submit', function(event) {
    var owner = $('#repoOwner').val;
    var repo = $('#repoName').val;
    var title = $('#title').val;
    var body = $('#body').val;
    createIssue(repo, owner, title, body);
  });
}

function createIssue(repoName, repoOwner, title, body) {
  $.ajax({
    url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/issues',
    type: 'POST',
    dataType: 'json',
    headers: {Authorization: GithubInteractor.token},
    data: JSON.stringify({'title': title, 'body': body})
  }).done(function(title) {
       return handleResponse(title);
    }).fail(function(jqXHR, textStatus, error) {
       return handleError(jqXHR, textStatus, error);
    });
}

function handleResponse(title) {
  $('#issue').html(title.title);
}

function handleError(jqXHR, textStatus, error) {
  console.log("Post error: " + error);
}

// $(document).ready(function() {
//   createIssue('space-invaders-wdf-000', 'Natalisp', "Issue from NP", "testing");
// });


// function submitForm() {
//   $('form').on('submit', function createIssue() {
//     var owner = $('#repoOwner').val;
//     var repo = $('#repoName').val;
//     var url = 'https://api.github.com/repos/' + owner + '/' + repo + '/issues';
//     var title = $('#title').val;
//     var body = $('#body').val;
//     $.ajax({url: url,
//             type: 'POST',
//             data: JSON.stringify({title: title, body:body}),
//             success: function (response) {
//               $('#issue').html('<a href='response.repository_url'>Repo Link</a>')
//             }
//   })
// }
