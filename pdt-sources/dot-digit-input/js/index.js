function processInput(holder){
  var elements = holder.children();

  elements.each(function(e){
    var val = $(this).val().replace(/\D/,""),
        focused = $(this).is(":focus");

    $(this).val(val);

    if(val.length>1){
      let exist = elements[e + 1] ? true: false;
      exist&&val[1]?(
        elements[e+1].value = val[1],
        elements[e].value = val[0],
        elements[e+1].focus()
      ):void 0;
    } else if(focused&&val.length==0){
      var exist = elements[e-1]?true:false;
      if(exist) elements[e-1].focus();
    }
  })
}

$("#inputs").on("input", function(){
  processInput($(this));
});

$("#inputs").on("click", function(e){
  var els = $(this).children();
  els.each(function(e){
    var focus = $(this).is(":focus");
    $this = $(this);
    while($this.prev().val()==""){
      $this.prev().focus();
      $this = $this.prev();
    }
  })
})
