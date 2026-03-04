import { Suspense, useEffect } from 'react'
import { Stack } from 'expo-router'
import * as NavigationBar from 'expo-navigation-bar'

import {
  useFonts,
  Inter_700Bold,
  Inter_500Medium,
  Inter_400Regular
} from '@expo-google-fonts/inter'

import { SQLiteProvider } from 'expo-sqlite'

import { migrate } from '@/database/migrate'

import { colors } from '@/theme/colors'

import { Loading } from '@/components/Loading'

export default function Layout() {
  useEffect(() => {
    async function hideNavigationBar() {
      await NavigationBar.setVisibilityAsync("hidden");
      await NavigationBar.setBehaviorAsync("overlay-swipe");
    }
    
    hideNavigationBar();
  }, []);

  const [fontsLoaded] = useFonts({
    Inter_700Bold,
    Inter_500Medium,
    Inter_400Regular
  })

  if (!fontsLoaded) {
    return <Loading />
  }

  return (
    <Suspense fallback={<Loading />}>
      <SQLiteProvider databaseName="targets.db" onInit={migrate} useSuspense>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.white }
          }}
        />
      </SQLiteProvider>
    </Suspense>
  )
}