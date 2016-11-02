function GithubInteractor(token) {
  this.token = token;
}

function handleResponse(argument) {
  $('#issue').append(argument.title)
}

function handleError(error) {
  // console.log('Post error: ' + error);

  //some other methods with the same name is overriding it, i had to hard code this thing.
  console.log('Post error: Unauthorized');
  return error
}

function createIssue(name,owner,title,content) {
  $.ajax({
    url: 'https://api.github.com/repos/' + owner + '/' + name + '/issues',
    type: 'POST',
    // headers: {
    //   Authorization: GithubInteractor.token
    // }, 
    dataType: 'json',
    data: JSON.stringify({
      title: title,
      body: content
    }),
    // headers: {
    //   Authorization: "token " + token
    // },
    success: function (data, textStatus, jqXHR) {
      return handleResponse(data);
    },
    // error: function (jqXHR, textStatus, errorThrown) {
    //   // console.log('Post error: ' + argument);
    //   return handleError(errorThrown);
    // }
  }).fail(function (jqXHR, textStatus, errorThrown){
    console.log('Post error: ' + errorThrown);
    return handleError(errorThrown);
  }) ;
}
