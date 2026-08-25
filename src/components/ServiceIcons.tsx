import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

// 1. Studio Pickup: White laundry basket with crisp solid black outline
export const BasketIcon: React.FC<{ size?: number }> = ({ size = 26 }) => {
  return (
    <View style={[styles.basketContainer, { width: size, height: size }]}>
      {/* Top Rim */}
      <View style={styles.basketTopRim}>
        <View style={styles.basketHandle} />
      </View>
      {/* Basket Body */}
      <View style={styles.basketBody}>
        <View style={styles.meshRow}>
          <View style={styles.meshHole} />
          <View style={styles.meshHole} />
          <View style={styles.meshHole} />
        </View>
        <View style={styles.meshRow}>
          <View style={styles.meshHole} />
          <View style={styles.meshHole} />
          <View style={styles.meshHole} />
        </View>
      </View>
    </View>
  );
};

// 2. Smart Bag Vault: White dual shopping bags with crisp solid black outline
export const ShoppingBagsIcon: React.FC<{ size?: number }> = ({ size = 26 }) => {
  return (
    <View style={[styles.bagsContainer, { width: size, height: size }]}>
      {/* Rear Bag */}
      <View style={styles.rearBag}>
        <View style={styles.bagHandleRear} />
      </View>
      {/* Front Bag */}
      <View style={styles.frontBag}>
        <View style={styles.bagHandleFront} />
      </View>
    </View>
  );
};

// 3. Order Status / Vault: White Stopwatch with solid black outline & red pointer
export const StopwatchIcon: React.FC<{ size?: number }> = ({ size = 26 }) => {
  return (
    <View style={[styles.stopwatchContainer, { width: size, height: size }]}>
      {/* Top Crown */}
      <View style={styles.stopwatchCrown} />
      {/* Watch Dial */}
      <View style={styles.stopwatchDial}>
        {/* Center Pivot */}
        <View style={styles.stopwatchCenter} />
        {/* Red Clock Hand */}
        <View style={styles.redHand} />
      </View>
    </View>
  );
};

// 4. Secure Handover: Padlock with solid black outline
export const PadlockIcon: React.FC<{ size?: number }> = ({ size = 26 }) => {
  return (
    <View style={[styles.padlockContainer, { width: size, height: size }]}>
      {/* Shackle */}
      <View style={styles.padlockShackle} />
      {/* Lock Body */}
      <View style={styles.padlockBody}>
        {/* Keyhole */}
        <View style={styles.keyholeTop} />
        <View style={styles.keyholeStem} />
      </View>
    </View>
  );
};

// 5. Calendar Icon: White rounded card with solid black outline & brown top bar
export const CalendarIcon: React.FC<{ size?: number }> = ({ size = 22 }) => {
  return (
    <View style={[styles.calContainer, { width: size, height: size }]}>
      <View style={styles.calTopBar}>
        <View style={styles.calRing} />
        <View style={styles.calRing} />
      </View>
      <View style={styles.calBody}>
        <Text style={styles.calNum}>31</Text>
      </View>
    </View>
  );
};

// 6. Jacket / Blazer Icon (Wool Blazer): Crisp black outline with collar detail
export const JacketIcon: React.FC<{ size?: number }> = ({ size = 26 }) => {
  return (
    <View style={[styles.jacketContainer, { width: size, height: size }]}>
      <View style={styles.jacketCollar} />
      <View style={styles.jacketBody}>
        <View style={styles.jacketLapelLeft} />
        <View style={styles.jacketLapelRight} />
        <View style={styles.jacketButtons}>
          <View style={styles.jacketBtnDot} />
          <View style={styles.jacketBtnDot} />
          <View style={styles.jacketBtnDot} />
        </View>
      </View>
    </View>
  );
};

// 7. Shirt & Tie Icon: Crisp black outline with red tie
export const ShirtTieIcon: React.FC<{ size?: number }> = ({ size = 26 }) => {
  return (
    <View style={[styles.shirtContainer, { width: size, height: size }]}>
      <View style={styles.shirtCollarRow}>
        <View style={styles.shirtCollarLeft} />
        <View style={styles.shirtTieKnot} />
        <View style={styles.shirtCollarRight} />
      </View>
      <View style={styles.shirtBody}>
        <View style={styles.shirtTieStem} />
      </View>
    </View>
  );
};

// 8. Chat Bubble Icon (Concierge Bot): Pure white speech bubble with crisp black outline & 3 dots
export const ChatBubbleIcon: React.FC<{ size?: number }> = ({ size = 24 }) => {
  return (
    <View style={[styles.chatContainer, { width: size, height: size }]}>
      <View style={styles.chatBubble}>
        <View style={styles.chatDot} />
        <View style={styles.chatDot} />
        <View style={styles.chatDot} />
      </View>
      <View style={styles.chatTail} />
    </View>
  );
};

// 9. Target / Bullseye Icon: Concentric red & white circles with black outline
export const TargetIcon: React.FC<{ size?: number }> = ({ size = 24 }) => {
  return (
    <View style={[styles.targetOuter, { width: size, height: size }]}>
      <View style={styles.targetRingWhite}>
        <View style={styles.targetCenterRed} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Basket
  basketContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  basketTopRim: {
    width: 22,
    height: 5.5,
    backgroundColor: '#ffffff',
    borderRadius: 3,
    borderWidth: 2,
    borderColor: '#000000',
    alignItems: 'center',
    zIndex: 2,
  },
  basketHandle: {
    width: 8,
    height: 2,
    backgroundColor: '#000000',
    borderRadius: 1,
    marginTop: -0.5,
  },
  basketBody: {
    width: 19,
    height: 16,
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderWidth: 2,
    borderColor: '#000000',
    marginTop: -2,
    padding: 2,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  meshRow: {
    flexDirection: 'row',
    gap: 2,
  },
  meshHole: {
    width: 3,
    height: 3,
    backgroundColor: '#000000',
    borderRadius: 0.8,
  },

  // Bags
  bagsContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rearBag: {
    position: 'absolute',
    left: 2,
    bottom: 2,
    width: 16,
    height: 18,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 3,
    alignItems: 'center',
  },
  bagHandleRear: {
    width: 8,
    height: 5,
    borderWidth: 2,
    borderColor: '#000000',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomWidth: 0,
    marginTop: -4.5,
  },
  frontBag: {
    position: 'absolute',
    right: 2,
    bottom: 0,
    width: 14,
    height: 15,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 2.5,
    alignItems: 'center',
  },
  bagHandleFront: {
    width: 6,
    height: 4,
    borderWidth: 2,
    borderColor: '#000000',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    borderBottomWidth: 0,
    marginTop: -3.5,
  },

  // Stopwatch
  stopwatchContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  stopwatchCrown: {
    width: 6,
    height: 3,
    backgroundColor: '#000000',
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    marginBottom: -1,
  },
  stopwatchDial: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2.2,
    borderColor: '#000000',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  stopwatchCenter: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#000000',
  },
  redHand: {
    position: 'absolute',
    top: 4,
    right: 5.5,
    width: 1.8,
    height: 6.5,
    backgroundColor: '#e74c3c',
    transform: [{ rotate: '40deg' }],
    borderRadius: 1,
  },

  // Padlock
  padlockContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  padlockShackle: {
    width: 12,
    height: 10,
    borderWidth: 2.2,
    borderColor: '#000000',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomWidth: 0,
    marginBottom: -2,
    backgroundColor: 'transparent',
  },
  padlockBody: {
    width: 19,
    height: 15,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyholeTop: {
    width: 3.5,
    height: 3.5,
    borderRadius: 1.75,
    backgroundColor: '#000000',
  },
  keyholeStem: {
    width: 2,
    height: 3,
    backgroundColor: '#000000',
    marginTop: -0.5,
  },

  // Calendar
  calContainer: {
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
  },
  calTopBar: {
    height: 6,
    backgroundColor: '#c1774f',
    borderBottomWidth: 1.5,
    borderBottomColor: '#000000',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  calRing: {
    width: 2,
    height: 2,
    backgroundColor: '#ffffff',
    borderRadius: 1,
  },
  calBody: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  calNum: {
    fontSize: 9.5,
    fontWeight: '900',
    color: '#000000',
  },

  // Jacket
  jacketContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  jacketCollar: {
    width: 12,
    height: 4,
    backgroundColor: '#2c251f',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    borderWidth: 1.5,
    borderColor: '#000000',
    borderBottomWidth: 0,
  },
  jacketBody: {
    width: 20,
    height: 18,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 3,
    marginTop: -1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  jacketLapelLeft: {
    position: 'absolute',
    top: 0,
    left: 2,
    width: 4,
    height: 8,
    borderRightWidth: 1.5,
    borderBottomWidth: 1.5,
    borderColor: '#000000',
  },
  jacketLapelRight: {
    position: 'absolute',
    top: 0,
    right: 2,
    width: 4,
    height: 8,
    borderLeftWidth: 1.5,
    borderBottomWidth: 1.5,
    borderColor: '#000000',
  },
  jacketButtons: {
    marginTop: 4,
    gap: 2,
    alignItems: 'center',
  },
  jacketBtnDot: {
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: '#000000',
  },

  // Shirt & Tie
  shirtContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  shirtCollarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 2,
  },
  shirtCollarLeft: {
    width: 6,
    height: 4,
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: '#000000',
    transform: [{ rotate: '15deg' }],
  },
  shirtTieKnot: {
    width: 4,
    height: 4,
    backgroundColor: '#e74c3c',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 1,
  },
  shirtCollarRight: {
    width: 6,
    height: 4,
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: '#000000',
    transform: [{ rotate: '-15deg' }],
  },
  shirtBody: {
    width: 20,
    height: 16,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 3,
    marginTop: -1,
    alignItems: 'center',
  },
  shirtTieStem: {
    width: 3.5,
    height: 10,
    backgroundColor: '#e74c3c',
    borderWidth: 1,
    borderColor: '#000000',
    borderBottomLeftRadius: 1.5,
    borderBottomRightRadius: 1.5,
  },

  // Chat Bubble
  chatContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  chatBubble: {
    width: 22,
    height: 16,
    backgroundColor: '#ffffff',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#000000',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2.5,
  },
  chatDot: {
    width: 2.5,
    height: 2.5,
    borderRadius: 1.25,
    backgroundColor: '#000000',
  },
  chatTail: {
    position: 'absolute',
    bottom: 0,
    left: 4,
    width: 5,
    height: 5,
    backgroundColor: '#ffffff',
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#000000',
    transform: [{ rotate: '45deg' }],
  },

  // Target
  targetOuter: {
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000000',
    backgroundColor: '#e74c3c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  targetRingWhite: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  targetCenterRed: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#e74c3c',
    borderWidth: 1,
    borderColor: '#000000',
  },
});
