export function activeDarkMode() {
const mode = JSON.parse(localStorage.getItem("darkMode"))
  return mode ? mode : false ;
}

export function deactivateDarkMode() {
  if (activeDarkMode()) localStorage.setItem("darkMode", JSON.stringify(false));
}

export function activateDarkMode() {
  if (!activeDarkMode()) localStorage.setItem("darkMode", JSON.stringify(true));
}
