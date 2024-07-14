import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("GET to /api/v1/status", () => {
  let response;
  let responseBody;
  beforeEach(async () => {
    response = await fetch("http://localhost:3000/api/v1/status");
    responseBody = await response.json();
  });

  test("should return 200", () => {
    expect(response.status).toBe(200);
  });

  test("should return object containing", () => {
    expect(responseBody).toMatchObject(
      expect.objectContaining({
        update_at: expect.any(String),
        dependencies: {
          database: {
            version: expect.any(String),
            max_connections: expect.any(Number),
            opened_connections: expect.any(Number),
          },
        },
      }),
    );
  });

  test("should return `update_at` with a valid date on pattern ISO 8601", () => {
    expect(responseBody.update_at).toBeDefined();
    const parsedUpdateAt = new Date(responseBody.update_at).toISOString();
    expect(responseBody.update_at).toEqual(parsedUpdateAt);
  });

  test("should return `version` equal 16.0", () => {
    expect(responseBody.dependencies.database.version).toEqual("16.0");
  });

  test("should return `max_connections` equal 100", () => {
    expect(responseBody.dependencies.database.max_connections).toBe(100);
  });

  test("should return `opened_connections` equal 1", () => {
    expect(responseBody.dependencies.database.opened_connections).toBe(1);
  });

  test("should return `max_connections` greater than `opened_connections`", () => {
    expect(responseBody.dependencies.database.max_connections).toBeGreaterThan(
      responseBody.dependencies.database.opened_connections,
    );
  });
});
