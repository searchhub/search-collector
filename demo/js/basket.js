class Basket {
  
  add(id) {
    let basket = [];

    let val = sessionStorage.getItem("basket");
    if (val) {
      basket = JSON.parse(val);
    }
    basket.push(id);
    sessionStorage.setItem("basket", JSON.stringify(basket));
  }

  remove(id) {
    let val = sessionStorage.getItem("basket");
    if (val) {
      let basket = JSON.parse(val);
      basket = basket.filter(el => el !== id);
      sessionStorage.setItem("basket", JSON.stringify(basket));
    }
  }

  list() {
    let val = sessionStorage.getItem("basket");
    return val ? JSON.parse(val) : [];
  }

  clear() {
    sessionStorage.removeItem("basket");
  }
}