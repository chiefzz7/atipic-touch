import '../../global.css';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Aqui dentro as rotas (telas) serão injetadas automaticamente */}
    </Stack>
  );
}
