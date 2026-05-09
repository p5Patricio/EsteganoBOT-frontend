import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import ErrorAlert from "@/components/ErrorAlert.vue";

describe("ErrorAlert", () => {
  it("renders message when provided", () => {
    const wrapper = mount(ErrorAlert, {
      props: { message: "Something went wrong" },
    });
    expect(wrapper.text()).toContain("Something went wrong");
    expect(wrapper.find('[role="alert"]').exists()).toBe(true);
  });

  it("does not render when message is empty", () => {
    const wrapper = mount(ErrorAlert, {
      props: { message: "" },
    });
    expect(wrapper.find('[role="alert"]').exists()).toBe(false);
  });
});
