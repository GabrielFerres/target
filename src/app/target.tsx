import { useState, useEffect } from 'react'
import { Alert, View } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'

import { PageHeader } from '@/components/PageHeader'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { CurrencyInput } from '@/components/CurrencyInput'

import { useTargetDatabase } from '@/database/useTargetDatabase'

export default function Target() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [name, setName] = useState('')
  const [amount, setAmount] = useState(0)

  const params = useLocalSearchParams<{ id?: string }>()
  const targetDatabase = useTargetDatabase()

  function handleSave() {
    if (!name.trim() || amount <= 0) {
      return Alert.alert('Atenção', 'Preencha todos os campos')
    }

    setIsProcessing(true)

    if (params.id) {
    } else {
      create()
    }
  }

  async function create() {
    try {
      await targetDatabase.create({ name, amount })
      Alert.alert('Sucesso', 'Meta criada com sucesso', [
        { text: 'OK', onPress: () => router.back() }
      ])
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível criar a meta')
      setIsProcessing(false)
    }
  }

  async function fetchDetails(id: number) {
    try {
      const response = await targetDatabase.show(id)
      setName(response.name)
      setAmount(response.amount)
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os dados da meta')
    }
  }

  useEffect(() => {
    if (params.id) {
      fetchDetails(Number(params.id))
    }
  }, [params.id])

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader
        title="Meta"
        subtitle="Economize para alcançar sua meta financeira."
      />

      <View style={{ marginTop: 32, gap: 24 }}>
        <Input
          label="Nome da meta"
          placeholder="Ex: Viagem para a praia"
          onChangeText={setName}
          value={name}
        />

        <CurrencyInput
          label="Valor alvo (R$)"
          value={amount}
          onChangeValue={setAmount}
        />
        <Button
          title="Salvar"
          onPress={handleSave}
          isProcessing={isProcessing}
        />
      </View>
    </View>
  )
}
