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
 */
function loadContent(page){
  return (page !== '')?$('#content').load(page + '.html'):false;
}

function openDocument(){
  window.open('assets/documents/pdf_de_exemplo.pdf', "_blank");
}

loadContent(window.location.hash.substr(1))