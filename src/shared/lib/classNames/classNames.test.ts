
import classNames from 'shared/lib/classNames/classNames'


describe("classNames", () => {
  test("with only first param", () => {
    expect(classNames("class1")).toBe("class1");
  });

  test("with additional class", () => {
    expect(classNames("class1", {}, ["class2", "class3"])).toBe(
      "class1 class2 class3"
    );
  });

  test("with Mods true", () => {
    expect(
      classNames("class1", { class2: true, class3: true }, ["class4", "class5"])
    ).toBe("class1 class4 class5 class2 class3");
  });

  test("with Mods false", () => {
    expect(
      classNames("class1", { class2: false, class3: true }, [
        "class4",
        "class5",
      ])
    ).toBe("class1 class4 class5 class3");
  });
});
