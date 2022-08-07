const content = $("#content");
class Render {
  renderTheCities(cities) {
    content.empty();
    let source = $("#weather-template").html();
    let templete = Handlebars.compile(source);
    let newHTML = templete({ cities });
    content.append(newHTML);
  }
}
