(function (window) {
  window.env = window.env || {};

  // Environment variables
  window["env"]["projectsApiUrl"] = "${PROJECTS_API_URL}";
  window["env"]["employeesApiUrl"] = "${EMPLOYEES_API_URL}";
  window["env"]["debug"] = "${DEBUG}";
})(this);
