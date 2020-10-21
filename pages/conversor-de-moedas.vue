<template>
  <div class="container">
    <hr>
    <h1>Conversor de moedas</h1>
    <b-form @submit.prevent="create" class="bg-white">

      <!-- 

        FALTOU VALIDAÇÃO;
          Exemplo: PODERIA NÃO PERMITIR CAMBIO DE UMA MOEDA IGUAL A OUTRA
        Poderia colocar máscaras de moeda
        PODERIA SÓ MOSTRAR O VALOR DA CONVERSAO E PERGUNTAR SE DESEJA SALVAR

      -->

      <div class="row">
        
        <div class="col-md-6">
          <b-form-group
            label="Valor"
            label-for="currency_value"
          >
            <b-form-input
              id="currency_value"
              v-model="newCurrencyConverter.currency_value"
              type="text"
            ></b-form-input>
          </b-form-group>
        </div>
        <div class="col-md-3">
          <label>De (Moeda):</label>
          <b-form-select 
            v-model="newCurrencyConverter.currency_from"
          >
            <b-form-select-option :value="null" SELECTED>Selecione uma moeda</b-form-select-option>
            <b-form-select-option 
              v-for="(currencyList, currencyListIndex) in currencyLists" 
              :value="currencyList.type"
              :key="currencyListIndex"
            >
              {{ currencyList.name }}
            </b-form-select-option>
          </b-form-select>
        </div>
        <div class="col-md-3">
          <label>Para (Moeda):</label>
          <b-form-select 
            v-model="newCurrencyConverter.currency_to"
          >
            <b-form-select-option :value="null" SELECTED>Selecione uma moeda</b-form-select-option>
            <b-form-select-option 
              v-for="(currencyList, currencyListIndex) in currencyLists" 
              :value="currencyList.type"
              :key="currencyListIndex"
            >
              {{ currencyList.name }}
            </b-form-select-option>
          </b-form-select>
        </div>
        
      </div>

      <b-button type="submit" block variant="primary" class="bg-primary">Converter</b-button>
    
    </b-form>
    <hr>
    <template v-if="currencyConverterList.length">
      <h4>Histórico</h4>
      <table class="table">
        <thead>
          <th>Valor</th>
          <th>De</th>
          <th>Para</th>
          <th>Valor da Conversão</th>
        </thead>
        <tbody>
          <tr
            v-for="(currencyConverter, currencyConverterListIndex) in currencyConverterList" 
            :key="currencyConverterListIndex"
          >
            <td>{{ currencyConverter.currency_value }}</td>
            <td>{{ currencyConverter.currency_from }}</td>
            <td>{{ currencyConverter.currency_to }}</td>
            <td>{{ currencyConverter.currency_converter_value }}</td>
          </tr>
        </tbody>
      </table>
    </template>

  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  async fetch ({ store, error }) {
    try {
      await store.dispatch('CurrencyConverter/fetchCurrencyConverterList')
    } catch (e) {
      console.log(e)
    }
  },
  data () {
    return {
      newCurrencyConverter: {},
      currencyLists: [
        { type: 'BRL', name: 'Real'},
        { type: 'EUR', name: 'Euro'},
        { type: 'USD', name: 'Dóllar'}
      ]
    }
  },
  methods: {

    async create () {
      try {
        
        await this.$store.dispatch('CurrencyConverter/create', this.newCurrencyConverter)
        
        await this.$store.dispatch('CurrencyConverter/fetchCurrencyConverterList')

        this.newCurrencyConverter = {}

      } catch (err) {

        console.log(err)

      }

    }
  
  },
  computed: mapState({
    currencyConverterList: state => state.CurrencyConverter.currencyConverterList,
    currencyConverter: state => state.CurrencyConverter.currencyConverter,
  })
}
</script>
