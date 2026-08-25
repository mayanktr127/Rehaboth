import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../components/ThemeContext';
import { TopHeaderNav } from '../components/TopHeaderNav';
import { FloatingDockNav } from '../components/FloatingDockNav';
import { FluidPage } from '../components/FluidMotion';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

export default function ConciergeBotScreen() {
  const router = useRouter();
  const { colors } = useTheme();

  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'Welcome to Rehaboth Concierge. How may I assist you today?',
      time: '10:14 AM',
    },
    {
      id: '2',
      sender: 'user',
      text: 'I have a question about my active order #ST-9482.',
      time: '10:15 AM',
    },
    {
      id: '3',
      sender: 'bot',
      text: 'Your order is currently at Carlyle Studio under French Lavender Steam finishing. Expected doorstep is 6:30 PM today.',
      time: '10:15 AM',
    },
  ]);

  const quickPills = [
    'Change pickup time',
    'Special fabric care',
    'Custodian location',
    'Receipt copy',
  ];

  const handleSend = (presetText?: string) => {
    const textToSend = presetText || inputMessage;
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      time: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!presetText) setInputMessage('');

    setTimeout(() => {
      const botReply: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: 'Thank you for reaching out. A Studio Custodian specialist is reviewing your request.',
        time: 'Just now',
      };
      setMessages((prev) => [...prev, botReply]);
    }, 800);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <FluidPage style={styles.container}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          {/* Top Header */}
          <TopHeaderNav showBack={true} onBackPress={() => router.push('/dashboard')} />

          {/* Chat Stream */}
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            {messages.map((msg) => (
              <View
                key={msg.id}
                style={[
                  styles.messageRow,
                  msg.sender === 'user' ? styles.userRow : styles.botRow,
                ]}
              >

              <View
                style={[
                  styles.bubble,
                  msg.sender === 'user'
                    ? [styles.userBubble, { backgroundColor: colors.primary, borderColor: colors.primary }]
                    : [styles.botBubble, { backgroundColor: colors.cardBg, borderColor: colors.border }],
                ]}
              >
                <Text
                  style={[
                    styles.bubbleText,
                    { color: msg.sender === 'user' ? colors.primaryForeground : colors.foreground },
                  ]}
                >
                  {msg.text}
                </Text>
              </View>
              <Text style={[styles.timeText, { color: colors.mutedForeground }]}>{msg.time}</Text>
            </View>
          ))}

          {/* Quick Action Suggestion Chips */}
          <View style={styles.chipsGrid}>
            {quickPills.map((pill) => (
              <Pressable
                key={pill}
                onPress={() => handleSend(pill)}
                style={[
                  styles.chipBtn,
                  { borderColor: colors.border, backgroundColor: colors.cardBg },
                ]}
              >
                <Text style={[styles.chipText, { color: colors.primary }]}>{pill}</Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>

        {/* Bottom Input Bar */}
        <View style={styles.inputContainer}>
          <View style={[styles.textInputBox, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
            <TextInput
              style={[styles.textInput, { color: colors.foreground }]}
              value={inputMessage}
              onChangeText={setInputMessage}
              placeholder="Type a message..."
              placeholderTextColor={colors.mutedForeground}
              onSubmitEditing={() => handleSend()}
            />
            <Text style={[styles.plusIcon, { color: colors.mutedForeground }]}>+</Text>
          </View>

          <Pressable
            onPress={() => handleSend()}
            style={[styles.sendBtn, { backgroundColor: colors.primary }]}
          >
            <Text style={[styles.sendIcon, { color: colors.primaryForeground }]}>›</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
      </FluidPage>

      {/* Floating Bottom Dock Navigation */}
      <FloatingDockNav />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 160,
  },
  messageRow: {
    marginBottom: 16,
  },
  botRow: {
    alignItems: 'flex-start',
  },
  userRow: {
    alignItems: 'flex-end',
  },
  bubble: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    maxWidth: '82%',
    shadowColor: '#3a3128',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  botBubble: {},
  userBubble: {},
  bubbleText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
  },
  timeText: {
    fontSize: 10,
    marginTop: 4,
  },
  chipsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginVertical: 12,
  },
  chipBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
    shadowColor: '#3a3128',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 20,
    paddingBottom: 90,
    paddingTop: 8,
  },
  textInputBox: {
    flex: 1,
    height: 52,
    borderRadius: 999,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    shadowColor: '#3a3128',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
  },
  plusIcon: {
    fontSize: 20,
    fontWeight: '600',
  },
  sendBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#c1774f',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  sendIcon: {
    fontSize: 26,
    fontWeight: '700',
    marginTop: -2,
  },
});
