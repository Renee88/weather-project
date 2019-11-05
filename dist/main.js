const tempManager = new TempManager()
const render = new Renderer()

const loadPage = function(){
    tempManager.getDataFromDB()
    let cities = tempManager.cityData
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

$("#cities").on("click",".save",function(){
    let city = $(this).siblings(".name").text()
    tempManager.saveCity(city)
})

$("#cities").on("click",".delete",function(){
    let cityId = $(this).siblings(".name").data("id")
    tempManager.removeCity(cityId)
    let cities = tempManager.cityData
    render.renderData(cities)
})