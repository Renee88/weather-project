const tempManager = new TempManager()
const render = new Renderer()

const loadPage = async function () {
    await tempManager.getDataFromDB()
    let cities = tempManager.favourites
    render.renderData(cities)
    $("i").attr("class", "fas fa-heart")
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
    let cities = tempManager.favourites
})

$("#favs").on("click", async function () {
    if ($(this).hasClass("unclicked")) {
       
        await loadPage()
        $(this).attr("class","clicked")
        $(this).text('Hide favourites')

    } else if($(this).hasClass("clicked")){
        
        let cities = tempManager.cityData
        render.renderData(cities)
        $(this).attr("class","unclicked")
        $(this).text('Show favourites')
    }
})

$("#cities").on("click", ".refresh", async function () {
    let cityId = $(this).siblings(".name").data("id")
    await tempManager.updateCity(cityId)
    let cities = tempManager.favourites
    render.renderData(cities)
})

$("body").on("swipeleft", async function(){
    console.log("swiped left")
    await loadPage()
})

$("body").on("swiperight",function(){
    let cities = tempManager.cityData
        render.renderData(cities)
})