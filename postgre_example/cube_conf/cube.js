module.exports = {
  contextToAppId: ({ securityContext }) => {
    if (securityContext) {
      return `CUBEJS_APP_${securityContext.appId}_${securityContext.userId}`;
    } else {
      return `CUBEJS_APP_1_1`;
    }
  },
  contextToOrchestratorId: ({ securityContext }) => {
    if (securityContext) {
      return `CUBEJS_APP_${securityContext.appId}_${securityContext.userId}`;
    } else {
      return `CUBEJS_APP_1_1`;
    }
  },
  driverFactory: ({ securityContext }) => {
    if (securityContext === null) {
      // handle the case without context
      return {
        type: "postgres",
        database: "postgres",
        host: `tenant_${securityContext.appId}_${securityContext.userId}`,
        user: "postgres",
        password: "password123",
      };
    } else {
      // handle the jaw authen case
      return {
        type: "postgres",
        database: "postgres",
        host: `tenant_1_1`,
        user: "postgres",
        password: "password123",
      };
    }
  },
};
