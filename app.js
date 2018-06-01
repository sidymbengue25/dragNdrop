(function(){
  var dragHandler={
    draggedElement:null,
    applyDragEvent:function(element){
      element.draggable=true;
      var dragHandler=this;//pour sauvegarder le this dans un variable
      element.addEventListener('dragstart',function(e){
        dragHandler.draggedElement=e.target;
        e.dataTransfer.setData('text/plain','');
      },false);/*
      element.addEventListener('drop',function(e){
        e.stopPropagation();
      },false);*/
                  },
    applyDropEvent:function(dropper){
      dropper.addEventListener('dragover',function(e){
        e.preventDefault();
        this.className="dropper drop_hover";//Style de drop quand l'élém est survollé
      },false);
      dropper.addEventListener('dragleave',function(e){
        e.preventDefault();
        this.className="dropper";
      });
      dropper.addEventListener('drop',function(e) {
        e.preventDefault();
        var droppedElement=dragHandler.draggedElement,
        droppedOn=e.target;
        while(droppedOn.className.indexOf('dropper')==-1){
          droppedOn=droppedOn.parentNode;
        }
        droppedOn.className='dropper';
        var clonedEleme=droppedElement.cloneNode(true);
        droppedOn.appendChild(clonedEleme);
        dragHandler.applyDragEvent(clonedEleme);
        droppedElement.parentNode.removeChild(droppedElement);
      });
    }
  };
  var elementsDraggable=document.querySelectorAll('.draggable');
  for(var i=0,c=elementsDraggable.length;i<c;i++){
    dragHandler.applyDragEvent(elementsDraggable[i]);
  }
  var dropperZones=document.querySelectorAll('.dropper');
  for(var i=0,c=dropperZones.length;i<c;i++){
    dragHandler.applyDropEvent(dropperZones[i]);
  }
})();
