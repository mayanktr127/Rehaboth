import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { CodeInput } from '../src/components/CodeInput';

describe('CodeInput component', () => {
  it('renders correct number of boxes for 4-digit code', async () => {
    const onChange = jest.fn();
    const { getAllByLabelText } = await render(
      <CodeInput length={4} value="" onChange={onChange} />
    );
    const inputs = getAllByLabelText(/Digit \d of 4/);
    expect(inputs).toHaveLength(4);
  });

  it('renders correct number of boxes for 6-digit code', async () => {
    const onChange = jest.fn();
    const { getAllByLabelText } = await render(
      <CodeInput length={6} value="" onChange={onChange} />
    );
    const inputs = getAllByLabelText(/Digit \d of 6/);
    expect(inputs).toHaveLength(6);
  });

  it('calls onChange with entered digit', async () => {
    const onChange = jest.fn();
    const { getByLabelText } = await render(
      <CodeInput length={4} value="" onChange={onChange} />
    );
    const firstInput = getByLabelText('Digit 1 of 4');
    fireEvent.changeText(firstInput, '7');
    expect(onChange).toHaveBeenCalledWith('7');
  });

  it('handles paste of multi-digit code by slicing to length', async () => {
    const onChange = jest.fn();
    const { getByLabelText } = await render(
      <CodeInput length={4} value="" onChange={onChange} />
    );
    const firstInput = getByLabelText('Digit 1 of 4');
    fireEvent.changeText(firstInput, '9482');
    expect(onChange).toHaveBeenCalledWith('9482');
  });

  it('renders controlled values into individual inputs', async () => {
    const onChange = jest.fn();
    const { getByDisplayValue } = await render(
      <CodeInput length={4} value="1234" onChange={onChange} />
    );
    expect(getByDisplayValue('1')).toBeTruthy();
    expect(getByDisplayValue('2')).toBeTruthy();
    expect(getByDisplayValue('3')).toBeTruthy();
    expect(getByDisplayValue('4')).toBeTruthy();
  });
});
