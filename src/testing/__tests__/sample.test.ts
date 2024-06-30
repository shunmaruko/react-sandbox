import hoge, { foo, bar } from "../sample";

beforeAll(() => console.error("1 - beforeAll"));
afterAll(() => console.error("1 - afterAll"));
beforeEach(() => console.error("1 - beforeEach"));
afterEach(() => console.error("1 - afterEach"));

test("sample", () => {
  console.log("1 - test");
});

test("async sample", async () => {
  console.log("1 - async test");
  await new Promise((resolve) => setTimeout(resolve, 300));
});

describe("Scoped / Nested block", () => {
  beforeAll(() => console.log("2 - beforeAll"));
  afterAll(() => console.log("2 - afterAll"));
  beforeEach(() => console.log("2 - beforeEach"));
  afterEach(() => console.log("2 - afterEach"));

  test("", () => console.log("2 - test"));
});

vi.mock("./sample", async () => {
  const originalModule = await vi.importActual("./sample");

  //Mock the default export and named export 'foo'
  return {
    __esModule: true,
    ...originalModule,
    default: vi
      .fn()
      .mockImplementationOnce(() => "mocked hoge 1")
      .mockImplementationOnce(() => "mocked hoge 2"),
    foo: "mocked foo",
  };
});

test("test partial mock", () => {
  const actual = hoge();
  //defaule exported hoge is mocked
  expect(actual).toBe("mocked hoge 1");
  // confirm mocked function called
  expect(hoge).toHaveBeenCalled();
  const actual2 = hoge();
  //defaule exported hoge is mocked
  expect(actual2).toBe("mocked hoge 2");
  // foo is mocked
  expect(foo).toBe("mocked foo");
  // bar is not mocked
  expect(bar()).toBe("bar");
});
