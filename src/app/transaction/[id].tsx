import { use, useState } from 'react'

import { Alert, View } from 'react-native'
import { useLocalSearchParams, router } from 'expo-router'

import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { PageHeader } from '@/components/PageHeader'
import { CurrencyInput } from '@/components/CurrencyInput'
import { TransactionType } from '@/components/TransactionType'

import { TransactionTypes } from '@/utils/TransactionTypes'
import { useTransactionDatabase } from '@/database/useTransactionsDatabase'

export default function Transaction() {
  const [amount, setAmount] = useState(0)
  const [type, setType] = useState(TransactionTypes.Input)
  const [isCreating, setIsCreating] = useState(false)
  const [observation, setObservation] = useState('')

  const params = useLocalSearchParams<{ id: string }>()
  const transctionsDatabase = useTransactionDatabase()

  async function handleCreate() {
    try {
      if (amount <= 0) {
        return Alert.alert('Ops', 'Por favor, informe um valor válido.')
      }

      setIsCreating(true)
      await transctionsDatabase.create({
        target_id: Number(params.id),
        amount: type === TransactionTypes.Output ? amount * -1 : amount,
        observation
      })

      Alert.alert('Sucesso', 'Transação criada com sucesso!', [
        {
          text: 'OK',
          onPress: () => {
            router.back()
          }
        }
      ])
    } catch (error) {
      Alert.alert(
        'Ops',
        'Ocorreu um erro ao criar a transação. Tente novamente mais tarde.'
      )
      console.log(error)
      setIsCreating(false)
    }
  }

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader
        title="Nova transação"
        subtitle="A cada valor guardado você fica mais próximo da sua meta."
      />

      <View style={{ marginTop: 32, gap: 24 }}>
        <TransactionType selected={type} onChange={setType} />

        <CurrencyInput
          label="Valor (R$)"
          value={amount}
          onChangeValue={setAmount}
        />

        <Input
          label="Motivo (opcional)"
          placeholder="Ex: Investir em CDB de 110% no banco XPTO"
          onChangeText={setObservation}
        />

        <Button
          title="Salvar"
          onPress={handleCreate}
          isProcessing={isCreating}
        />
      </View>
    </View>
  )
}
