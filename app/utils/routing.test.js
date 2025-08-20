import { describe, expect, it, vi } from "vitest";
import { getRecordTypeId, getBasePath } from "./routing";

describe("routing", () => {
  describe("getRecordTypeId", () => {
    it("returns record type from path", () => {
      vi.stubGlobal("location", {
        pathname: "/recordType/someRecordTypeId",
      });
      const recordTypeId = getRecordTypeId();
      expect(recordTypeId).toBe("someRecordTypeId");
    });

    it("returns record type with trailing slash", () => {
      vi.stubGlobal("location", {
        pathname: "/recordType/someRecordTypeId/",
      });
      const recordTypeId = getRecordTypeId();
      expect(recordTypeId).toBe("someRecordTypeId");
    });

    it("returns record type with base path", () => {
      vi.stubGlobal("location", {
        pathname: "/api-helper/recordType/someRecordTypeId",
      });
      const recordTypeId = getRecordTypeId();
      expect(recordTypeId).toBe("someRecordTypeId");
    });
  });

  describe.only("getBasePath", () => {
    it("no base path and not record type", () => {
      vi.stubGlobal("location", {
        pathname: "/",
      });
      const basePath = getBasePath();
      expect(basePath).toBe("");
    });

    it("base path on home page wit no trailing slash", () => {
      vi.stubGlobal("location", {
        pathname: "/api-helper",
      });
      const basePath = getBasePath();
      expect(basePath).toBe("/api-helper");
    });

    it("base path with trailing slash", () => {
      vi.stubGlobal("location", {
        pathname: "/api-helper/",
      });
      const basePath = getBasePath();
      expect(basePath).toBe("/api-helper");
    });

    it("record type in path and no base path", () => {
      vi.stubGlobal("location", {
        pathname: "/recordType/someRecordTypeId",
      });
      const basePath = getBasePath();
      expect(basePath).toBe("");
    });

    it("record type path with base path", () => {
      vi.stubGlobal("location", {
        pathname: "/api-helper/recordType/someRecordTypeId",
      });
      const basePath = getBasePath();
      expect(basePath).toBe("/api-helper");
    });
  });
});
