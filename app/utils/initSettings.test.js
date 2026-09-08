import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import initSettings from "./initSettings";

const mockHTML = `<form id="load-form">
        <label>
          Format
          <select id="format" name="format">
            <option value="xml">XML</option>
            <option value="json">JSON</option>
          </select>
        </label>
        <label>
          Language
          <select id="lang" name="lang">
            <option value="en">English</option>
            <option value="sv">Swedish</option>
          </select>
        </label>
      </form>`;

describe("initSettings", async () => {
  it("submits load form on change", async () => {
    document.body.innerHTML = mockHTML;
    userEvent.setup();
    const form = document.getElementById("load-form");
    form.submit = vi.fn();

    initSettings();

    await userEvent.selectOptions(
      screen.getByRole("combobox", { name: "Format" }),
      "json",
    );

    expect(form.submit).toHaveBeenCalledTimes(1);
  });

  it("sets format and lang from URL parameters", () => {
    const params = new URLSearchParams();
    params.set("format", "json");
    params.set("lang", "sv");
    window.history.replaceState({}, "", `?${params.toString()}`);

    document.body.innerHTML = mockHTML;

    initSettings();

    expect(document.getElementById("format").value).toBe("json");
    expect(document.getElementById("lang").value).toBe("sv");
  });

  it('defaults format to "xml" and lang to "en" when URL parameters are not present', () => {
    window.history.replaceState({}, "", "?");

    document.body.innerHTML = mockHTML;

    initSettings();

    expect(document.getElementById("format").value).toBe("xml");
    expect(document.getElementById("lang").value).toBe("en");
  });

  it("sets api-url search param when on localhost", () => {
    const replaceStateSpy = vi.fn();
    vi.stubGlobal("location", {
      hostname: "localhost",
      pathname: "/test",
      search: "?someParam=value",
    });
    vi.stubGlobal("history", { replaceState: replaceStateSpy });

    document.body.innerHTML = mockHTML;

    initSettings();

    expect(replaceStateSpy).toHaveBeenCalledWith(
      {},
      "",
      "/test?someParam=value&api-url=https%3A%2F%2Fpreview.diva.cora.epc.ub.uu.se%2Frest",
    );
  });

  it("does not set api-url search param when not on localhost", () => {
    const replaceStateSpy = vi.fn();
    vi.stubGlobal("location", {
      hostname: "example.com",
      pathname: "/test",
      search: "?someParam=value",
    });
    vi.stubGlobal("history", { replaceState: replaceStateSpy });

    document.body.innerHTML = mockHTML;

    initSettings();

    expect(replaceStateSpy).not.toHaveBeenCalled();
  });
});
