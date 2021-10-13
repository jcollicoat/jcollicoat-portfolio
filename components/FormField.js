import { useEffect } from "react";
import styled from "styled-components";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const InputWrapper = styled(motion.div)`
  position: relative;
`;

const Label = styled.label`
  background-color: rgba(0, 0, 0, 1);
  color: rgba(255, 255, 255, 0.25);
  font-weight: 500;
  left: 0;
  padding: 0.5em 1em;
  pointer-events: none;
  position: absolute;
  top: 0;
  transform: translateY(0.75rem);
  transform-origin: top left;
  transition: all 0.5s ${(props) => props.theme.easeout};
`;

const Input = styled.input`
  background-color: #000000;
  border: none;
  color: #ffffff;
  margin-bottom: 2rem;
  outline: ${(props) =>
    props.hasData
      ? `2px solid rgba(255, 255, 255, 1)`
      : `2px solid rgba(255, 255, 255, 0.25)`};
  padding: 1.25rem 1rem;
  position: relative;
  transition: outline 1s ${(props) => props.theme.easeout};
  width: 100%;

  + label {
    ${(props) =>
      props.hasData &&
      `
      color: rgba(255, 255, 255, 1);
      transform: translateY(-1.25em);
    `}
  }

  &:focus {
    outline-color: rgba(255, 255, 255, 1);

    + label {
      color: rgba(255, 255, 255, 1);
      transform: translateY(-1.25em);
    }
  }

  &:valid {
    outline-color: rgba(0, 219, 58, 1);

    + label {
      color: rgba(0, 219, 58, 1);
    }
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.25;

    + label {
      color: rgba(255, 255, 255, 0.25);
    }
  }
`;

const TextArea = styled.textarea`
  background-color: #000000;
  border: none;
  color: #ffffff;
  margin-bottom: 2rem;
  min-height: 10rem;
  outline: ${(props) =>
    props.hasData
      ? `2px solid rgba(255, 255, 255, 1)`
      : `2px solid rgba(255, 255, 255, 0.25)`};
  padding: 1.25rem 1rem;
  position: relative;
  resize: vertical;
  transition: outline 1s ${(props) => props.theme.easeout};
  width: 100%;

  + label {
    ${(props) =>
      props.hasData &&
      `
      color: rgba(255, 255, 255, 1);
      transform: translateY(-1.25em);
    `}
  }

  &:focus {
    outline-color: rgba(255, 255, 255, 1);

    + label {
      color: rgba(255, 255, 255, 1);
      transform: translateY(-1.25em);
    }
  }

  &:valid {
    outline-color: rgba(0, 219, 58, 1);

    + label {
      color: rgba(0, 219, 58, 1);
    }
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.25;

    + label {
      color: rgba(255, 255, 255, 0.25);
    }
  }
`;

const Submit = styled.input`
  background: none;
  background-image: linear-gradient(
    to right,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 1) 50%,
    rgba(255, 255, 255, 0) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  background-position: 100% 0;
  background-size: 200% 100%;
  border: none;
  color: #ffffff;
  cursor: pointer;
  display: block;
  font-weight: 500;
  outline: 2px solid rgba(255, 255, 255, 1);
  width: 100%;
  padding: 1rem 1rem;
  text-transform: uppercase;
  transition: all 1s ${(props) => props.theme.easeout};

  &:hover {
    background-position: 0 0;
    color: #000000;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.25;

    &:hover {
      background-position: 100% 0;
      color: #ffffff;
    }
  }

  @media (min-width: 800px) {
    margin-left: auto;
    width: 50%;
  }
`;

export default function FormField({
  data,
  handleChange,
  id,
  label,
  name,
  status,
  type,
}) {
  // Animation
  const ctrls = useAnimation();

  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      ctrls.start("visible");
    }
    if (!inView) {
      ctrls.start("hidden");
    }
  }, [ctrls, inView]);

  const animation = {
    hidden: {
      opacity: 0,
      y: `1rem`,
    },
    visible: {
      opacity: 1,
      y: `0rem`,
      transition: {
        duration: 1,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
  };

  switch (type) {
    case "text":
      return (
        <InputWrapper
          ref={ref}
          initial="hidden"
          animate={ctrls}
          variants={animation}
        >
          <Input
            disabled={status === "submitted"}
            hasData={data !== null && data !== undefined && data !== ""}
            id={id}
            name={name}
            onChange={handleChange}
            required
            type="text"
            value={data}
          />
          <Label htmlFor="name">{label}</Label>
        </InputWrapper>
      );
    case "email":
      return (
        <InputWrapper
          ref={ref}
          initial="hidden"
          animate={ctrls}
          variants={animation}
        >
          <Input
            disabled={status === "submitted"}
            hasData={data !== null && data !== undefined && data !== ""}
            id={id}
            name={name}
            onChange={handleChange}
            pattern="[A-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            required
            type="email"
            value={data}
          />
          <Label htmlFor="email">{label}</Label>
        </InputWrapper>
      );
    case "textarea":
      return (
        <InputWrapper
          ref={ref}
          initial="hidden"
          animate={ctrls}
          variants={animation}
        >
          <TextArea
            disabled={status === "submitted"}
            hasData={data !== null && data !== undefined && data !== ""}
            id={id}
            name={name}
            onChange={handleChange}
            required
            value={data}
          />
          <Label htmlFor={id}>{label}</Label>
        </InputWrapper>
      );
    case "submit":
      return (
        <InputWrapper
          ref={ref}
          initial="hidden"
          animate={ctrls}
          variants={animation}
        >
          <Submit
            disabled={status === "submitted"}
            type="submit"
            value={
              status === "unsubmitted"
                ? "Submit"
                : status === "submitting"
                ? "Submitting..."
                : "Submitted"
            }
          />
        </InputWrapper>
      );
    default:
      return null;
  }
}
