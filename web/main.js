
$(function(){

    var $container = $('#console');
    var controller = $container.console({
      promptLabel: 'Demo > ',
      commandValidate:function(line){
        if (line == "") return false;
        else return true;
      },
      commandHandle:function(line){
         return line
      },
      autofocus:true,
      animateScroll:true,
      promptHistory:true,
    });

})