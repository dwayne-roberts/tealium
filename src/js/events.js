$(document).ready(function() {
  'use strict';

  var debug = true;
  // var debug = false;

  /****************************************************
  Global Event Object
  ****************************************************/
  function MyRackAnalytics(utag_data, showLog) {
    //allow for no value for the debug function
    this.showLog = false;
    if(typeof showLog !== undefined){
      this.showLog = showLog;
    }
    this.utag_data = utag_data;
    this.log = [];
  }

  MyRackAnalytics.prototype.logAdd = function(key,value) {
    this.log.push([key,value]);
  };
  
  MyRackAnalytics.prototype.logDump = function() {
    if(this.showLog){
      for (var i = 0, entry; entry = this.log[i++];) {
        console.log(entry[0],entry[1]);
      }
    }
    this.log = [];
  };

  MyRackAnalytics.prototype.fireTags = function(type) {
    this.logAdd('METHOD','fireTags');
    if(type == 'view'){
      this.logAdd('TEALIUM','utag.view called');
      try {
        if (!debug) {
          utag.view(this.utag_data);
        }
      } catch(err){
          this.logAdd('ERROR','utag.view is not defined!!');
      }
    }else if(type == 'link'){
      this.logAdd('TEALIUM','utag.link called');
      try {
        if (!debug) {
          utag.link(this.utag_data);
        }
      } catch(err){
          this.logAdd('ERROR','utag.link is not defined!!');
      }
    }else{
      this.logAdd('ERROR','type must be one of \'link\' or \'view\'.');
    }
    this.logAdd('utag_data', this.utag_data);
    this.logDump();
  };

  MyRackAnalytics.prototype.eventCogClick = function(element) {
    this.logAdd('METHOD', 'eventCogClick');
    this.utag_data.myrack_action = 'Cog Click';
    this.utag_data.myrack_metadata = this.evaluateMetadata(element);
    this.fireTags('link');
  };
  
  MyRackAnalytics.prototype.eventButtonClick = function(element) {
    this.logAdd('METHOD', 'eventCogClick');
    this.utag_data.myrack_action = 'Button Click';
    this.utag_data.myrack_metadata = this.evaluateMetadata(element);
    this.utag_data.account_id = 123456;
    this.fireTags('link');
  };

  MyRackAnalytics.prototype.eventHyperlinkClick = function(element) {
    this.logAdd('METHOD', 'eventCogClick');
    this.utag_data.myrack_action = 'Hyperlink Click';
    this.utag_data.myrack_metadata = this.evaluateMetadata(element);
    this.fireTags('link');
  };  

  MyRackAnalytics.prototype.eventCustomClick = function(element) {
    this.logAdd('METHOD', 'eventCogClick');
    this.utag_data.myrack_action = 'Custom Event Click';
    this.utag_data.myrack_metadata = this.evaluateMetadata(element);
    this.fireTags('link');
  };

  MyRackAnalytics.prototype.evaluateMetadata = function(element) {
    var metadata = '';

    if (element.attributes['data-rsa-custom']) {
      metadata = element.attributes['data-rsa-custom'].value || '';
    } else if ($(element).is('a')) {
      metadata = element.textContent || element.innerText || $(element).html() || '';
    } else if($(element).is('button')) {
      metadata = element.textContent || element.innerText || $(element).html() || '';
    } else {
      metadata = '';
    }

    //If the element has no text or HTML within, populate metadata with id or class
    if (metadata.trim() === '') {
      if (element.attributes.id) {
        metadata = 'id:' + element.attributes.id.value;
      } else if (element.attributes.class) {
        metadata = 'class:' + element.attributes.class.value;
      } else {
        metadata = '';
      }
    }

    return metadata.trim();
  };

  /****************************************************
  Global Object Initialization
  ****************************************************/
  var utag_data = window.utag_data || {
    page_name: document.title,
    account_id: 862323 //TODO: DETERMINE THIS
  };

  //pass true for debug false for no debug
  window.myRackAnalytics = new MyRackAnalytics(utag_data, debug);
  
  /****************************************************
  Event Delegation - REQUIRES jQuery 1.4.2+
  ****************************************************/

  var rsaEventHandler = function(event) {
    var el = event.target || event.srcElement;
  
    if (el) {
      var $el = $(el);
  
      if ($el.hasClass('rsa-custom-event')) {
        window.myRackAnalytics.eventCustomClick(el);
      } else if ($el.is('a')) {
        window.myRackAnalytics.eventHyperlinkClick(el);
      } else if ($el.is('button')) {
        window.myRackAnalytics.eventButtonClick(el);
      } else if ($el.hasClass('rs-cog') || $el.hasClass('dropdown-toggle')) {
        window.myRackAnalytics.eventCogClick(el);
      }
    }
  };
  
  window.document.body.addEventListener('click', rsaEventHandler, true);

  //TODO: Determine if addEventListener 'useCapture' function is ideal. Otherwise, use this code:
  // //Cog Click Handler
  // $('body').delegate('div.rs-cog.dropdown-toggle', 'click', function() {
  //   window.myRackAnalytics.eventCogClick(this);
  // });
  // 
  // //Button Click Handler
  // $('body').delegate('button', 'click', function() {
  //   window.myRackAnalytics.eventButtonClick(this);
  // });
  // 
  // //Hyperlink Click Handler
  // $('body').delegate('a', 'click', function() { 
  //   window.myRackAnalytics.eventHyperlinkClick(this);
  // });
  // 
  // //Custom Click Handlers
  // //The delegate custom event handler will NOT work on elements that have javascript
  // //handlers that use stopPropogation() or 'return false;'.
  // $('body').delegate('.rsa-custom-delegate', 'click', function() {
  //   window.myRackAnalytics.eventCustomClick(this);
  // });
  // 
  // //This explicit custom event handler will NOT work with dynamically loaded content.
  // //That content will be loaded AFTER this handler is registered, and the event will NOT be captured
  // $('.rsa-custom-event').click(function() {
  //   window.myRackAnalytics.eventCustomClick(this);
  // });

});