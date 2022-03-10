window.loadContent(
  $("#activecontent").html($("#login").html())
)
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
  let componentTurmaModal = $(`.component-turma-modal`);
  let modal = new bootstrap.Modal(turmaModal);
  var codTurmas = JSON.parse(localStorage.getItem('codTurmas') || '[]');

  $('#turmaModal .turma-modal').remove()
  $(obj.turmas).each(function(i){
    $(`.component-turma-modal .curso`).html(obj.turmas[i].curso)
    $(`.component-turma-modal input`).attr('data-codturma', obj.codigo + obj.turmas[i].turma)
    if(codTurmas.includes(obj.codigo + obj.turmas[i].turma)){
      $(`.component-turma-modal input`).attr('checked', true)
      $(`.component-turma-modal`).addClass('checked')
    }
    $(`.component-turma-modal`).attr('data-codturma', obj.codigo + obj.turmas[i].turma)
    $(`.component-turma-modal`).attr('data-materia', obj.materia)
    $(`.component-turma-modal .vagas`).html(obj.turmas[i].disponiveis)
    $(`.component-turma-modal .turma`).html(obj.turmas[i].turma)
    $(`.component-turma-modal .professor`).html(obj.turmas[i].professor)
    componentTurmaModal.find('.component-horario').html('')
    $(obj.turmas[i].horarios).each(function(h){
      var dia = obj.turmas[i].horarios[h].dia;
      var hora = obj.turmas[i].horarios[h].horario;
      var spanDia = document.createElement('span');
      var spanHora = document.createElement('span');
      var pHorario = document.createElement('p');
      $(pHorario).addClass('mb-1 horario')
      $(spanDia).addClass('dia')
      $(spanDia).html(dia[0].toUpperCase() + dia.substring(1))
      $(spanHora).addClass('hora')
      $(spanHora).html(hora)
      pHorario.appendChild(spanDia)
      pHorario.append(' - ')
      pHorario.appendChild(spanHora)
      componentTurmaModal.find('.component-horario').append($(pHorario))
    })
    $('#turmaModal .modal-body').append($("#content-turma-modal").html())
    $('#turmaModal .component-turma-modal').addClass('turma-modal')
    $('#turmaModal .component-turma-modal').removeClass('component-turma-modal')
    $(`.component-turma-modal input`).attr('data-codturma', '')
    $(`.component-turma-modal input`).attr('checked', false)
    $(`.component-turma-modal`).removeClass('checked')
    // console.log($('#turmaModal .modal-body').html())
  })

  modal.show()
})

listenAll('.add-turma', function(){
  $(".turma-modal").each(function(i,c){

    // Pega a grade de solicitacao, se não houver vira um array vazio
    var gradeSolicitacao = JSON.parse(localStorage.getItem('gradeSolicitacao') || '[]')
    var codTurmas = JSON.parse(localStorage.getItem('codTurmas') || '[]')

    if($(c).hasClass('checked')) {
      if (!codTurmas.includes($(c).data('codturma'))) {
        addTurma(gradeSolicitacao, c)
        addCod(codTurmas, c)
      }
    }else{
      // if (codTurmas.includes($(c).data('codturma'))) {
      //   codTurmas.splice($(c).data('codturma'), 1)
      // }
      // $(gradeSolicitacao).each(function(x,y){
        codTurmas = codTurmas.filter((item) => item !== $(c).data('codturma'))
        gradeSolicitacao = gradeSolicitacao.filter((item) => item.codturma !== $(c).data('codturma'))
        // if(y.codturma == $(c).data('codturma')) {
        //
        //   console.log(y)
        //   gradeSolicitacao.splice(y, 1);
        // }
      // })
    }

    // Salva a lista alterada
    localStorage.setItem('gradeSolicitacao', JSON.stringify(gradeSolicitacao))
    localStorage.setItem('codTurmas', JSON.stringify(codTurmas))
  })
  // $('#turmaModal').hide()
  // $('.modal-backdrop').hide()
  $('#turmaModal').modal('toggle');
  $('.removedisabled').removeClass('disabled');
})

listenAll('.grade-solicitacao', function(){
  $("#solicitacaoModal #grade-content").html('')
  let arrDias = ['Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sábado'];
  // let gradeSolicitacao = '[{"dia": "Segunda-feira","materias": [{"materia": "Projeto I","hora": "08:00-12:00"},{"materia": "Projeto II","hora": "08:00-12:00"}],"nmaterias": 1},{"dia":"Terça-feira","materias":[],"nmaterias":0}]';
  let objGrade = JSON.parse(localStorage.getItem("gradeSolicitacao"));

  $(arrDias).each(function(i,c){
    let temp = $("#solicitacaoModal #grade-content");
    temp.append($("#content-col").html());
    temp.find('.dia').addClass(c)
    temp.find('.dia').removeClass('dia')
    temp.find(`.`+c).find('.nmaterias').before(c)
  })

  let arrDia = [];
  $(objGrade).each(function(i,c){
    let gradeDia = $("#solicitacaoModal").find(`.`+c.dia);
    let afterx = '.card-header'

    arrDia.push(c.dia)

    if(c.nmaterias > 0) {
      $(gradeDia).find('.nmaterias').html(
        arrDia.filter(x => x === c.dia).length + ' matéria(s)')
      $(gradeDia).find(afterx).after($('#content-materia').html())
      let cmateria = $($(gradeDia).find('.cmateria'))
      cmateria.find('.materia').html(c.materia)
      cmateria.find('.hora').html(c.hora)
      cmateria.addClass('content-materia')
      cmateria.removeClass('cmateria')
      // afterx = '.content-materia'
    }else{
      $(gradeDia).find('.nmaterias').html('livre')
      $(gradeDia).find(afterx).after($('#content-materia').html())
      let cmateria = $($(gradeDia).find('.cmateria'))
      cmateria.find('.materia').html('Livre')
    }
  })

  let solicitacaoModal = $('#solicitacaoModal');
  let modal = new bootstrap.Modal(solicitacaoModal);
  modal.show()
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

localStorage.setItem('gradeSolicitacao', '');
localStorage.setItem('codTurmas', '');

function getFilter(element, filter){
  return $(element).find(`.`+ filter).html()
}

function addTurma(gradeSolicitacao, element){
  $($(element).find(`.horario`)).each(function (x,y){
    gradeSolicitacao.push({
      dia: getFilter(y, 'dia'),
      // materias: {materia: $(element).data('materia'), hora: getFilter(element, 'hora'), codturma: $(element).data('codturma')},
      materia: $(element).data('materia'),
      hora: getFilter(y, 'hora'),
      codturma: $(element).data('codturma'),
      nmaterias: 1
    });
  })

}
function addCod(codeTurmas, element){
  codeTurmas.push($(element).data('codturma'));
}


listenAll('.entrar', function(){
  if($("#floatingInput").val()){
    $(".nome-aluno").html($("#floatingInput").val())
  }
  $("#login").html($("#activecontent").html())
  $("#activecontent").html($("#inicio").html())
  $("#inicio").html('')
})
listenAll('.sair', function(){
  $("#inicio").html($("#activecontent").html())
  $("#activecontent").html($("#login").html())
  $("#login").html('')
})