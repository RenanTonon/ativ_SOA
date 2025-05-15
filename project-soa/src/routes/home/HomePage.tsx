export const HomePage = () => {
  //https://servicodados.ibge.gov.br/api/v2/censos/nomes/{nome}

  //https://servicodados.ibge.gov.br/api/v2/censos/nomes/ranking
  
  
    var api = fetch('https://servicodados.ibge.gov.br/api/v2/censos/nomes/ranking')
    var response = `${api}`
 
  return (
    <div>
      ´${response}´
    </div>
  )

}

