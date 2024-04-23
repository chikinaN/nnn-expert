import { useEffect, useRef, useState } from 'react';
import { css, keyframes } from "@emotion/react";
import { StateType } from '../../types';

type AttackInputProps = {
  anther: string[];
  complete: StateType<boolean>;
  failed: StateType<boolean>;
};

const attackInputStyle = css`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
`
const shakeAnimation = keyframes`
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
`;

const inputStyle = (shake: boolean) => css`
  width: 40px;
  height: 40px;
  border: 1px solid #000;
  text-align: center;
  margin-right: 10px;
  border-radius: 10px;
  font-size: 2rem;
  animation: ${shake ? css`${shakeAnimation} 0.5s linear` : 'none'};
`;

const createInputRefs = (num: number): React.RefObject<HTMLInputElement>[] => {
  return Array(num).fill(null).map(() => useRef<HTMLInputElement>(null));
};

function AttackInput(props: AttackInputProps) {
  const [inputValues, setInputValues] = useState<string[]>(Array(props.anther.length).fill(''));
  const [shake, setShake] = useState(false);
  const inputRefs = createInputRefs(props.anther.length);
  useEffect(() => {
    inputRefs[0].current?.focus();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[props.anther])

  const handleInputChange = (index: number, value: string) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);

    if (index < inputRefs.length - 1 && value.length === 1) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (JSON.stringify(inputValues) === JSON.stringify(props.anther)) {
      console.log(inputValues);
      props.complete(true);
    } else {
      console.log('Not matched!');
      setShake(true);
      inputRefs[0].current?.focus();
      props.failed(true);
      setTimeout(() => setShake(false), 500);
    }
    setInputValues(Array(props.anther.length).fill(''));
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Backspace') {
      const index = inputValues.findIndex((value) => value === '');
      if (index > 0) {
        inputRefs[index - 1].current?.focus();
      }
    }
  };

  return (
    <form css={attackInputStyle} onSubmit={handleSubmit}>
      {inputRefs.map((inputRef, index) => (
        <input
            key={index}
            ref={inputRef}
            type="text"
            maxLength={1}
            value={inputValues[index]}
            onChange={(e) => handleInputChange(index, e.target.value)}
            onKeyDown={handleKeyDown}
            css={inputStyle(shake)}
        />
      ))}
      <input type="submit" style={{display: 'none'}} />
    </form>
  );
}

export default AttackInput
