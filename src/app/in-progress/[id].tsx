import { useCallback, useState } from 'react'
import { Alert, View } from 'react-native'
import { useLocalSearchParams, router, useFocusEffect } from 'expo-router'

import { List } from '@/components/List'
import { Button } from '@/components/Button'
import { Loading } from '@/components/Loading'
import { Progress } from '@/components/Progress'
import { PageHeader } from '@/components/PageHeader'
import { Transaction, TransctionProps } from '@/components/Transaction'

import { TransactionTypes } from '@/utils/TransactionTypes'
import { numberToCurrency } from '@/utils/numberToCurrency'

import { useTargetDatabase } from '@/database/useTargetDatabase'

const transactions: TransctionProps[] = [
  {
    id: '1',
    value: 'R$ 300,00',
    date: '12/02/2026',
    description: 'CDB de 110% no banco XPTO',
    type: TransactionTypes.Input
  },
  {
    id: '2',
    value: 'R$ 1000,00',
    date: '20/01/2026',
    type: TransactionTypes.Output
  },
  {
    id: '3',
    value: 'R$ 750,00',
    date: '01/02/2026',
    description: 'Viagem para o Rio de Janeiro',
    type: TransactionTypes.Input
  }
]

export default function InProgress() {
  const [isFetching, setIsFetching] = useState(true)
  const [details, setDetails] = useState({
    name: '',
    current: 'R$ 0,00',
    target: 'R$ 0,00',
    percentage: 0
  })
  const params = useLocalSearchParams<{ id: string }>()

  const targetDatabase = useTargetDatabase()

  async function fetchDetails() {
    try {
      const response = await targetDatabase.show(Number(params.id))
      setDetails({
        name: response.name,
        current: numberToCurrency(response.current),
        target: numberToCurrency(response.amount),
        percentage: response.percentage
      })
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os dados.')
      console.error(error)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchData()
    }, [])
  )

  async function fetchData() {
    const fetchDetailsPromise = fetchDetails()

    await Promise.all([fetchDetailsPromise])
    setIsFetching(false)
  }

  if (isFetching) {
    return <Loading />
  }

  return (
    <View style={{ flex: 1, padding: 24, gap: 32 }}>
      <PageHeader
        title={details.name}
        rightButton={{
          icon: 'edit',
          onPress: () => {}
        }}
      />
      <Progress data={details} />
      <List
        title="Transações"
        data={transactions}
        renderItem={({ item }) => (
          <Transaction data={item} onRemove={() => {}} />
        )}
        emptyMessage="Nenhuma transação. Toque em nova transação para guardar seu primeiro dinheiro aqui."
      />

      <Button
        title="Nova transação"
        onPress={() => router.navigate(`/transaction/${params.id}`)}
      />
    </View>
  )
}
