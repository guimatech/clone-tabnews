import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
});

describe("POST /api/v1/migrations", () => {
  describe("Anonymous user", () => {
    describe("Running pending migrations", () => {
      test("For the first time", async () => {
        const response1 = await fetch(
          "http://localhost:3000/api/v1/migrations",
          {
            method: "POST",
          },
        );
        expect(response1.status).toBe(403);

        const response1Body = await response1.json();

        expect(response1Body).toEqual({
          name: "ForbiddenError",
          message: "Você não tem permissão para executar esta ação.",
          action:
            'Verifique se o seu usuário possui a feature "create:migrations"',
          status_code: 403,
        });
      });
    });
  });

  describe("Default user", () => {
    describe("Running pending migrations", () => {
      test("For the first time", async () => {
        const createdUser = await orchestrator.createUser();
        const activatedUser = await orchestrator.activateUser(createdUser);
        const sessionObject = await orchestrator.createSession(
          activatedUser.id,
        );

        const response1 = await fetch(
          "http://localhost:3000/api/v1/migrations",
          {
            method: "POST",
            headers: {
              Cookie: `session_id=${sessionObject.token}`,
            },
          },
        );
        expect(response1.status).toBe(403);

        const response1Body = await response1.json();

        expect(response1Body).toEqual({
          name: "ForbiddenError",
          message: "Você não tem permissão para executar esta ação.",
          action:
            'Verifique se o seu usuário possui a feature "create:migrations"',
          status_code: 403,
        });
      });
    });
  });

  describe("Privileged user", () => {
    describe("With `create:migrations`", () => {
      test("For the first time", async () => {
        const createdUser = await orchestrator.createUser();
        const activatedUser = await orchestrator.activateUser(createdUser);
        await orchestrator.addFeatureToUser(createdUser, ["create:migrations"]);
        const sessionObject = await orchestrator.createSession(
          activatedUser.id,
        );

        const response1 = await fetch(
          "http://localhost:3000/api/v1/migrations",
          {
            method: "POST",
            headers: {
              Cookie: `session_id=${sessionObject.token}`,
            },
          },
        );
        expect(response1.status).toBe(200);

        const response1Body = await response1.json();

        expect(Array.isArray(response1Body)).toBe(true);
      });
    });
  });
});
