class Render {

  product(container, item) {
    let div = document.createElement('div');
    div.classList.add('grid-item');
    div.addEventListener('click', e => {
      window.location.href = "product.html?id=" + item.id;
    });
    div.setAttribute("id", item.id);

    let img = new Image(300,300);
    img.src = item.image;
    div.appendChild(img);
    div.appendChild(document.createTextNode(item.name));
    div.appendChild(document.createElement('br'));
    div.appendChild(document.createTextNode('$' + item.price));

    container.appendChild(div);
  }

  facets(container, facet, listener) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(facet.name));

    let ul = document.createElement('ul');
    for (let key of Object.keys(facet.values)) {
      let count = facet.values[key];
      let li = document.createElement('li');
      li.classList.add('facet');
      li.setAttribute('data-filter', facet.name.toLowerCase() + '=' + key);
      li.appendChild(document.createTextNode(key + ' (' + count + ')'));
      li.addEventListener('click', e => {
        listener([facet.name, key]);
      });
      li.style.cursor = 'pointer';
      ul.appendChild(li);
    }
    container.appendChild(div);
    container.appendChild(ul);
  }

  details(container, item, basketListener) {
    let img = new Image(400, 400);
    img.src = item.image;
    container.appendChild(img);

    container.appendChild(document.createElement('br'));
    container.appendChild(document.createTextNode(item.name));
    container.appendChild(document.createElement('br'));
    container.appendChild(document.createTextNode('$' + item.price));
    container.appendChild(document.createElement('br'));
    container.appendChild(document.createElement('br'));

    let button = document.createElement("button");
    button.type = "button";
    button.addEventListener('click', e => {
      basketListener(item.id);
      window.location.href = "basket.html";
    });
    button.innerText = "Add to basket";
    container.appendChild(button);
  }

  basketEntry(container, item) {
    let tr = document.createElement("tr");
          
    let img = new Image(100, 100);
    img.src = item.image;

    let td = document.createElement("td");
    td.setAttribute("align", "center");
    td.append(img);
    tr.appendChild(td);

    td = document.createElement("td");
    td.append(document.createTextNode(item.name));
    td.setAttribute("align", "center");
    tr.appendChild(td);

    td = document.createElement("td");
    td.append(document.createTextNode('$' + item.price));
    td.setAttribute("align", "center");
    tr.appendChild(td);
    
    container.appendChild(tr);
  }
}