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
listenAll('.turma', function(e){
  let obj = e.data('turmas');
  let turmaModal = $('#turmaModal');
  // console.log(json)
  // let obj = JSON.parse(json);
  let modal = new bootstrap.Modal(turmaModal);
  $('#turmaModal .turma-modal').remove()
  $(obj.turmas).each(function(i){
    $(".turma-modal .curso").html(obj.turmas[i].curso)
    $(".turma-modal input").attr('data-codturma', obj.codigo + obj.turmas[i].turma)
    $(".turma-modal").attr('data-codturma', obj.codigo + obj.turmas[i].turma)
    $(".turma-modal .vagas").html(obj.turmas[i].disponiveis)
    $(".turma-modal .turma").html(obj.turmas[i].turma)
    $(".turma-modal .professor").html(obj.turmas[i].professor)
    $(obj.turmas[i].horarios).each(function(h){
      var dia = obj.turmas[i].horarios[h].dia;
      var hora = obj.turmas[i].horarios[h].horario;
      $(".turma-modal .dia").html(dia[0].toUpperCase() + dia.substring(1))
      $(".turma-modal .hora").html(hora)
    })
    $('#turmaModal .modal-body').append($(".content-turma-modal").html())
  })
  modal.show()
})

listenAll('.add-turma', function(){
  $(".turma-modal.checked").each(function(i,c){
    let codturma = $(c).data('codturma');
    let dia = $(`.turma-modal.checked .dia`);
    let hora = $(`.turma-modal.checked .hora`);
    let curso = $(`.turma-modal.checked .curso`);

    console.log(dia.val())
    console.log(hora)
    console.log(curso)

    // Pega a grade de solicitacao, se não houver vira um array vazio
    var grade_solicitacao = JSON.parse(localStorage.getItem('grade_solicitacao') || '[]');
    // Adiciona pessoa ao cadastro
    grade_solicitacao.push({
      dia: dia.val(),
      hora: hora.val(),
      curso: curso.val()
    });

    // Salva a lista alterada
    localStorage.setItem("grade_solicitacao", JSON.stringify(grade_solicitacao));
  })
})

listenAll('.grade-solicitacao', function(e){
  // localStorage.getItem('segunda-feira', '');
  // localStorage.getItem('terca-feira', '');
  // localStorage.getItem('quarta-feira', '');
  // localStorage.getItem('quinta-feira', '');
  // localStorage.getItem('sexta-feira', '');
  // localStorage.getItem('sabado-feira', '');
})

listenAll('.turma-modal input', function(e){
  let codturma = e.data('codturma');
  let turma = $(`.turma-modal[data-codturma=` + codturma + `]`);
  if(e.is(':checked')){
    turma.addClass('checked')
  }else{
    turma.removeClass('checked')
  }
},'change')

localStorage.setItem('grade_solicitacao', '');
