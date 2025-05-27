import NavigateButton from "../../components/buttons/NavigateButton";

const HomePage = () => {
  return(
    <div className="flex flex-col w-screen h-screen items-center justify-center content-center gap-10">
      <div className="flex flex-col items-center justify-center content-center w-[700px] text-center gap-3 border border-solid border-black p-10 rounded-[15px] bg-zinc-100 font-mono">
          <h1 className="text-black/600">Bem-Vindo ao Projeto SOA</h1>
          <p>Este projeto tem como objetivo a implementação de uma solução baseada na arquitetura SOA (Service-Oriented Architecture), com foco na integração eficiente de serviços independentes e reutilizáveis dentro de um ambiente corporativo.</p>
          <p>Clique abaixo para explorar as opções disponíveis.</p>
      </div>
      <div className="flex gap-10 font-mono">
        <NavigateButton path="/ranking" conteudo="Ranking"/>
        <NavigateButton path="/localidade" conteudo="Localidade"/>
        <NavigateButton path="/comparacao" conteudo="Comparação"/>
      </div>
    </div>
  )
}

export default HomePage;