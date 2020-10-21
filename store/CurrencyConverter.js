export const state = () => ({
  currencyConverterList: [],
  currencyConverter: {},
})

export const mutations = {
  SET_CURRENCY_CONVERTER_LIST (state, currencyConverterList) {
    state.currencyConverterList = currencyConverterList
  },
  SET_CURRENCY_CONVERTER (state, currencyConverter) {
    state.currencyConverter = currencyConverter
  },
}

export const actions = {

  create ({ commit }, newCurrencyConverter) {

    return this.$axios.post('/currency-converter', newCurrencyConverter)
    .then((response) => {
      
      commit('SET_CURRENCY_CONVERTER', response.data.data)

    })

  },
  fetchCurrencyConverterList ({ commit }) {
    return this.$axios.get('/currency-converter').then((response) => {
      commit('SET_CURRENCY_CONVERTER_LIST', response.data.data)
    })
  },

}