var jsdom = require('jsdom').jsdom,
    config  = require('../config'),
    helpers  = require('../helpers');

describe('Event Tests', function() {
  var $,
      win,
      analyticsObj;

  beforeEach(function(callback) {
    jsdom.env({
      file: config.html,
      features: config.features,
      done: function(err, window) {
        if (err) console.log(err);
        win = window;
        $ = window.jQuery;
        analyticsObj = window.myRackAnalytics;
        callback();
      }
    });
  });

  describe('Initialization Tests', function() {
  
    it('utag_data initialized correctly', function() {
      expect(analyticsObj.utag_data.page_name).toBe('Events Tests');
      expect(analyticsObj.utag_data.account_id).toBe(862323);
      expect(analyticsObj.utag_data.myrack_action).not.toBeDefined;
      expect(analyticsObj.utag_data.myrack_metadata).not.toBeDefined;
    });
  
  });
  
  describe('Button Tests', function() {
  
    describe('Simple Buttons', function() {
      it('rs-btn is clicked with correct metadata', function() {
        var button = $('#btn-simple-primary');
        helpers.simulateClick(button[0], win);
        expect(analyticsObj.utag_data.myrack_action).toBe('Button Click');
        expect(analyticsObj.utag_data.myrack_metadata).toBe('PRIMARY');
      });
      
      it('primary-button button is clicked with correct metadata', function() {
        var button = $('#btn-simple-secondary');
        helpers.simulateClick(button[0], win);
        expect(analyticsObj.utag_data.myrack_action).toBe('Button Click');
        expect(analyticsObj.utag_data.myrack_metadata).toBe('SECONDARY');
      });
      
      it('secondary-button button is clicked with correct metadata', function() {
        var button = $('#btn-simple-canon');
        helpers.simulateClick(button[0], win);
        expect(analyticsObj.utag_data.myrack_action).toBe('Button Click');
        expect(analyticsObj.utag_data.myrack_metadata).toBe('CANON');
      });
      
      it('button with custom metadata is clicked with correct metadata', function() {
        var button = $('#btn-simple-custom');
        helpers.simulateClick(button[0], win);
        expect(analyticsObj.utag_data.myrack_action).toBe('Button Click');
        expect(analyticsObj.utag_data.myrack_metadata).toBe('CUSTOM');
      });
    });
  
    describe('Portal Buttons', function() {
      it('three-tier button is clicked with correct metadata', function() {
        var button = $('#btn-nested');
        helpers.simulateClick(button[0], win);;
        expect(analyticsObj.utag_data.myrack_action).toBe('Button Click');
        expect(analyticsObj.utag_data.myrack_metadata).toBe('NESTED');
      });
      
      it('rs-btn-action is clicked with correct metadata', function() {
        var button = $('#btn-action');
        helpers.simulateClick(button[0], win);;
        expect(analyticsObj.utag_data.myrack_action).toBe('Button Click');
        expect(analyticsObj.utag_data.myrack_metadata).toBe('ACTION');
      });
    });
  
    describe('Canon No-Text Buttons', function() {
      it('rs-plus button is clicked with correct metadata', function() {
        var button = $('.rs-plus');
        helpers.simulateClick(button[0], win);;
        expect(analyticsObj.utag_data.myrack_action).toBe('Button Click');
        expect(analyticsObj.utag_data.myrack_metadata).toBe('class:rs-plus');
      });
      
      it('rs-edit button is clicked with correct metadata', function() {
        var button = $('.rs-edit');
        helpers.simulateClick(button[0], win);;
        expect(analyticsObj.utag_data.myrack_action).toBe('Button Click');
        expect(analyticsObj.utag_data.myrack_metadata).toBe('class:rs-edit');
      });
      
      it('rs-delete button is clicked with correct metadata', function() {
        var button = $('.rs-delete');
        helpers.simulateClick(button[0], win);;
        expect(analyticsObj.utag_data.myrack_action).toBe('Button Click');
        expect(analyticsObj.utag_data.myrack_metadata).toBe('class:rs-delete');
      });
    });
  
    describe('Other No-Text Buttons', function() {
      it('Id and Class button is clicked with correct metadata', function() {
        var button = $('button[data-selector="both"]');
        helpers.simulateClick(button[0], win);;
        expect(analyticsObj.utag_data.myrack_action).toBe('Button Click');
        expect(analyticsObj.utag_data.myrack_metadata).toBe('id:btn-id-and-class');
      });
  
      it('Id button is clicked with correct metadata', function() {
        var button = $('button[data-selector="id"]');
        helpers.simulateClick(button[0], win);;
        expect(analyticsObj.utag_data.myrack_action).toBe('Button Click');
        expect(analyticsObj.utag_data.myrack_metadata).toBe('id:btn-id');
      });
  
      it('Class button is clicked with correct metadata', function() {
        var button = $('button[data-selector="class"]');
        helpers.simulateClick(button[0], win);;
        expect(analyticsObj.utag_data.myrack_action).toBe('Button Click');
        expect(analyticsObj.utag_data.myrack_metadata).toBe('class:btn-class');
      });
  
      it('Empty button is clicked with correct metadata', function() {
        var button = $('button[data-selector="none"]');
        helpers.simulateClick(button[0], win);;
        expect(analyticsObj.utag_data.myrack_action).toBe('Button Click');
        expect(analyticsObj.utag_data.myrack_metadata).toBe('');
      });
    });
  
  });
  
  describe('Hyperlink Tests', function() {
  
    describe('Simple \'a\' Tags', function() {
  
      it('Simple \'a\' tag clicked with correct metadata', function() {
        var a = $('#a-simple');
        helpers.simulateClick(a[0], win);;
        expect(analyticsObj.utag_data.myrack_action).toBe('Hyperlink Click');
        expect(analyticsObj.utag_data.myrack_metadata).toBe('SIMPLE');
      });
  
    });
  
    describe('Portal \'a\' Tags', function() {
  
      it('Tab Navigation \'a\' tags clicked with correct metadata', function() {
        var a = $('#a-tab-1');
        helpers.simulateClick(a[0], win);;
        expect(analyticsObj.utag_data.myrack_action).toBe('Hyperlink Click');
        expect(analyticsObj.utag_data.myrack_metadata).toBe('TAB 1');
        
        a = $('#a-tab-2');
        helpers.simulateClick(a[0], win);;
        expect(analyticsObj.utag_data.myrack_action).toBe('Hyperlink Click');
        expect(analyticsObj.utag_data.myrack_metadata).toBe('TAB 2');
      });
  
      it('Pagination \'a\' tags clicked with correct metadata', function() {
        var a = $('#a-pagination-step');
        helpers.simulateClick(a[0], win);;
        expect(analyticsObj.utag_data.myrack_action).toBe('Hyperlink Click');
        expect(analyticsObj.utag_data.myrack_metadata).toBe('2');
        a = $('#a-pagination-nextlink');
        helpers.simulateClick(a[0], win);;
        expect(analyticsObj.utag_data.myrack_action).toBe('Hyperlink Click');
        expect(analyticsObj.utag_data.myrack_metadata).toBe('Next');
        a = $('#a-pagination-maxvalue');
        helpers.simulateClick(a[0], win);;
        expect(analyticsObj.utag_data.myrack_action).toBe('Hyperlink Click');
        expect(analyticsObj.utag_data.myrack_metadata).toBe('25 Per Page');
        a = $('#a-pagination-opt-1');
        helpers.simulateClick(a[0], win);;
        expect(analyticsObj.utag_data.myrack_action).toBe('Hyperlink Click');
        expect(analyticsObj.utag_data.myrack_metadata).toBe('25 Per Page');
        a = $('#a-pagination-opt-2');
        helpers.simulateClick(a[0], win);;
        expect(analyticsObj.utag_data.myrack_action).toBe('Hyperlink Click');
        expect(analyticsObj.utag_data.myrack_metadata).toBe('50 Per Page');
        a = $('#a-pagination-all');
        helpers.simulateClick(a[0], win);;
        expect(analyticsObj.utag_data.myrack_action).toBe('Hyperlink Click');
        expect(analyticsObj.utag_data.myrack_metadata).toBe('All');
      });
  
    });
  
    describe('No Text \'a\' Tags', function() {
  
      it('Id and Class \'a\' tag is clicked with correct metadata', function() {
        var button = $('a[data-selector="both"]');
        helpers.simulateClick(button[0], win);;
        expect(analyticsObj.utag_data.myrack_action).toBe('Hyperlink Click');
        expect(analyticsObj.utag_data.myrack_metadata).toBe('id:a-id-and-class');
      });
    
      it('Id \'a\' tag is clicked with correct metadata', function() {
        var button = $('a[data-selector="id"]');
        helpers.simulateClick(button[0], win);;
        expect(analyticsObj.utag_data.myrack_action).toBe('Hyperlink Click');
        expect(analyticsObj.utag_data.myrack_metadata).toBe('id:a-id');
      });
    
      it('Class \'a\' tag is clicked with correct metadata', function() {
        var button = $('a[data-selector="class"]');
        helpers.simulateClick(button[0], win);;
        expect(analyticsObj.utag_data.myrack_action).toBe('Hyperlink Click');
        expect(analyticsObj.utag_data.myrack_metadata).toBe('class:a-class');
      });
    
      it('Empty \'a\' tag is clicked with correct metadata', function() {
        var button = $('a[data-selector="none"]');
        helpers.simulateClick(button[0], win);;
        expect(analyticsObj.utag_data.myrack_action).toBe('Hyperlink Click');
        expect(analyticsObj.utag_data.myrack_metadata).toBe('');
      });
  
    });
  
  });
  
  describe('Other Element Tests', function() {
  
    describe('Simple Custom Elements', function() {
  
      it('Custom div clicked with correct metadata', function() {
        var a = $('#custom-div');
        helpers.simulateClick(a[0], win);;
        expect(analyticsObj.utag_data.myrack_action).toBe('Custom Event Click');
        expect(analyticsObj.utag_data.myrack_metadata).toBe('DIV');
      });
  
      it('Custom span clicked with correct metadata', function() {
        var a = $('#custom-span');
        helpers.simulateClick(a[0], win);;
        expect(analyticsObj.utag_data.myrack_action).toBe('Custom Event Click');
        expect(analyticsObj.utag_data.myrack_metadata).toBe('SPAN');
      });
  
      it('Custom element clicked with correct metadata', function() {
        var a = $('#custom-element');
        helpers.simulateClick(a[0], win);;
        expect(analyticsObj.utag_data.myrack_action).toBe('Custom Event Click');
        expect(analyticsObj.utag_data.myrack_metadata).toBe('ELEMENT');
      });
  
      it('button with custom metadata is clicked with correct metadata', function() {
        var button = $('#custom-btn');
        helpers.simulateClick(button[0], win);;
        expect(analyticsObj.utag_data.myrack_action).toBe('Custom Event Click');
        expect(analyticsObj.utag_data.myrack_metadata).toBe('CUSTOM');
      });
  
    });
  
  });

  //TODO: DYNAMIC TESTING

});