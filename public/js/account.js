// Mobile table
window.setMobileTable = function (selector) {
  if (window.innerWidth > 600) {
    return false;
  }
  const tableEl = document.querySelector(selector);
  const thEls = tableEl.querySelectorAll("thead th");
  const tdLabels = Array.from(thEls).map((el) => el.innerText);
  console.log(tdLabels);
  tableEl.querySelectorAll("tbody tr").forEach((tr) => {
    Array.from(tr.children).forEach((td, ndx) =>
      td.setAttribute("label", tdLabels[ndx]),
    );
  });
};

// Profile picture account form
document.getElementById("file-input").addEventListener("change", function () {
  alert("eae");
});
