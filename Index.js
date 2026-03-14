const CalculatorContainer = document.getElementById("calculator_container");
const DisplayArea = document.getElementById("display_area");

// Add data-type attributes to buttons for better styling
document.querySelectorAll(".calculator_row button").forEach((button) => {
  const text = button.textContent;
  if (["+", "-", "*", "/", "(", ")"].includes(text)) {
    button.setAttribute("data-type", "operator");
  } else if (text === "=") {
    button.setAttribute("data-type", "equals");
  } else if (text === "C") {
    button.setAttribute("data-type", "clear");
  } else if (text === "DEL") {
    button.setAttribute("data-type", "delete");
  }
});

CalculatorContainer.addEventListener("click", (e) => {
  if (e.target.nodeName == "BUTTON") {
    // Add press animation
    e.target.classList.add("pressed");
    setTimeout(() => {
      e.target.classList.remove("pressed");
    }, 200);

    // Remove error state if present
    DisplayArea.classList.remove("error");

    switch (e.target.textContent) {
      case "C":
        Clear();
        break;
      case "DEL":
        DeleteOneValue();
        break;
      case "=":
        Evaluate();
        break;
      default:
        AddtoDisplayArea(e.target.textContent);
    }
  }
});

// Add keyboard support
document.addEventListener("keydown", (e) => {
  const key = e.key;

  // Remove error state
  DisplayArea.classList.remove("error");

  if (
    (key >= "0" && key <= "9") ||
    key === "." ||
    ["+", "-", "*", "/", "(", ")"].includes(key)
  ) {
    AddtoDisplayArea(key);
  } else if (key === "Enter" || key === "=") {
    e.preventDefault();
    Evaluate();
  } else if (key === "Escape" || key === "c" || key === "C") {
    Clear();
  } else if (key === "Backspace") {
    DeleteOneValue();
  }
});

function Clear() {
  DisplayArea.textContent = "";
}

function AddtoDisplayArea(value) {
  DisplayArea.textContent += value;
}

function DeleteOneValue() {
  DisplayArea.textContent = DisplayArea.textContent.slice(0, -1);
}

function Evaluate() {
  try {
    // Sanitize input and evaluate
    let expression = DisplayArea.textContent;

    // Replace visual operators with JavaScript operators
    expression = expression.replace(/×/g, "*").replace(/÷/g, "/");

    // Validate expression
    if (!expression.trim()) {
      throw new Error("Empty expression");
    }

    // Use Function constructor for safer eval
    const result = new Function("return " + expression)();

    // Format result
    if (typeof result === "number") {
      // Handle floating point precision
      const formattedResult =
        Math.abs(result) > 1e12
          ? result.toExponential(6)
          : parseFloat(result.toPrecision(12));
      DisplayArea.textContent = formattedResult;
    } else {
      throw new Error("Invalid result");
    }
  } catch (error) {
    DisplayArea.textContent = "Error";
    DisplayArea.classList.add("error");
    console.error("Calculation error:", error);
  }
}
