import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from './components/Header';
import { setPremium } from './state/premium';

export default function GameKnightPlusScreen() {
  const router = useRouter();
  const features = [
    'Exclusive After Knight levels',
    'Ad-free experience',
    'Early access to new features',
    'Special in-game rewards',
    'Priority support'
  ];

  const handleSubscribe = () => {
    setPremium(true);
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <Header />
      
      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        <View style={styles.hero}>
          <View style={styles.logoContainer}>
            <Image 
              source={require('@/assets/images/game-knight-logo.png')} 
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.heroTitle}>Game Knight<Text style={styles.plusText}>+</Text></Text>
          <Text style={styles.heroSubtitle}>Premium Subscription</Text>
        </View>

        <View style={styles.pricingCard}>
          <Text style={styles.price}>$9.99<Text style={styles.perMonth}>/year</Text></Text>
          <Text style={styles.billingText}>Billed annually. Cancel anytime.</Text>
          
          <TouchableOpacity 
            style={styles.subscribeButton}
            onPress={handleSubscribe}
            activeOpacity={0.9}
          >
            <Text style={styles.subscribeButtonText}>Subscribe Now</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.featuresContainer}>
          <Text style={styles.featuresTitle}>What's Included:</Text>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={24} color="#00AEEF" />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            By subscribing, you agree to our <Text style={styles.linkText} onPress={() => Linking.openURL('https://example.com/terms')}>Terms of Service</Text> and <Text style={styles.linkText} onPress={() => Linking.openURL('https://example.com/privacy')}>Privacy Policy</Text>.
            Your subscription will automatically renew unless canceled at least 24 hours before the end of the current period.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  gameName: {
    fontSize: 25,
    fontWeight: '600',
    textAlign: 'center',
    color: '#000000',
    paddingVertical: 6,
    marginBottom: 10,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  hero: {
    padding: 32,
    paddingTop: 40,
    backgroundColor: '#ffffffff',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  logoContainer: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: '800',
    marginBottom: 4,
    color: '#000',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  plusText: {
    color: '#00AEEF',
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    maxWidth: '80%',
    fontWeight: '500',
    marginBottom: 8,
  },
  pricingCard: {
    margin: 20,
    marginTop: -20,
    padding: 24,
    borderRadius: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    alignItems: 'center',
  },
  price: {
    fontSize: 48,
    fontWeight: '700',
    color: '#00AEEF',
    lineHeight: 56,
  },
  perMonth: {
    fontSize: 16,
    color: '#666',
    fontWeight: '400',
  },
  billingText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    marginBottom: 24,
  },
  subscribeButton: {
    backgroundColor: '#00AEEF',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#00AEEF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  subscribeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  featuresContainer: {
    padding: 20,
    paddingTop: 10,
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
    color: '#000',
    textAlign: 'center',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  featureText: {
    marginLeft: 16,
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  footer: {
    padding: 24,
    marginTop: 10,
  },
  footerText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    lineHeight: 18,
  },
  linkText: {
    color: '#00AEEF',
    textDecorationLine: 'underline',
  },
});
