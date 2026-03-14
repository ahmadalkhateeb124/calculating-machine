const CalculatorContainer = document.getElementById("calculator_container");
const DisplayArea = document.getElementById("display_area");
CalculatorContainer.addEventListener("click", (e) => {
  if (e.target.nodeName == "BUTTON") {
    switch (e.target.textContent) {
      case "C":
        Clear();
        break;
      case "DEL":
        DeletOneValue();
        break;
      case "=":
        Evaluate();
        break;
      default:
        AddtoDisplayArea(e.target.textContent);
    }
  }
});
function Clear() {
  DisplayArea.textContent = "";
}

function AddtoDisplayArea(value) {
  DisplayArea.textContent = DisplayArea.textContent + value;
}

function DeletOneValue() {
  let CurrentContent = DisplayArea.textContent;
  DisplayArea.textContent = CurrentContent.substring(
    0,
    CurrentContent.length - 1,
  );
}

function Evaluate() {
  try {
    let Culculation = eval(DisplayArea.textContent);
    DisplayArea.textContent = Culculation;
  } catch (error) {
    DisplayArea.textContent = "Invalid Operation";
    console.error(error);
  }
}
