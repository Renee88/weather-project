class Renderer {

    renderData(cities) {
        $("#cities").empty()
        let source = $("#city-template").html()
        let template = Handlebars.compile(source)
        let allCitiesHTML = template({ cities })
        $("#cities").append(allCitiesHTML)

    }

}

