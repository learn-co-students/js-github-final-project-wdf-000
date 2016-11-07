$(document).ready(function(){
 $('form').on("submit", function(){
   selectValues();
 })

});


// var token = "21cd1c7a9f65dc2abb2c580a8212297e817df37d"




class GithubInteractor{
  constructor(token){
    this.token = token;
  }
}


  function selectValues(){
    var repoName = $('#repoName').val();
    var repoOwner = $('#repoOwner').val();
    var issueTitle = $('#title').val();
    var issueValue = $('#body').val();
    createIssue(repoName, repoOwner, issueTitle, issueValue);
  }



  function createIssue(repoName, repoOwner, issueTitle, issueValue){
    var interactor = new GithubInteractor("21cd1c7a9f65dc2abb2c580a8212297e817df37d");
    var url = 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/issues';
    var values = {
      title: issueTitle,
      body: issueValue
    }

    $.ajax({
      url: url,
      type: "POST",
      headers: {
        Authorization: "token " + interactor.token
      },
      data: JSON.stringify(values),
      success: handleResponse,
      error: handleError
    });
  }





  function handleResponse(data){
     $('#issue').append(data.title)
  }


  function handleError(jqXHR, textStatus, errorThrown){
    console.log("Post error: " + errorThrown)

  }
