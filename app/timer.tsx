import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as ScreenOrientation from 'expo-screen-orientation';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Header from './components/Header';

export default function TimerScreen() {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
      setIsLandscape(window.width > window.height);
    });

    const lockOrientation = async () => {
      try {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
      } catch {}
    };

    lockOrientation();

    return () => {
      subscription?.remove();
    };
  }, []);

  const router = useRouter();
  const { game } = useLocalSearchParams<{ game?: string }>();
  const gameName = typeof game === 'string' ? game : 'Timer';

  const [totalSeconds, setTotalSeconds] = useState<number>(60);
  const [remaining, setRemaining] = useState<number>(60);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setRemaining(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current as ReturnType<typeof setInterval>);
            intervalRef.current = null;
            setRunning(false);
            // Navigate to finish screen
            try {
              router.push({ pathname: '/timer-finish' });
            } catch {}
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [running]);

  const minutes = Math.floor(remaining / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (remaining % 60).toString().padStart(2, '0');

  const setPreset = (sec: number) => {
    setTotalSeconds(sec);
    setRemaining(sec);
    setRunning(false);
  };

  const handleStartPause = () => {
    if (remaining === 0) {
      setRemaining(totalSeconds);
    }
    setRunning(prev => !prev);
  };

  const handleReset = () => {
    setRunning(false);
    setRemaining(totalSeconds);
  };

  const handleBack = () => {
    router.push('/choose-game');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header isGameScreen gameName={gameName} />

      <View style={styles.timerContainer}>
        <Text style={styles.timeText}>{minutes}:{seconds}</Text>

        <View style={styles.controlsRow}>
          <TouchableOpacity style={[styles.controlButton, running ? styles.pause : styles.start]} activeOpacity={0.9} onPress={handleStartPause}>
            <Ionicons name={running ? 'pause' : 'play'} size={24} color="#fff" />
            <Text style={styles.controlLabel}>{running ? 'Pause' : 'Start'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.controlButton, styles.reset]} activeOpacity={0.9} onPress={handleReset}>
            <Ionicons name="reload" size={24} color="#fff" />
            <Text style={styles.controlLabel}>Reset</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.presetRow}>
          <TouchableOpacity style={styles.preset} onPress={() => setPreset(30)} activeOpacity={0.8}>
            <Text style={styles.presetText}>00:30</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.preset} onPress={() => setPreset(60)} activeOpacity={0.8}>
            <Text style={styles.presetText}>01:00</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.preset} onPress={() => setPreset(120)} activeOpacity={0.8}>
            <Text style={styles.presetText}>02:00</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.preset} onPress={() => setPreset(300)} activeOpacity={0.8}>
            <Text style={styles.presetText}>05:00</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.customRow}>
          <Text style={styles.customLabel}>Set Seconds</Text>
          <TextInput
            style={styles.customInput}
            keyboardType="number-pad"
            value={totalSeconds.toString()}
            onChangeText={(t) => {
              const n = Number(t.replace(/[^0-9]/g, ''));
              if (!Number.isNaN(n)) {
                setTotalSeconds(n);
                setRemaining(n);
                setRunning(false);
              }
            }}
          />
        </View>
      </View>

      {/* Back button removed per request */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoImage: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  appName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#00AEEF',
  },
  gameName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#00AEEF',
  },
  timerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  timeText: {
    fontSize: 96,
    fontWeight: '800',
    color: '#333',
    letterSpacing: 2,
  },
  controlsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  controlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  controlLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  start: { backgroundColor: '#28a745' },
  pause: { backgroundColor: '#ffc107' },
  reset: { backgroundColor: '#dc3545' },
  presetRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 24,
  },
  preset: {
    backgroundColor: '#00AEEF',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
  },
  presetText: {
    color: '#fff',
    fontWeight: '700',
  },
  customRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 24,
  },
  customLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  customInput: {
    width: 100,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    textAlign: 'center',
  },
  
});
