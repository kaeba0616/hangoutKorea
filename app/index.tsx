import { Redirect } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { useMockAuth } from '@/hooks/useMockAuth';
import { colors } from '@/constants/theme';

export default function Index() {
  const { status } = useMockAuth();

  if (status === 'loading') {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.surface.background,
        }}
      >
        <ActivityIndicator color={colors.brand.primary} />
      </View>
    );
  }

  if (status === 'authenticated') {
    return <Redirect href="/home" />;
  }
  if (status === 'pending-onboarding') {
    return <Redirect href="/setup" />;
  }
  return <Redirect href="/onboarding-splash" />;
}
