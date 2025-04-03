import { signin } from "../../core/service/auth";
import { api } from "../../core/api/axios";
import { signinFormData } from "../../core/validation/authValidation";

jest.mock("../../core/api/axios");
const mockedApi = api as jest.Mocked<typeof api>;

describe("signin", () => {
  const mockData: signinFormData = {
    email: "usuarioTeste@teste.com",
    password: "teste1235487621",
  };

  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("deve retornar access_token e salvar no localStorage", async () => {
    const token = "fake-token";
    const expiresIn = 3600;

    mockedApi.post.mockResolvedValueOnce({
      data: {
        access_token: token,
        expires_in: expiresIn,
      },
    });

    const result = await signin(mockData);

    expect(result).toBe(token);
    const localToken = JSON.parse(localStorage.getItem("token") || "{}");
    expect(localToken.access_token).toBe(token);
    expect(localToken.expires_in).toBe(expiresIn);
    expect(typeof localToken.created_at).toBe("string");
  });

  it("deve lançar erro se a API falhar", async () => {
    mockedApi.post.mockRejectedValueOnce(new Error("Erro de login"));

    await expect(signin(mockData)).rejects.toThrow("Erro de login");
  });
});
