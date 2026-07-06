
Backdrop.behaviors.ckeditorNoHTMLFlashStartup = {
  attach: function (context) {

    // When the form's submit button is clicked, set a var we can check later.
    jQuery(document).on('click', 'form :submit', function () {           
      Backdrop.settings.ckeditorNoHTMLFlash_formIsSubmitting = true;
    });
         
       
  }
};


/////////
// Override the core ckeditor detatch function so we first check if the form is submitting.
////////
 Backdrop.editors.ckeditor5.detach = function (element, format, trigger) {
   // Remove any content modification warning.
   if (element.ckeditor5AttachedWarning && trigger !== 'serialize') {
     element.ckeditor5AttachedWarning.remove();
     delete element.ckeditor5AttachedWarning;
   }

   // Save content and remove any CKEditor 5 instances.
   const editor = element.ckeditor5AttachedEditor;
   if (!editor) {
     return false;
   }

   // CKEditor 5 does not pretty-print HTML source. Format the source
   // before saving it into the source field.
   let newData = editor.getData({ skipListItemIds: true });
   newData = Backdrop.ckeditor5.formatHtml(newData);

   // Destroy the instance if fully detaching.
   if (trigger !== 'serialize') {

     ////////////////////             
     // This if statement prevents flash of HTML if we are submitting the form. If we are
     // simply switching to a different editor/filter, this will run normally.
     if (!Backdrop.settings.ckeditorNoHTMLFlash_formIsSubmitting) {     
       editor.destroy();
     }
     /////////////////////
     
     Backdrop.ckeditor5.instances.delete(editor.id);    
     delete element.ckeditor5AttachedEditor;    
     delete element.ckeditor5Processed;
   }
   
   // Save formatted value after destroying the editor, which can also
   // update the element value.
   element.value = newData;
   
   return !!editor;
 };     
 
 