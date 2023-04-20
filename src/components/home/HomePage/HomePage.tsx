import FlexCol from "@/components/_common/flexboxes/FlexCol"
import FlexHCenter from "@/components/_common/flexboxes/FlexHCenter"
import FlexVCenter from "@/components/_common/flexboxes/FlexVCenter"
import useTechCount from "@/hooks/domain/creation/tech/useTechCount"
import useCreationsQuery from "@/hooks/react-query/creation/useCreationsQuery"
import { myTrpc } from "@/hooks/trpc/myTrpc"
import { useGithubUserInfo } from "@/hooks/useGithubUsername"
import { Box, Container, Flex, Loader, Text } from "@mantine/core"

import { useSession } from "next-auth/react"
import Image from "next/image"
import { FaGithub } from "react-icons/fa"
import CreationsTable from "./CreationsTable/CreationsTable"
import MyNavbar from "./MyNavbar"
import TopTechnologies from "./TopTechnologies/TopTechnologies"

const HomePage = () => {
  const { data } = useSession()
  const { data: userCreations, isLoading } = useCreationsQuery()
  const techCount = useTechCount()

  const helloQuery = myTrpc.hello.useQuery({ text: "client" })

  const userInfo = useGithubUserInfo(data?.user?.image)

  if (!data?.user) return null

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <MyNavbar />

      <Container>
        <Flex gap={16}>
          <Image
            loader={() => `${data.user?.image}`}
            unoptimized
            width={64}
            height={64}
            style={{
              borderRadius: 64,
            }}
            src={`${data.user.image}`}
            alt="profile-image"
          />
          <FlexCol>
            <Text size="md">{data.user.name}</Text>

            <FlexVCenter gap={8}>
              <Text color="#979797">@{userInfo?.login}</Text>

              <a
                href={`https://github.com/${userInfo?.login}`}
                target="_blank"
                style={{ display: "flex", alignItems: "center" }}
              >
                <FaGithub color="white" />
              </a>
            </FlexVCenter>
          </FlexCol>
        </Flex>

        <Box mt={32} />
        <TopTechnologies />
        <Box mt={16}>
          {isLoading ? (
            <FlexHCenter>
              <Loader />
            </FlexHCenter>
          ) : (
            <CreationsTable creations={userCreations || []} />
          )}
        </Box>
      </Container>
    </div>
  )
}

export default HomePage
