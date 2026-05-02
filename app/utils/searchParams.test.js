import { describe, expect, it, beforeEach } from "vitest";
import {
  getValidationType,
  getMethod,
  getApiUrl,
  getFormat,
  getLanguage,
} from "./searchParams";

describe("searchParams", () => {
  beforeEach(() => {
    window.history.replaceState({}, "", "/");
  });

  describe("getValidationType", () => {
    it("returns undefined when no param is set", () => {
      expect(getValidationType()).toBeUndefined();
    });

    it("returns the validationTypeId param", () => {
      window.history.replaceState({}, "", "/?validationTypeId=someType");
      expect(getValidationType()).toBe("someType");
    });
  });

  describe("getMethod", () => {
    it("defaults to create when no param is set", () => {
      expect(getMethod()).toBe("create");
    });

    it("returns the method param", () => {
      window.history.replaceState({}, "", "/?method=update");
      expect(getMethod()).toBe("update");
    });
  });

  describe("getApiUrl", () => {
    it("defaults to preview diva url", () => {
      expect(getApiUrl()).toBe("https://preview.diva.cora.epc.ub.uu.se/rest");
    });

    it("returns the api-url param when set", () => {
      window.history.replaceState({}, "", "/?api-url=http://example.com");
      expect(getApiUrl()).toBe("http://example.com");
    });
  });

  describe("getFormat", () => {
    it("defaults to xml", () => {
      expect(getFormat()).toBe("xml");
    });

    it("returns the format param", () => {
      window.history.replaceState({}, "", "/?format=json");
      expect(getFormat()).toBe("json");
    });
  });

  describe("getLanguage", () => {
    it("defaults to en", () => {
      expect(getLanguage()).toBe("en");
    });

    it("returns the lang param", () => {
      window.history.replaceState({}, "", "/?lang=sv");
      expect(getLanguage()).toBe("sv");
    });
  });
});
