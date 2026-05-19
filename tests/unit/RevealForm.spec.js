import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import RevealForm from "@/components/RevealForm.vue";
import api from "@/services/api";

vi.mock("@/services/api");

describe("RevealForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.URL.createObjectURL = vi.fn(() => "mock-url");
  });

  it("shows validation error when submitting without file", async () => {
    const wrapper = mount(RevealForm);
    await wrapper.find("form").trigger("submit.prevent");
    expect(wrapper.find(".error-alert").text()).toContain("Seleccioná una imagen");
  });

  it("disables button while loading", async () => {
    api.post.mockReturnValue(new Promise(() => {}));
    const wrapper = mount(RevealForm);

    const file = new File(["x"], "test.png", { type: "image/png" });
    const input = wrapper.find('input[type="file"]');
    Object.defineProperty(input.element, "files", {
      value: [file],
    });
    await input.trigger("change");

    await wrapper.find("form").trigger("submit.prevent");

    const button = wrapper.find("button");
    expect(button.attributes("disabled")).toBeDefined();
    expect(button.find(".spinner").exists()).toBe(true);
  });

  it("displays revealed message on success", async () => {
    api.post.mockResolvedValue({ data: { message: "secret text" } });
    const wrapper = mount(RevealForm);

    const file = new File(["x"], "test.png", { type: "image/png" });
    const input = wrapper.find('input[type="file"]');
    Object.defineProperty(input.element, "files", {
      value: [file],
    });
    await input.trigger("change");

    await wrapper.find("form").trigger("submit.prevent");
    await wrapper.vm.$nextTick();

    expect(wrapper.find(".message-box").text()).toContain("secret text");
  });

  it("shows error on API failure", async () => {
    api.post.mockRejectedValue(new Error("Reveal failed"));
    const wrapper = mount(RevealForm);

    const file = new File(["x"], "test.png", { type: "image/png" });
    const input = wrapper.find('input[type="file"]');
    Object.defineProperty(input.element, "files", {
      value: [file],
    });
    await input.trigger("change");

    await wrapper.find("form").trigger("submit.prevent");
    await wrapper.vm.$nextTick();

    expect(wrapper.find(".error-alert").text()).toContain("Reveal failed");
  });

  it("includes password in FormData when provided", async () => {
    api.post.mockResolvedValue({ data: { message: "secret msg" } });
    const wrapper = mount(RevealForm);

    const file = new File(["x"], "test.png", { type: "image/png" });
    const input = wrapper.find('input[type="file"]');
    Object.defineProperty(input.element, "files", {
      value: [file],
    });
    await input.trigger("change");

    wrapper.find('input[type="password"]').setValue("p@ssword");

    await wrapper.find("form").trigger("submit.prevent");

    expect(api.post).toHaveBeenCalledWith("/reveal", expect.any(FormData));
    const formData = api.post.mock.calls[0][1];
    expect(formData.get("password")).toBe("p@ssword");
  });
});
