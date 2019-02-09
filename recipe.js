function search() {
  let input = $('#search').val()
  console.log(input)
  $.post(`http://localhost:3000/recipe/search`, { search : input })
  .done( function(response) {
    // console.log(response)// hasil search disini
    $('#content').empty()
    response.recipes.slice(0,10).forEach( recipe => {
      $('#content').append(`
        <div class="col-sm-6 col-md-4 my-3">
        <div class="card" style="width: 18rem;">
                <img class="card-img-top" src="${recipe.image_url}" alt="Menu Image">
                <div class="card-body">
                  <h5 class="card-title">${recipe.title}</h5>
                  <p class="card-text">Social Rank : ${recipe.social_rank}</p>
                  <a href="#" onclick="getDetail('${recipe.recipe_id}')" class="btn btn-primary">View Recipe</a>
                  </div>
                  </div>
        </div>
        `)
    })

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
                  <a href="#" onclick="getDetail('${response.recipes[index].recipe_id}')" class="btn btn-primary">View Recipe</a>
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

  // console.log(recipeId)
  $('#content').empty()

  $.get(`http://localhost:3000/recipe/detail/${recipeId}`)
  .done( function(response) {
    $('#content').append(`
    <div id="foodDetail" class="col-sm-12">
    <!-- DYNAMIC BAR -->
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <button id="dynamicDetail" class="nav-link active" onclick="">Details</button>
      </li>
      <li class="nav-item">
        <button id="dynamicVideo" class="nav-link" onclick="">Related Videos</button>
      </li>
    </ul>

    <div id="cardDetailFood" class="card mb-3">
      <div class="text-center">
        <h5 class="card-title">${response.recipe.title}</h5>
        <img
        class="rounded mx-auto d-block img-thumbnail"
        src="${response.recipe.image_url}"
        alt="Card image cap"
        style="width: 220px">
      </div>
      <div class="card-body">
        <p>Ingredients</p>
        <p id="ingredients">${response.recipe.ingredients.join(', ')}</p>
        <a href="#" onclick="google_translate()">Translate to Bahasa</a>
        <div id="indoLang"></div>
        <p>Directions</p>
        <a href="${response.recipe.source_url}">${response.recipe.publisher}</a>
      </div>
    </div>
    <div id="cardDetailVideo" class="card mb-3">
    </div>
  </div>`)
      $.get(`http://localhost:3000/youtube?search=${response.recipe.title}`)
        .done(video => {
          $("#cardDetailVideo").hide()

          video.result.forEach(vid => {
            $('#cardDetailVideo').append(`
            <iframe
            src="http://www.youtube.com/embed/${vid}"
            width="500"
            height="300"
            frameborder="0"
            allowfullscreen></iframe>`)
          })

          $("#dynamicDetail").click( e => {
            e.preventDefault();

            $("#dynamicDetail").addClass('active')
            $("#dynamicVideo").removeClass('active')
            $("#cardDetailFood").show()
            $("#cardDetailVideo").hide()
          })

          $("#dynamicVideo").click( e=> {
            e.preventDefault()

            $("#dynamicDetail").removeClass('active')
            $("#dynamicVideo").addClass('active')
            $("#cardDetailFood").hide()
            $("#cardDetailVideo").show()
          })
        })
        .fail( function(err) {
          console.log(err)
        })
    })
    .fail( function(err) {
      console.log(err)
    })
    // function dynamicDetail() {
    //   $("#dynamicDetail").addClass('active')
    //   $("#dynamicVideo").removeClass('active')
    //   $("#cardDetailFood").show()
    //   $("#cardDetailVideo").hide()
    //   // $("#content").append(`${food.name}`)
    // }
    // function dynamicVideo() {
    //   $("#dynamicDetail").removeClass('active')
    //   $("#dynamicVideo").addClass('active')
    //   $("#cardDetailFood").hide()
    //   $("#cardDetailVideo").show()
    //   // $("#cardDetail").empty()
    // }
  }
$('#navBarSearchForm').submit( function(e) {
  e.preventDefault()
  search()
})

// showRecommendation()


// list video youtube pake dynamic tabs