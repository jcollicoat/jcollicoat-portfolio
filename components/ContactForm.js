import { useState, useRef } from "react";
import styled from "styled-components";

import ContactFormHeading from "./ContactFormHeading";
import FormField from "./FormField";

import SiteGrid from "./SiteGrid";

const Contact = styled.form`
  grid-column: 1 / -1;
  margin: ${(props) =>
    `calc(${props.theme.padding.lg} * 2) 0 ${props.theme.padding.lg} 0`};
  width: 100%;

  @media (min-width: 800px) {
    grid-column: 4 / -4;
  }

  @media (min-width: 1200px) {
    grid-column: 8 / -8;
  }
`;

export default function ContactForm() {
  // Form data
  const [data, setData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Form status
  const [status, setStatus] = useState("unsubmitted");

  // Input changes
  const handleChange = (e) => {
    const field = e.target.name.toLowerCase();
    setData({
      ...data,
      [field]: e.target.value,
    });
  };

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    setStatus("submitting");

    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    fetch("https://getform.io/f/72ed6b68-bf99-4679-8cb1-08cb8877e319", {
      method: "POST",
      body: formData,
    });

    setTimeout(() => {
      setStatus("submitted");
    }, 2000);
  };

  return (
    <SiteGrid>
      <Contact
        id="contact-form"
        method="POST"
        name="Contact Form"
        onSubmit={handleSubmit}
      >
        <ContactFormHeading heading="Get in touch" />
        <FormField
          data={data.name}
          handleChange={handleChange}
          id="name"
          label="Name"
          name="name"
          status={status}
          type="text"
        />
        <FormField
          data={data.email}
          handleChange={handleChange}
          id="email"
          label="Email"
          name="email"
          status={status}
          type="email"
        />
        <FormField
          data={data.message}
          handleChange={handleChange}
          id="message"
          label="How can I help?"
          name="message"
          status={status}
          type="textarea"
        />
        <FormField status={status} type="submit" />
      </Contact>
    </SiteGrid>
  );
}
