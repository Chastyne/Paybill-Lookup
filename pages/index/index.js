Page({
  data: {
    searchItem: '',
    results: [],
    noResults: false,
    popularPaybills: [
      { id: '1', businessName: 'Equity Bank', paybillNumber: '247247' },
      { id: '2', businessName: 'Kenya Power', paybillNumber: '888880' },
      { id: '3', businessName: 'Nairobi Water', paybillNumber: '444400' },
      { id: '4', businessName: 'NHIF', paybillNumber: '222222' },
      { id: '5', businessName: 'KCB', paybillNumber: '522522' },
      { id: '6', businessName: 'NCBA', paybillNumber: '880100' }
    ]
  },

  onInput(e) {
    this.setData({
      searchItem: e.detail.value
    });
  },

  onSearch() {
    const { searchItem } = this.data;

    if (!searchItem) {
      my.alert({ content: 'Please enter a business name.' });
      return;
    }

    my.request({
      url: 'https://68143dc7225ff1af162845c3.mockapi.io/api/v1/Paybills',
      method: 'GET',
      success: (res) => {
        const filtered = res.data.filter(item =>
          item.businessName.toLowerCase().includes(searchItem.toLowerCase())
        );
        this.setData({ 
          results: filtered,
          noResults: filtered.length === 0
        });
      },
      fail: () => {
        my.alert({ content: 'Failed to fetch paybill data.' });
      }
    });
  }
});

