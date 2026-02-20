import { View } from 'react-native'
import { useLocalSearchParams, router } from 'expo-router'

import { PageHeader } from '@/components/PageHeader'
import { Progress } from '@/components/Progress'
import { List } from '@/components/List'
import { Transaction, TransctionProps } from '@/components/Transaction'
import { Button } from '@/components/Button'

import { TransactionTypes } from '@/utils/TransactionTypes'

const details = {
  current: '580,00',
  target: 'R$ 1.790,00',
  percentage: 25
}

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
  const params = useLocalSearchParams<{ id: string }>()

  return (
    <View style={{ flex: 1, padding: 24, gap: 32 }}>
      <PageHeader
        title="Apple Watch"
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
