function google_translate() {
    $.post('http://localhost:3000/translate', {
        words: $('#coba').text(),
        lang: 'id'
    })
    .done(response => {
        console.log(response)
    })
    .fail(err => {
        console.log(err)
    })
}

function getAllLangs() {
    $.get('http://localhost:3000/translate/allLangs')
    .done(response => {
        // console.log(response)
        $('#dropdown-lang').append(`<a id="${response.language} href="#">${response.name}</a>"`)
    })
    .fail(err => {
        console.log(err)
    })
}

// $('#starred').append(`<p>${starred.stargazers_count} stars  <span style="color:black"><strong><a href="${starred.html_url}">View on GitHub</strong></span></p> <hr>`)