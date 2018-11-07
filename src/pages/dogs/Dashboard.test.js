import React from "react";
import {render,fireEvent, waitForElement} from "react-testing-library";
import {MemoryRouter} from "react-router-dom";
import {Provider} from "mobx-react";
import Dashboard from "./Dashboard";
import axios from "axios";

const resp = {
  data: {
    status: "success",
    message: "https://images.dog.ceo/breeds/mastiff-tibetan/n02108551_728.jpg"
  }
};
jest.mock("axios");
const mockFn = axios.get.mockImplementation(() => Promise.resolve(resp));

const stores = {
  sessionStore: {
    authUser: {
      uid: 123
    }
  },
  userStore: { },
  dogStore: { }
}
  
const wrapper = render(
  <Provider {...stores}>
    <MemoryRouter>
      <Dashboard />
    </MemoryRouter>
  </Provider>
);

const nextDogButton = wrapper.getByText("Next Dog");
const dogImage = wrapper.getByTestId("random-dog-image");
const saveDogButton = wrapper.getByTestId("save-dog");
const inputNode = wrapper.getByPlaceholderText("Doggie Name");

describe("<Dashboard>", () => {

  it("disables the form submit button since the form is empty", () => {
    expect(wrapper.getByTestId('save-dog').hasAttribute('disabled')).toBeTruthy()
  });

  it("gets an image from the dog API on load", () => {
    expect(dogImage.getAttribute("src")).toBe("https://images.dog.ceo/breeds/mastiff-tibetan/n02108551_728.jpg");
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('Gets another image from the dog api when the "Next Dog" button is clicked', () => {
    fireEvent.click(nextDogButton);
    expect(mockFn).toHaveBeenCalledTimes(2);
  });

  it('allows the submit button to be clicked after the name field has been filled out', () => {
  const searchString = "Wofferson";
  fireEvent.change(inputNode, {target: {value: searchString}});
  expect(wrapper.getByTestId('save-dog').hasAttribute('disabled')).toBeFalsy()
  });

  it("Clears the name form field after saving a dog", async () => {
    fireEvent.click(saveDogButton);
    await waitForElement(() => wrapper.getByText('Checkout your Dogs'));
    expect(inputNode.value).toBe('')
  });

  it("Loads another dog image after dog form submission", async () => {
    expect(mockFn).toHaveBeenCalledTimes(3);
  });

  it("disabled the form submit button after submission", async () => {
    expect(wrapper.getByTestId('save-dog').hasAttribute('disabled')).toBeTruthy()
  });

});
