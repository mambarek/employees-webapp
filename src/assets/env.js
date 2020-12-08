(function (window) {
  window.env = window.env || {};

  // Environment variables
  window["env"]["projectsApiUrl"] = "http://localhost:8020";
  window["env"]["employeesApiUrl"] = "http://localhost:8010";
  window["env"]["carfleetApiUrl"] = "http://localhost:8030";
  window["env"]["debug"] = "${DEBUG}";
})(this);
