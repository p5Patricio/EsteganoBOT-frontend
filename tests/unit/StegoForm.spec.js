import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import StegoForm from "@/components/StegoForm.vue";
import api from "@/services/api";

vi.mock("@/services/api");

describe("StegoForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.URL.createObjectURL = vi.fn(() => "mock-url");
  });

  it("shows validation error when submitting without file", async () => {
    const wrapper = mount(StegoForm);
    await wrapper.find("form").trigger("submit.prevent");
    expect(wrapper.find(".error-alert").text()).toContain("Seleccioná una imagen");
  });

  it("disables button while loading", async () => {
    api.post.mockReturnValue(new Promise(() => {}));
    const wrapper = mount(StegoForm);

    const file = new File(["x"], "test.png", { type: "image/png" });
    const input = wrapper.find('input[type="file"]');
    Object.defineProperty(input.element, "files", {
      value: [file],
    });
    await input.trigger("change");

    wrapper.find("textarea").setValue("hello");
    await wrapper.find("form").trigger("submit.prevent");

    const button = wrapper.find("button");
    expect(button.attributes("disabled")).toBeDefined();
    expect(button.find(".spinner").exists()).toBe(true);
  });

  it("shows error on API failure", async () => {
    api.post.mockRejectedValue(new Error("Network failed"));
    const wrapper = mount(StegoForm);

    const file = new File(["x"], "test.png", { type: "image/png" });
    const input = wrapper.find('input[type="file"]');
    Object.defineProperty(input.element, "files", {
      value: [file],
    });
    await input.trigger("change");

    wrapper.find("textarea").setValue("hello");
    await wrapper.find("form").trigger("submit.prevent");
    await wrapper.vm.$nextTick();

    expect(wrapper.find(".error-alert").text()).toContain("Network failed");
  });

  it("includes password in FormData when provided", async () => {
    api.post.mockResolvedValue({ data: new Blob() });
    const wrapper = mount(StegoForm);

    const file = new File(["x"], "test.png", { type: "image/png" });
    const input = wrapper.find('input[type="file"]');
    Object.defineProperty(input.element, "files", {
      value: [file],
    });
    await input.trigger("change");

    wrapper.find("textarea").setValue("secret message");
    wrapper.find('input[type="password"]').setValue("p@ssword");

    await wrapper.find("form").trigger("submit.prevent");

    expect(api.post).toHaveBeenCalledWith("/hide", expect.any(FormData), expect.any(Object));
    const formData = api.post.mock.calls[0][1];
    expect(formData.get("password")).toBe("p@ssword");
    expect(formData.get("message")).toBe("secret message");
  });
});
