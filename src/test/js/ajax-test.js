var assert = buster.assertions.assert;

buster.testCase("AJAX tests", {
  /**
   * Async test for unset handling.
   *
   * @param done The done callback for async testing.
   */
  "// unset": function(done) {
    var unsetCalled = false;
    var unsetHandler = function() {
      unsetCalled = true;
    };

    new Prime.Ajax.Request('ajax-response.html').
      withUnsetHandler(unsetHandler).
      go();

    setTimeout(function() {
      assert(unsetCalled);
      done();
    }, 100);
  },

  /**
   * Async test for open handling.
   *
   * @param done The done callback for async testing.
   */
  "open": function(done) {
    var called = false;
    var handler = function() {
      called = true;
    };

    new Prime.Ajax.Request('ajax-response.html').
      withOpenHandler(handler).
      go();

    setTimeout(function() {
      assert(called);
      done();
    }, 100);
  },

  /**
   * Async test for send handling.
   *
   * @param done The done callback for async testing.
   */
  "send": function(done) {
    var called = false;
    var handler = function() {
      called = true;
    };

    new Prime.Ajax.Request('ajax-response.html').
      withSendHandler(handler).
      go();

    setTimeout(function() {
      assert(called);
      done();
    }, 100);
  },

  /**
   * Async test for loading handling.
   *
   * @param done The done callback for async testing.
   */
  "loading": function(done) {
    var called = false;
    var handler = function() {
      called = true;
    };

    new Prime.Ajax.Request('ajax-response.html').
      withLoadingHandler(handler).
      go();

    setTimeout(function() {
      assert(called);
      done();
    }, 100);
  },

  /**
   * Async test for successful completion handling.
   *
   * @param done The done callback for async testing.
   */
  "success": function(done) {
    var called = false;
    var handler = function() {
      called = true;
    };

    new Prime.Ajax.Request('ajax-response.html').
      withSuccessHandler(handler).
      go();

    setTimeout(function() {
      assert(called);
      done();
    }, 100);
  },

  /**
   * Async test for error completion handling.
   *
   * @param done The done callback for async testing.
   */
  "error": function(done) {
    var called = false;
    var handler = function() {
      called = true;
    };

    new Prime.Ajax.Request('invalid.html').
      withErrorHandler(handler).
      go();

    setTimeout(function() {
      assert(called);
      done();
    }, 100);
  },

  /**
   * Async test for testing that the context is used for the "this" reference in event handler calls.
   *
   * @param done The done callback for async testing.
   */
  "context": function(done) {
    var MyClass = function() {
      this.called = false;
    };

    MyClass.prototype = {
      handleFunction: function() {
        this.called = true;
      }
    };

    var handler = new MyClass();
    new Prime.Ajax.Request('ajax-response.html').
      withSuccessHandler(handler.handleFunction).
      withContext(handler).
      go();

    setTimeout(function() {
      assert(handler.called);
      done();
    }, 100);
  },

  /**
   * Async test for testing that the context is used for the "this" reference in event handler calls.
   *
   * @param done The done callback for async testing.
   */
  "subclass": function(done) {
    function MyAjaxRequest(url) {
      this.called = false;
      this.init(url);
    }

    // Extend and override the success handler
    MyAjaxRequest.prototype = new Prime.Ajax.Request();
    MyAjaxRequest.prototype.constructor = MyAjaxRequest;
    MyAjaxRequest.prototype.onSuccess = function() {
        this.called = true;
    };

    var ajax = new MyAjaxRequest('ajax-response.html').
      go();

    setTimeout(function() {
      assert(ajax.called);
      done();
    }, 100);
  }
});