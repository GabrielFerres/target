import { StyleSheet } from 'react-native'

import { colors, fontFamily } from '@/theme'

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listContent: {
    paddingBottom: 72
  },
  title: {
    marginTop: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
    fontSize: 16,
    fontFamily: fontFamily.medium,
    color: colors.black
  },
  empty: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: colors.gray[600]
  }
})
