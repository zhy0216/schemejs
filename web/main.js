var inter = require("../scheme").interpreter;

$(function(){

    var $container = $('#console');
    var controller = $container.console({
      promptLabel: 'Demo > ',
      commandValidate:function(line){
        if (line == "") return false;
        else return true;
      },
      commandHandle:function(line){
        var result;
        try { 
          result = inter(line);
        }catch (e) { 
          return e.toString(); 
        }
        return result.toString();
      },
      autofocus:true,
      animateScroll:true,
      promptHistory:true,
    });

})