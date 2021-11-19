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

/**
 *
 * @param page
 * @returns {*|jQuery|boolean}
 */
function loadContent(page){
    return (page !== '')?$('#content').load(page + '.html'):false;
}

listenAll('.loadcontent', function (element){
  loadContent(element.data('content'))
})

loadContent(window.location.hash.substr(1))