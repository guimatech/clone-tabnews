describe(".env", () => {
  test('should have a "NODE_ENV" equal "test"', () => {
    expect(process.env.NODE_ENV).toBe("test");
  });
  test("should have a postgres host", () => {
    expect(process.env.POSTGRES_HOST).toBeDefined();
  });
  test("should have a postgres port", () => {
    expect(process.env.POSTGRES_PORT).toBeDefined();
  });
  test("should have a postgres user", () => {
    expect(process.env.POSTGRES_USER).toBeDefined();
  });
  test("should have a postgres database", () => {
    expect(process.env.POSTGRES_DB).toBeDefined();
  });
  test("should have a postgres password", () => {
    expect(process.env.POSTGRES_PASSWORD).toBeDefined();
  });
  test("should have a database url", () => {
    expect(process.env.DATABASE_URL).toBeDefined();
  });
});
