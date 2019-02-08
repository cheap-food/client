function search() {

  let input = $('#search').val()
  $.post(`http://localhost:3000/recipe/search`, { search : input })
  .done( function(response) {
    // console.log(response)// hasil search disini

  })
    .catch( function(err) {
      console.log(err)
    })
}

function showRecommendation() { // sebelum search
  $.post(`http://localhost:3000/recipe/search`)
  .done( function(response) {
      // console.log('here')
      // console.log(response)
      let randomIndex = []
      for( let i = 0 ; i < 6 ; i++ ) {
        let cek = false
        let rand = null
        while(!cek) {
          rand = Math.floor(Math.random() * 30)
          cek = randomIndex.indexOf(rand) == -1
        }
        randomIndex.push(rand)
        let index = randomIndex[i]
        $('#content').append(`
        <div class="col-sm-6 col-md-4 my-3">
        <div class="card" style="width: 18rem;">
                <img class="card-img-top" src="${response.recipes[index].image_url}" alt="Menu Image">
                <div class="card-body">
                  <h5 class="card-title">${response.recipes[index].title}</h5>
                  <p class="card-text">Social Rank : ${response.recipes[index].social_rank}</p>
                  <a href="${response.recipes[index].source_url}" class="btn btn-primary">View Recipe</a>
                  </div>
                  </div>
        </div>
        `)
      }
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

// showRecommendation()


// list video youtube pake dynamic tabs