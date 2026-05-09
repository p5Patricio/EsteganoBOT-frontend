import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import StegoForm from "@/components/StegoForm.vue";
import api from "@/services/api";

vi.mock("@/services/api");

describe("StegoForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows validation error when submitting without file", async () => {
    const wrapper = mount(StegoForm);
    await wrapper.find("form").trigger("submit.prevent");
    expect(wrapper.find(".error-alert").text()).toContain("select an image");
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
});
