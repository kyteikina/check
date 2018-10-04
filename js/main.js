$(function(){

  $('.carousel').carousel({
    interval: false
  });

  $('.phone-icon').click( function(event){ // лoвим клик пo ссылки с id="go"
    event.preventDefault(); // выключaем стaндaртную рoль элементa
    $('#overlay').fadeIn(400, // снaчaлa плaвнo пoкaзывaем темную пoдлoжку
      function(){ // пoсле выпoлнения предъидущей aнимaции
        $('#modal_form')
          .css('display', 'block')
          .animate({opacity: 1}, 200); // плaвнo прибaвляем прoзрaчнoсть oднoвременнo сo съезжaнием вниз
        $('body').addClass('modal-open');
      });
  });

  /* Зaкрытие мoдaльнoгo oкнa, тут делaем тo же сaмoе нo в oбрaтнoм пoрядке */
  $('#modal_close, #overlay, #modal_form').click( function(e){ // лoвим клик пo крестику или пoдлoжке
    if (this !== e.target) return false;
    $('#modal_form')
      .animate({opacity: 0}, 200,  // плaвнo меняем прoзрaчнoсть нa 0 и oднoвременнo двигaем oкнo вверх
        function(){ // пoсле aнимaции
          $(this).css('display', 'none'); // делaем ему display: none;
          $('#overlay').fadeOut(400); // скрывaем пoдлoжку
          $('body').removeClass('modal-open');
        }
      );
  });

  $('[data-submit]').on('click', function(e){
    e.preventDefault();
    $(this).parent('form').submit();
  });

  $.validator.addMethod(
    "regex",
    function(value, element, regexp) {
      var re = new RegExp(regexp);
      return this.optional(element) || re.test(value);
    },
    "Please check your input."
  );

  function valEl(el){
    el.validate({
      rules:{
        tel:{
          required:true,
          regex: '^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$'
        },
        name:{
          required:true
        },
        email:{
          required:true,
          email:true
        }
      },
      messages:{
        tel:{
          required:'Поле обязательно для заполнения',
          regex:'Телефон может содержать символы + - ()'
        },
        name:{
          required:'Поле обязательно для заполнения',
        },
        email:{
          required:'Поле обязательно для заполнения',
          email:'Неверный формат E-mail'
        }
      },
      submitHandler: function (form) {
        $('#loader').fadeIn();
        var $form = $(form);
        var $formId = $(form).attr('id');
        switch($formId){
          case'goToNewPage':
            $.ajax({
              type: 'POST',
                url: $form.attr('action'),
                data: $form.serialize(),
              })
              .always(function (response) {
                //ссылка на страницу "спасибо" - редирект
                location.href='';
                //отправка целей в Я.Метрику и Google Analytics
                // ga('send', 'event', 'masterklass7', 'register');
                // yaCounter27714603.reachGoal('lm17lead');
              });
          break;
          case'popupResult':
            $.ajax({
              type: 'POST',
              url: $form.attr('action'),
              data: $form.serialize(),
            })
            .always(function (response) {
              setTimeout(function (){
                $('#loader').fadeOut();
              },800);
              setTimeout(function (){
                $('#modal_form').fadeOut();
                $('#overlay').fadeIn();
                $('#thx').fadeIn();
                // $('form').fadeOut();
                $form.trigger('reset');
                //строки для остлеживания целей в Я.Метрике и Google Analytics
              },1100);
              $('#overlay').on('click', function(e) {
                $('#overlay').fadeOut();
                $('#thx').fadeOut();
              });
            });
          break;
        }
        return false;
      }
    });
  }

  $('.js-form').each(function() {
    valEl($(this));
  });

  $('[data-scroll]').on('click', function(){
    $('html, body').animate({
      scrollTop: $( $.attr(this, 'data-scroll') ).offset().top
    }, 2000);
    event.preventDefault();
  });
  
  $(".scrollto").click(function() {
    var e = "#" + $(this).attr("href").split("#")[1],
    i = $(e).offset().top - 77;
    return jQuery("html:not(:animated),body:not(:animated)").animate({
      scrollTop: i
    }, 800), !1
  });

});
