import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as ScreenOrientation from 'expo-screen-orientation';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Easing, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Header from './components/Header';

export default function RNGScreen() {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
      setIsLandscape(window.width > window.height);
    });

    const lockOrientation = async () => {
      try {
        await ScreenOrientation.unlockAsync();
        await new Promise(resolve => setTimeout(resolve, 100));
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
  const gameName = typeof game === 'string' ? game : 'RNG';

  type Mode = 'dice' | 'range' | 'coin';
  const [mode, setMode] = useState<Mode>('dice');
  const [diceCount, setDiceCount] = useState<1 | 2>(1);
  const [diceValues, setDiceValues] = useState<number[]>([1]);
  const diceAnim = useRef(new Animated.Value(0)).current;
  const coinAnim = useRef(new Animated.Value(0)).current;
  const diceSpinInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const coinFlipInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const [minValue, setMinValue] = useState<number>(1);
  const [maxValue, setMaxValue] = useState<number>(100);
  const [rangeResult, setRangeResult] = useState<number>(50);
  const [coinResult, setCoinResult] = useState<'Heads' | 'Tails'>('Heads');

  const rollDice = () => {
    // Start icon shake/rotate
    diceAnim.setValue(0);
    Animated.timing(diceAnim, {
      toValue: 1,
      duration: 700,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start(() => {
      diceAnim.setValue(0);
    });

    // Rapidly change values during animation
    const count = diceCount === 2 ? 2 : 1;
    let ticks = 0;
    if (diceSpinInterval.current) clearInterval(diceSpinInterval.current);
    diceSpinInterval.current = setInterval(() => {
      ticks += 1;
      const tmp = Array.from({ length: count }, () => 1 + Math.floor(Math.random() * 6));
      setDiceValues(tmp);
      if (ticks > 10) {
        if (diceSpinInterval.current) clearInterval(diceSpinInterval.current);
        diceSpinInterval.current = null;
      }
    }, 50);
  };

  const rollRange = () => {
    const min = Math.min(minValue, maxValue);
    const max = Math.max(minValue, maxValue);
    const val = min + Math.floor(Math.random() * (max - min + 1));
    setRangeResult(val);
  };

  const flipCoin = () => {
    // Flip animation
    coinAnim.setValue(0);
    Animated.timing(coinAnim, {
      toValue: 1,
      duration: 800,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      coinAnim.setValue(0);
    });

    // Shuffle text during flip
    let ticks = 0;
    if (coinFlipInterval.current) clearInterval(coinFlipInterval.current);
    coinFlipInterval.current = setInterval(() => {
      ticks += 1;
      setCoinResult(Math.random() < 0.5 ? 'Heads' : 'Tails');
      if (ticks > 12) {
        if (coinFlipInterval.current) clearInterval(coinFlipInterval.current);
        coinFlipInterval.current = null;
      }
    }, 50);
  };

  const renderMain = () => {
    if (mode === 'dice') {
      return (
        <View style={styles.centerArea}>
          <View style={styles.diceRow}>
            <TouchableOpacity style={[styles.togglePill, diceCount === 1 && styles.toggleActive]} onPress={() => setDiceCount(1)}>
              <Text style={styles.toggleText}>1 Die</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.togglePill, diceCount === 2 && styles.toggleActive]} onPress={() => setDiceCount(2)}>
              <Text style={styles.toggleText}>2 Dice</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.resultRow}>
            {Array.from({ length: diceCount }).map((_, i) => {
              const rotate = diceAnim.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: ['0deg', '15deg', '0deg'],
              });
              const scale = diceAnim.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [1, 1.15, 1],
              });
              return (
                <Animated.View key={i} style={[styles.dieBox, { transform: [{ rotate }, { scale }] }]}>
                  <MaterialCommunityIcons name={`dice-${diceValues[i] || 1}` as any} size={96} color="#333" />
                  <Text style={styles.dieValue}>{diceValues[i] || 1}</Text>
                </Animated.View>
              );
            })}
          </View>
          <TouchableOpacity style={[styles.primaryButton]} activeOpacity={0.9} onPress={rollDice}>
            <Text style={styles.primaryButtonText}>Tap to Roll</Text>
          </TouchableOpacity>
        </View>
      );
    }
    if (mode === 'range') {
      return (
        <View style={styles.centerArea}>
          <View style={styles.rangeInputs}>
            <View style={styles.inputBlock}>
              <Text style={styles.inputLabel}>Min</Text>
              <TextInput
                style={styles.numberInput}
                keyboardType="number-pad"
                value={minValue.toString()}
                onChangeText={(t) => {
                  const n = Number(t.replace(/[^0-9-]/g, ''));
                  if (!Number.isNaN(n)) setMinValue(n);
                }}
              />
            </View>
            <View style={styles.inputBlock}>
              <Text style={styles.inputLabel}>Max</Text>
              <TextInput
                style={styles.numberInput}
                keyboardType="number-pad"
                value={maxValue.toString()}
                onChangeText={(t) => {
                  const n = Number(t.replace(/[^0-9-]/g, ''));
                  if (!Number.isNaN(n)) setMaxValue(n);
                }}
              />
            </View>
          </View>
          <View style={styles.resultRow}>
            <Text style={styles.bigResult}>{rangeResult}</Text>
          </View>
          <TouchableOpacity style={[styles.primaryButton]} activeOpacity={0.9} onPress={rollRange}>
            <Text style={styles.primaryButtonText}>Generate</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View style={styles.centerArea}>
        <View style={styles.resultRow}>
          <Animated.View
            style={{
              backfaceVisibility: 'hidden',
              transform: [
                {
                  rotateY: coinAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '720deg'],
                  }),
                },
                { scale: coinAnim.interpolate({ inputRange: [0, 0.5, 1], outputRange: [1, 1.2, 1] }) },
              ],
            }}
          >
            <Text style={styles.bigResult}>{coinResult}</Text>
          </Animated.View>
        </View>
        <TouchableOpacity style={[styles.primaryButton]} activeOpacity={0.9} onPress={flipCoin}>
          <Text style={styles.primaryButtonText}>Flip Coin</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header isGameScreen gameName={gameName} />

      {/* Mode selector */}
      <View style={styles.topBar}>
        <View style={styles.modeSelector}>
          <TouchableOpacity style={[styles.iconButton, mode === 'dice' && styles.activeIconButton]} onPress={() => setMode('dice')}>
            <MaterialCommunityIcons name="dice-multiple-outline" size={20} color="#00AEEF" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.iconButton, mode === 'range' && styles.activeIconButton]} onPress={() => setMode('range')}>
            <Ionicons name="stats-chart-outline" size={20} color="#00AEEF" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.iconButton, mode === 'coin' && styles.activeIconButton]} onPress={() => setMode('coin')}>
            <Ionicons name="cash-outline" size={20} color="#00AEEF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main content */}
      <View style={styles.mainContent}>
        {renderMain()}
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E6E6E6',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoImage: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
  appName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
  },
  gameName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#00AEEF',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  modeSelector: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  activeIconButton: {
    backgroundColor: '#E6E6E6',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  centerArea: {
    width: '100%',
    alignItems: 'center',
    gap: 16,
  },
  diceRow: {
    flexDirection: 'row',
    gap: 8,
  },
  togglePill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#CCC',
    backgroundColor: '#fff',
  },
  toggleActive: {
    backgroundColor: '#E6F7FD',
    borderColor: '#00AEEF',
  },
  toggleText: {
    color: '#00AEEF',
    fontWeight: '700',
  },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    minHeight: 120,
  },
  dieBox: {
    alignItems: 'center',
  },
  dieValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginTop: 8,
  },
  bigResult: {
    fontSize: 96,
    fontWeight: '800',
    color: '#333',
  },
  primaryButton: {
    backgroundColor: '#00AEEF',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  rangeInputs: {
    flexDirection: 'row',
    gap: 16,
  },
  inputBlock: {
    alignItems: 'center',
  },
  inputLabel: {
    color: '#666',
    marginBottom: 6,
  },
  numberInput: {
    width: 120,
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
