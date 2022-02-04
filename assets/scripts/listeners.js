listenAll('.loadcontent', function (element){
  loadContent(element.data('content'))
})
listenAll('.openDocument', function(e){
  openDocument()
})
listenAll('.col', function(e){
  e.find('.card-body').each(function(t,u){
    $(u).collapse('toggle')
  })
})