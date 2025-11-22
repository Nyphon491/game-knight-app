import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as ScreenOrientation from 'expo-screen-orientation';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Svg, { Path as SvgPath } from 'react-native-svg';
import Header from './components/Header';

export default function WhiteBoardScreen() {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      console.log('Dimensions changed:', window.width, 'x', window.height);
      setDimensions(window);
      setIsLandscape(window.width > window.height);
    });

    const lockOrientation = async () => {
      try {
        // First unlock to reset any existing locks
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

    return () => {
      subscription?.remove();
      // Don't unlock immediately - let the next screen handle it
    };
  }, []);
  
  const router = useRouter();
  const { game } = useLocalSearchParams<{ game?: string }>();

  const gameName = typeof game === 'string' ? game : 'White Board';
  const [text, setText] = useState('');
  const [inputMode, setInputMode] = useState<'typing' | 'pencil'>('pencil');
  const [paths, setPaths] = useState<Array<{ x: number; y: number }[]>>([]);
  const [currentPath, setCurrentPath] = useState<{ x: number; y: number }[]>([]);
  const svgRef = useRef<View>(null);

  // Calculate font size based on text length and screen width
  const calculateFontSize = (textLength: number) => {
    const screenWidth = dimensions.width;
    const padding = 10; // Further reduced padding for more space
    const availableWidth = screenWidth - padding;
    const maxLength = 30;
    
    if (textLength === 0) return 240; // Further increased default size
    
    // Special scaling for first 4 letters
    if (textLength <= 4) {
      // Smaller scaling for 1-4 letters
      const baseSize = (availableWidth / textLength) * 1.0; // Reduced multiplier for short text
      const maxSize = 280; // Reduced maximum for short text
      const minSize = 28; // Keep minimum size
      return Math.max(minSize, Math.min(baseSize, maxSize));
    }
    
    // Even more aggressive scaling for longer text
    const baseSize = (availableWidth / textLength) * 1.5; // Increased multiplier again
    const maxSize = 400; // Increased maximum size
    const minSize = 28; // Increased minimum size
    
    return Math.max(minSize, Math.min(baseSize, maxSize));
  };

  const fontSize = calculateFontSize(text.length);

  const handleTextChange = (newText: string) => {
    // Limit to 30 characters
    if (newText.length <= 30) {
      setText(newText);
    }
  };

  // Helper function to convert points array to SVG path string
  const createPathString = (points: { x: number; y: number }[]) => {
    if (points.length < 2) return '';
    
    let pathString = `M ${points[0].x} ${points[0].y}`;
    
    for (let i = 1; i < points.length; i++) {
      pathString += ` L ${points[i].x} ${points[i].y}`;
    }
    
    return pathString;
  };

  // Drawing handlers using simple touch events
  const handleTouchStart = (evt: any) => {
    if (inputMode !== 'pencil') return;
    const { locationX, locationY } = evt.nativeEvent;
    setCurrentPath([{ x: locationX, y: locationY }]);
  };

  const handleTouchMove = (evt: any) => {
    if (inputMode !== 'pencil') return;
    const { locationX, locationY } = evt.nativeEvent;
    setCurrentPath(prev => [...prev, { x: locationX, y: locationY }]);
  };

  const handleTouchEnd = () => {
    if (inputMode !== 'pencil') return;
    if (currentPath.length > 0) {
      setPaths(prev => [...prev, currentPath]);
      setCurrentPath([]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header isGameScreen gameName={gameName} />

      {/* Input mode selector and clear button */}
      <View style={styles.topBar}>
        <View style={styles.inputModeSelector}>
          <TouchableOpacity
            style={[
              styles.iconButton,
              inputMode === 'typing' && styles.activeIconButton
            ]}
            onPress={() => setInputMode('typing')}
          >
            <Ionicons 
              name="keypad-outline" 
              size={20} 
              color="#00AEEF" 
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.iconButton,
              inputMode === 'pencil' && styles.activeIconButton
            ]}
            onPress={() => setInputMode('pencil')}
          >
            <Ionicons 
              name="pencil-outline" 
              size={20} 
              color="#00AEEF" 
            />
          </TouchableOpacity>
        </View>
        {inputMode === 'pencil' && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => {
              setPaths([]);
              setCurrentPath([]);
            }}
          >
            <Ionicons 
              name="trash-outline" 
              size={20} 
              color="#FF4444" 
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Main content with text input or drawing area */}
      <View style={styles.mainContent}>
        {inputMode === 'typing' ? (
          <TextInput
            style={[styles.textInput, { fontSize }]}
            value={text}
            onChangeText={handleTextChange}
            placeholder="Type here..."
            placeholderTextColor="#999"
            multiline={false}
            textAlign="center"
            maxLength={30}
            textAlignVertical="center"
          />
        ) : (
          <View
            style={styles.drawingArea}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <Svg style={styles.drawingCanvas}>
              {paths.map((path, pathIndex) => (
                <SvgPath
                  key={pathIndex}
                  d={createPathString(path)}
                  stroke="#333"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ))}
              {currentPath.length > 0 && (
                <SvgPath
                  d={createPathString(currentPath)}
                  stroke="#333"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
            </Svg>
          </View>
        )}
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
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  textInput: {
    color: '#333',
    textAlign: 'center',
    width: '100%',
    height: '100%',
    borderWidth: 0,
    borderColor: 'transparent',
    borderRadius: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
    backgroundColor: 'transparent',
    fontWeight: '700',
    textAlignVertical: 'center',
    position: 'absolute',
    top: -20, // Shift text up
    left: 0,
    right: 0,
    bottom: 0,
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
  inputModeSelector: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 8,
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
  drawingArea: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  drawingCanvas: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  path: {
    position: 'absolute',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  clearButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});
