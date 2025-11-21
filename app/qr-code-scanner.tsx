import { useLocalSearchParams, useRouter } from 'expo-router';
import * as ScreenOrientation from 'expo-screen-orientation';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function QRCodeScannerScreen() {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [isLandscape, setIsLandscape] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [codeInput, setCodeInput] = useState('');

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
        
        // Now lock to portrait
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
        console.log('✅ Locked to portrait');
        
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
  const gameName = typeof game === 'string' ? game : 'QR Code Scanner';

  const handleBack = () => {
    router.push('/choose-game');
  };

  const handleSubmitCode = () => {
    if (codeInput.trim()) {
      // Handle the submitted code
      console.log('Submitted code:', codeInput);
      // You can add navigation or other logic here
    }
  };

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    if (scanned) return;
    
    setScanned(true);
    console.log('Scanned:', data);
    
    // Here you can handle the scanned data
    // For now, just show an alert and reset
    alert(`QR Code scanned: ${data}`);
    
    // Reset after 2 seconds to allow scanning again
    setTimeout(() => {
      setScanned(false);
    }, 2000);
  };

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

      {/* Camera View Area */}
      <View style={styles.cameraContainer}>
        {/* Camera placeholder - would need to integrate with expo-camera */}
        <View style={styles.cameraPlaceholder}>
          <Text style={styles.cameraText}>Camera View</Text>
          
          {/* QR Code Scanner Overlay */}
          <View style={styles.scannerOverlay}>
            {/* Corner markers for the scan area */}
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />
            
            {/* Scan line animation placeholder */}
            <View style={styles.scanLine} />
          </View>
          
          <Text style={styles.instructionText}>
            Align QR code within the frame to scan
          </Text>
        </View>
      </View>

      {/* Code Input Section */}
      <View style={styles.codeInputSection}>
        <TextInput
          style={styles.codeInput}
          placeholder="Enter code manually"
          placeholderTextColor="#999"
          value={codeInput}
          onChangeText={setCodeInput}
        />
        <TouchableOpacity
          style={styles.submitButton}
          activeOpacity={0.8}
          onPress={handleSubmitCode}
        >
          <Text style={styles.submitButtonText}>Submit Code</Text>
        </TouchableOpacity>
      </View>

      {/* Back button */}
      <View style={styles.backRow}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleBack}
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
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  cameraPlaceholder: {
    width: '100%',
    height: '80%',
    backgroundColor: '#000',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  cameraText: {
    color: '#666',
    fontSize: 18,
    marginBottom: 20,
  },
  scannerOverlay: {
    position: 'absolute',
    width: 250,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  corner: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderColor: '#00AEEF',
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 3,
    borderLeftWidth: 3,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 3,
    borderRightWidth: 3,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 3,
    borderRightWidth: 3,
  },
  scanLine: {
    position: 'absolute',
    width: '80%',
    height: 2,
    backgroundColor: '#00AEEF',
    // Would add animation here for moving scan line
  },
  instructionText: {
    color: '#333',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  codeInputSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  codeInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#00AEEF',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  backRow: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  backText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#00AEEF',
  },
});
