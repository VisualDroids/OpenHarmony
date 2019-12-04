//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//
//                            openHarmony Library v0.01
//
//
//         Developped by Mathieu Chaptel, ...
//
//
//   This library is an open source implementation of a Document Object Model
//   for Toonboom Harmony. It also implements patterns similar to JQuery
//   for traversing this DOM.
//
//   Its intended purpose is to simplify and streamline toonboom scripting to
//   empower users and be easy on newcomers, with default parameters values,
//   and by hiding the heavy lifting required by the official API.
//
//   This library is provided as is and is a work in progress. As such, not every
//   function has been implemented or is garanteed to work. Feel free to contribute
//   improvements to its official github. If you do make sure you follow the provided
//   template and naming conventions and document your new methods properly.
//
//   This library doesn't overwrite any of the objects and classes of the official
//   Toonboom API which must remains available.
//
//   This library is made available under the MIT license.
//   https://opensource.org/licenses/mit
//
//   The repository for this library is available at the address:
//   https://github.com/cfourney/OpenHarmony/
//
//
//   For any requests feel free to contact m.chaptel@gmail.com
//
//
//
//
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////
//////////////////////////////////////
//                                  //
//                                  //
//          $.dialog class          //
//                                  //
//                                  //
//////////////////////////////////////
//////////////////////////////////////


/**
 * The base class for the $.oDialog.
 * @constructor
 * @classdesc  $.oDialog Base Class -- helper class for showing GUI content.
 */
$.oDialog = function( ){

}


/**
 * Prompts with a confirmation dialog (yes/no choice).
 * @param   {string}           [title]                        The title of the confirmation dialog.
 * @param   {string}           [labelText]                    The label/internal text of the dialog.
 * @param   {string}           [okButtonText]                 The text on the OK button of the dialog.
 * @param   {string}           [cancelButtonText]             The text on the CANCEL button of the dialog.
 * 
 * @return  {bool}       Result of the confirmation dialog.
 */
$.oDialog.prototype.confirm = function( title, labelText, okButtonText, cancelButtonText ){
    if (typeof title === 'undefined')            var title = "Confirmation";
    if (typeof okButtonText === 'undefined')     var okButtonText = "Okay";
    if (typeof cancelButtonText === 'undefined') var cancelButtonText = "Cancel";
    if (typeof labelText === 'undefined')        var labelText = false;
    
    var d = new Dialog();
        d.title            = title;
        d.okButtonText     = okButtonText;
        d.cancelButtonText = cancelButtonText;
    
    if( labelText ){
      var label = new Label;
          label.text = labelText;    
    }
      
    d.add( label );
    
    if ( !d.exec() ){
      return false;
    }
    
  return true;
}


/**
 * Prompts with an alert dialog (informational).
 * @param   {string}           [title]                        The title of the confirmation dialog.
 * @param   {string}           [labelText]                    The label/internal text of the dialog.
 * @param   {string}           [okButtonText]                 The text on the OK button of the dialog.
 * 
 */
$.oDialog.prototype.alert = function( title, labelText, okButtonText, modal ){   
    if (typeof title === 'undefined')            var title = "Alert";
    if (typeof okButtonText === 'undefined')     var okButtonText = "OK";
    if (typeof labelText === 'undefined')        var labelText = false;
    if (typeof modal === 'undefined')            var modal = false;
    

    var d = new QMessageBox( false, title, labelText, QMessageBox.Ok );
        d.setWindowTitle( title );
      
        d.buttons()[0].text = okButtonText;
      
    if( labelText ){
      d.text = labelText;
    }
      
    if ( !d.exec() ){
      return;
    }
    
  return;
}

 
 
 
 
//////////////////////////////////////
//////////////////////////////////////
//                                  //
//                                  //
//       $.gui.Progress class       //
//                                  //
//                                  //
//////////////////////////////////////
//////////////////////////////////////

 
/**
 * The progress bar GUI dialog.
 * @constructor
 * @classdesc  $.gui Progress gui dialog
 * @param       {string}              labelText                  The path to the folder.
 * @param       {string}              range                      The path to the folder.
 * @param       {bool}                show                       Whether to immediately show the dialog.
 *
 * @property    {bool}                cancelled                  Whether the progress bar was cancelled.
 */
 
 
/**
 * The progress bar GUI dialog.
 * @constructor
 * @classdesc  $.oDialog Base Class -- helper class for showing GUI content.
 */
$.oDialog.prototype.Progress  = function( labelText, range, show ){
    if (typeof title === 'undefined')            var title = "Progress";
    if (typeof range === 'undefined')            var range = 100;
    if (typeof labelText === 'undefined')        var labelText = "";
    
    this.progress = new QProgressDialog();
    
    this.progress.setLabelText( labelText );
    this.progress.setRange( 0, range );
  
    this._value     = 0;
    this._range     = range;
    this._labelText = labelText;
    
    if ( show ){
      this.progress.show();
    }
    
    this.cancelled = false;
    
    {
      //CANCEL EVENT.
      var prog = this;
      var canceled = function(){
        prog.cancelled = true;
      }
      this.progress["canceled()"].connect( this, canceled );
    }
}


/**
 * Shows the dialog.
 * 
 */
$.oDialog.prototype.Progress.prototype.show = function( title, labelText, okButtonText ){
  this.progress.show();
}

/**
 * Closes the dialog.
 * 
 */
$.oDialog.prototype.Progress.prototype.close = function( title, labelText, okButtonText ){
  this.value = this.range;
  this.progress.hide();
  this.progress = false;
}


/**
 * The text of the window.
 * @name $.oDialog.Progress#text
 * @type {string}
 */
Object.defineProperty( $.oDialog.prototype.Progress.prototype, 'text', {
    get: function(){
      return this._labelText;
    },
    set: function( val ){
      this._labelText = val;
      this.progress.setLabelText( val );
    }
});


/**
 * The range of the window.
 * @name $.oDialog.Progress#range
 * @type {int}
 */
Object.defineProperty( $.oDialog.prototype.Progress.prototype, 'range', {
    get: function(){
      return this._range;
    },
    set: function( val ){
      this._range = val;
      this.progress.setRange( 0, val );
      QCoreApplication.processEvents();
    }
});


/**
 * The current value of the window.
 * @name $.oDialog.Progress#value
 * @type {int}
 */
Object.defineProperty( $.oDialog.prototype.Progress.prototype, 'value', {
    get: function(){
      return this._value;
    },
    set: function( val ){
      this.progress.setValue( val );
      QCoreApplication.processEvents();
    }
});