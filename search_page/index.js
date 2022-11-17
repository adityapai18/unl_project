const searchFunction = async (val) => {
  if (val === "") {
    var initHtml = sessionStorage.getItem("recentsHtml");
    document.getElementById("recents").innerHTML = initHtml;
    return;
  }
  var apiRes = await fetch(
    `https://api.unl.global/v2/autocomplete?query=${val}&language=en&limit=10`,
    {
      headers: {
        accept: "application/json",
        "x-unl-api-key": "biuV9WvyeSBKpj2sKcNrQklQbIcy8bbm",
        "x-unl-vpm-id": "02ff70f8-88ad-42cd-be58-9af7e7574cb9",
        "Content-Type": "application/json",
      },
    }
  );
  var response = await apiRes.json();
  var initHtml = document.getElementById("recents").innerHTML;
  document.getElementById("recents").innerHTML = "";
  response.map((val) => {
    console.log(val);
    document.getElementById("recents").innerHTML += `
    <div onclick="getDetailsById(this.id)" id="${val.id}" class="flex items-center">
        <button class="bg-[#5F6368] w-[32px] h-[32px] rounded-full flex justify-center items-center mr-4">
          <span class="material-symbols-outlined text-white"> pin_drop </span>
        </button>
        <div>
          <h1>${val.suggestion}</h1>
        </div>
    </div>
    <hr class="mt-1" />
    `;
  });
  if (!sessionStorage.getItem("recentsHtml"))
    sessionStorage.setItem("recentsHtml", initHtml);
};
const getDetailsById = async (unlId) => {
  console.log(unlId);
  var apiRes = await fetch(`https://api.unl.global/v2/search/place/${unlId}`, {
    headers: {
      accept: "application/json",
      "x-unl-api-key": "biuV9WvyeSBKpj2sKcNrQklQbIcy8bbm",
      "x-unl-vpm-id": "02ff70f8-88ad-42cd-be58-9af7e7574cb9",
      "Content-Type": "application/json",
    },
  });
  var response = await apiRes.json();
  console.log(response);
  var coord =
    response["geojson:Features"][0]["geojson:geometry"]["coordinates"];
  if (coord) {
    sessionStorage.setItem("dest-loc", coord);
    sessionStorage.setItem(
      "dest-name",
      response["geojson:Features"][0]["geojson:properties"]["vocabulary:name"]
    );
    window.location.href = "../go_page/";
  }
};
