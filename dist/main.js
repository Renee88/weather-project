const tempManager = new TempManager()
const render = new Renderer()

const loadPage = async function () {
    await tempManager.getDataFromDB()
    let cities = tempManager.favourites
    render.renderData(cities)
    $(".city").append("<button class=refresh>Refresh</button>")
}

const handleSearch = async function () {
    let Id = "404"
    tempManager.removeNotFound(Id)
    let inputCity = $("input").val()
    await tempManager.getCityData(inputCity)
    let cities = tempManager.cityData
    render.renderData(cities)
    $("#favs").text("Show favourites")
}




$("#search").on("click", handleSearch)

$("#cities").on("click", "#liked", function () {
    let cityId = $(this).siblings(".name").data("id")
    console.log(cityId)
    tempManager.removeCity(cityId)
    let cities = tempManager.cityData
    render.renderData(cities)
    $(this).append(`<i id="disliked" class="far fa-heart"></i>`)
})

$("#cities").on("click", ".far", function () {
    let cityId = $(this).siblings(".name").data("id")
    console.log(cityId)
    tempManager.saveCity(cityId)
    $(this).attr("class", "fas fa-heart")
})

$("#cities").on("click", ".fas", function () {
    let cityId = $(this).siblings(".name").data("id")
    console.log(cityId)
    tempManager.removeCity(cityId)
    let cities = tempManager.favourites
    render.renderData(cities)
    $(this).attr("class", "far fa-heart")
})

$("#favs").on("click", async function () {
    await loadPage()
    $(".city").find(".far").attr("class","fas fa-heart")
    $(this).text('Hide favourites')
})

$("#cities").on("click", ".refresh", async function () {
    let cityId = $(this).siblings(".name").data("id")
    await tempManager.updateCity(cityId)
    let cities = this.favourites
    render.renderData(cities)
})

