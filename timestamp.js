exports.parseTimestamp = (timestampString, timestampObject) => {
  // dunno how good this solution is but whatevs
  var timestampFormats = [
    ["%0M", timestampObject.getMonth() + 1 < 10 ? "0" + (timestampObject.getMonth() + 1) : timestampObject.getMonth() + 1],
    ["%0D", timestampObject.getDate() < 10 ? "0" + timestampObject.getDate() : timestampObject.getDate()],
    ["%0h", timestampObject.getHours() < 10 ? "0" + timestampObject.getHours() : timestampObject.getHours()],
    ["%0H", (timestampObject.getHours() % 12 || 12) < 10 ? "0" + (timestampObject.getHours() % 12 || 12) : (timestampObject.getHours() % 12 || 12)],
    ["%0m", timestampObject.getMinutes() < 10 ? "0" + timestampObject.getMinutes() : timestampObject.getMinutes()],
    ["%0s", timestampObject.getSeconds() < 10 ? "0" + timestampObject.getSeconds() : timestampObject.getSeconds()],
    ["%Y", timestampObject.getFullYear()],
    ["%M", timestampObject.getMonth() + 1],
    ["%D", timestampObject.getDate()],
    ["%h", timestampObject.getHours()],
    ["%H", (timestampObject.getHours() % 12 || 12)],
    ["%A", timestampObject.getHours() < 12 ? "A" : "P"],
    ["%a", timestampObject.getHours() < 12 ? "a" : "p"],
    ["%m", timestampObject.getMinutes()],
    ["%s", timestampObject.getSeconds()],
  ]
  timestampFormats.forEach((fmt, i) => {
    timestampString = timestampString.replace(fmt[0], fmt[1])
  })
  return timestampString
}
