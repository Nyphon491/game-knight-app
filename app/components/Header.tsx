import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  isGameScreen?: boolean;
  gameName?: string;
  onMenuPress?: () => void;
  onHomePress?: () => void;
};

export default function Header({ isGameScreen = false, gameName, onMenuPress, onHomePress }: Props) {
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-300)).current; // Start off-screen to the left

  useEffect(() => {
    let animation: Animated.CompositeAnimation;
    
    if (drawerOpen) {
      setDrawerVisible(true);
      animation = Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 0,
        speed: 16,
      });
    } else {
      animation = Animated.timing(slideAnim, {
        toValue: -300,
        duration: 200,
        useNativeDriver: true,
      });
    }
    
    animation.start(({ finished }) => {
      if (finished && !drawerOpen) {
        setDrawerVisible(false);
      }
    });
    
    return () => {
      animation.stop();
    };
  }, [drawerOpen]);
  
  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  const handleMenu = () => {
    if (onMenuPress) return onMenuPress();
    router.push({ pathname: '/choose-game' });
  };

  const handleHome = () => {
    if (onHomePress) return onHomePress();
    router.push('/choose-game');
  };

  return (
    <>
      <View style={styles.headerRow}>
        <View style={styles.leftSlot}>
          {isGameScreen ? (
            <Text style={styles.gameNameLeft}>{gameName ?? ''}</Text>
          ) : (
            <TouchableOpacity 
              style={styles.menuButton} 
              activeOpacity={0.7} 
              onPress={() => setDrawerOpen(true)}
            >
              <Ionicons name="menu" size={28} color="#000000" />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.centerSlot}>
          <Image
            source={require('@/assets/images/game-knight-logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.rightSlot}>
          <TouchableOpacity 
            style={styles.iconButton} 
            activeOpacity={0.8} 
            onPress={handleHome}
          >
            <Ionicons name="home-outline" size={24} color="#000000" />
          </TouchableOpacity>
        </View>
      </View>

      {drawerVisible && (
        <View style={styles.drawerOverlay}>
          <TouchableOpacity 
            style={styles.drawerBackdrop} 
            activeOpacity={0.5} 
            onPress={handleCloseDrawer}
          />
          <Animated.View 
            style={[
              styles.drawerPanel,
              { 
                transform: [{ translateX: slideAnim }],
                opacity: slideAnim.interpolate({
                  inputRange: [-300, 0],
                  outputRange: [0, 1],
                  extrapolate: 'clamp'
                })
              }
            ]}
          >
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={handleCloseDrawer}
              activeOpacity={0.8}
            >
              <Ionicons name="close" size={32} color="#ffffff" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.drawerItem} 
              onPress={() => { handleCloseDrawer(); router.push('/'); }}
            >
              <Text style={styles.drawerItemText}>Welcome</Text>
            </TouchableOpacity>
            
            <View style={styles.drawerThinLine} />
            
            <TouchableOpacity 
              style={styles.drawerItem} 
              onPress={() => { handleCloseDrawer(); router.push('/choose-game'); }}
            >
              <Text style={styles.drawerItemText}>Choose Game</Text>
            </TouchableOpacity>
            
            <View style={styles.drawerThinLine} />
            
            <TouchableOpacity 
              style={styles.drawerItem} 
              onPress={() => { 
                handleCloseDrawer(); 
                router.push({ pathname: '/choose-game', params: { all: '1' } }); 
              }}
            >
              <Text style={styles.drawerItemText}>All Games</Text>
            </TouchableOpacity>
            
            <View style={styles.drawerThinLine} />
            
            <TouchableOpacity
              style={styles.drawerItem}
              onPress={() => {
                handleCloseDrawer();
                Linking.openURL('mailto:gameknightshop.info@gmail.com?subject=Game Suggestion&body=I would like to suggest a new game:');
              }}
            >
              <Text style={styles.drawerItemText}>Suggest a Game</Text>
            </TouchableOpacity>
            
            <View style={styles.drawerThinLine} />
            
            <TouchableOpacity 
              style={styles.drawerItem} 
              onPress={() => { handleCloseDrawer(); router.push('/qr-code-scanner'); }}
            >
              <Text style={styles.drawerItemText}>QR Code Scanner</Text>
            </TouchableOpacity>
            
            <View style={styles.drawerThinLine} />
          </Animated.View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E6E6E6',
  },
  leftSlot: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  centerSlot: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightSlot: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  logoImage: {
    width: 40,
    height: 40,
  },
  menuButton: {
    paddingHorizontal: 4,
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 2,
  },
  iconButton: {
    padding: 6,
    marginRight: 2,
  },
  gameNameLeft: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    flexShrink: 1,
  },
  drawerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  drawerBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  drawerPanel: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: Math.min(240, Dimensions.get('window').width * 0.65),
    backgroundColor: '#000000',
    paddingTop: 120,  // Increased from 60
    paddingHorizontal: 16,
    paddingBottom: 24,
    zIndex: 998, // Ensure it's behind the header
  },
  drawerSeparator: {
    height: 1,
    backgroundColor: '#333333',
    marginVertical: 8,
  },
  closeButton: {
    position: 'absolute',
    top: 60,  // Moved up from 80
    left: 16,
    padding: 8,
    zIndex: 999, // Ensure it's above the drawer
  },
  drawerItem: {
    paddingVertical: 12,
    paddingLeft: 8,
  },
  drawerItemText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  drawerThinLine: {
    height: 1,
    backgroundColor: '#ffffff',
    opacity: 0.25,
  },
  drawerItemLast: {
    paddingBottom: 16,
  },
});
