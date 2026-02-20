import { useCallback, useState } from 'react'
import { View, StatusBar, Alert } from 'react-native'
import { router, useFocusEffect } from 'expo-router'

import { List } from '@/components/List'
import { Button } from '@/components/Button'
import { Loading } from '@/components/Loading'
import { Target, TargetProps } from '@/components/Target'
import { HomeHeader } from '@/components/HomeHeader'

import { useTargetDatabase } from '@/database/useTargetDatabase'

const summary = {
  total: 'R$ 2.680,00',
  input: { label: 'Entradas', value: 'R$ 6,154.90' },
  output: { label: 'Saídas', value: '-R$ 883.65' }
}

export default function Index() {
  const[isFetching, setIsFetching] = useState(true)
  const [targets, setTargets] = useState<TargetProps[]>([])
  const targetDatabase = useTargetDatabase()

  async function fetchTargets(): Promise<TargetProps[]> {
    try {
      const response = await targetDatabase.listBySavedValue()

      return response.map(item => ({
        id: String(item.id),
        name: item.name,
        current: String(item.current),
        percentage: item.percentage.toFixed(0) + '%',
        target: String(item.amount)
      }))
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar as metas.')
      console.log(error)
    }
  }

  async function fetchData(){
    const targetDataPromise = fetchTargets()

    const [targetData] = await Promise.all([targetDataPromise])

    setTargets(targetData)
    setIsFetching(false)
  }

  useFocusEffect(
    useCallback(() => {
      fetchData()
    }, [])
  )

  if (isFetching) {
    return <Loading />
  }


  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />

      <HomeHeader data={summary} />

      <List
        title="Metas"
        data={targets}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Target
            data={item}
            onPress={() => router.navigate(`/in-progress/${item.id}`)}
          />
        )}
        emptyMessage="Nehuma meta. Toque em nova meta para criar."
        containerStyle={{ paddingHorizontal: 24 }}
      />

      <View style={{ padding: 24, paddingBottom: 32 }}>
        <Button title="Nova meta" onPress={() => router.navigate('/target')} />
      </View>
    </View>
  )
}
