(function (window) {
  window.env = window.env || {};

  // Environment variables
  window["env"]["projectsApiUrl"] = "${PROJECTS_API_URL}";
  window["env"]["employeesApiUrl"] = "${EMPLOYEES_API_URL}";
  window["env"]["carfleetApiUrl"] = "${CAR_FLEET_API_URL}";
  window["env"]["oauthIssuerUrl"] = "${OAUTH_ISSUER_URL}";
  window["env"]["oauthClientId"] = "${OAUTH_CLIENT_ID}";
  window["env"]["debug"] = "${DEBUG}" || window["env"]["debug"];
})(this);
