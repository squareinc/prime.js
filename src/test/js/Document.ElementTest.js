/*
 * Copyright (c) 2012-2015, Inversoft Inc., All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
 * either express or implied. See the License for the specific
 * language governing permissions and limitations under the License.
 */
'use strict';

var assert = buster.assertions.assert;
var refute = buster.assertions.refute;

/*
 * Helper functions
 */
function findPreviousElementSibling(element) {
  var sibling = element.previousSibling;
  while (sibling && sibling.nodeType != 1) {
    sibling = sibling.previousSibling;
  }

  return sibling;
}

function findNextElementSibling(element) {
  var sibling = element.nextSibling;
  while (sibling && sibling.nodeType != 1) {
    sibling = sibling.nextSibling;
  }

  return sibling;
}

buster.assertions.add('hasNextElementSiblings', {
  assert: function(element, number) {
    this.actualCount = 0;
    var sibling = element.nextSibling;
    while (sibling) {
      if (sibling.nodeType === 1) {
        this.actualCount++;
      }
      sibling = sibling.nextSibling;
    }

    return (this.actualCount === number);
  },
  assertMessage: 'Expected ${1} next sibling elements but there were ${actualCount}',
  refuteMessage: 'Expected there not be ${1} next sibling elements but there were'
});

buster.assertions.add('hasPreviousElementSiblings', {
  assert: function(element, number) {
    this.actualCount = 0;
    var sibling = element.previousSibling;
    while (sibling) {
      if (sibling.nodeType === 1) {
        this.actualCount++;
      }
      sibling = sibling.previousSibling;
    }

    return (this.actualCount === number);
  },
  assertMessage: 'Expected ${1} previous sibling elements but there were ${actualCount}',
  refuteMessage: 'Expected there not be ${1} previous sibling elements but there were'
});


buster.testCase('Element class tests', {
  setUp: function() {
    this.timeout = 1000;
  },

  'addClass': {
    setUp: function() {
      this.classEmpty = document.getElementById('classEmpty').className;
      this.classSingleExisting = document.getElementById('classSingleExisting').className;
      this.classMultipleExisting = document.getElementById('classMultipleExisting').className;
    },

    tearDown: function() {
      document.getElementById('classEmpty').className = this.classEmpty;
      document.getElementById('classSingleExisting').className = this.classSingleExisting;
      document.getElementById('classMultipleExisting').className = this.classMultipleExisting;
    },

    'addClassEmptyAddSingle': function() {
      var elem = document.getElementById('classEmpty');
      Prime.Document.queryFirst('#classEmpty').addClass('new-class');
      assert.equals(elem.className, 'new-class');
    },

    'addClassEmptyAddMultiple': function() {
      var elem = document.getElementById('classEmpty');
      Prime.Document.queryFirst('#classEmpty').addClass('new-class1 new-class2');
      assert.equals(elem.className, 'new-class1 new-class2');
    },

    'addClassSingleExistingAddOne': function() {
      var elem = document.getElementById('classSingleExisting');
      Prime.Document.queryFirst('#classSingleExisting').addClass('existing');
      assert.equals(elem.className, 'existing');
    },

    'addClassSingleExistingAddMultiple': function() {
      var elem = document.getElementById('classSingleExisting');
      Prime.Document.queryFirst('#classSingleExisting').addClass('existing new-class');
      assert.equals(elem.className, 'existing new-class');
    },

    'addClassSingleExistingAddMultipleNew': function() {
      var elem = document.getElementById('classSingleExisting');
      Prime.Document.queryFirst('#classSingleExisting').addClass('new-class1 new-class2');
      assert.equals(elem.className, 'existing new-class1 new-class2');
    },

    'addClassMultipleExistingAddOneAlreadyExists': function() {
      var elem = document.getElementById('classMultipleExisting');
      Prime.Document.queryFirst('#classMultipleExisting').addClass('existing1');
      assert.equals(elem.className, 'existing1 existing2 existing3');
    },

    'addClassMultipleExistingAddOneSubstring': function() {
      var elem = document.getElementById('classMultipleExisting');
      Prime.Document.queryFirst('#classMultipleExisting').addClass('existing');
      assert.equals(elem.className, 'existing1 existing2 existing3 existing');
    },

    'addClassMultipleExistingAddOneSuperstring': function() {
      var elem = document.getElementById('classMultipleExisting');
      Prime.Document.queryFirst('#classMultipleExisting').addClass('existing11');
      assert.equals(elem.className, 'existing1 existing2 existing3 existing11');
    },

    'addClassMultipleExistingAddMultiple': function() {
      var elem = document.getElementById('classMultipleExisting');
      Prime.Document.queryFirst('#classMultipleExisting').addClass('existing1 existing2');
      assert.equals(elem.className, 'existing1 existing2 existing3');
    },

    'addClassMultipleExistingAddOneNew': function() {
      var elem = document.getElementById('classMultipleExisting');
      Prime.Document.queryFirst('#classMultipleExisting').addClass('existing1 new-class1');
      assert.equals(elem.className, 'existing1 existing2 existing3 new-class1');
    },

    'addClassMultipleExistingAddMultipleNew': function() {
      var elem = document.getElementById('classMultipleExisting');
      Prime.Document.queryFirst('#classMultipleExisting').addClass('existing1 new-class1 new-class2');
      assert.equals(elem.className, 'existing1 existing2 existing3 new-class1 new-class2');
    },

    'addClassMultipleExistingAddOnlyOneNew': function() {
      var elem = document.getElementById('classMultipleExisting');
      Prime.Document.queryFirst('#classMultipleExisting').addClass('new-class1');
      assert.equals(elem.className, 'existing1 existing2 existing3 new-class1');
    },

    'addClassMultipleExistingAddOnlyMultipleNew': function() {
      var elem = document.getElementById('classMultipleExisting');
      Prime.Document.queryFirst('#classMultipleExisting').addClass('new-class1 new-class2');
      assert.equals(elem.className, 'existing1 existing2 existing3 new-class1 new-class2');
    }
  },

  'appendElement': {
    setUp: function() {
      var element = Prime.Document.newElement('<p/>').
          setID('appendElementNew').
          appendTo(document.body);
      element.setHTML('Hello world<strong>!</strong>');
    },

    tearDown: function() {
      Prime.Document.queryById('appendElementNew').removeFromDOM();
    },

    'appendElementPrimeElement': function() {
      var newElement = Prime.Document.queryById('appendElementNew');
      Prime.Document.queryById('insertSingle').appendElement(newElement);

      var element = Prime.Document.queryById('insertSingle');
      assert.equals(element.getTagName(), 'DIV');
      assert.equals(element.getChildren().length, 2);
      assert.equals(element.getChildren()[0].getID(), 'insertSingleElement');
      assert.equals(element.getChildren()[0].getTagName(), 'DIV');
      assert.equals(element.getChildren()[1].getID(), 'appendElementNew');
      assert.equals(element.getChildren()[1].getTagName(), 'P');
      assert.equals(element.getChildren()[1].getTextContent(), 'Hello world!');
      assert.equals(element.getChildren()[1].getChildren().length, 1);
      assert.equals(element.getChildren()[1].getChildren()[0].getTagName(), 'STRONG');
      assert.equals(element.getChildren()[1].getChildren()[0].getTextContent(), '!');
    },

    'appendElementNode': function() {
      Prime.Document.queryById('insertSingle').appendElement(document.getElementById('appendElementNew'));

      var element = Prime.Document.queryById('insertSingle');
      assert.equals(element.getTagName(), 'DIV');
      assert.equals(element.getChildren().length, 2);
      assert.equals(element.getChildren()[0].getID(), 'insertSingleElement');
      assert.equals(element.getChildren()[0].getTagName(), 'DIV');
      assert.equals(element.getChildren()[1].getID(), 'appendElementNew');
      assert.equals(element.getChildren()[1].getTagName(), 'P');
      assert.equals(element.getChildren()[1].getTextContent(), 'Hello world!');
      assert.equals(element.getChildren()[1].getChildren().length, 1);
      assert.equals(element.getChildren()[1].getChildren()[0].getTagName(), 'STRONG');
      assert.equals(element.getChildren()[1].getChildren()[0].getTextContent(), '!');
    }
  },

  'appendHTML': {
    tearDown: function() {
      Prime.Document.query('#appendHTMLNew').removeAllFromDOM();
    },

    'appendHTML': function() {
      Prime.Document.queryById('insertSingle').appendHTML('<p id="appendHTMLNew">Hello world<strong>!</strong></p>');

      var element = Prime.Document.queryById('insertSingle');
      assert.equals(element.getTagName(), 'DIV');
      assert.equals(element.getChildren().length, 2);
      assert.equals(element.getChildren()[0].getID(), 'insertSingleElement');
      assert.equals(element.getChildren()[0].getTagName(), 'DIV');
      assert.equals(element.getChildren()[1].getTagName(), 'P');
      assert.equals(element.getChildren()[1].getTextContent(), 'Hello world!');
      assert.equals(element.getChildren()[1].getChildren().length, 1);
      assert.equals(element.getChildren()[1].getChildren()[0].getTagName(), 'STRONG');
      assert.equals(element.getChildren()[1].getChildren()[0].getTextContent(), '!');
    }
  },

  'appendTo': {
    tearDown: function() {
      Prime.Document.query('#appendToSingleElementNew').removeAllFromDOM();
      Prime.Document.query('#appendToMultipleElementNew').removeAllFromDOM();
      refute(document.getElementById('appendToSingleElementNew'));
      refute(document.getElementById('appendToMultipleElementNew'));
    },

    'appendToSingleDOMElement': function() {
      Prime.Document.newElement('<a/>').
          setID('appendToSingleElementNew').
          appendTo(document.getElementById('insertSingle'));

      var newElement = document.getElementById('appendToSingleElementNew');
      assert.hasPreviousElementSiblings(newElement, 1);
      assert.hasNextElementSiblings(newElement, 0);
      assert.equals(findPreviousElementSibling(newElement).id, 'insertSingleElement');
    },

    'appendToSinglePrimeElement': function() {
      Prime.Document.newElement('<a/>').
          setID('appendToSingleElementNew').
          appendTo(Prime.Document.queryFirst('#insertSingle'));

      var newElement = document.getElementById('appendToSingleElementNew');
      assert.hasPreviousElementSiblings(newElement, 1);
      assert.hasNextElementSiblings(newElement, 0);
      assert.equals(findPreviousElementSibling(newElement).id, 'insertSingleElement');
    },

    'appendToMultipleDOMElement': function() {
      Prime.Document.newElement('<a/>').
          setID('appendToMultipleElementNew').
          appendTo(document.getElementById('insertMultiple'));

      var newElement = document.getElementById('appendToMultipleElementNew');
      assert.hasPreviousElementSiblings(newElement, 3);
      assert.hasNextElementSiblings(newElement, 0);
      assert.equals(findPreviousElementSibling(newElement).id, 'insertMultipleThree');
    },

    'appendToMultiplePrimeElement': function() {
      Prime.Document.newElement('<a/>').
          setID('appendToMultipleElementNew').
          appendTo(Prime.Document.queryFirst('#insertMultiple'));

      var newElement = document.getElementById('appendToMultipleElementNew');
      assert.hasPreviousElementSiblings(newElement, 3);
      assert.hasNextElementSiblings(newElement, 0);
      assert.equals(findPreviousElementSibling(newElement).id, 'insertMultipleThree');
    }
  },

  'getAbsoluteElement': function() {
    assert(Prime.Document.queryById('absolute-top-element').getAbsoluteTop() > 0);
  },

  'getAttribute': function() {
    assert.equals(Prime.Document.queryFirst('#attributes').getAttribute('attr1'), 'value1');
    assert.equals(Prime.Document.queryFirst('#attributes').getAttribute('attr2'), 'value2');
  },

  'getAttributes': function() {
    assert.equals(Prime.Document.queryFirst('#attributes').getAttributes(), {
      'attr1': 'value1',
      'attr2': 'value2',
      'id': 'attributes'
    });
  },

  'set remove attribute': function() {
    assert.isNull(Prime.Document.queryFirst('#attributes').getAttribute('foo'));

    Prime.Document.queryFirst('#attributes').setAttribute('foo', 'bar');
    assert.equals(Prime.Document.queryFirst('#attributes').getAttribute('foo'), 'bar');

    Prime.Document.queryFirst('#attributes').removeAttribute('foo');
    assert.isNull(Prime.Document.queryFirst('#attributes').getAttribute('foo'));
  },

  'getChildren': function() {
    var element = Prime.Document.queryFirst('#children');
    assert.equals(element.getChildren().length, 4);
  },

  'getChildren with selector': function() {
    var element = Prime.Document.queryFirst('#children');
    assert.equals(element.getChildren('.foo').length, 2);
  },

  'getClass': function() {
    var element = Prime.Document.queryById('getClass');
    assert.equals(element.getClass(), 'class1 class2');
  },

  'getDataAttribute': function() {
    assert.equals(Prime.Document.queryFirst('#dataset').getDataAttribute('attr1'), 'value1');
    assert.equals(Prime.Document.queryFirst('#dataset').getDataAttribute('attr2'), 'value2');
    assert.equals(Prime.Document.queryFirst('#dataset').getDataAttribute('camelCase'), 'valueCamelCase');
  },

  'getDataSet': function() {
    assert.equals(Prime.Document.queryFirst('#dataset').getDataSet().attr1, 'value1');
    assert.equals(Prime.Document.queryFirst('#dataset').getDataSet().attr2, 'value2');
    assert.equals(Prime.Document.queryFirst('#dataset').getDataSet().camelCase, 'valueCamelCase');
  },

  'getFirstChild': function() {
    var element = Prime.Document.queryFirst('#children');
    assert.isTrue(element.getFirstChild().is('div.child-one'));
    assert.isTrue(element.getFirstChild('.foo').is('div.foo'));
    assert.isNull(element.getFirstChild('.no-match'));
    assert.isNull(element.getFirstChild().getFirstChild());
  },

  'getHTML': function() {
    var element = document.getElementById('html');
    element.innerHTML = 'Get test';

    assert.equals(Prime.Document.queryFirst('#html').getHTML(), 'Get test');
  },

  'getLastChild': function() {
    var element = Prime.Document.queryFirst('#children');
    assert.isTrue(element.getLastChild().is('div.foo'));
    assert.isTrue(element.getLastChild('.child-one').is('div.child-one'));
    assert.isNull(element.getLastChild('.no-match'));
    assert.isNull(element.getLastChild().getLastChild());
  },

  'getNextSibling': function() {
    assert.equals(Prime.Document.queryFirst('#queryOne').getNextSibling().getID(), 'queryTwo');
    assert.equals(Prime.Document.queryFirst('#queryTwo').getNextSibling().getID(), 'queryThree');
    assert.isNull(Prime.Document.queryFirst('#queryThree').getNextSibling());
  },

  'getOptions': function() {
    var options = Prime.Document.queryById('select-single-select').getOptions();
    assert.equals(options.length, 3);
    assert.equals(options[0].getValue(), 'one');
    assert.equals(options[1].getValue(), 'two');
    assert.equals(options[2].getValue(), 'three');
  },

  'getOuterHTML': function() {
    var element = Prime.Document.newElement('<div>').setID('getOuterHTML');
    var body = new Prime.Document.Element(document.body);
    body.appendElement(element);

    element = Prime.Document.queryById('getOuterHTML');
    element.setHTML('these pretzels are making me thirsty.');

    assert.equals(element.getOuterHTML(), '<div id="getOuterHTML">these pretzels are making me thirsty.</div>');
    assert.equals(element.getOuterHTML(), element.domElement.outerHTML);
  },

  'getPreviousSibling': function() {
    assert.isNull(Prime.Document.queryFirst('#queryOne').getPreviousSibling());
    assert.equals(Prime.Document.queryFirst('#queryTwo').getPreviousSibling().getID(), 'queryOne');
    assert.equals(Prime.Document.queryFirst('#queryThree').getPreviousSibling().getID(), 'queryTwo');
  },

  'getSelectedTexts': function() {
    assert.isNull(Prime.Document.queryFirst('#one-checkbox').getSelectedTexts());
    assert.isNull(Prime.Document.queryFirst('#one-radio').getSelectedTexts());
    assert.isNull(Prime.Document.queryFirst('#text').getSelectedTexts());
    assert.isNull(Prime.Document.queryFirst('#textarea').getSelectedTexts());
    assert.equals(Prime.Document.queryFirst('#select').getSelectedTexts(), ['One', 'Three']);
  },

  'getSelectedValues': function() {
    assert.equals(Prime.Document.queryFirst('#one-checkbox').getSelectedValues(), ['one', 'three']);
    assert.equals(Prime.Document.queryFirst('#one-checkbox-special-char').getSelectedValues(), ['one', 'three']);
    assert.equals(Prime.Document.queryFirst('#one-radio').getSelectedValues(), ['one']);
    assert.equals(Prime.Document.queryFirst('#select').getSelectedValues(), ['one', 'three']);
    assert.isNull(Prime.Document.queryFirst('#text').getSelectedValues());
    assert.isNull(Prime.Document.queryFirst('#textarea').getSelectedValues());
  },

  'getStyle': function() {
    assert.equals(Prime.Document.queryFirst('#style').getStyle('text-align'), 'center');
  },

  'getTagName': function() {
    assert.equals(Prime.Document.queryFirst('#textContent').getTagName(), 'DIV');
  },

  'getTextContent': function() {
    assert.equals(Prime.Document.queryFirst('#textContent').getTextContent().trim(), 'Some text with elements.');
  },

  'getValue': function() {
    assert.equals(Prime.Document.queryFirst('#one-checkbox').getValue(), 'one');
    assert.equals(Prime.Document.queryFirst('#two-radio').getValue(), 'two');
    assert.equals(Prime.Document.queryFirst('#select option[value=one]').getValue(), 'one');
    assert.equals(Prime.Document.queryFirst('#text').getValue(), 'Text value');
    assert.equals(Prime.Document.queryFirst('#textarea').getValue(), 'Textarea value');
  },

  'hasClass': function() {
    assert.isFalse(Prime.Document.queryFirst('#hasClassEmpty').hasClass('new-class'));
    assert.isTrue(Prime.Document.queryFirst('#hasClassSingleExisting').hasClass('existing'));
    assert.isFalse(Prime.Document.queryFirst('#hasClassSingleExisting').hasClass('not-existing'));
    assert.isTrue(Prime.Document.queryFirst('#hasClassMultipleExisting').hasClass('existing1'));
    assert.isTrue(Prime.Document.queryFirst('#hasClassMultipleExisting').hasClass('existing2'));
    assert.isTrue(Prime.Document.queryFirst('#hasClassMultipleExisting').hasClass('existing3'));
    assert.isTrue(Prime.Document.queryFirst('#hasClassMultipleExisting').hasClass('existing1 existing2'));
    assert.isTrue(Prime.Document.queryFirst('#hasClassMultipleExisting').hasClass('existing1 existing3'));
    assert.isTrue(Prime.Document.queryFirst('#hasClassMultipleExisting').hasClass('existing2 existing1'));
    assert.isTrue(Prime.Document.queryFirst('#hasClassMultipleExisting').hasClass('existing2 existing3'));
    assert.isTrue(Prime.Document.queryFirst('#hasClassMultipleExisting').hasClass('existing3 existing1'));
    assert.isTrue(Prime.Document.queryFirst('#hasClassMultipleExisting').hasClass('existing3 existing2'));
    assert.isTrue(Prime.Document.queryFirst('#hasClassMultipleExisting').hasClass('existing1 existing2 existing3'));
    assert.isFalse(Prime.Document.queryFirst('#hasClassMultipleExisting').hasClass('existing')); // This should fail because it isn't a match
    assert.isFalse(Prime.Document.queryFirst('#hasClassMultipleExisting').hasClass('existing1 fake-class'));
  },

  'hide': function() {
    Prime.Document.queryFirst('#hide').hide();

    var element = document.getElementById('hide');
    assert.equals(element.style.display, 'none');
  },

  /**
   * Tests .is(selector)
   */
  'is': function() {
    assert.isTrue(Prime.Document.queryFirst('#is-test td').is('td'));
    assert.isTrue(Prime.Document.queryFirst('#is-test tr').is('tr'));
    assert.isTrue(Prime.Document.queryFirst('#is-test textarea').is('textarea'));
    assert.isTrue(Prime.Document.queryFirst('#is-test input').is('input'));
    assert.isTrue(Prime.Document.queryFirst('#is-test input[name=is-test]').is('input'));
    assert.isFalse(Prime.Document.queryFirst('#is-test tr').is('td'));
    assert.isTrue(Prime.Document.queryFirst('#is-test div.foo').is('div'));
    assert.isFalse(Prime.Document.queryFirst('#is-test div.foo').is('div.bar'));
    assert.isTrue(Prime.Document.queryFirst('#is-test div.foo.bar').is('div'));
    assert.isTrue(Prime.Document.queryFirst('#is-test div.foo.bar').is('div.foo'));
    assert.isTrue(Prime.Document.queryFirst('#is-test div.foo.bar').is('div.foo.bar'));
    assert.isTrue(Prime.Document.queryFirst('#is-test div.display-none').is('div.display-none'));
    assert.isTrue(Prime.Document.queryFirst('#is-test div.display-none').is('div'));
    assert.isFalse(Prime.Document.queryFirst('#is-test div.display-none').is('div.bar'));
    assert.isFalse(Prime.Document.queryFirst('#is-test div.display-none').is('td'));

    var element1 = Prime.Document.queryFirst('div');
    assert.isTrue(element1.is('div'));

    var element2 = Prime.Document.queryFirst('a');
    assert.isTrue(element2.is('a'));

    var element3 = Prime.Document.queryFirst('div.foo.bar');
    assert.isTrue(element3.is('.foo'));
    assert.isTrue(element3.is('.bar'));
    assert.isTrue(element3.is('.foo.bar'));
    assert.isTrue(element3.is('.bar.foo'));

    assert.isFalse(element3.is('.div'));
    assert.isFalse(element3.is('.baz'));
    assert.isFalse(element3.is('a'));
    assert.isFalse(element3.is('span'));

    var element4 = Prime.Document.queryFirst('#is-test textarea', element4);
    assert.isTrue(element4.is('textarea'));
    assert.isTrue(element4.is('td textarea'));
    assert.isTrue(element4.is('tr td textarea'));
    assert.isTrue(element4.is('table tr td textarea'));
    assert.isTrue(element4.is('#is-test table tr td textarea'));
    assert.isTrue(element4.is('#is-test > table tr td textarea'));
    assert.isFalse(element4.is('div > textarea'));
    assert.isFalse(element4.is('a > textarea'));
    assert.isFalse(element4.is('body > textarea'));
    assert.isFalse(element4.is('input'));
    assert.isFalse(element4.is('a'));
  },

  /**
   * Tests the isInside function.
   */
  'isInside': function() {
    var outer = Prime.Document.queryById('query');
    var inner1 = Prime.Document.queryById('queryOne');
    var inner2 = Prime.Document.queryById('queryTwo');
    var inner3 = Prime.Document.queryById('queryThree');
    assert.isTrue(inner1.isInside(outer));
    assert.isTrue(inner2.isInside(outer));
    assert.isTrue(inner3.isInside(outer));
    assert.isFalse(inner1.isInside(inner2));
    assert.isFalse(inner1.isInside(inner3));
    assert.isFalse(inner2.isInside(inner1));
    assert.isFalse(inner2.isInside(inner3));
    assert.isFalse(inner3.isInside(inner1));
    assert.isFalse(inner3.isInside(inner2));
  },

  /**
   * Tests inserting a new Element into the DOM after other elements.
   */
  'insertBefore': {
    setUp: function() {
      this.verifyInsertBefore = function(newElement, nextSiblingID, tagName, previousSiblingCount) {
        assert(newElement);
        assert(newElement.nextSibling);
        assert.equals(newElement.nextSibling.id, nextSiblingID);
        assert.equals(newElement.tagName, tagName);
        assert.hasPreviousElementSiblings(newElement, previousSiblingCount);
      };

      this.verifyInsertBeforeFirst = function(newElement, nextSiblingID, tagName) {
        assert(newElement);
        assert(newElement.nextSibling);
        assert.equals(newElement.nextSibling.id, nextSiblingID);
        assert.equals(newElement.tagName, tagName);
        assert.hasPreviousElementSiblings(newElement, 0);
      };
    },

    tearDown: function() {
      Prime.Document.query('#insertSingleElementNew').removeAllFromDOM();
      Prime.Document.query('#insertMultipleElementNew').removeAllFromDOM();
      refute(document.getElementById('insertSingleElementNew'));
      refute(document.getElementById('insertMultipleElementNew'));
    },

    'insertBeforeSingleDOMElement': function() {
      Prime.Document.newElement('<a/>').
          setID('insertSingleElementNew').
          insertBefore(document.getElementById('insertSingleElement'));

      var newElement = document.getElementById('insertSingleElementNew');
      this.verifyInsertBeforeFirst(newElement, 'insertSingleElement', 'A');
    },

    'insertAfterSinglePrimeElement': function() {
      Prime.Document.newElement('<a/>').
          setID('insertSingleElementNew').
          insertBefore(Prime.Document.queryFirst('#insertSingleElement'));

      var newElement = document.getElementById('insertSingleElementNew');
      this.verifyInsertBeforeFirst(newElement, 'insertSingleElement', 'A');
    },

    'insertBeforeFirstMultipleDOMElement': function() {
      Prime.Document.newElement('<a/>').
          setID('insertMultipleElementNew').
          insertBefore(document.getElementById('insertMultipleOne'));

      var newElement = document.getElementById('insertMultipleElementNew');
      this.verifyInsertBeforeFirst(newElement, 'insertMultipleOne', 'A');
    },

    'insertBeforeFirstMultiplePrimeElement': function() {
      Prime.Document.newElement('<a/>').
          setID('insertMultipleElementNew').
          insertBefore(Prime.Document.queryFirst('#insertMultipleOne'));

      var newElement = document.getElementById('insertMultipleElementNew');
      this.verifyInsertBeforeFirst(newElement, 'insertMultipleOne', 'A');
    },

    'insertBeforeMiddleMultipleDOMElement': function() {
      Prime.Document.newElement('<a/>').
          setID('insertMultipleElementNew').
          insertBefore(document.getElementById('insertMultipleTwo'));

      var newElement = document.getElementById('insertMultipleElementNew');
      this.verifyInsertBefore(newElement, 'insertMultipleTwo', 'A', 1);
    },

    'insertBeforeMiddleMultiplePrimeElement': function() {
      Prime.Document.newElement('<a/>').
          setID('insertMultipleElementNew').
          insertBefore(Prime.Document.queryFirst('#insertMultipleTwo'));

      var newElement = document.getElementById('insertMultipleElementNew');
      this.verifyInsertBefore(newElement, 'insertMultipleTwo', 'A', 1);
    },

    'insertBeforeLastMultipleDOMElement': function() {
      Prime.Document.newElement('<a/>').
          setID('insertMultipleElementNew').
          insertBefore(document.getElementById('insertMultipleThree'));

      var newElement = document.getElementById('insertMultipleElementNew');
      this.verifyInsertBefore(newElement, 'insertMultipleThree', 'A', 2);
    },

    'insertBeforeLastMultiplePrimeElement': function() {
      Prime.Document.newElement('<a/>').
          setID('insertMultipleElementNew').
          insertBefore(Prime.Document.queryFirst('#insertMultipleThree'));

      var newElement = document.getElementById('insertMultipleElementNew');
      this.verifyInsertBefore(newElement, 'insertMultipleThree', 'A', 2);
    },

    'insertBeforeExisting': function() {
      var target = Prime.Document.queryById('insertBefore');
      var mover = Prime.Document.queryById('insertBeforeMove');

      mover.insertBefore(target);
      var parent = document.getElementById('insertBeforeExisting');
      assert.equals(parent.children[0].id, 'insertBeforeMove');
      assert.equals(parent.children[1].id, 'insertBefore');
    }
  },

  /**
   * Tests inserting a new Element into the DOM before other elements.
   */
  'insertAfter': {
    setUp: function() {
      this.verifyInsertAfter = function(newElement, previousSiblingID, tagName, nextSiblingCount) {
        assert(newElement);
        assert(newElement.previousSibling);
        assert.equals(newElement.previousSibling.id, previousSiblingID);
        assert.equals(newElement.tagName, tagName);
        assert.hasNextElementSiblings(newElement, nextSiblingCount);
      };

      this.verifyInsertAfterEnd = function(newElement, previousSiblingID, tagName) {
        assert(newElement);
        assert(newElement.previousSibling);
        assert.equals(newElement.previousSibling.id, previousSiblingID);
        assert.equals(newElement.tagName, tagName);
        assert.hasNextElementSiblings(newElement, 0);
      };
    },

    tearDown: function() {
      Prime.Document.query('#insertSingleElementNew').removeAllFromDOM();
      Prime.Document.query('#insertMultipleElementNew').removeAllFromDOM();
      refute(document.getElementById('insertSingleElementNew'));
      refute(document.getElementById('insertMultipleElementNew'));
    },

    'insertAfterSingleDOMElement': function() {
      Prime.Document.newElement('<a/>').
          setID('insertSingleElementNew').
          insertAfter(document.getElementById('insertSingleElement'));

      var newElement = document.getElementById('insertSingleElementNew');
      this.verifyInsertAfterEnd(newElement, 'insertSingleElement', 'A');
    },

    'insertAfterSinglePrimeElement': function() {
      Prime.Document.newElement('<a/>').
          setID('insertSingleElementNew').
          insertAfter(Prime.Document.queryFirst('#insertSingleElement'));

      var newElement = document.getElementById('insertSingleElementNew');
      this.verifyInsertAfterEnd(newElement, 'insertSingleElement', 'A');
    },

    'insertAfterFirstMultipleDOMElement': function() {
      Prime.Document.newElement('<a/>').
          setID('insertMultipleElementNew').
          insertAfter(document.getElementById('insertMultipleOne'));

      var newElement = document.getElementById('insertMultipleElementNew');
      this.verifyInsertAfter(newElement, 'insertMultipleOne', 'A', 2);
    },

    'insertAfterFirstMultiplePrimeElement': function() {
      Prime.Document.newElement('<a/>').
          setID('insertMultipleElementNew').
          insertAfter(Prime.Document.queryFirst('#insertMultipleOne'));

      var newElement = document.getElementById('insertMultipleElementNew');
      this.verifyInsertAfter(newElement, 'insertMultipleOne', 'A', 2);
    },

    'insertAfterMiddleMultipleDOMElement': function() {
      Prime.Document.newElement('<a/>').
          setID('insertMultipleElementNew').
          insertAfter(document.getElementById('insertMultipleTwo'));

      var newElement = document.getElementById('insertMultipleElementNew');
      this.verifyInsertAfter(newElement, 'insertMultipleTwo', 'A', 1);
    },

    'insertAfterMiddleMultiplePrimeElement': function() {
      Prime.Document.newElement('<a/>').
          setID('insertMultipleElementNew').
          insertAfter(Prime.Document.queryFirst('#insertMultipleTwo'));

      var newElement = document.getElementById('insertMultipleElementNew');
      this.verifyInsertAfter(newElement, 'insertMultipleTwo', 'A', 1);
    },

    'insertAfterLastMultipleDOMElement': function() {
      Prime.Document.newElement('<a/>').
          setID('insertMultipleElementNew').
          insertAfter(document.getElementById('insertMultipleThree'));

      var newElement = document.getElementById('insertMultipleElementNew');
      this.verifyInsertAfterEnd(newElement, 'insertMultipleThree', 'A');
    },

    'insertAfterLastMultiplePrimeElement': function() {
      Prime.Document.newElement('<a/>').
          setID('insertMultipleElementNew').
          insertAfter(Prime.Document.queryFirst('#insertMultipleThree'));

      var newElement = document.getElementById('insertMultipleElementNew');
      this.verifyInsertAfterEnd(newElement, 'insertMultipleThree', 'A');
    },

    'insertAfterExisting': function() {
      var target = Prime.Document.queryById('insertAfter');
      var mover = Prime.Document.queryById('insertAfterMove');

      mover.insertAfter(target);
      var parent = document.getElementById('insertAfterExisting');
      assert.equals(parent.children[0].id, 'insertAfter');
      assert.equals(parent.children[1].id, 'insertAfterMove');
    }
  },

  'insertTextAfter': function() {
    var div = Prime.Document.queryFirst('#insertTextAfter');
    var a = Prime.Document.queryFirst('#insertTextAfter a');
    a.insertTextAfter(' foo');
    assert.equals(div.getTextContent().trim(), 'To insert after foo');
  },

  'insertTextBefore': function() {
    var div = Prime.Document.queryFirst('#insertTextBefore');
    var a = Prime.Document.queryFirst('#insertTextBefore a');
    a.insertTextBefore('foo ');
    assert.equals(div.getTextContent().trim(), 'foo To insert before');
  },

  'isChildOf': function() {
    var nested1 = Prime.Document.queryById('nested1');
    assert.isFalse(Prime.Document.queryById('nested1').isChildOf(nested1));
    assert.isTrue(Prime.Document.queryById('nested2').isChildOf(nested1));
    assert.isTrue(Prime.Document.queryById('nested3').isChildOf(nested1));
    assert.isTrue(Prime.Document.queryById('nested4').isChildOf(nested1));

    var nested2 = Prime.Document.queryById('nested2');
    assert.isFalse(Prime.Document.queryById('nested1').isChildOf(nested2));
    assert.isFalse(Prime.Document.queryById('nested2').isChildOf(nested2));
    assert.isTrue(Prime.Document.queryById('nested3').isChildOf(nested2));
    assert.isTrue(Prime.Document.queryById('nested4').isChildOf(nested2));

    var nested3 = Prime.Document.queryById('nested3');
    assert.isFalse(Prime.Document.queryById('nested1').isChildOf(nested3));
    assert.isFalse(Prime.Document.queryById('nested2').isChildOf(nested3));
    assert.isFalse(Prime.Document.queryById('nested3').isChildOf(nested3));
    assert.isTrue(Prime.Document.queryById('nested4').isChildOf(nested3));

    var nested4 = Prime.Document.queryById('nested4');
    assert.isFalse(Prime.Document.queryById('nested1').isChildOf(nested4));
    assert.isFalse(Prime.Document.queryById('nested2').isChildOf(nested4));
    assert.isFalse(Prime.Document.queryById('nested3').isChildOf(nested4));
    assert.isFalse(Prime.Document.queryById('nested4').isChildOf(nested4));
  },

  'isVisible': function() {
    assert.isFalse(Prime.Document.queryById('hidden').isVisible());
    assert.isFalse(Prime.Document.queryById('display-none').isVisible());
    assert.isTrue(Prime.Document.queryById('query').isVisible());
  },

  'prependTo': {
    tearDown: function() {
      Prime.Document.query('#prependToSingleElementNew').removeAllFromDOM();
      Prime.Document.query('#prependToMultipleElementNew').removeAllFromDOM();
      refute(document.getElementById('prependToSingleElementNew'));
      refute(document.getElementById('prependToMultipleElementNew'));
    },

    'prependToSingleDOMElement': function() {
      Prime.Document.newElement('<a/>').
          setID('prependToSingleElementNew').
          prependTo(document.getElementById('insertSingle'));

      var newElement = document.getElementById('prependToSingleElementNew');
      assert.hasPreviousElementSiblings(newElement, 0);
      assert.hasNextElementSiblings(newElement, 1);
      assert.equals(findNextElementSibling(newElement).id, 'insertSingleElement');
    },

    'prependToSinglePrimeElement': function() {
      Prime.Document.newElement('<a/>').
          setID('prependToSingleElementNew').
          prependTo(Prime.Document.queryFirst('#insertSingle'));

      var newElement = document.getElementById('prependToSingleElementNew');
      assert.hasPreviousElementSiblings(newElement, 0);
      assert.hasNextElementSiblings(newElement, 1);
      assert.equals(findNextElementSibling(newElement).id, 'insertSingleElement');
    },

    'prependToMultipleDOMElement': function() {
      Prime.Document.newElement('<a/>').
          setID('prependToMultipleElementNew').
          prependTo(document.getElementById('insertMultiple'));

      var newElement = document.getElementById('prependToMultipleElementNew');
      assert.hasPreviousElementSiblings(newElement, 0);
      assert.hasNextElementSiblings(newElement, 3);
      assert.equals(findNextElementSibling(newElement).id, 'insertMultipleOne');
    },

    'prependToMultiplePrimeElement': function() {
      Prime.Document.newElement('<a/>').
          setID('prependToMultipleElementNew').
          prependTo(Prime.Document.queryFirst('#insertMultiple'));

      var newElement = document.getElementById('prependToMultipleElementNew');
      assert.hasPreviousElementSiblings(newElement, 0);
      assert.hasNextElementSiblings(newElement, 3);
      assert.equals(findNextElementSibling(newElement).id, 'insertMultipleOne');
    }
  },

  'removeClass': {
    setUp: function() {
      this.classEmpty = document.getElementById('classEmpty').className;
      this.classSingleExisting = document.getElementById('classSingleExisting').className;
      this.classMultipleExisting = document.getElementById('classMultipleExisting').className;
    },

    tearDown: function() {
      document.getElementById('classEmpty').className = this.classEmpty;
      document.getElementById('classSingleExisting').className = this.classSingleExisting;
      document.getElementById('classMultipleExisting').className = this.classMultipleExisting;
    },

    'removeClassEmptyRemoveSingle': function() {
      var elem = document.getElementById('classEmpty');
      Prime.Document.queryFirst('#classEmpty').removeClass('new-class');
      refute(elem.className);
    },

    'removeClassEmptyRemoveMultiple': function() {
      var elem = document.getElementById('classEmpty');
      Prime.Document.queryFirst('#classEmpty').removeClass('new-class1 new-class2');
      refute(elem.className);
    },

    'removeClassSingleExistingRemoveOne': function() {
      var elem = document.getElementById('classSingleExisting');
      Prime.Document.queryFirst('#classSingleExisting').removeClass('existing');
      refute(elem.className);
    },

    'removeClassSingleExistingRemoveMultiple': function() {
      var elem = document.getElementById('classSingleExisting');
      Prime.Document.queryFirst('#classSingleExisting').removeClass('existing new-class');
      refute(elem.className);
    },

    'removeClassMultipleExistingRemoveOneFirst': function() {
      var elem = document.getElementById('classMultipleExisting');
      Prime.Document.queryFirst('#classMultipleExisting').removeClass('existing1');
      assert.equals(elem.className, 'existing2 existing3');
    },

    'removeClassMultipleExistingRemoveSubstring': function() {
      var elem = document.getElementById('classMultipleExisting');
      Prime.Document.queryFirst('#classMultipleExisting').removeClass('existing');
      assert.equals(elem.className, 'existing1 existing2 existing3');
    },

    'removeClassMultipleExistingRemoveSuperstring': function() {
      var elem = document.getElementById('classMultipleExisting');
      Prime.Document.queryFirst('#classMultipleExisting').removeClass('existing11');
      assert.equals(elem.className, 'existing1 existing2 existing3');
    },

    'removeClassMultipleExistingRemoveOneMiddle': function() {
      var elem = document.getElementById('classMultipleExisting');
      Prime.Document.queryFirst('#classMultipleExisting').removeClass('existing2');
      assert.equals(elem.className, 'existing1 existing3');
    },

    'removeClassMultipleExistingRemoveOneLast': function() {
      var elem = document.getElementById('classMultipleExisting');
      Prime.Document.queryFirst('#classMultipleExisting').removeClass('existing3');
      assert.equals(elem.className, 'existing1 existing2');
    },

    'removeClassMultipleExistingRemoveMultipleFirstMiddle': function() {
      var elem = document.getElementById('classMultipleExisting');
      Prime.Document.queryFirst('#classMultipleExisting').removeClass('existing1 existing2');
      assert.equals(elem.className, 'existing3');
    },

    'removeClassMultipleExistingRemoveMultipleMiddleLast': function() {
      var elem = document.getElementById('classMultipleExisting');
      Prime.Document.queryFirst('#classMultipleExisting').removeClass('existing2 existing3');
      assert.equals(elem.className, 'existing1');
    },

    'removeClassMultipleExistingRemoveMultipleFirstLast': function() {
      var elem = document.getElementById('classMultipleExisting');
      Prime.Document.queryFirst('#classMultipleExisting').removeClass('existing1 existing3');
      assert.equals(elem.className, 'existing2');
    },

    'removeClassMultipleExistingRemoveMultipleLastFirst': function() {
      var elem = document.getElementById('classMultipleExisting');
      Prime.Document.queryFirst('#classMultipleExisting').removeClass('existing3 existing1');
      assert.equals(elem.className, 'existing2');
    },

    'removeClassMultipleExistingRemoveMultipleAll': function() {
      var elem = document.getElementById('classMultipleExisting');
      Prime.Document.queryFirst('#classMultipleExisting').removeClass('existing2 existing3 existing1');
      refute(elem.className);
    },

    'removeClassNonExistingSingle': function() {
      var elem = document.getElementById('classSingleExisting');
      Prime.Document.queryFirst('#classSingleExisting').removeClass('non-existing');
      assert.equals(elem.className, 'existing');
    }
  },

  'setChecked': function() {
    Prime.Document.queryById('two-checkbox-checked').setChecked(true);
    assert.isTrue(Prime.Document.queryById('one-checkbox-checked').isChecked());
    assert.isTrue(Prime.Document.queryById('two-checkbox-checked').isChecked());
    assert.isTrue(Prime.Document.queryById('three-checkbox-checked').isChecked());

    Prime.Document.queryById('two-checkbox-checked').setChecked(false);
    assert.isTrue(Prime.Document.queryById('one-checkbox-checked').isChecked());
    assert.isFalse(Prime.Document.queryById('two-checkbox-checked').isChecked());
    assert.isTrue(Prime.Document.queryById('three-checkbox-checked').isChecked());

    Prime.Document.queryById('two-radio-checked').setChecked(true);
    assert.isFalse(Prime.Document.queryById('one-radio-checked').isChecked());
    assert.isTrue(Prime.Document.queryById('two-radio-checked').isChecked());
    assert.isFalse(Prime.Document.queryById('three-radio-checked').isChecked());

    Prime.Document.queryById('two-radio-checked').setChecked(false);
    assert.isFalse(Prime.Document.queryById('one-radio-checked').isChecked());
    assert.isFalse(Prime.Document.queryById('two-radio-checked').isChecked());
    assert.isFalse(Prime.Document.queryById('three-radio-checked').isChecked());
  },

  'setDisabled': function() {
    Prime.Document.queryById('checkbox-disabled').setDisabled(true);
    assert.isTrue(Prime.Document.queryById('checkbox-disabled').isDisabled());

    var select = Prime.Document.queryById('select-disabled');
    select.getChildren().each(function(option) {
      option.setDisabled(true);
    });
    select.getChildren().each(function(option) {
      assert.isTrue(option.isDisabled());
    });
  },

  'setAttributes': function() {
    Prime.Document.queryById('set-attributes').setAttributes({'rel': 'foo', 'width': '10%'});

    var element = document.getElementById('set-attributes');
    refute.isNull(element);
    assert.equals(element.attributes.getNamedItem('rel').value, 'foo');
    assert.equals(element.attributes.getNamedItem('width').value, '10%');
  },

  'setHTML': function() {
    Prime.Document.queryFirst('#html').setHTML('Changed');

    var element = document.getElementById('html');
    assert.equals(element.innerHTML, 'Changed');
  },

  'setTextContent': function() {
    Prime.Document.queryFirst('#html').setTextContent('Changed');

    var element = document.getElementById('html');
    assert.equals(element.textContent, 'Changed');
  },

  'setHeight': function() {
    var element = Prime.Document.queryById('set-styles').setHeight(10);
    assert.equals(element.getStyle('height'), '10px');
    assert.equals(element.getHeight(), 10);

    element.setHeight('10em');
    assert.equals(element.getStyle('height'), '10em');
    assert.isTrue(element.getHeight() > 0); // Just make sure it doesn't throw since the computed style is always in pixels
  },

  'setHTMLByElement': function() {
    Prime.Document.queryFirst('#htmlByElement').setHTML(Prime.Document.queryById('htmlByElementTarget'));

    var element = document.getElementById('htmlByElement');
    assert.equals(element.innerHTML, 'By Element Target');
  },

  'setLeft': function() {
    var element = Prime.Document.queryById('set-styles').setLeft(10);
    assert.equals(element.getStyle('left'), '10px');

    element.setLeft('10em');
    assert.equals(element.getStyle('left'), '10em');
  },

  'setSelectedValues': function() {
    Prime.Document.queryById('two-checkbox-select').setSelectedValues('three');
    assert.isFalse(Prime.Document.queryById('one-checkbox-select').isChecked());
    assert.isFalse(Prime.Document.queryById('two-checkbox-select').isChecked());
    assert.isTrue(Prime.Document.queryById('three-checkbox-select').isChecked());

    Prime.Document.queryById('three-checkbox-select').setSelectedValues('one', 'two');
    assert.isTrue(Prime.Document.queryById('one-checkbox-select').isChecked());
    assert.isTrue(Prime.Document.queryById('two-checkbox-select').isChecked());
    assert.isFalse(Prime.Document.queryById('three-checkbox-select').isChecked());

    Prime.Document.queryById('three-checkbox-select').setSelectedValues(['one', 'three']);
    assert.isTrue(Prime.Document.queryById('one-checkbox-select').isChecked());
    assert.isFalse(Prime.Document.queryById('two-checkbox-select').isChecked());
    assert.isTrue(Prime.Document.queryById('three-checkbox-select').isChecked());

    Prime.Document.queryById('two-radio-select').setSelectedValues('two');
    assert.isFalse(Prime.Document.queryById('one-radio-select').isChecked());
    assert.isTrue(Prime.Document.queryById('two-radio-select').isChecked());
    assert.isFalse(Prime.Document.queryById('three-radio-select').isChecked());

    Prime.Document.queryById('two-radio-select').setSelectedValues('three');
    assert.isFalse(Prime.Document.queryById('one-radio-select').isChecked());
    assert.isFalse(Prime.Document.queryById('two-radio-select').isChecked());
    assert.isTrue(Prime.Document.queryById('three-radio-select').isChecked());

    Prime.Document.queryById('select-single-select').setSelectedValues('three');
    assert.equals(Prime.Document.queryById('select-single-select').getSelectedValues(), ['three']);

    Prime.Document.queryById('select-multiple-select').setSelectedValues('two');
    assert.equals(Prime.Document.queryById('select-multiple-select').getSelectedValues(), ['two']);

    Prime.Document.queryById('select-multiple-select').setSelectedValues('one', 'three');
    assert.equals(Prime.Document.queryById('select-multiple-select').getSelectedValues(), ['one', 'three']);

    Prime.Document.queryById('select-multiple-select').setSelectedValues(['one', 'two']);
    assert.equals(Prime.Document.queryById('select-multiple-select').getSelectedValues(), ['one', 'two']);
  },

  'setStyles': function() {
    Prime.Document.queryById('set-styles').setStyles({'text-align': 'right', 'width': '10%'});

    var element = document.getElementById('set-styles');
    refute.isNull(element);
    assert.equals(element.style['text-align'], 'right');
    assert.equals(element.style['width'], '10%');
  },

  'setTop': function() {
    var element = Prime.Document.queryById('set-styles').setTop(10);
    assert.equals(element.getStyle('top'), '10px');

    element = element.setTop('10em');
    assert.equals(element.getStyle('top'), '10em');
  },

  'setValue': function() {
    assert.equals(Prime.Document.queryById('one-checkbox-set').setValue('one-changed').getValue(), 'one-changed');
    assert.isTrue(Prime.Document.queryById('one-checkbox-set').isChecked());
    assert.equals(Prime.Document.queryById('two-checkbox-set').setValue('two-changed').getValue(), 'two-changed');
    assert.isFalse(Prime.Document.queryById('two-checkbox-set').isChecked());
    assert.equals(Prime.Document.queryById('one-radio-set').setValue('one-changed').getValue(), 'one-changed');
    assert.isTrue(Prime.Document.queryById('one-radio-set').isChecked());
    assert.equals(Prime.Document.queryById('two-radio-set').setValue('two-changed').getValue(), 'two-changed');
    assert.isFalse(Prime.Document.queryById('two-radio-set').isChecked());
    assert.equals(Prime.Document.queryById('text-set').setValue('text-set-changed').getValue(), 'text-set-changed');
    assert.equals(Prime.Document.queryById('textarea-set').setValue('textarea-set-changed').getValue(), 'textarea-set-changed');
  },

  'setWidth': function() {
    var element = Prime.Document.queryById('set-styles').setWidth(10);
    assert.equals(element.getStyle('width'), '10px');
    assert.equals(element.getWidth(), 10);

    element.setWidth('10em');
    assert.equals(element.getStyle('width'), '10em');
    assert.isTrue(element.getWidth() > 0); // Just make sure it doesn't throw since the computed style is always in pixels
  },

  'show': function() {
    // Test inline styles with show. This should end up empty string
    Prime.Document.queryFirst('#show').show();

    var element = document.getElementById('show');
    assert.equals(element.style.display, '');

    // Test computed style is block, so this should also end up empty string.
    Prime.Document.queryFirst('#hide').hide();
    Prime.Document.queryFirst('#hide').show();

    element = document.getElementById('hide');
    assert.equals(element.style.display, '');

    // Test a stylesheet display: none and guessing it is a block element
    Prime.Document.queryFirst('#showCSSBlock').hide();
    Prime.Document.queryFirst('#showCSSBlock').show();

    element = document.getElementById('showCSSBlock');
    assert.equals(element.style.display, 'block');

    // Test a stylesheet display: none and guessing it is a inline element
    Prime.Document.queryFirst('#showCSSInline').hide();
    Prime.Document.queryFirst('#showCSSInline').show();

    element = document.getElementById('showCSSInline');
    assert.equals(element.style.display, 'inline');

    // Test a stylesheet display: none and then forcing it to be inline-block via the parameter
    Prime.Document.queryFirst('#showCSSInline').hide();
    Prime.Document.queryFirst('#showCSSInline').show('table-cell');

    element = document.getElementById('showCSSInline');
    assert.equals(element.style.display, 'table-cell');
  },

  'eventsUsingFunction single listener': function(done) {
    var called = false;
    var called2 = false;
    var memo = null;
    var memo2 = null;
    var handler = function(event) {
      called = true;
      memo = event.memo;
    };

    Prime.Document.queryFirst('#event').
        addEventListener('click', handler).
        fireEvent('click', 'memo');

    setTimeout(function() {
      assert.isTrue(called);
      assert.isFalse(called2);
      assert.equals(memo, 'memo');
      assert.isNull(memo2);
      done();
    }, 50);
  },

  'eventUsingFunction remove single listener': function(done) {
    var called = false;
    var called2 = false;
    var memo = null;
    var memo2 = null;
    var handler = function(event) {
      called = true;
      memo = event.memo;
    };

    Prime.Document.queryFirst('#event').
        addEventListener('click', handler).
        removeEventListener('click', handler).
        fireEvent('click', 'memo');

    setTimeout(function() {
      assert.isFalse(called);
      assert.isFalse(called2);
      assert.isNull(memo);
      assert.isNull(memo2);
      done();
    }, 50);
  },

  'eventUsingFunction multiple listeners': function(done) {
    var called = false;
    var called2 = false;
    var memo = null;
    var memo2 = null;
    var handler = function(event) {
      called = true;
      memo = event.memo;
    };
    var handler2 = function(event) {
      called2 = true;
      memo2 = event.memo;
    };

    Prime.Document.queryFirst('#event').
        addEventListener('click', handler).
        addEventListener('click', handler2).
        fireEvent('click', 'memo');

    window.setTimeout(function() {
      assert.isTrue(called);
      assert.isTrue(called2);
      assert.equals(memo, 'memo');
      assert.equals(memo2, 'memo');
      done();
    }, 50);
  },

  'eventUsingFunction remove all listeners': function(done) {
    var called = false;
    var called2 = false;
    var memo = null;
    var memo2 = null;
    var handler = function(event) {
      called = true;
      memo = event.memo;
    };
    var handler2 = function(event) {
      called2 = true;
      memo2 = event.memo;
    };

    Prime.Document.queryFirst('#event').
        addEventListener('click', handler).
        addEventListener('click', handler2).
        removeAllEventListeners().
        fireEvent('click', 'memo');

    window.setTimeout(function() {
      assert.isFalse(called);
      assert.isFalse(called2);
      assert.isNull(memo);
      assert.isNull(memo2);
      done();
    }, 50);
  },

  'eventsUsingObject': function() {
    var MyEventListener = function() {
      Prime.Utils.bindAll(this);
      this.called = false;
      this.memo = null;
    };
    MyEventListener.prototype = {
      handle: function(event) {
        this.called = true;
        this.memo = event.memo;
      }
    };

    var instance = new MyEventListener();
    Prime.Document.queryFirst('#event')
        .addEventListener('click', instance.handle)
        .fireEvent('click', 'memo');

    assert.isTrue(instance.called);
    assert.equals(instance.memo, 'memo');

    // Unbind the listener and click it again
    instance.called = false;
    instance.memo = null;
    Prime.Document.queryFirst('#event')
        .removeEventListener('click', instance.handle)
        .fireEvent('click', 'memo');

    assert.isFalse(instance.called);
    assert.isNull(instance.memo);
  },

  'customEvents': function() {
    var MyEventListener = function() {
      Prime.Utils.bindAll(this);
      this.called = false;
      this.count = 0;
      this.called2 = false;
      this.count2 = 0;
      this.memo = null;
      this.event = null;
    };
    MyEventListener.prototype = {
      handle: function(evt) {
        console.log('handle');
        this.called = true;
        this.count++;
        this.memo = evt.memo;
        this.event = evt.event;
      },

      handle2: function(evt) {
        console.log('handle2');
        this.called2 = true;
        this.count2++;
      }
    };

    var instance = new MyEventListener();
    Prime.Document.queryFirst('#event')
        .addEventListener('custom:pop', instance.handle)
        .addEventListener('custom:pop', instance.handle)
        .addEventListener('custom:pop', instance.handle)
        .fireEvent('custom:pop', 'foo');

    assert.isTrue(instance.called);
    assert.equals(instance.count, 1);
    assert.equals(instance.event, 'custom:pop');
    assert.equals(instance.memo, 'foo');

    // Remove the event listener and re-test
    instance.called = false;
    instance.count = 0;
    instance.memo = null;
    instance.event = null;
    Prime.Document.queryFirst('#event')
        .removeEventListener('custom:pop', instance.handle)
        .fireEvent('custom:pop', 'foo');

    assert.isFalse(instance.called);
    assert.equals(instance.count, 0);
    assert.isNull(instance.event);
    assert.isNull(instance.memo);

    // Add multiple listeners for a single event and then remove them all
    Prime.Document.queryFirst('#event')
        .addEventListener('custom:pop', instance.handle)
        .addEventListener('custom:pop', instance.handle2)
        .fireEvent('custom:pop', 'foo');
    assert.isTrue(instance.called);
    assert.equals(instance.count, 1);
    assert.isTrue(instance.called2);
    assert.equals(instance.count2, 1);

    instance.called = false;
    instance.count = 0;
    instance.called2 = false;
    instance.count2 = 0;
    Prime.Document.queryFirst('#event')
        .removeEventListeners('custom:pop')
        .fireEvent('custom:pop', 'foo');

    assert.isFalse(instance.called);
    assert.equals(instance.count, 0);
    assert.isFalse(instance.called2);
    assert.equals(instance.count2, 0);

    // Add multiple listeners for a single event and then remove them all using the global function
    Prime.Document.queryFirst('#event')
        .addEventListener('custom:pop', instance.handle)
        .addEventListener('custom:pop', instance.handle2)
        .fireEvent('custom:pop', 'foo');
    assert.isTrue(instance.called);
    assert.equals(instance.count, 1);
    assert.isTrue(instance.called2);
    assert.equals(instance.count2, 1);

    instance.called = false;
    instance.count = 0;
    instance.called2 = false;
    instance.count2 = 0;
    Prime.Document.queryFirst('#event')
        .removeAllEventListeners()
        .fireEvent('custom:pop', 'foo');

    assert.isFalse(instance.called);
    assert.equals(instance.count, 0);
    assert.isFalse(instance.called2);
    assert.equals(instance.count2, 0);
  },

  'opacity': function() {
    var element = Prime.Document.queryFirst('#html');
    assert.equals(element.getOpacity(), 1.0);

    element.setOpacity(0.5);
    assert.equals(element.getOpacity(), 0.5);
  },

  'query': function() {
    var list = Prime.Document.queryById('query').query('p.test');
    assert.equals(list.length, 3);
    assert.equals(list[0].getID(), 'queryOne');
    assert.equals(list[1].getID(), 'queryTwo');
    assert.equals(list[2].getID(), 'queryThree');
  },

  'queryUp': {
    setUp: function() {
      this.child = Prime.Document.queryById('child');
      this.parent = Prime.Document.queryById('parent');
      this.ancestor = Prime.Document.queryFirst('div.ancestor');
    },

    'find parent by id': function() {
      assert.equals(this.child.queryUp('#parent').domElement, this.parent.domElement);
    },

    'find parent by type + id': function() {
      assert.equals(this.child.queryUp('div#parent').domElement, this.parent.domElement);
    },

    'find parent by type only': function() {
      assert.equals(this.child.queryUp('div').domElement, this.parent.domElement);
    },

    'find ancestor': function() {
      assert.equals(this.child.queryUp('.ancestor').domElement, this.ancestor.domElement);
    },

    'find parent with a space in the selector': function() {
      assert.equals(this.child.queryUp('div #parent').domElement, this.parent.domElement);
      assert.equals(this.child.queryUp('body .ancestor').domElement, this.ancestor.domElement);
    }
  },

  'queryFirst': function() {
    var child = Prime.Document.queryById('query').queryFirst('.test');
    refute.isNull(child);
    assert.equals(child.getID(), 'queryOne')
  },

  'queryLast': function() {
    var child = Prime.Document.queryById('query').queryLast('.test');
    refute.isNull(child);
    assert.equals(child.getID(), 'queryThree')
  },

  'unwrap': function() {
    var element = Prime.Document.queryById('unwrap');
    assert.equals(element.getHTML(), '<span>Unwrap</span> Me');
    var span = element.queryFirst('span');
    span.unwrap();
    assert.equals(element.getHTML(), 'Unwrap Me');
  }
});
