$(document).ready(function() {
  
  //do the search on click
  $("#search").click(function() {
    var searchTerm = $("#searchTerm").val(); //search Input

    // URL for API with search input
    var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchTerm + "&format=json&callback=?";

    // get JSON data with ajax
    $.ajax({
      type: "GET",
      url: url,
      async: false,
      dataType: "json",
      success: function(data) {
        $("#searchResults").html(""); //to always show only the search result, with no previous results

        //console.log(data[1][0]); - get heading
        //console.log(data[2][0]); - get description
        //console.log(data[3][0]); - get link
        for (var i = 0; i < data[1].length; i++) {
          $("#searchResults").prepend(
            "<li><a href=" + data[3][i] + ">" + data[1][i] + "</a><p>" + data[2][i] + "</p></li>"
          );
        }
        //to reset the search every time after click:
        //$("#searchTerm").val("");
      },
      error: function(errorMessage) {
        alert("Error");
      }
    });
  });

  //this is to enable search when 'enter' is pressed
  $("#searchTerm").keypress(function(e) {
    if (e.which == 13) {
      $("#search").click();
    }
  });
  
}); //end of document.ready