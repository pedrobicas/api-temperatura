// Inicia o programa com a função de contultar o clima pelo IP
consultar_ip()
let icon
// Função consulta pelo IP
function consultar_ip() {
  // Fetch da API por IP
  let url = 'https://api.hgbrasil.com/weather?format=json-cors&key=0bc8de826&user_ip=remote'

  options = {

    mode: "cors", // same-origin, no-cors

  }
  fetch(url, options)
    .then((response) => {
      return response.json()
    })

    .then(json => {
      // Inserindo os dados do clima no primeiro card
      document.getElementById(`cityToday`).innerText = json.results.city
      document.getElementById(`dateToday`).innerText = json.results.date
      document.getElementById(`tempToday`).innerText = json.results.temp + '°C'
      document.getElementById(`min-maxToday`).innerText = 'Min: ' + json.results.forecast[0]['max'] + '°C' + '/' + 'Max: ' + json.results.forecast[0]['min'] + '°C'
      document.getElementById(`descriptionToday`).innerText = json.results.forecast[0]['description']

      // Criando o icone do clima
      icon = document.getElementById(`iconToday`);
      icon.style.cssText = 'font-size: 80px';
      let conditionIcon = json.results.forecast[0]['condition']
      iconTemp(conditionIcon)

      // Inserindo os dados do clima, nos proximos 10 dias
      for (let x in json.results.forecast) {
        x++
        
        document.getElementById(`city${x}`).innerText = json.results.city

        document.getElementById(`date${x}`).innerText = json.results.forecast[x]['date']

        document.getElementById(`min-max${x}`).innerText = json.results.forecast[x]['max'] + '°C' + '/' + json.results.forecast[x]['min'] + '°C'

        document.getElementById(`description${x}`).innerText = json.results.forecast[x]['description']

        icon = document.getElementById(`icon${x}`);
        icon.style.cssText = 'font-size: 40px';

        let conditionIcon = json.results.forecast[x]['condition']
        iconTemp(conditionIcon)
      }
    })
}

// Função consultar por nome da cidade
function consultar() {
  cidade = document.getElementById('cidade').value
  // Fetch da API pelo o nome da cidade
  let url = `https://api.hgbrasil.com/weather?format=json-cors&key=0bc8de82&city_name=${cidade}`
  options = {

      mode: "cors", // same-origin, no-cors

    }
  fetch(url, options)
    .then((response) => {
      return response.json()
    })

    .then(json => {
      // Inserindo os dados do clima no primeiro card
      document.getElementById(`cityToday`).innerText = json.results.city
      document.getElementById(`dateToday`).innerText = json.results.date
      document.getElementById(`tempToday`).innerText = json.results.temp + '°C'
      document.getElementById(`min-maxToday`).innerText = 'Min: ' + json.results.forecast[0]['max'] + '°C' + '/' + 'Max: ' + json.results.forecast[0]['min'] + '°C'
      document.getElementById(`descriptionToday`).innerText = json.results.forecast[0]['description']

      // Criando o icone do clima do primeiro card
      icon = document.getElementById(`iconToday`);
      icon.style.cssText = 'font-size: 80px';
      let conditionIcon = json.results.forecast[0]['condition']
      iconTemp(conditionIcon)
      
      // Inserindo os dados do clima, dos proximos 10 dias
      for (let x in json.results.forecast) {
        x++
        document.getElementById(`city${x}`).innerText = json.results.city
        document.getElementById(`date${x}`).innerText = json.results.forecast[x]['date']
        document.getElementById(`min-max${x}`).innerText = json.results.forecast[x]['max'] + '°C' + '/' + json.results.forecast[x]['min'] + '°C'
        document.getElementById(`description${x}`).innerText = json.results.forecast[x]['description']

        // Criando o icone do clima dos proximos 10 dias
        icon = document.getElementById(`icon${x}`);
        icon.style.cssText = 'font-size: 40px';
        let conditionIcon = json.results.forecast[x]['condition']
        iconTemp(conditionIcon)
      }
    })
}

// Função do icone do clima
function iconTemp(conditionIcon){
  // Condicional para mudar o atributo da class do icone
  if (conditionIcon == 'rain') {
    icon.setAttribute('class', 'bi bi-cloud-drizzle');
  }
  else if (conditionIcon == 'clear_day') {
    icon.setAttribute('class', 'bi bi-brightness-high');
  }
  else if (conditionIcon === 'clear_night') {
    icon.setAttribute('class', 'bi bi-moon');
  }
  else if (conditionIcon === 'fog') {
    icon.setAttribute('class', 'bi bi-cloud-fog');
  }
  else if (conditionIcon === 'cloud') {
    icon.setAttribute('class', 'bi bi-cloud');
  }
  else if (conditionIcon === 'hail') {
    icon.setAttribute('class', 'bi bi-cloud-hail');
  }
  else if (conditionIcon === 'cloudly_day') {
    icon.setAttribute('class', 'bi bi-cloud-sun');
  }
  else if (conditionIcon === 'cloudly_night') {
    icon.setAttribute('class', 'bi bi-cloud-moon');
  }
}
