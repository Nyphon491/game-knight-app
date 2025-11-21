import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ROLE_INFO: Record<string, string> = {
  Mafia: 'Mafia eliminate one player each night. Work together to outnumber citizens.',
  Citizen: 'Citizens try to find and vote out the Mafia during the day.',
  Doctor: 'Doctor can protect one player each night from elimination.',
  Archer: 'Archer has a one-time shot to eliminate someone. Use wisely.',
  Detective: 'Detective can investigate one player each night to learn if they are Mafia.',
  Jester: 'Jester wins if they are voted out during the day. They are not on either team.',
};

type RoleKey = keyof typeof ROLE_INFO;

export default function MafiaSettings() {
  const router = useRouter();
  const { game } = useLocalSearchParams<{ game?: string }>();
  const gameName = typeof game === 'string' ? game : 'Mafia';

  const [roles, setRoles] = useState<Record<RoleKey, number>>({
    Mafia: 2,
    Citizen: 6,
    Doctor: 1,
    Archer: 0,
    Detective: 1,
    Jester: 0,
  });

  const totalPlayers = useMemo(() => Object.values(roles).reduce((a, b) => a + b, 0), [roles]);
  const canStart = totalPlayers > 0;

  const change = (key: RoleKey, delta: number) => {
    setRoles(prev => ({ ...prev, [key]: Math.max(0, prev[key] + delta) }));
  };

  const startGame = () => {
    if (!canStart) return;
    const params = { roles: JSON.stringify(roles), game: 'Mafia' } as any;
    router.push({ pathname: '/mafia-reveal', params });
  };

  const RoleRow = ({ role }: { role: RoleKey }) => (
    <View style={styles.roleRow}>
      <View style={styles.roleLeft}>
        <Text style={styles.roleName}>{role}</Text>
        <TouchableOpacity
          style={styles.infoButton}
          onPress={() => alert(`${role}: ${ROLE_INFO[role]}`)}
          activeOpacity={0.8}
        >
          <Ionicons name="information-circle-outline" size={18} color="#00AEEF" />
        </TouchableOpacity>
      </View>
      <View style={styles.counterRow}>
        <TouchableOpacity style={styles.counterBtn} onPress={() => change(role, -1)} activeOpacity={0.8}>
          <Text style={styles.counterText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.count}>{roles[role]}</Text>
        <TouchableOpacity style={styles.counterBtn} onPress={() => change(role, 1)} activeOpacity={0.8}>
          <Text style={styles.counterText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

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
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.8}
          onPress={() => router.back()}
        >
          <Ionicons name="return-up-back" size={24} color="#00AEEF" />
        </TouchableOpacity>
      </View>

      <Text style={styles.screenTitle}>Mafia Settings</Text>

      <View style={styles.rolesContainer}>
        {Object.keys(ROLE_INFO).map((r) => (
          <RoleRow key={r} role={r as RoleKey} />
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.totalLabel}>Total Players: <Text style={styles.totalValue}>{totalPlayers}</Text></Text>
        <TouchableOpacity
          style={[styles.startButton, !canStart && styles.startDisabled]}
          disabled={!canStart}
          activeOpacity={0.9}
          onPress={startGame}
        >
          <Text style={styles.startText}>Start</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E6E6E6',
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  logoImage: { width: 40, height: 40, marginRight: 8 },
  appName: { fontSize: 24, fontWeight: '600', color: '#333' },
  gameName: { fontSize: 18, fontWeight: '500', color: '#00AEEF' },
  backButton: { padding: 4 },

  rolesContainer: { padding: 20, gap: 12 },
  screenTitle: { fontSize: 24, fontWeight: '800', color: '#00AEEF', paddingHorizontal: 20, paddingTop: 12, textAlign: 'center' },
  roleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  roleLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  roleName: { fontSize: 18, fontWeight: '600', color: '#333' },
  infoButton: { padding: 6 },
  counterRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  counterBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterText: { fontSize: 18, fontWeight: '800', color: '#00AEEF' },
  count: { minWidth: 28, textAlign: 'center', fontSize: 18, fontWeight: '700', color: '#333' },

  footer: { paddingHorizontal: 20, paddingBottom: 20, gap: 12 },
  totalLabel: { fontSize: 16, color: '#666' },
  totalValue: { fontWeight: '800', color: '#333' },
  startButton: {
    backgroundColor: '#00AEEF',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  startDisabled: { backgroundColor: '#9ADAF0' },
  startText: { color: '#fff', fontSize: 18, fontWeight: '800' },
});
