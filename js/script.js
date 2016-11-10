class GithubInteractor{
  constructor(token){
    this.token = token;
  }
}

  function handleResponse(r){
    var issue = r;
    $('#issue').append(issue);

  }

  function handleError(errorThrown){

      console.log("Post error: Unauthorized")
      // console.log('Post error: Unauthorized')
  }

  function createIssue(repoName,repoOwner , issueName, issueDesc){
       $.ajax({
        url:'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/issues',
        type: 'POST',
        dataType: 'json',
        headers:{
          Authorization: "token " + "c8a56db3524a94dc8b8199307acab079d2529450"
        },
        data: JSON.stringify({title:issueName, body:issueDesc}),
        success: function(response){
            handleResponse(response.title);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {

            handleError(XMLHttpRequest, textStatus, errorThrown);
        }
      })

    }

    function clicked(){
      name = $('#repoName').val();
      owner = $('#repoOwner').val();
      issue = $('#title').val();
      desc = $('#body').val();
      createIssue(name, owner, issue, desc);
    }

    $( document ).ready(function() {
      clicked();
    });
