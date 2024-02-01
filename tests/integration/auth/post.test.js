test("POST to auth/accounts/signup", async () => {
  const res = await fetch("http://localhost:3592/auth/accounts/signup", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      accountname: "TestName",
      email: "test@test",
      password1: "TestPassword",
      password2: "TestPassword",
    }),
  });

  expect(res.status).toBe(200);
});

test("POST to /auth/accounts/login", async () => {
  const res = await fetch(`http://localhost:3592/auth/accounts/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: "test@test",
      password: "TestPassword",
    }),
  });

  expect(res.status).toBe(200);
});
