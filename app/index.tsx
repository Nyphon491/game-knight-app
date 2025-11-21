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
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => {
            router.push('/choose-game');
          }}
        >
          <Text style={styles.buttonText}>Let's Play →</Text>
        </TouchableOpacity>
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
});
