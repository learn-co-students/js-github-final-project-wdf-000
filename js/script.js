// $(document).ready(function(){
  // function GithubInteractor (token){
  //   this.token = token
  // }

  class GithubInteractor {
    constructor(token) {
      this.token = token;
    }
  }

  function submitForm() {
    $('form').on('submit', function(event){
      var repoName = $('#repoName').val
      var repoOwner = $('#repoOwner').val
      var title = $('title').val
      var body  = $('body').val
      createIssue(repoName, repoOwner, title, body);
    })
  }

  function createIssue(repoName, repoOwner , title, body) {
    var data = {
      title: title,
      body: body
    }

    $.ajax({
      url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/issues',
      type: 'POST',
      dataType: 'json',
      headers: {
        Authorization: GithubInteractor.token
      }, 
      data: JSON.stringify(data)
    })
      .done(function(data) {
        return handleResponse(data);
      })
      .fail(function(jqXHR, textStatus, error) {
        return handleError(jqXHR, textStatus, error)
      });

  }


 
  function handleResponse(data){
    $('#issue').append(data.title)
  }
  

  function handleError(jqXHR, textStatus, error){
    console.log("Post error: " + error)
  }


