/**
 *
 * @param {object} element
 * @param {function} callback
 * @param {event} event
 */
function listenAll(element, callback, event = "click") {
  $("body").on(event, element, function () {
    callback($(this));
  });
}
listenAll('.loadcontent', function (element){
  // console.log(element)
  $('#content').load(element.data('content'));
})