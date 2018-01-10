$.getJSON('/articles', function(data) {

  console.log("app.js file .getJSON runs");

  for (var i = 0; i<data.length; i++){
    $('#articles').append('<div class="myarticle"><img src="http:'+ data[i].vidimage +'"" width="200px"><a href="'+ data[i].link +'"><p data-id="' + data[i]._id + '">'+ data[i].title +'</a><br /><i>' + data[i].snippet +'</i></p><p>Add a comment:</p><form action="submit"><input type="text"><input type="submit"></form></div>');
  }
});
