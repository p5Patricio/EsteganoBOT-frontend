import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import HomeView from "@/views/HomeView.vue";

describe("HomeView", () => {
  it("renders both forms", () => {
    const wrapper = mount(HomeView);
    expect(wrapper.find("h1").text()).toBe("Esteganografía");
    expect(wrapper.findComponent({ name: "StegoForm" }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: "RevealForm" }).exists()).toBe(true);
  });
});
