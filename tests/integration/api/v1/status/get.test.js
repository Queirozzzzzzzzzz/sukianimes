test("GET to /api/v1/status should return 200", async () => {
  const res = await fetch("http://localhost:3592/api/v1/status");
  expect(res.status).toBe(200);

  const resBody = await res.json();
  expect(resBody.updated_at).toBeDefined();

  const parsedUpdatedAt = new Date(resBody.updated_at).toISOString();
  expect(resBody.updated_at).toEqual(parsedUpdatedAt);

  expect(resBody.dependencies.database.postgres_version).toEqual("16.1");
  expect(resBody.dependencies.database.max_connections).toEqual(100);
  expect(resBody.dependencies.database.opened_connections).not.toBeLessThan(1);
});
