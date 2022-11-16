window.onload = async () => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    let value = params.loc;
    if(value){
        const sharedLoc = window.atob(value).split(",");
        var popup = new UnlSdk.Popup({ offset: 25 }).setText(
          "Shared Location"
        );
        var marker = new UnlSdk.Marker()
          .setLngLat(sharedLoc)
          .setPopup(popup)
          .addTo(map);
    }
  }