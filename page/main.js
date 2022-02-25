const container = document.querySelector('.container_main');

function getResults() {
fetch('../body.json') 
  .then((response) => response.json())
  .then((data) => {
    const result = data
    result.forEach((item) => {
      if (item.relationship.titulo === ""){
        container.insertAdjacentHTML("afterbegin", `
        <section class="display">
        <img src="${item.image}" class="figure" />
        <section class="title_subtitle ">
            <h2>${item.title}</h2>
            <h4 class="subtitle">${item.subtitle}</h4>            
        </section>
      </section>`)
      } else if(item.subtitle === ""){
        container.insertAdjacentHTML("afterbegin", `
        <section class="display">
        <img src="${item.image}" class="figure"/>
        <section class="title_subtitle">
            <h2>${item.title}</h2>
            <h4><a href="${item.relationship.link}" class="subtitle">${item.relationship.titulo}</a></h4>            
        </section>
      </section>`)
      }
    })
  })
}

getResults()