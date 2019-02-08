function search() {

  let input = $('#search').val()
  $.post(`http://localhost:3000/recipe/search`, { search : input })
    .done( function(response) {
      console.log(response)// hasil search disini
    })
    .fail( function(err) {
      console.log(err)
    })
}

function getDetail(recipeId) {
  
  $.get(`http://localhost:3000/recipe/detail/${recipeId}`)
    .done( function(response) {
      console.log(response) // hasil detail recipe disini
    })
    .fail( function(err) {
      console.log(err)
    })
}

// list video youtube pake dynamic tabs