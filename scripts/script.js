document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  const inputField = document.getElementById("input-field");
  const submitBtn = document.getElementById("submit-btn");
  const mainData = document.getElementById("show-main-data");
  const secData = document.getElementById("show-sec-data");
  const bgColor = document.getElementById("bg-color");
  const errorMessageBox = document.getElementById("error-message-box");
  const emptyErrorMsg = document.getElementById("empty-error-msg");
  const wrongCityMsg = document.getElementById("wrong-city-msg");
  const loading = document.getElementById("loading");
  const API_KEY = "8a6f4167e00e473ca6160654261007";

  form.addEventListener("submit", async (e) => {
    mainData.textContent = "";
    secData.textContent = "";
    emptyErrorMsg.classList.remove("block");
    emptyErrorMsg.classList.add("hidden");
    wrongCityMsg.classList.remove("block");
    wrongCityMsg.classList.add("hidden");
    e.preventDefault();
    if (inputField.value === "") return emptyFieldMessage();

    try {
      let city = inputField.value.trim();

      let url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}`;
      loadShow();
      let response = await fetch(url);

      if (response.status === 400) {
        return wrongCityMessage();
      }
      if (!response.ok) {
        throw new Error("something  went wrong!");
      }

      let data = await response.json();
      bgChanger(data);
      renderData(data);
    } catch (error) {
      console.error(error.message);
      inputField.value = "";
    } finally {
      emptyErrorMsg.classList.remove("block");
      emptyErrorMsg.classList.add("hidden");
      inputField.value = "";
    }

    inputField.value = "";
  });

  function renderData(data) {
    loadHide();
    renderMainCard(data);
    renderSecCard(data);
  }

  function renderMainCard(data) {
    let temp = Math.round(data.current.temp_c);
    let condition = data.current.condition.text;

    let location = {
      city: data.location.name,
      region: data.location.region,
      country: data.location.country,
    };

    location.region =
      location.city === location.region ? "" : location.region + ", ";
    let div = document.createElement("div");
    div.classList.add("center-box");

    div.innerHTML = `
     <!-- svg section -->
          <div class="w-46 flex justify-center items-center">
            <img src="${data.current.condition.icon}" alt="" class="w-full" />
          </div>
          <!-- svg ends here -->

          <div class="text-white flex flex-col gap-2">
            <h1 class="text-4xl font-bold">${temp}<sup>o</sup> C</h1>
            <p class="text-xl font-semibold">${condition}</p>
            <p class="text-lg">${location.city}, ${location.region}${location.country}</p>
          </div>
    `;

    mainData.appendChild(div);
  }

  function renderSecCard(data) {
    let feelsLike = Math.round(data.current.feelslike_c);
    let humidity = Math.round(data.current.humidity);
    let pressure = Math.round(data.current.pressure_mb);
    let wind = Math.round(data.current.wind_kph);
    let visibility = Math.round(data.current.vis_km);
    let time = new Date(data.location.localtime);

    let div = document.createElement("div");
    div.classList.add("secondary-carts-boxes");

    div.innerHTML = `
     <div class="bg-white/10 backdrop-blur-md rounded-2xl sm:p-4 border border-white/20 text-white h-32 flex flex-col items-center justify-between effect-custom">
              <div
                class="flex justify-center flex-col sm:flex-row items-center">
                <img
                  src="./assets/images/temprature.png"
                  alt="Feels like  icon"
                  class="w-10"
                />
                <h2 class="font-bold text-lg">Feels like</h2>
              </div>
              <p class="font-semibold">${feelsLike}<sup>o</sup> C</p>
            </div>

            <div
              class="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-white h-32 flex flex-col items-center justify-between effect-custom"
            >
              <div
                class="flex justify-center flex-col sm:flex-row items-center gap-2"
              >
                <img
                  src="./assets/images/humidity.png"
                  alt="Humidity  icon"
                  class="w-10"
                />
                <h2 class="font-bold text-lg">Humidity</h2>
              </div>
              <p class="font-semibold">${humidity}%</p>
            </div>

            <div
              class="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-white h-32 flex flex-col items-center justify-between effect-custom"
            >
              <div
                class="flex justify-center flex-col sm:flex-row items-center gap-2"
              >
                <img
                  src="./assets/images/pressure.png"
                  alt="Pressure  icon"
                  class="w-10"
                />
                <h2 class="font-bold text-lg">Pressure</h2>
              </div>
              <p class="font-semibold">${pressure} hPa</p>
            </div>

            <div
              class="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-white h-32 flex flex-col items-center justify-between effect-custom"
            >
              <div
                class="flex justify-center flex-col sm:flex-row items-center gap-2"
              >
                <img
                  src="./assets/images/storm.png"
                  alt="Wind  icon"
                  class="w-10"
                />
                <h2 class="font-bold text-lg">Wind</h2>
              </div>
              <p class="font-semibold">${wind} km/h</p>
            </div>

            <div
              class="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-white h-32 flex flex-col items-center justify-between effect-custom"
            >
              <div
                class="flex justify-center flex-col sm:flex-row items-center gap-2"
              >
                <img
                  src="./assets/images/visibility.png"
                  alt="Visibility  icon"
                  class="w-10"
                />
                <h2 class="font-bold text-lg">Visibility</h2>
              </div>
              <p class="font-semibold">${visibility}km</p>
            </div>

            <div
              class="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-white h-32 flex flex-col items-center justify-between effect-custom"
            >
              <div
                class="flex justify-center flex-col sm:flex-row items-center align-middle gap-2"
              >
                <img
                  src="./assets/images/sunsets.png"
                  alt="Sunset  icon"
                  class="w-10"
                />
                <h2 class="font-bold text-lg">Sunset</h2>
              </div>
              <p class="font-semibold">${data.forecast.forecastday[0].astro.sunset}</p>
            </div>

            <div
              class="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-white h-32 flex flex-col items-center justify-between effect-custom"
            >
              <div
                class="flex justify-center flex-col sm:flex-row items-center gap-2"
              >
                <img
                  src="./assets/images/clock.png"
                  alt="Current Time icon"
                  class="w-10"
                />
                <h2 class="font-bold text-lg">Time</h2>
              </div>
              <p class="font-semibold">${time.toLocaleTimeString()}</p>
            </div>

            <div
              class="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-white h-32 flex flex-col items-center justify-between effect-custom"
            >
              <div
                class="flex justify-center flex-col sm:flex-row items-center gap-2"
              >
                <img
                  src="./assets/images/sunrise.png"
                  alt="Sunrise icon"
                  class="w-10"
                />
                <h2 class="font-bold text-lg">Sunrise</h2>
              </div>
              <p class="font-semibold">${data.forecast.forecastday[0].astro.sunrise}</p>
            </div>
    `;
    secData.appendChild(div);
  }

  function bgChanger(data) {
    let value = data.current.condition.text;
    let sunrise = timeToMinutes(data.forecast.forecastday[0].astro.sunrise);
    let sunset = timeToMinutes(data.forecast.forecastday[0].astro.sunset);
    let fullTime = new Date(data.location.localtime);
    let time = timeToMinutes(fullTime.toLocaleTimeString());

    bgColor.removeAttribute("class");
    const bgList = {
      clear: "clearSky",
      rain: "rainy",
      snow: "snowWeatherBg",
      cloud: "cloudBg",
      thunderStorm: "thunderstormGradient",
      night: "nightBg",
      fog: "fog",
    };
    if (sunset <= time || time < sunrise) {
      bgColor.classList.add("nightBg");
    } else {
      if (value.toLowerCase().includes("cloud")) {
        bgColor.classList.add(bgList.cloud);
      } else if (
        value.toLowerCase().includes("sun") ||
        value.toLowerCase().includes("clear")
      ) {
        bgColor.classList.add(bgList.clear);
      } else if (value.toLowerCase().includes("rain")) {
        bgColor.classList.add(bgList.rain);
      } else if (
        value.toLowerCase().includes("mist") ||
        value.toLowerCase().includes("thunder")
      ) {
        bgColor.classList.add(bgList.thunderStorm);
      } else if (value.toLowerCase().includes("snow")) {
        bgColor.classList.add(bgList.snow);
      } else if (value.toLowerCase().includes("fog")) {
        bgColor.classList.add(bgList.fog);
      } else {
        bgColor.classList.add("noneBg");
      }
    }
  }

  function timeToMinutes(time) {
    let [hhmm, period] = time.split(" ");
    let [hour, min] = hhmm.split(":");

    let h = Number(hour);
    let m = Number(min);
    if (period === "PM" && h !== 12) {
      h += 12;
    } else if (period === "AM" && h === 12) {
      h = 0;
    }

    return h * 60 + m;
  }

  function emptyFieldMessage() {
    loadHide();
    emptyErrorMsg.classList.remove("hidden");
    emptyErrorMsg.classList.add("block");
  }

  function wrongCityMessage() {
    loadHide();
    bgColor.className = "";
    bgColor.classList.add("defaultBg");
    wrongCityMsg.classList.remove("hidden");
    wrongCityMsg.classList.add("block");
    inputField.textContent = "";
  }

  function loadShow() {
    loading.removeAttribute("class");
    loading.classList.add("block");
  }

  function loadHide() {
    loading.removeAttribute("class");
    loading.classList.add("hidden");
  }
});
