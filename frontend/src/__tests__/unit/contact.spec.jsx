// const { default: Contact } = require("../../components/Contact.tsx");
import { cleanup, render } from "@testing-library/react";

import Contact from "../../components/Contact.jsx";
import userEvent from "@testing-library/user-event";

// Mocking alert()
global.alert = vi.fn();
global.fetch = vi.fn();

beforeAll(() => {
  vi.clearAllMocks();
});

afterEach(() => {
  cleanup();
});

describe("<Contact />", () => {
  test("renders all input fields and submit button", () => {
    const { getByPlaceholderText } = render(<Contact />);

    expect(getByPlaceholderText(/enter your name/i)).toBeInTheDocument();
    expect(
      getByPlaceholderText(/enter your mobile number/i)
    ).toBeInTheDocument();
    expect(getByPlaceholderText(/enter your city/i)).toBeInTheDocument();
    expect(getByPlaceholderText(/enter your class/i)).toBeInTheDocument();
  });

  test("inputs update form data correctly", async () => {
    const mockInput = {
      name: "John doe",
      mobile: "123456789",
      city: "Peru",
      class: "XII",
    };

    const { getByPlaceholderText, getByDisplayValue } = render(<Contact />);

    const elements = {
      name: getByPlaceholderText(/enter your name/i),
      mobile: getByPlaceholderText(/enter your mobile number/i),
      city: getByPlaceholderText(/enter your city/i),
      class: getByPlaceholderText(/enter your class/i),
    };

    // fire events
    await userEvent.type(elements.name, mockInput.name);
    await userEvent.type(elements.mobile, mockInput.mobile);
    await userEvent.type(elements.city, mockInput.city);
    await userEvent.type(elements.class, mockInput.class);

    expect(
      getByDisplayValue(new RegExp(mockInput.name, "i"))
    ).toBeInTheDocument();
    expect(
      getByDisplayValue(new RegExp(mockInput.mobile, "i"))
    ).toBeInTheDocument();
    expect(
      getByDisplayValue(new RegExp(mockInput.city, "i"))
    ).toBeInTheDocument();
    expect(
      getByDisplayValue(new RegExp(mockInput.class, "i"))
    ).toBeInTheDocument();
  });

  test("mobile input blocks non-numeric values", async () => {
    const { getByPlaceholderText } = render(<Contact />);

    const mobileInputElem = getByPlaceholderText(/enter your mobile number/i);

    await userEvent.type(mobileInputElem, "abc");
    expect(mobileInputElem).toHaveDisplayValue("");
  });

  test("successful form submission shows thank you alert and resets form", async () => {
    const mockInput = {
      name: "John doe",
      mobile: "123456789",
      city: "Peru",
      educationClass: "XII",
    };
    global.fetch.mockReturnValueOnce(
      Promise.resolve({ ok: true, status: 200 })
    );

    const { getByPlaceholderText, getByRole } = render(<Contact />);

    const elements = {
      name: getByPlaceholderText(/enter your name/i),
      mobile: getByPlaceholderText(/enter your mobile number/i),
      city: getByPlaceholderText(/enter your city/i),
      educationClass: getByPlaceholderText(/enter your class/i),
      submitButton: getByRole("button", { value: /contact us/i }),
    };

    await userEvent.type(elements.name, mockInput.name);
    await userEvent.type(elements.mobile, mockInput.mobile);
    await userEvent.type(elements.city, mockInput.city);
    await userEvent.type(elements.educationClass, mockInput.educationClass);
    await userEvent.click(elements.submitButton);

    expect(alert).toHaveBeenCalled();
    expect(alert).toHaveBeenCalledWith(
      "Thank you for contacting us. We'll get in touch."
    );
    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith("/api/admin/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mockInput),
    });

    // reset forms
    expect(elements.name).toHaveDisplayValue("");
    expect(elements.mobile).toHaveDisplayValue("");
    expect(elements.city).toHaveDisplayValue("");
    expect(elements.educationClass).toHaveDisplayValue("");
  });

  test("client error shows returned message", async () => {
    const mockInput = {
      name: "John doe",
      mobile: "123456789",
      city: "Peru",
      educationClass: "XII",
    };
    const mockMessage = "You're banned";
    global.fetch.mockReturnValueOnce(
      Promise.resolve({
        ok: false,
        status: 400,
        json: vi.fn(() => Promise.resolve({ message: mockMessage })),
      })
    );

    const { getByPlaceholderText, getByRole } = render(<Contact />);

    const elements = {
      name: getByPlaceholderText(/enter your name/i),
      mobile: getByPlaceholderText(/enter your mobile number/i),
      city: getByPlaceholderText(/enter your city/i),
      educationClass: getByPlaceholderText(/enter your class/i),
      submitButton: getByRole("button", { value: /contact us/i }),
    };

    await userEvent.type(elements.name, mockInput.name);
    await userEvent.type(elements.mobile, mockInput.mobile);
    await userEvent.type(elements.city, mockInput.city);
    await userEvent.type(elements.educationClass, mockInput.educationClass);
    await userEvent.click(elements.submitButton);

    expect(alert).toHaveBeenCalled();
    expect(alert).toHaveBeenCalledWith(mockMessage);
    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith("/api/admin/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mockInput),
    });
  });

  test("server error shows internal server error alert", async () => {
    const mockInput = {
      name: "John doe",
      mobile: "123456789",
      city: "Peru",
      educationClass: "XII",
    };
    global.fetch.mockReturnValueOnce(
      Promise.resolve({
        status: 500,
      })
    );

    const { getByPlaceholderText, getByRole } = render(<Contact />);

    const elements = {
      name: getByPlaceholderText(/enter your name/i),
      mobile: getByPlaceholderText(/enter your mobile number/i),
      city: getByPlaceholderText(/enter your city/i),
      educationClass: getByPlaceholderText(/enter your class/i),
      submitButton: getByRole("button", { value: /contact us/i }),
    };

    await userEvent.type(elements.name, mockInput.name);
    await userEvent.type(elements.mobile, mockInput.mobile);
    await userEvent.type(elements.city, mockInput.city);
    await userEvent.type(elements.educationClass, mockInput.educationClass);
    await userEvent.click(elements.submitButton);

    expect(alert).toHaveBeenCalled();
    expect(alert).toHaveBeenCalledWith(
      "Internal server error! Try again later!"
    );
    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith("/api/admin/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mockInput),
    });
  });
});

/*
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Contact from './Contact';

// Mock the alert
global.alert = jest.fn();

// Mock fetch globally
beforeEach(() => {
  global.fetch = jest.fn();
  jest.clearAllMocks();
});

describe('Contact Component', () => {
  test('renders all input fields and submit button', () => {
    render(<Contact />);
    expect(screen.getByPlaceholderText(/enter your name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your mobile number/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your city/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your class/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /contact us/i })).toBeInTheDocument();
  });

  test('inputs update form data correctly', () => {
    render(<Contact />);
    fireEvent.change(screen.getByPlaceholderText(/enter your name/i), { target: { value: 'John', name: 'name' } });
    fireEvent.change(screen.getByPlaceholderText(/enter your mobile number/i), { target: { value: '1234567890', name: 'mobile' } });
    fireEvent.change(screen.getByPlaceholderText(/enter your city/i), { target: { value: 'New York', name: 'city' } });
    fireEvent.change(screen.getByPlaceholderText(/enter your class/i), { target: { value: '10', name: 'educationClass' } });

    expect(screen.getByDisplayValue('John')).toBeInTheDocument();
    expect(screen.getByDisplayValue('1234567890')).toBeInTheDocument();
    expect(screen.getByDisplayValue('New York')).toBeInTheDocument();
    expect(screen.getByDisplayValue('10')).toBeInTheDocument();
  });

  test('mobile input blocks non-numeric values', () => {
    render(<Contact />);
    const mobileInput = screen.getByPlaceholderText(/enter your mobile number/i);
    fireEvent.change(mobileInput, { target: { value: 'abc', name: 'mobile' } });
    expect(mobileInput.value).toBe('');
  });

  test('successful form submission shows thank you alert and resets form', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
    });

    render(<Contact />);

    fireEvent.change(screen.getByPlaceholderText(/enter your name/i), { target: { value: 'Jane', name: 'name' } });
    fireEvent.change(screen.getByPlaceholderText(/enter your mobile number/i), { target: { value: '9876543210', name: 'mobile' } });
    fireEvent.change(screen.getByPlaceholderText(/enter your city/i), { target: { value: 'Delhi', name: 'city' } });
    fireEvent.change(screen.getByPlaceholderText(/enter your class/i), { target: { value: '12', name: 'educationClass' } });

    fireEvent.click(screen.getByRole('button', { name: /contact us/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/admin/contacts', expect.any(Object));
      expect(global.alert).toHaveBeenCalledWith("Thank you for contacting us. We'll get in touch.");
    });

    // Form should reset
    expect(screen.getByPlaceholderText(/enter your name/i).value).toBe('');
    expect(screen.getByPlaceholderText(/enter your mobile number/i).value).toBe('');
  });

  test('client error shows returned message', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: async () => ({ message: 'Validation failed' }),
    });

    render(<Contact />);

    fireEvent.click(screen.getByRole('button', { name: /contact us/i }));

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith('Validation failed');
    });
  });

  test('server error shows internal server error alert', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    render(<Contact />);
    fireEvent.click(screen.getByRole('button', { name: /contact us/i }));

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith('Internal server error! Try again later!');
    });
  });
});
*/
