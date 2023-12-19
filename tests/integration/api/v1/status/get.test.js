describe("GET to /api/v1/status", () => {
  let response;
  let responseBody;
  beforeAll(async () => {
    response = await fetch("http://localhost:3000/api/v1/status");
    responseBody = await response.json();
    return { update_at, dependencies } = responseBody;
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
            opened_connections: expect.any(Number)
          }
        }
      })
    );
  });

  test("should return `update_at` with a valid date on pattern ISO 8601", () => {
    expect(update_at).toBeDefined();
    const parsedUpdateAt = new Date(update_at).toISOString();
    expect(update_at).toEqual(parsedUpdateAt);
  });

  test("should return `version` equal 16.0", () => {
    expect(dependencies.database.version).toEqual("16.0")
  });

  test("should return `max_connections` equal 100", () => {
    expect(dependencies.database.max_connections).toBe(100);
  });

  test("should return `opened_connections` equal 1 ", () => {
    expect(dependencies.database.opened_connections).toBe(1)
  });

  test("should return `max_connections` greater than `opened_connections`", () => {
    expect(dependencies.database.max_connections)
      .toBeGreaterThan(dependencies.database.opened_connections);
  });
});
