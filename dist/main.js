const tempManager = new TempManager()
const render = new Renderer()

const loadPage = async function(){
    await tempManager.getDataFromDB()
    let cities = tempManager.favourites
    
    render.renderData(cities)
}

const handleSearch = async function(){
    let inputCity = $("input").val()
    await tempManager.getCityData(inputCity)
    let cities = tempManager.cityData
    render.renderData(cities)
}


loadPage()

$("#search").on("click", handleSearch)

$("#cities").on("click",".far",function(){
    let city = $(this).siblings(".name").text()
    tempManager.saveCity(city)
    $(this).attr("class","fas fa-heart")
})

$("#cities").on("click",".fas",function(){
    let cityId = $(this).siblings(".name").data("id")
    tempManager.removeCity(cityId)
    let cities = tempManager.cityData
    render.renderData(cities)
    $(this).append(`<i class="far fa-heart"></i>`)
})

$("#favs").on("click",function(){
    $("#cities").empty()
    let cities = tempManager.favourites
    render.renderData(cities)
})