const request = require("supertest");

jest.mock("../Data/User", () => {
  const saveMock = jest.fn().mockResolvedValue(undefined);
  const User = function User(data = {}) {
    return {
      ...data,
      save: saveMock,
    };
  };
  User.findOne = jest.fn();
  User.__saveMock = saveMock;
  User.__reset = () => {
    saveMock.mockReset();
    saveMock.mockResolvedValue(undefined);
    User.findOne.mockReset();
  };
  return User;
});
jest.mock("bcryptjs", () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));
jest.mock("../utils/jwt", () => ({
  generateToken: jest.fn(),
}));

const app = require("../app");
const User = require("../Data/User");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwt");

describe("Auth routes", () => {
  const validRegistration = {
    fullName: "Test User",
    email: "test@example.com",
    city: "Toronto",
    province: "Ontario",
    zipCode: "A1A 1A1",
    description: "Helping caregivers every day",
    password: "Password1",
  };

  beforeEach(() => {
    if (typeof User.__reset === "function") {
      User.__reset();
    }
  });

  describe("POST /api/auth/register", () => {
    it("creates a new user when payload is valid", async () => {
      User.findOne.mockResolvedValue(null);
      bcrypt.hash.mockResolvedValue("hashed-password");

      const res = await request(app).post("/api/auth/register").send(validRegistration);

      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual({ message: "User created" });
      expect(User.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
      expect(User.__saveMock).toHaveBeenCalledTimes(1);
      expect(bcrypt.hash).toHaveBeenCalledWith("Password1", 10);
    });

    it("rejects duplicate registrations", async () => {
      User.findOne.mockResolvedValue({ id: "existing" });

      const res = await request(app).post("/api/auth/register").send(validRegistration);

      expect(res.statusCode).toBe(409);
      expect(res.body).toEqual({ error: "Email already registered" });
      expect(User.__saveMock).not.toHaveBeenCalled();
    });

    it("validates incoming payloads", async () => {
      const res = await request(app)
        .post("/api/auth/register")
        .send({ ...validRegistration, email: "", password: "short" });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("error");
      expect(res.body).toHaveProperty("details");
      expect(User.findOne).not.toHaveBeenCalled();
    });
  });

  describe("POST /api/auth/login", () => {
    it("authenticates users with valid credentials", async () => {
      const user = {
        email: "test@example.com",
        passwordHash: "hashed",
        fullName: "Test User",
      };
      User.findOne.mockResolvedValue(user);
      bcrypt.compare.mockResolvedValue(true);
      generateToken.mockReturnValue("jwt-token");

      const res = await request(app)
        .post("/api/auth/login")
        .send({ email: " Test@Example.com ", password: "Password1" });

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ token: "jwt-token", email: "test@example.com", fullName: "Test User" });
      expect(User.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
      expect(bcrypt.compare).toHaveBeenCalledWith("Password1", "hashed");
    });

    it("rejects invalid credentials", async () => {
      User.findOne.mockResolvedValue(null);
      bcrypt.compare.mockResolvedValue(false);

      const res = await request(app)
        .post("/api/auth/login")
        .send({ email: "test@example.com", password: "wrong" });

      expect(res.statusCode).toBe(401);
      expect(res.body).toEqual({ error: "Invalid email or password" });
      expect(generateToken).not.toHaveBeenCalled();
    });
  });
});
