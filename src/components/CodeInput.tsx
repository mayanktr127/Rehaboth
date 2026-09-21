import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  Platform,
} from 'react-native';
import { useTheme } from './ThemeContext';
import { Fonts } from '../constants/theme';

export interface CodeInputProps {
  length?: 4 | 6;
  value: string;
  onChange: (code: string) => void;
  onComplete?: (code: string) => void;
  error?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
}

export const CodeInput: React.FC<CodeInputProps> = ({
  length = 4,
  value = '',
  onChange,
  onComplete,
  error = false,
  disabled = false,
  autoFocus = true,
}) => {
  const { colors } = useTheme();
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(autoFocus ? 0 : null);

  // Split value into array of digits of exact length
  const digits = Array.from({ length }, (_, i) => value[i] || '');

  useEffect(() => {
    if (value.length === length && onComplete) {
      onComplete(value);
    }
  }, [value, length, onComplete]);

  const handleChangeText = (text: string, index: number) => {
    if (disabled) return;

    // Handle full paste of code (e.g. 4 or 6 digits)
    const cleaned = text.replace(/[^0-9]/g, '');
    if (cleaned.length > 1) {
      const newCode = cleaned.slice(0, length);
      onChange(newCode);
      const nextFocus = Math.min(newCode.length, length - 1);
      inputRefs.current[nextFocus]?.focus();
      return;
    }

    const currentDigits = [...digits];
    const newDigit = cleaned.slice(-1); // Take last digit typed
    currentDigits[index] = newDigit;
    const newCode = currentDigits.join('').replace(/\s+$/, '');
    onChange(newCode);

    if (newDigit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    if (e.nativeEvent.key === 'Backspace') {
      if (!digits[index] && index > 0) {
        // Current box is empty, jump to previous box and clear it
        const currentDigits = [...digits];
        currentDigits[index - 1] = '';
        onChange(currentDigits.join(''));
        inputRefs.current[index - 1]?.focus();
      } else if (digits[index]) {
        // Clear current box
        const currentDigits = [...digits];
        currentDigits[index] = '';
        onChange(currentDigits.join(''));
      }
    }
  };

  const boxSize = length === 6 ? 48 : 60;
  const boxHeight = length === 6 ? 56 : 64;

  return (
    <View style={styles.container}>
      {digits.map((digit, index) => {
        const isFocused = focusedIndex === index;
        return (
          <TextInput
            key={index}
            ref={(ref) => {
              inputRefs.current[index] = ref;
            }}
            style={[
              styles.box,
              {
                width: boxSize,
                height: boxHeight,
                backgroundColor: colors.cardBg,
                borderColor: error
                  ? '#D9534F'
                  : isFocused
                  ? colors.primary
                  : colors.border,
                borderWidth: isFocused || error ? 1.8 : 1,
                color: error ? '#D9534F' : colors.foreground,
                fontFamily: Fonts.display,
                opacity: disabled ? 0.45 : 1,
              },
            ]}
            value={digit}
            onChangeText={(text) => handleChangeText(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            onFocus={() => setFocusedIndex(index)}
            onBlur={() => setFocusedIndex(null)}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            maxLength={length} // Allow paste on any box
            selectTextOnFocus
            editable={!disabled}
            autoFocus={autoFocus && index === 0}
            accessibilityLabel={`Digit ${index + 1} of ${length}`}
            accessibilityRole="none"
            accessible={true}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    marginVertical: 16,
  },
  box: {
    borderRadius: 18,
    textAlign: 'center',
    fontSize: 26,
    fontWeight: '600',
    shadowColor: '#3a3128',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
    padding: 0,
  },
});
