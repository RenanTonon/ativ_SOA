import NavigateButton from "../../components/buttons/NavigateButton";

const HomePage = () => {
  return(
    <div className="flex flex-col w-screen h-screen items-center justify-center content-center">
      <div>

      </div>
      <div className="flex gap-10">
        <NavigateButton path="/ranking" conteudo="Ranking"/>
        <NavigateButton path="/localidade" conteudo="Localidade"/>
        <NavigateButton path="/comparacao" conteudo="Comparacao"/>
      </div>
    </div>
  )
}

export default HomePage;