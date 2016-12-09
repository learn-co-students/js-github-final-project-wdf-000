// Alternatively
// function GithubInteractor(token) {
//   // we know it's a constructor bc the Github is capitalized
//   this.token = token
// }

class GithubInteractor {

  constructor(token) {
    this.token = token
  }


  // call function createIssue
  // post request  to github endpoint
  // if else -> if error console.log("Post error: error_name")


}


function submitForm(event) {
  event.preventDefault();
  // $('#submit').click(function(event) {
    var title = $("#title").val()
    var body = $("#body").val()
    var repoName = $("#repoName").val()
    var repoOwner = $("#repoOwner").val()

    createIssue(repoName, repoOwner, title, body)
  // }
    // debugger;

  // };
}


function createIssue(repoName, repoOwner, title, body) {
      // debugger;

      var url = `https://api.github.com/repos/${repoOwner}/${repoName}/issues`

      var info = {
        title: `${title}`,
        body: `${body}`
      };

          $.ajax({
                type: "POST",
                url: url,
                dataType: "json",
                data: JSON.stringify(info),
                success: function(response){
                  // debugger;
                  handleResponse(response)
                },
                error: function(response) {
                  // debugger
                  handleError(response)
                },
                headers: {
                Authorization: `token ${token}`
              }
            })

            // or alternatively
            // .fail(function(){
            //   handleError()
            // }).done(function() {
            //   handleResponse()
            // })

    }

function handleResponse(data) {

  $('#issue').text(data.title)

}


function handleError(jqXHR, textStatus, errorThrown) {
  console.log("Post error: " + errorThrown)
}
//

$(document).ready(function(){
  $('form').on('submit', submitForm);
  // submitForm() would run immediately when the page is rendered
});
