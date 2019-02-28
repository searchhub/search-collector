class SearchEngine {

  constructor() {
    this.data = [
      {id: 'product_1234', brand: 'Dummy', category: 'Men', name: 'Grey Men Polo', price: 79, image: 'images/grey_polo.png'},
      {id: 'product_1235', brand: 'Flare', category: 'Women', name: 'Pink Women Sneaker', price: 99, image: 'images/pink_sneaker.png'},
      {id: 'product_1236', brand: 'Dummy', category: 'Women', name: 'Green Women Dress', price: 199, image: 'images/green_dress.png'},
      {id: 'product_1237', brand: 'Dummy', category: 'Men', name: 'Grey Men T-Shirt', price: 39, image: 'images/grey_tshirt.png'},
      {id: 'product_1238', brand: 'Dummy', category: 'Men', name: 'Brown Men Trousers', price: 99, image: 'images/brown_trousers.png'},
      {id: 'product_1239', brand: 'Custom', category: 'Women', name: 'Green Women Coat', price: 299, image: 'images/green_coat.png'},
      {id: 'product_1240', brand: 'Dummy', category: 'Men', name: 'Brown Men Leather Shoe', price: 129, image: 'images/brown_leather_shoe.png'},
      {id: 'product_1241', brand: 'Dummy', category: 'Men', name: 'Green Men T-Shirt', price: 129, image: 'images/green_tshirt.png'},
      {id: 'product_1242', brand: 'Dummy', category: 'Women', name: 'Pink Women Sneaker High', price: 99, image: 'images/pink_sneaker_high.png'},
      {id: 'product_1243', brand: 'Dummy', category: 'Women', name: 'Pink Women Dress', price: 149, image: 'images/pink_dress.png'},
      {id: 'product_1244', brand: 'Custom', category: 'Men', name: 'Green Men Polo', price: 79, image: 'images/green_polo.png'},
      {id: 'product_1245', brand: 'Dummy', category: 'Men', name: 'Grey Men Trousers', price: 99, image: 'images/grey_trousers.png'},
      {id: 'product_1246', brand: 'Dummy', category: 'Men', name: 'Red Men Down Jacket', price: 299, image: 'images/red_down_jacket.png'},
      {id: 'product_1247', brand: 'Custom', category: 'Women', name: 'Blue Women High Heel', price: 129, image: 'images/blue_high_heel.png'},
      {id: 'product_1248', brand: 'Dummy', category: 'Women', name: 'Purple Women Dress', price: 149, image: 'images/purple_dress.png'},
      {id: 'product_1249', brand: 'Dummy', category: 'Men', name: 'Red Men Jeans', price: 99, image: 'images/red_jeans.png'},
      {id: 'product_1250', brand: 'Custom', category: 'Men', name: 'Grey Men Leather Shoe', price: 99, image: 'images/grey_leather_shoe.png'},
      {id: 'product_1251', brand: 'Dummy', category: 'Men', name: 'Grey Men Down Jacket', price: 299, image: 'images/grey_down_jacket.png'},
      {id: 'product_1252', brand: 'Dummy', category: 'Men', name: 'Yellow Men Polo', price: 79, image: 'images/yellow_polo.png'},
      {id: 'product_1253', brand: 'Dummy', category: 'Men', name: 'Brown Men Sneaker High', price: 99, image: 'images/brown_sneaker_high.png'},
      {id: 'product_1254', brand: 'Dummy', category: 'Women', name: 'Brown Women Dress', price: 119, image: 'images/brown_dress.png'},
      {id: 'product_1255', brand: 'Dummy', category: 'Men', name: 'Green Men Polo', price: 79, image: 'images/green_polo_1.png'},
      {id: 'product_1256', brand: 'Dummy', category: 'Women', name: 'Blue Women Trousers', price: 99, image: 'images/blue_trousers.png'},
      {id: 'product_1257', brand: 'Dummy', category: 'Women', name: 'Brown Unisex Jacket', price: 119, image: 'images/brown_jacket.png'},
      {id: 'product_1258', brand: 'Dummy', category: 'Men', name: 'Green Men Leather Shoe', price: 99, image: 'images/green_leather_shoe.png'},
      {id: 'product_1259', brand: 'Dummy', category: 'Men', name: 'Green Men Sneaker High', price: 99, image: 'images/green_sneaker_high.png'},
      {id: 'product_1260', brand: 'Custom', category: 'Women', name: 'Blue Women Dress', price: 99, image: 'images/blue_dress.png'},
      {id: 'product_1261', brand: 'Dummy', category: 'Women', name: 'Purple Women Trousers', price: 99, image: 'images/purple_trousers.png'},
      {id: 'product_1262', brand: 'Dummy', category: 'Women', name: 'Pink Women Coat', price: 299, image: 'images/pink_coat.png'},
      {id: 'product_1263', brand: 'Dummy', category: 'Women', name: 'Pink Women High Heel', price: 99, image: 'images/pink_high_heel.png'},
      {id: 'product_1264', brand: 'Dummy', category: 'Women', name: 'Grey Women Dress', price: 199, image: 'images/grey_dress.png'},
      {id: 'product_1265', brand: 'Custom', category: 'Men', name: 'Golden Men Jeans', price: 99, image: 'images/golden_jeans.png'},
      {id: 'product_1266', brand: 'Dummy', category: 'Women', name: 'Purple Women Boot', price: 99, image: 'images/purple_boot.png'},
      {id: 'product_1267', brand: 'Dummy', category: 'Men', name: 'Purple Unisex Jacket', price: 99, image: 'images/purple_jacket.png'},
      {id: 'product_1268', brand: 'Flare', category: 'Women', name: 'Yellow Women Sneaker', price: 99, image: 'images/yellow_sneaker.png'},
      {id: 'product_1269', brand: 'Dummy', category: 'Men', name: 'Brown Women Boot', price: 99, image: 'images/brown_boot.png'},
    ]
  }

  search(query, filter) {

    let data = this.data.filter(e => {
      let match = query ? e.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 : true;

      if (filter) {
        let key = filter[0].toLowerCase();
        let value = filter[1].toLowerCase();
        match &= e[key].toLowerCase() == value;
      }

      return match;
    });

    this.fireEvent(query, filter, data.length);

    return data;
  }


  recommend(id) {
    let result = [];

    while (result.length < 4) {
      let i = Math.floor((Math.random() * this.data.length));
      result.push(this.data[i]);
    }

    return result;
  }


  facets(result) {
    let brands = {};
    let categories = {};

    for (let item of result) {
      brands[item.brand] = brands[item.brand] ? brands[item.brand] + 1 : 1;
      categories[item.category] = categories[item.category] ? categories[item.category] + 1 : 1;
    }

    let facets = [];
    if (Object.keys(categories).length > 0) {
      facets.push({name: "Category", values : categories});
    }
    if (Object.keys(brands).length > 0) {
      facets.push({name: "Brand", values : brands});
    }

    return facets;
  }

  get(id) {
    return this.data.find(e => e.id === id);
  }

  fireEvent(query, filter, count) {
    let eventData = {"search" : query, "count" : count};

    if (filter) {
      let key = filter[0].toLowerCase();
      let value = filter[1].toLowerCase();
      eventData.filter = key + '=' + value;
    } else {
      eventData.filter = "";
    }

    var ev = new CustomEvent("filter", {"detail" : eventData});
    window.dispatchEvent(ev);
  }
}