export function activeDarkMode() {
  return JSON.parse(localStorage.getItem("darkMode"));
}

export function deactivateDarkMode() {
  if (activeDarkMode()) localStorage.setItem("darkMode", JSON.stringify(false));
}

export function activateDarkMode() {
  if (!activeDarkMode()) localStorage.setItem("darkMode", JSON.stringify(true));
}
