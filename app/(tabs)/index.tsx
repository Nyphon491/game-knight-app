import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topSection}>
        <Image
          source={require('@/assets/images/game-knight-logo.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
        <Text style={styles.appName}>Game Knight</Text>
      </View>

      <View style={styles.middleSection}>
        <Text style={styles.subtext}>
          Make every gathering{"\n"}more memorable!
        </Text>
      </View>

      <View style={styles.bottomSection}>
        <View style={styles.bottomBar}>
          <View style={styles.actionsRow}>
            <TouchableOpacity
              style={styles.actionItem}
              activeOpacity={0.8}
              onPress={() => router.push('/choose-game')}
            >
              <Ionicons name="desktop-outline" size={24} color="#00AEEF" />
              <Text style={styles.actionLabel}>White Board</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionItem}
              activeOpacity={0.8}
              onPress={() => router.push('/choose-game')}
            >
              <Ionicons name="refresh-circle-outline" size={24} color="#00AEEF" />
              <Text style={styles.actionLabel}>Wheel Spin</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.centerNotchWrapper} pointerEvents="box-none">
            <View style={styles.centerNotchBackground} />
            <TouchableOpacity
              style={styles.qrButton}
              activeOpacity={0.8}
              onPress={() => {}}
            >
              <Ionicons name="qr-code" size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 32,
  },
  topSection: {
    marginTop: 80,
    alignItems: 'center',
  },
  logoImage: {
    width: 160,
    height: 160,
    marginBottom: 16,
  },
  appName: {
    fontSize: 32,
    fontWeight: '600',
  },
  middleSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtext: {
    fontSize: 18,
    textAlign: 'center',
    color: '#8E8E93',
    lineHeight: 26,
  },
  bottomSection: {
    marginBottom: 48,
    alignItems: 'center',
  },
  bottomBar: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 18,
    paddingBottom: 16,
    paddingHorizontal: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    position: 'relative',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionItem: {
    width: '42%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  actionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#00AEEF',
  },
  button: {
    backgroundColor: '#000000',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 999,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  centerNotchWrapper: {
    position: 'absolute',
    top: -16,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  centerNotchBackground: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#E6E6E6',
  },
  qrButton: {
    position: 'absolute',
    top: 8,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#00AEEF',
    alignItems: 'center',
    justifyContent: 'center',
    // button shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
});
