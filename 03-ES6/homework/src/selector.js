var traverseDomAndCollectElements = function (matchFunc, startEl) {
  var resultSet = [];

  if (typeof startEl === "undefined") {
    startEl = document.body;
  }

  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
  // usa matchFunc para identificar elementos que matchien

  // TU CÓDIGO AQUÍ
  if (matchFunc(startEl)) resultSet.push(startEl);

  for (const element of startEl.children) {
    resultSet = resultSet.concat(traverseDomAndCollectElements(matchFunc, element))   
  }

  return resultSet;
};

// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id, class, tag.class, tag

var selectorTypeMatcher = function (selector) {
  // tu código aquí
  switch (selector[0]) {
    case "#":
      return "id";
    case ".":
      return "class";
    default: {
      if (selector.split(".").length > 1) return "tag.class";
      return "tag";
    }
  }
};

// NOTA SOBRE LA FUNCIÓN MATCH
// recuerda, la función matchFunction devuelta toma un elemento como un
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.

var matchFunctionMaker = function (selector) {
  var selectorType = selectorTypeMatcher(selector);
  var matchFunction;
  if (selectorType === "id") {
    matchFunction = (element) => `#${element.id}` === selector;
    // matchFunction = function (element) {
    //   if (`#${element.id}` === selector) {
    //     return true
    //   } else {
    //     return false
    //   }
    // }
  } else if (selectorType === "class") {
    matchFunction = element => {
      for (const className of element.classList) {
        if (`.${className}` === selector) return true;
      }
      return false;
    };
  } else if (selectorType === "tag.class") {
    matchFunction = (element) => {
      const [tag, className] = selector.split(".");
      if (element.tagName.toLowerCase() === tag) {
        return element.classList.contains(className);
      }
      return false;
    };
  } else if (selectorType === "tag") {
    matchFunction = (element) => element.tagName.toLowerCase() === selector;
  }
  return matchFunction;
};

var $ = function (selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};
