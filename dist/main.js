const tempManager = new TempManager()
const render = new Renderer()

const loadPage = function(){
    tempManager.getDataFromDB()
    let cities = tempManager.cityData
    render.renderData(cities)
}

const handleSearch = function(){
    $("#city-input").val()
}

loadPage()

$("#send").on("click", async function(){
    let inputCity = $("input").val()
    await tempManager.getCityData(inputCity)
    let cities = tempManager.cityData
    render.renderData(cities)
})

$("#save").on("click",function(){
    let inputCity = $("input").val()
    tempManager.saveCity(inputCity)
})

$("#cities").on("click",".delete",function(){
    let city = $(this).siblings(".name").text()
    tempManager.removeCity(city)
    render.renderData(cities)
})