import { getCurrentUser, createUserAccount } from "../api";

// The API helpers use global fetch; replace it with a controllable mock.
const fetchMock = () => globalThis.fetch as jest.Mock;

beforeEach(() => {
  globalThis.fetch = jest.fn();
});

describe("getCurrentUser", () => {
  it("sends the access token as a Bearer header and returns the profile", async () => {
    const profile = {
      id: "u1",
      email: "ada@example.com",
      first_name: "Ada",
      last_name: "Lovelace",
    };
    fetchMock().mockResolvedValue({
      ok: true,
      json: async () => profile,
    });

    const result = await getCurrentUser("token-123");

    expect(result).toEqual(profile);
    expect(fetchMock()).toHaveBeenCalledTimes(1);
    expect(fetchMock()).toHaveBeenCalledWith(
      `${process.env.EXPO_PUBLIC_API_BASE_URL}/users/me`,
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer token-123",
          Accept: "application/json",
        }),
      }),
    );
  });

  it("throws the API's detail message when the response is not ok", async () => {
    fetchMock().mockResolvedValue({
      ok: false,
      status: 403,
      json: async () => ({ detail: "No linked patient account." }),
    });

    await expect(getCurrentUser("bad-token")).rejects.toThrow(
      "No linked patient account.",
    );
  });
});

describe("createUserAccount", () => {
  it("POSTs the profile as JSON and returns the created user", async () => {
    const created = {
      id: "u2",
      email: "grace@example.com",
      first_name: "Grace",
      last_name: "Hopper",
      role: "patient",
      created_at: "2026-11-08T00:00:00Z",
    };
    fetchMock().mockResolvedValue({
      ok: true,
      json: async () => created,
    });

    const result = await createUserAccount("token-456", {
      first_name: "Grace",
      last_name: "Hopper",
      role: "patient",
    });

    expect(result).toEqual(created);
    expect(fetchMock()).toHaveBeenCalledWith(
      `${process.env.EXPO_PUBLIC_API_BASE_URL}/users/me/create-m2-account`,
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          Authorization: "Bearer token-456",
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({
          first_name: "Grace",
          last_name: "Hopper",
          role: "patient",
        }),
      }),
    );
  });
});
