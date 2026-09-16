let pyodideInstance = null;

async function initPython() {
  pyodideInstance = await loadPyodide();

  // Fetch the actual .py file and execute it
  const response = await fetch('main.py');
  const pythonCode = await response.text();
  await pyodideInstance.runPythonAsync(pythonCode);

  document.getElementById('status').innerText = "Python environment ready.";
  runView();
}

initPython();

async function runAdd() {
  const k = document.getElementById('settingKey').value.trim();
  const v = document.getElementById('settingValue').value.trim();
  if (!k || !v) return setStatus("Please enter both key and value.", true);

  const res = await pyodideInstance.runPythonAsync(`add_setting(user_settings, ("${k}", "${v}"))`);
  setStatus(res);
  runView();
}

async function runUpdate() {
  const k = document.getElementById('settingKey').value.trim();
  const v = document.getElementById('settingValue').value.trim();
  if (!k || !v) return setStatus("Please enter both key and value.", true);

  const res = await pyodideInstance.runPythonAsync(`update_setting(user_settings, ("${k}", "${v}"))`);
  setStatus(res);
  runView();
}

async function runDelete() {
  const k = document.getElementById('settingKey').value.trim();
  if (!k) return setStatus("Please enter a key to delete.", true);

  const res = await pyodideInstance.runPythonAsync(`delete_setting(user_settings, "${k}")`);
  setStatus(res);
  runView();
}

async function runView() {
  const res = await pyodideInstance.runPythonAsync(`view_settings(user_settings)`);
  document.getElementById('output').innerText = res;
}

function setStatus(msg, isError = false) {
  const el = document.getElementById('status');
  el.innerText = msg;
  el.style.color = isError ? '#dc2626' : '#059669';
}