import { describe, expect, it, vi } from "vitest";
import { getLanguage } from "./searchParams";
import { getTranslations } from "./translations";
import t from "./t";

vi.mock("./translations.js");
vi.mock("./searchParams.js");

describe("t", () => {
  it("returns the translation for a given key", () => {
    getLanguage.mockReturnValue("en");
    getTranslations.mockReturnValue({
      someKey: {
        sv: "Nån översättning",
        en: "Some translation",
      },
      someOtherKey: {
        sv: "Någon annan översättning",
        en: "Some other translation",
      },
    });

    expect(t("someKey")).toBe("Some translation");
  });

  it("returns key when key has no translation", () => {
    getLanguage.mockReturnValue("en");
    getTranslations.mockReturnValue({
      someKey: {
        sv: "Nån översättning",
        en: "Some translation",
      },
    });

    expect(t("nonExistentKey")).toBe("nonExistentKey");
  });

  it("returns key when translation for the current language is missing", () => {
    getLanguage.mockReturnValue("en");
    getTranslations.mockReturnValue({
      someKey: {
        sv: "Nån översättning",
      },
    });

    expect(t("someKey")).toBe("someKey");
  });
});
