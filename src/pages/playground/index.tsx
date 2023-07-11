import { GetServerSideProps, InferGetStaticPropsType } from "next"
import PlaygroundPage from "../../components/playground/PlaygroundPage/PlaygroundPage"
import { Locales } from "../../i18n/i18n-types"
import { loadedLocales } from "../../i18n/i18n-util"
import { loadLocaleAsync } from "../../i18n/i18n-util.async"

export const getStaticProps: GetServerSideProps = async (context) => {
  const locale: Locales = "de"
  await loadLocaleAsync("de")

  return {
    props: {
      i18n: {
        locale: locale,
        dictionary: loadedLocales[locale],
      },
    },
  }
}

type Props = InferGetStaticPropsType<typeof getStaticProps>
const Page = ({ ...props }: Props) => {
  return <PlaygroundPage />
}

export default Page
