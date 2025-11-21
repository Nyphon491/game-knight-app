import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { getIykykNameForLevel, getIykykQuestionsForLevel } from './data/iykykLevels';

export default function IykykCollectScreen() {
  const router = useRouter();
  const { level, players } = useLocalSearchParams<{ level?: string; players?: string }>();
  const levelNumber = level ? Number(level) : 1;
  const questions = useMemo(() => getIykykQuestionsForLevel(levelNumber), [levelNumber]);
  const setName = useMemo(() => getIykykNameForLevel(levelNumber), [levelNumber]);

  const playerCount = Math.min(Math.max(Number(players || '2') || 2, 2), 12);
  const perPlayer = Math.floor(questions.length / playerCount);

  const assignments: { playerIndex: number; qIndex: number }[] = [];
  for (let p = 0; p < playerCount; p += 1) {
    for (let j = 0; j < perPlayer; j += 1) {
      const qi = p * perPlayer + j;
      assignments.push({ playerIndex: p, qIndex: qi });
    }
  }

  const [answers, setAnswers] = useState<string[]>(() => Array(assignments.length).fill(''));
  const [step, setStep] = useState(0);
  const [showHide, setShowHide] = useState(false);

  const current = assignments[step];
  const done = step >= assignments.length;
  const playerLabel = current ? `Player ${current.playerIndex + 1}` : '';
  const questionText = current ? questions[current.qIndex] : '';

  const handleNext = () => {
    if (!done) {
      const next = step + 1;
      // if moving to a new player's first question, show hide screen
      if (perPlayer > 0 && next % perPlayer === 0) {
        setShowHide(true);
      }
      setStep(next);
    }
    else {
      // prepare reveal payload
      const payload = assignments.map((a, idx) => ({
        question: questions[a.qIndex],
        answer: answers[idx] || '',
        playerIndex: a.playerIndex,
      }));
      router.push({ pathname: '/iykyk-reveal', params: { data: JSON.stringify(payload) } });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <Image source={require('@/assets/images/game-knight-logo.png')} style={styles.logoImage} resizeMode="contain" />
          <Text style={styles.appName}>Game Knight</Text>
          <Text style={styles.gameName}>If You Know, You Know</Text>
        </View>
      </View>

      {!done ? (
        <View style={styles.collectArea}>
          {showHide ? (
            <>
              <Text style={styles.hideTitle}>Hand to next player</Text>
              <TouchableOpacity style={styles.nextButton} activeOpacity={0.8} onPress={() => setShowHide(false)}>
                <Text style={styles.nextText}>I have the phone →</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.playerTag}>{playerLabel}</Text>
              <Text style={styles.question}>{questionText}</Text>
              <TextInput
                style={styles.input}
                placeholder="Type your answer"
                placeholderTextColor="#999"
                value={answers[step]}
                onChangeText={(t) => {
                  const arr = answers.slice();
                  arr[step] = t;
                  setAnswers(arr);
                }}
              />
              <TouchableOpacity style={styles.nextButton} activeOpacity={0.8} onPress={handleNext}>
                <Text style={styles.nextText}>Next →</Text>
              </TouchableOpacity>
              <Text style={styles.progress}>{step + 1} / {assignments.length}</Text>
            </>
          )}
        </View>
      ) : (
        <View style={styles.collectArea}>
          <Text style={styles.doneText}>Collection complete</Text>
          <TouchableOpacity style={styles.nextButton} activeOpacity={0.8} onPress={handleNext}>
            <Text style={styles.nextText}>Go To Reveal →</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.backRow}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            router.push({ pathname: '/level-select', params: { game: 'If You Know, You Know', players: String(playerCount) } })
          }
        >
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingHorizontal: 20, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#E6E6E6' },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  logoImage: { width: 40, height: 40 },
  appName: { fontSize: 24, fontWeight: '600', color: '#333' },
  gameName: { fontSize: 18, fontWeight: '700', color: '#00AEEF', marginLeft: 12 },
  collectArea: { flex: 1, padding: 24, alignItems: 'center', justifyContent: 'center', gap: 16 },
  playerTag: { fontSize: 18, fontWeight: '800', color: '#00AEEF' },
  question: { fontSize: 22, fontWeight: '700', color: '#333', textAlign: 'center' },
  input: { width: '90%', borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10, fontSize: 16, backgroundColor: '#f9f9f9' },
  nextButton: { marginTop: 6, backgroundColor: '#00AEEF', paddingVertical: 12, paddingHorizontal: 22, borderRadius: 12 },
  nextText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  progress: { marginTop: 8, fontSize: 14, color: '#666' },
  doneText: { fontSize: 22, fontWeight: '800', color: '#333' },
  hideTitle: { fontSize: 22, fontWeight: '800', color: '#333' },
  backRow: { alignItems: 'center', marginBottom: 16 },
  backText: { fontSize: 18, fontWeight: '600', color: '#00AEEF' },
});
