import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  PanResponder,
} from 'react-native';

interface CurtainPullOverlayProps {
  onRevealed?: () => void;
}

export const CurtainPullOverlay: React.FC<CurtainPullOverlayProps> = ({ onRevealed }) => {
  const [revealed, setRevealed] = useState(false);
  const translateY = useState(new Animated.Value(0))[0];

  const handlePullUp = () => {
    Animated.spring(translateY, {
      toValue: -800,
      tension: 40,
      friction: 8,
      useNativeDriver: true,
    }).start(() => {
      setRevealed(true);
      if (onRevealed) onRevealed();
    });
  };

  const handleReset = () => {
    setRevealed(false);
    Animated.spring(translateY, {
      toValue: 0,
      tension: 50,
      friction: 7,
      useNativeDriver: true,
    }).start();
  };

  if (revealed) {
    return (
      <Pressable onPress={handleReset} style={styles.reTriggerBadge}>
        <Text style={styles.reTriggerText}>🤚 PULL CURTAIN AGAIN</Text>
      </Pressable>
    );
  }

  return (
    <Animated.View
      style={[
        styles.overlaySheet,
        {
          transform: [{ translateY }],
        },
      ]}
    >
      <Pressable onPress={handlePullUp} style={styles.curtainContent}>
        {/* Top Notch / Dynamic Island */}
        <View style={styles.notchPill} />

        {/* 3D Reaching Hand Representation */}
        <View style={styles.handContainer}>
          <Text style={{ fontSize: 72 }}>🤚</Text>
          <View style={styles.pulseRing} />
        </View>

        <Text style={styles.curtainTitle}>Interactive Screen Reveal</Text>
        <Text style={styles.curtainSub}>
          Tap or drag up the curtain to reveal Rehaboth Studio
        </Text>

        <View style={styles.dragHandlePill}>
          <Text style={styles.arrowUp}>▲</Text>
          <Text style={styles.dragText}>PULL UP TO REVEAL</Text>
        </View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlaySheet: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    backgroundColor: '#FAF9F6',
    zIndex: 998,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 12,
  },
  curtainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  notchPill: {
    position: 'absolute',
    top: 14,
    width: 120,
    height: 30,
    backgroundColor: '#000000',
    borderRadius: 15,
  },
  handContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  pulseRing: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#FF6514',
    opacity: 0.4,
  },
  curtainTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1C1917',
    textAlign: 'center',
  },
  curtainSub: {
    fontSize: 13,
    color: '#786F68',
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 18,
  },
  dragHandlePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#1C1917',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 40,
  },
  arrowUp: {
    color: '#FF6514',
    fontSize: 14,
  },
  dragText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  reTriggerBadge: {
    position: 'absolute',
    top: 14,
    alignSelf: 'center',
    backgroundColor: '#1C1917',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    zIndex: 997,
  },
  reTriggerText: {
    color: '#FF6514',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
});
