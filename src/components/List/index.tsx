import {
  FlatList,
  FlatListProps,
  StyleProp,
  Text,
  View,
  ViewStyle
} from 'react-native'

import { styles } from './styles'
import { colors } from '@/theme'
import { Separator } from '@/components/Separator'

type Props<T> = FlatListProps<T> & {
  title: string
  emptyMessage?: string
  containerStyle?: StyleProp<ViewStyle>
}

export function List<T>({
  containerStyle,
  title,
  emptyMessage,
  data,
  renderItem,
  ...rest
}: Props<T>) {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.title}>{title}</Text>

      <FlatList
        data={data}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <Separator color={colors.gray[200]} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={() => (
          <Text style={styles.empty}>{emptyMessage}</Text>
        )}
        {...rest}
      />
    </View>
  )
}
