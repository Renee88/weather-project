const tempManager = new TempManager()
const render = new Renderer()

const loadPage = async function () {
    let cities = await tempManager.getDataFromDB()
    console.log(cities)
    render.renderData(cities)
    $("i").attr("class", "fas fa-heart")
    $(".city").append("<button class=refresh>Refresh</button>")
}

const handleSearch = async function () {
    let Id = "404"
    tempManager.removeNotFound(Id)
    let inputCity = $("input").val()
    await tempManager.getCityData(inputCity)
    let cities = tempManager.displaySearchCities()
    render.renderData(cities)
    $("#favs").text("Show favourites")
}


$("#search").on("click", handleSearch)

$("#cities").on("click", "#liked", function () {
    let cityId = $(this).siblings(".name").data("id")
    tempManager.removeCity(cityId)
    let cities = tempManager.cityData
    render.renderData(cities)
    $(this).append(`<i id="disliked" class="far fa-heart"></i>`)
})

$("#cities").on("click", ".far", function () {
    let cityId = $(this).siblings(".name").data("id")
    tempManager.saveCity(cityId)
    $(this).attr("class", "fas fa-heart")
})

$("#cities").on("click", ".fas", async function () {
    let cityId = $(this).siblings(".name").data("id")
    tempManager.removeCity(cityId)
    $(this).attr("class", "far fa-heart")
})

$("#favs").on("click", async function () {
    if ($(this).hasClass("unclicked")) {
        await loadPage()
        $(this).text('Hide favourites')
        $(this).attr("class","clicked")

    } else if($(this).hasClass("clicked")){
        $("#cities").empty()
        $(this).text('Show favourites')
        $(this).attr("class","unclicked")
    }
})

$("#cities").on("click", ".refresh", async function () {
    let cityId = $(this).siblings(".name").data("id")
    await tempManager.updateCity(cityId)
    let cities = await tempManager.getDataFromDB()
    console.log(cities)
    await loadPage()
})
