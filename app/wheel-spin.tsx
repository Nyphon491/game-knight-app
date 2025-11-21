import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Svg, { G, Path, Circle as SvgCircle, Text as SvgText } from 'react-native-svg';

const { width: dimensionsWidth, height: dimensionsHeight } = Dimensions.get('window');

export default function WheelSpinScreen() {
  const router = useRouter();
  const { game } = useLocalSearchParams<{ game?: string }>();

  const gameName = typeof game === 'string' ? game : 'Wheel Spin';
  const [textInputs, setTextInputs] = useState(Array(25).fill(''));
  const [removeWinner, setRemoveWinner] = useState(false);
  const [dimensions, setDimensions] = useState({ width: dimensionsWidth, height: dimensionsHeight });
  const [isLandscape, setIsLandscape] = useState(dimensionsWidth > dimensionsHeight);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isShowingResult, setIsShowingResult] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const spinAnimation = useRef(new Animated.Value(0)).current;
  const resultOpacity = useRef(new Animated.Value(0)).current;

  // Simple storage using global object (works across app navigation)
  const storage = {
    get: async (key: string) => {
      try {
        // @ts-ignore - global storage
        return global.wheelSpinStorage?.[key] || null;
      } catch (error) {
        console.log('Error getting storage:', error);
        return null;
      }
    },
    set: async (key: string, value: any) => {
      try {
        // @ts-ignore - global storage
        if (!global.wheelSpinStorage) global.wheelSpinStorage = {};
        // @ts-ignore - global storage
        global.wheelSpinStorage[key] = value;
      } catch (error) {
        console.log('Error setting storage:', error);
      }
    }
  };

  // Load saved text inputs when component mounts
  useEffect(() => {
    loadTextInputs();
  }, []);

  // Save text inputs whenever they change
  useEffect(() => {
    if (textInputs.some(input => input !== '')) {
      saveTextInputs();
    }
  }, [textInputs]);

  const loadTextInputs = async () => {
    try {
      const savedInputs = await storage.get('wheelSpinTextInputs');
      if (savedInputs) {
        setTextInputs(savedInputs);
      }
    } catch (error) {
      console.log('Error loading text inputs:', error);
    }
  };

  const saveTextInputs = async () => {
    try {
      await storage.set('wheelSpinTextInputs', textInputs);
    } catch (error) {
      console.log('Error saving text inputs:', error);
    }
  };

  // Geometry helpers for SVG pie slices
  const polarToCartesian = (cx: number, cy: number, r: number, angleDeg: number) => {
    const angleRad = ((angleDeg - 90) * Math.PI) / 180.0;
    return {
      x: cx + r * Math.cos(angleRad),
      y: cy + r * Math.sin(angleRad),
    };
  };

  const arcPath = (cx: number, cy: number, r: number, startAngle: number, endAngle: number) => {
    const start = polarToCartesian(cx, cy, r, endAngle);
    const end = polarToCartesian(cx, cy, r, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y} Z`;
  };

  const handleTextChange = (index: number, newText: string) => {
    // Limit to 30 characters
    if (newText.length <= 30) {
      const updatedInputs = [...textInputs];
      updatedInputs[index] = newText;
      setTextInputs(updatedInputs);
    }
  };

  const clearAllTexts = () => {
    setTextInputs(Array(25).fill(''));
  };

  const spinWheel = () => {
    if (isSpinning) return;
    
    // Count non-empty text inputs and get labels
    const nonEmptyInputs = textInputs.filter(text => text.trim() !== '');
    const labels = nonEmptyInputs.length >= 2 ? nonEmptyInputs : ['A', 'B'];
    const segmentsCount = labels.length;
    
    setIsSpinning(true);
    
    // Generate random spin amount (3-5 full rotations) 
    const randomSpins = Math.floor(Math.random() * 3) + 3;
    // Random duration between 3-7 seconds
    const duration = Math.floor(Math.random() * 4000) + 3000; // 3000-7000ms
    
    // Calculate a random final rotation (don't try to target specific segment)
    const randomFinalAngle = Math.random() * 360;
    const totalRotation = randomSpins * 360 + randomFinalAngle;
    
    Animated.timing(spinAnimation, {
      toValue: totalRotation,
      duration: duration,
      useNativeDriver: true,
    }).start(() => {
      setIsSpinning(false);
      
      // Calculate which segment the pointer is actually pointing at
      // The pointer is at 3 o'clock position (90 degrees from our 0 at top)
      // The wheel rotated by totalRotation degrees, so we need to find what's now at the pointer
      const segmentAngle = 360 / segmentsCount;
      // Normalize the final rotation to 0-360 range
      const normalizedRotation = totalRotation % 360;
      // The pointer sees the segment that is at -90 degrees from the wheel's rotation
      const pointerAngle = (90 - normalizedRotation + 360) % 360;
      // Find which segment contains this angle
      const landedSegmentIndex = Math.floor(pointerAngle / segmentAngle);
      
      // Get the actual text for the landed segment
      const selectedLabelText = labels[landedSegmentIndex];
      
      // Show the selected result BEFORE resetting the wheel
      setSelectedText(selectedLabelText);
      setIsShowingResult(true);
      
      // If remove winner toggle is enabled, clear the winner text input
      if (removeWinner) {
        // Find the index of the winner in the original textInputs array
        const winnerIndex = textInputs.findIndex(text => text.trim() === selectedLabelText);
        if (winnerIndex !== -1) {
          const updatedInputs = [...textInputs];
          updatedInputs[winnerIndex] = '';
          setTextInputs(updatedInputs);
        }
      }
      
      // Fade in animation
      Animated.timing(resultOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        // After fade in, wait 1 second, then fade out
        setTimeout(() => {
          Animated.timing(resultOpacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }).start(() => {
            // Only reset the wheel AFTER the result is completely hidden
            spinAnimation.setValue(0);
            setIsShowingResult(false);
            setSelectedText('');
          });
        }, 1000);
      });
    });
  };

  // Generate colors for segments
  const getSegmentColor = (index: number) => {
    const colors = ['#00AEEF', '#FF6B6B', '#4ECDC4', '#FFD93D', '#6BCF7F', '#FF8C42', '#B19CD9', '#FFB6C1'];
    return colors[index % colors.length];
  };

  useEffect(() => {
    const lockOrientation = async () => {
      try {
        // First unlock any current orientation
        await ScreenOrientation.unlockAsync();
        
        // Small delay to ensure unlock completes
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Now lock to landscape
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
        console.log('✅ Locked to landscape');
        
        // Check current orientation
        const orientation = await ScreenOrientation.getOrientationAsync();
        console.log('Current orientation:', orientation);
        setIsLandscape(dimensions.width > dimensions.height);
      } catch (error) {
        console.log('❌ Lock failed:', error);
      }
    };

    lockOrientation();

    // Listen for dimension changes
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions({ width: window.width, height: window.height });
      setIsLandscape(window.width > window.height);
    });

    return () => {
      // Unlock orientation when component unmounts
      ScreenOrientation.unlockAsync();
      subscription?.remove();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <Image
            source={require('@/assets/images/game-knight-logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <Text style={styles.appName}>Game Knight</Text>
        </View>
        <Text style={styles.gameName}>{gameName}</Text>
      </View>

      {/* Main content with text inputs and wheel */}
      <View style={styles.mainContent}>
        {/* Left column with text inputs */}
        <ScrollView style={styles.leftColumn} showsVerticalScrollIndicator={false}>
          {textInputs.map((text, index) => (
            <View key={index} style={styles.inputContainer}>
              <TextInput
                style={styles.smallTextInput}
                value={text}
                onChangeText={(newText) => handleTextChange(index, newText)}
                placeholder={`Item ${index + 1}`}
                placeholderTextColor="#999"
                maxLength={30}
              />
            </View>
          ))}
        </ScrollView>

        {/* Right side with spinning wheel */}
        <View style={styles.rightColumn}>
          {/* Clear All Button and Toggle */}
          <View style={styles.clearAllToggleRow}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={clearAllTexts}
            >
              <Text style={styles.clearAllText}>Clear All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.wheelContainer}>
            {/* Spinning layer */}
            <TouchableOpacity activeOpacity={0.9} onPress={spinWheel} disabled={isSpinning} style={styles.wheelTouchableArea}>
              <Animated.View
                style={[
                  styles.wheel,
                  {
                    transform: [
                      {
                        rotate: spinAnimation.interpolate({
                          inputRange: [0, 360],
                          outputRange: ['0deg', '360deg'],
                        }),
                      },
                    ],
                  },
                ]}
              >
                {(() => {
                  const size = 260;
                  const radius = size / 2;
                  const nonEmptyInputs = textInputs
                    .map(t => t.trim())
                    .filter(t => t !== '');
                  const labels = nonEmptyInputs.length >= 2 ? nonEmptyInputs : ['A', 'B'];
                  const count = labels.length;
                  const angle = 360 / count;
                  return (
                    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                      <G>
                        {labels.map((label, i) => {
                          const start = i * angle;
                          const end = (i + 1) * angle;
                          const d = arcPath(radius, radius, radius, start, end);
                          const mid = start + angle / 2;
                          const textR = radius * 0.62;
                          const tx = radius + textR * Math.cos(((mid - 90) * Math.PI) / 180);
                          const ty = radius + textR * Math.sin(((mid - 90) * Math.PI) / 180);
                          return (
                            <G key={`seg-${i}`}>
                              <Path d={d} fill={getSegmentColor(i)} stroke="#fff" strokeWidth={2} />
                              <SvgText
                                x={tx}
                                y={ty}
                                fill="#1F2A44"
                                fontSize={14}
                                fontWeight="700"
                                textAnchor="middle"
                                alignmentBaseline="middle"
                                transform={`rotate(${mid}, ${tx}, ${ty})`}
                              >
                                {label}
                              </SvgText>
                            </G>
                          );
                        })}
                        {/* Outer circle subtle shadow ring */}
                        <SvgCircle cx={radius} cy={radius} r={radius - 2} stroke="#e9eef3" strokeWidth={2} fill="transparent" />
                      </G>
                    </Svg>
                  );
                })()}
              </Animated.View>
            </TouchableOpacity>

            {/* Fixed center play button and pointer overlay (does not rotate) */}
            <View pointerEvents="none" style={styles.centerOverlay}>
              <View style={styles.centerButton}>
                <Ionicons name="play" size={18} color="#1F2A44" />
              </View>
              <View style={styles.pointer} />
            </View>
          </View>
          
          {/* Remove Winner Toggle */}
          <View style={styles.toggleBelowWheel}>
            <View style={styles.toggleRow}>
              <Text style={styles.toggleText}>Remove Winner</Text>
              <Switch
                value={removeWinner}
                onValueChange={setRemoveWinner}
                trackColor={{ false: '#767577', true: '#00AEEF' }}
                thumbColor={removeWinner ? '#ffffff' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
              />
            </View>
          </View>
        </View>
      </View>

      {/* Result overlay */}
      {isShowingResult && (
        <Animated.View style={[styles.resultOverlay, { opacity: resultOpacity }]}>
          <Text style={styles.resultText}>{selectedText}</Text>
        </Animated.View>
      )}

      {/* Back button */}
      <View style={styles.backRow}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.push('/choose-game')}
        >
          <Text style={styles.backText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logoImage: {
    width: 32,
    height: 32,
    marginRight: 8,
  },
  appName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  gameName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#00AEEF',
  },
  clearAllRow: {
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  clearAllText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#00AEEF',
  },
  clearAllToggleRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 8,
    marginLeft: -18,
  },
  toggleContainer: {
    alignItems: 'center',
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#00AEEF',
    marginRight: 8,
  },
  toggleBelowWheel: {
    alignItems: 'center',
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
  },
  leftColumn: {
    flex: 0.45, // 45% of screen width
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  rightColumn: {
    flex: 0.55, // 55% of screen width
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  inputContainer: {
    marginBottom: 12,
  },
  smallTextInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#FAFAFA',
  },
  wheelContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginTop: 20,
  },
  wheel: {
    width: 260,
    height: 260,
    borderRadius: 130,
    overflow: 'hidden',
  },
  wheelTouchableArea: {
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerOverlay: {
    position: 'absolute',
    width: 260,
    height: 260,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  pointer: {
    position: 'absolute',
    left: 130 + 24, // centerX + radius of button half
    top: '50%',
    marginTop: -6,
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderTopWidth: 6,
    borderBottomWidth: 6,
    borderLeftColor: '#fff',
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  resultOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  resultText: {
    fontSize: 72,
    fontWeight: '800',
    color: '#1F2A44',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  backRow: {
    alignItems: 'center',
    marginTop: 8,
  },
  backText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#00AEEF',
  },
});
