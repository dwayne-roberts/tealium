// TEST HELPER FUNCTIONS

module.exports = {
  simulateClick: function(element, window) {
    var evt = window.document.createEvent("HTMLEvents");
    evt.initEvent("click", false, true);
    element.dispatchEvent(evt);
  }
};