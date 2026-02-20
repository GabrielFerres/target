import { View, Text, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { router } from 'expo-router'

import { styles } from './styles'
import { colors } from '@/theme'

type Props = {
  title: string
  subtitle?: string
  rightButton?: {
    icon: keyof typeof MaterialIcons.glyphMap
    onPress: () => void
  }
}

export function PageHeader({ title, subtitle, rightButton }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={32} color={colors.black} />
        </TouchableOpacity>

        {rightButton && (
          <TouchableOpacity onPress={rightButton.onPress}>
            <MaterialIcons
              name={rightButton.icon}
              size={24}
              color={colors.gray[500]}
            />
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  )
}
