Number.prototype.toRad = function () {
  return (this * Math.PI) / 180;
};

Number.prototype.toDeg = function () {
  return (this * 180) / Math.PI;
};

export const destinationPoint = function (lngLat, brng, dist) {
  dist = dist / 6371;
  brng = brng.toRad();

  var lat1 = lngLat[0].toRad(),
    lon1 = lngLat[1].toRad();

  var lat2 = Math.asin(
    Math.sin(lat1) * Math.cos(dist) +
      Math.cos(lat1) * Math.sin(dist) * Math.cos(brng)
  );

  var lon2 =
    lon1 +
    Math.atan2(
      Math.sin(brng) * Math.sin(dist) * Math.cos(lat1),
      Math.cos(dist) - Math.sin(lat1) * Math.sin(lat2)
    );

  if (isNaN(lat2) || isNaN(lon2)) return null;

  return [lat2.toDeg(), lon2.toDeg()];
};
