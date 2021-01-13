(function (window) {
  window.env = window.env || {};

  // Environment variables
  window["env"]["projectsApiUrl"] = "http://localhost:8020";
  window["env"]["employeesApiUrl"] = "http://localhost:8010";
  window["env"]["carfleetApiUrl"] = "http://localhost:8030";
  window["env"]["oauthIssuerUrl"] = "http://localhost:8080/auth/realms/employees-webapp";
  window["env"]["oauthClientId"] = "ema_pkce";
  window["env"]["debug"] = "${DEBUG}";
})(this);
