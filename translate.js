function google_translate() {
    $.post('http://localhost:3000/translate', {
        words: $('#ingredients').text(),
        lang: 'id'
    })
    .done(response => {
        console.log(response)
        $('#indoLang').append(`
            <p>Translated to Bahasa:</p>
            <p>${response.translatedText}</p>
        `)
        $('#ocTranslate').hide()
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
// {translatedText: "1 1/2 cangkir tepung serbaguna, 1 baking soda 1 se…ndok teh bubuk kayu manis, 1 sendok makan mentega", detectedSourceLanguage: "en", originalText: "1 1/2 cups all-purpose flour, 1 teaspoon baking so…1/8 teaspoon ground cinnamon, 1 tablespoon butter"}