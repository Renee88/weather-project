const tempManager = new TempManager()
const render = new Renderer()

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