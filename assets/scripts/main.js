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


loadContent(window.location.hash.substr(1))
function openDocument(){
  window.open('assets/documents/pdf_de_exemplo.pdf', "_blank");
}