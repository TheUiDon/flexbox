var flexParent = document.querySelector(".flex-parent");
var controlsContainer = document.querySelector(".controls-container");
var propertyInputs = Array.prototype.slice.call(
  document.querySelectorAll('input[type="radio"]')
);

var preview = document.querySelector(".preview");
var styleObj = { display: "flex" };

var flexChildren = Array.prototype.slice.call(
  document.querySelectorAll(".flex-child")
);
var childCount = document.getElementById("ChildCount");
var childrenText = document.querySelector(".children-text");

var copyPreview = document.getElementById("CopyPreview");

window.onload = function () {
  var theme = localStorage.getItem("data-theme");
  if (theme == "light") {
    document.documentElement.setAttribute("data-theme", "light");
  } else if (theme == "") {
    document.documentElement.setAttribute("data-theme", "light");
  } else if (theme == "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    document.getElementById("checkbox").checked = true;
  }
};
function toggle(a) {
  if (a.checkbox.checked == true) {
    document.documentElement.classList.add("transition");
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("data-theme", "dark");
  } else if (a.checkbox.checked == false) {
    document.documentElement.classList.add("transition");
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("data-theme", "light");
  }
}

localStorage.setItem("data-theme", "dark");
localStorage.setItem("data-theme", "light");

window.onload = function () {
  var theme = localStorage.getItem("data-theme");
  if (theme == "light") {
    document.documentElement.setAttribute("data-theme", "light");
  } else if (theme == "") {
    document.documentElement.setAttribute("data-theme", "light");
  } else if (theme == "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    document.getElementById("checkbox").checked = true;
  }
};

var updateFlexParent = function (input) {
  flexParent.style[input.name] = input.value;
};

var updateExplanations = function () {
  var flexDirectionValue = document.querySelector(
    'input[name="flex-direction"]:checked'
  ).value;

  // some parts of the explanation text depend on the flex-direction selection
  if (flexDirectionValue.match("row")) {
    // when `flex-direction: row`
    controlsContainer.classList.add("row-is-selected");
    controlsContainer.classList.remove("column-is-selected");
  } else if (flexDirectionValue.match("column")) {
    // when `flex-direction: column`
    controlsContainer.classList.add("column-is-selected");
    controlsContainer.classList.remove("row-is-selected");
  }
};

// event listener to write css preview output to clipboard
copyPreview.addEventListener("click", (evt) => {
  navigator.clipboard.writeText(preview.innerHTML);
  // feedback that the copy worked
  copyPreview.innerHTML = "copied!";
  copyPreview.classList.remove("copy-preview");
  setTimeout(() => {
    // reset
    copyPreview.innerHTML = "copy";
    copyPreview.classList.add("copy-preview");
  }, 1500);
});

function updateCodePreview(input) {
  styleObj[input.name] = input.value;

  var previewCss = JSON.stringify(styleObj, null, "\t");
  preview.innerHTML = previewCss
    .replace(/"/g, "")
    .replace(/,/g, ";")
    .replace(/(align-content.*)(\n)/, "$1;\n");
}

var inputListener = function (evt) {
  updateFlexParent(evt.target);
  updateExplanations();
  updateCodePreview(evt.target);
};

// initial setup
propertyInputs.forEach(function (input) {
  // event listener for each input
  input.addEventListener("change", inputListener);
  // inputs might not be on the default when page loads
  if (input.checked) {
    updateFlexParent(input);
    updateCodePreview(input);
  }
});
childCount.value = 12;
// set up change of child counts
childCount.addEventListener("input", function (evt) {
  var count = evt.target.value;

  flexChildren.forEach(function (child, i) {
    if (i >= count) {
      child.classList.add("hide");
    } else {
      child.classList.remove("hide");
    }
  });

  if (count > 1) {
    childrenText.innerHTML = "children";
  } else {
    childrenText.innerHTML = "child";
  }
});
updateExplanations();
