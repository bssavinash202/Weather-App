// https://api.weatherapi.com/v1/forecast.json?key=6552b8f87ccb426184783227251303&q=london&days=7
let Key="6552b8f87ccb426184783227251303"

async function getData() {
    let city = document.getElementById('search').value
    if(city==""){
        alert("please enter the city")
        return;
    }
    // let API=`http://api.weatherapi.com/v1/history.json?key=${Key}&q=${city}&dt=2025-03-17&end_dt=2025-03-24`;
    let API = `https://api.weatherapi.com/v1/forecast.json?key=${Key}&q=${city}&aqi=yes&days=7`
    // let res = await axios.get(API);
    let res = axios.get(API);
    res.then((result)=>{
        displayDetails(result)
        getForecastDetails(result)
        foreCast(result)
        airQuality(result)
    })
    res.catch((err)=>{
        console.log(err)
    })

    // console.log(res.data)
    
}
function displayDetails(res) {
    console.log(res.data.forecast.forecastday[6].day.maxtemp_c)
    let data=res.data
    document.getElementById('locationDetailsId').innerHTML=`<h1>${data.location.name}</h1>
    <h6 class="mute">${data.location.country}</h6>
    <h1>${data.current.temp_c} <sup>o</sup>C<h1>
    `
    document.getElementById('icon').innerHTML=`
    <img src="${data.current.condition.icon}" width="150px">
    `
    document.getElementById('text').innerHTML=`
    <h2>${data.current.condition.text}</h2>
    `

}

function getForecastDetails(res) {
    let data=res.data.forecast.forecastday[0].hour;
    let forecastEle = document.getElementById('forecastId')
    // console.log(data)
   let columns =  data.reduce((cols,obj,ind)=>{
    if(ind==6||ind==9||ind==12||ind==15||ind==18||ind==21){
        
        let col=`
        <div class="col-3 box2">
       <h6>${ind>12?ind-12:ind}:00 ${ind<12?"AM":"PM"}</h6>
       <div style="width:"50px"><img src="${obj.condition.icon}" width="100%"></div>
       <p>${obj.condition.text}</p>
       <h2>${obj.temp_c}<sup> o</sup>C</h2>
        </div>`
        cols+=col;
    }
        return cols
    },"")
    // console.log(columns)
    forecastEle.innerHTML=`
    
${columns}

    `
}
function airQuality(res){
    let air = res.data.current.air_quality
    document.getElementById("airId").innerHTML=`
     <h1 class="text-center text-light mt-5 mb-3">Air Quality</h1>
      <div class="box2">
       <h3>Co : ${air.co}</h3>
        <h3>no2 : ${air.no2}</h3>
       <h3>o3 : ${air.o3}</h3>
       <h3>so2 : ${air.so2}</h3>
       <h3>pm2 : ${air.pm2_5}</h3>
    </div>
    
    `
}

function foreCast(res){
    let fr = res.data.forecast.forecastday
    console.log(fr)
    let resultval= fr.reduce((acc,obj) => {
        console.log(obj.day.avgtemp_c)
       let tr = `
      <div class="center2 gap-4">
       <h6>${obj.date}</h6>
         <img src="${obj.day.condition.icon}" width="150px">
        <h2>${obj.day.avgtemp_c}<sup> o</sup>C</h2>
        </div>
       `
      acc+=tr
       return acc;
    },'');
    console.log(resultval)
    document.getElementById('foreId').innerHTML=`
     <h1 class="text-center text-light mt-5 mb-3">Future Forecast</h1>
      <div class="center2">
      ${resultval}
    </div>
  
    `
}