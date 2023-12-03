import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SignupVerificationProps {
  handleConfirmation: ({
    username,
    confirmationCode,
  }: {
    username: string;
    confirmationCode: string;
  }) => void;
  values: {
    username: string;
    email: string;
  };
}

function SignupVerification(props: SignupVerificationProps) {
  const { values, handleConfirmation } = props;

  const [value, setValue] = useState<string>("");
  const ref = useRef<HTMLInputElement>(null);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };

  const handleSubmit = () => {
    handleConfirmation({
      username: values.username,
      confirmationCode: value.trim(),
    });
  };

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <div className="flex flex-col gap-5 w-full items-center justify-center h-1/2">
      <div>
        <h3 className="text-3xl font-bold">Confirmation Code</h3>
      </div>
      <div>Please enter the code submitted to {values.email}</div>
      <div>
        <Input
          onChange={handleInput}
          value={value}
          className="shad-input"
          ref={ref}
        />
      </div>
      <div>
        <Button onClick={handleSubmit} className="shad-button_primary">
          Submit
        </Button>
      </div>
    </div>
  );
}

export default SignupVerification;
