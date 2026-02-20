import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import { styles } from './styles'
import { colors } from '@/theme'

import { TransactionTypes } from '@/utils/TransactionTypes'

export type TransctionProps = {
  id: string
  value: string
  date: string
  description?: string
  type: TransactionTypes
}

export type Props = {
  data: TransctionProps
  onRemove: () => void
}

export function Transaction({ data, onRemove }: Props) {
  return (
    <View style={styles.container}>
      <MaterialIcons
        name={
          data.type === TransactionTypes.Input
            ? 'arrow-upward'
            : 'arrow-downward'
        }
        size={20}
        color={
          data.type === TransactionTypes.Input
            ? colors.blue[500]
            : colors.red[400]
        }
      />

      <View style={styles.info}>
        <Text style={styles.value}>{data.value}</Text>
        <Text style={styles.description} numberOfLines={1}>
          {data.date} {data.description && `• ${data.description}`}
        </Text>
      </View>

      <TouchableOpacity activeOpacity={0.8} onPress={onRemove}>
        <MaterialIcons name="close" size={20} color={colors.gray[500]} />
      </TouchableOpacity>
    </View>
  )
}
