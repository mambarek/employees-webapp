(function (window) {
  window.env = window.env || {};

  // Environment variables
  window["env"]["projectsApiUrl"] = "http://localhost:8888/pms";
  window["env"]["employeesApiUrl"] = "http://localhost:8888/ems";
  window["env"]["carfleetApiUrl"] = "http://localhost:8888/cms";
  window["env"]["oauthIssuerUrl"] = "http://localhost:8880/auth/realms/employees-webapp";
  window["env"]["oauthClientId"] = "ema_pkce";
  window["env"]["debug"] = "${DEBUG}";
})(this);
